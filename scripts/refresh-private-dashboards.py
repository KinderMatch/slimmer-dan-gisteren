#!/usr/bin/env python3
"""Run the reviewed private refresh packages without passing file bodies through a chat."""
import datetime as dt
import hashlib
import io
import json
import os
from pathlib import Path
import shutil
import stat
import subprocess
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from zoneinfo import ZoneInfo

SLUGS = ("mkb-advies", "kozijnrubbers")
REPO = "KinderMatch/slimmer-dan-gisteren"
LIMIT = 32 * 1024 * 1024


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise RuntimeError("Unexpected redirect from private Google source")


def digest(data):
    return hashlib.sha256(data).hexdigest()


def google_get(url, token):
    # Only fixed Google API URLs are constructed by this program. No signed URLs in logs.
    assert urllib.parse.urlsplit(url).netloc in {"www.googleapis.com", "sheets.googleapis.com"}
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + token})
    for attempt in range(4):
        try:
            with urllib.request.build_opener(NoRedirect).open(req, timeout=120) as response:
                body = response.read(LIMIT + 1)
                if len(body) > LIMIT:
                    raise ValueError("Complete source exceeds the configured safe download limit")
                return body
        except urllib.error.HTTPError as error:
            if error.code not in {429, 500, 502, 503, 504} or attempt == 3:
                raise RuntimeError("Google source request failed: HTTP " + str(error.code)) from None
            time.sleep(2 ** attempt)
    raise RuntimeError("Google request did not complete")


def safe_extract(body, destination):
    with zipfile.ZipFile(io.BytesIO(body)) as archive:
        if sum(entry.file_size for entry in archive.infolist()) > 256 * 1024 * 1024:
            raise ValueError("Unexpected expanded package size")
        for entry in archive.infolist():
            target = (destination / entry.filename).resolve()
            if not target.is_relative_to(destination.resolve()):
                raise ValueError("Unsafe package path")
            if stat.S_ISLNK(entry.external_attr >> 16):
                raise ValueError("Package contains a symbolic link")
        archive.extractall(destination)


def status_bytes(sheet_id, token):
    path = urllib.parse.quote("Exportstatus!A1:D100", safe="")
    data = google_get("https://sheets.googleapis.com/v4/spreadsheets/" + sheet_id +
                      "/values/" + path + "?valueRenderOption=UNFORMATTED_VALUE", token)
    result = json.loads(data)
    if not result.get("values"):
        raise ValueError("Empty export status")
    return json.dumps(result["values"], sort_keys=True, separators=(",", ":"))


def assert_only_approved_sources_visible(config, token):
    """Inspect IDs only; never open or request the names of unrelated documents."""
    expected = {item[key] for item in config.values() for key in ("archiveId", "sheetId")}
    visible = set()
    page = None
    for _ in range(10):
        params = {"pageSize": "100", "fields": "nextPageToken,incompleteSearch,files(id)",
                  "q": "trashed = false", "spaces": "drive",
                  "includeItemsFromAllDrives": "true", "supportsAllDrives": "true"}
        if page:
            params["pageToken"] = page
        result = json.loads(google_get("https://www.googleapis.com/drive/v3/files?" +
                                       urllib.parse.urlencode(params), token))
        visible.update(item["id"] for item in result.get("files", []))
        if result.get("incompleteSearch") or not visible.issubset(expected):
            raise ValueError("Background identity has unexpected document access")
        page = result.get("nextPageToken")
        if not page:
            if visible != expected:
                raise ValueError("Background identity cannot see exactly the four approved sources")
            return
    raise ValueError("Background identity visibility could not be completely verified")


def run_checked(args, cwd=None):
    # Source values and private updater output must never enter public Actions logs.
    result = subprocess.run(args, cwd=cwd, capture_output=True, timeout=1200)
    if result.returncode:
        raise RuntimeError("Private processing command failed with exit code " + str(result.returncode))
    return result.stdout.decode().strip()


def prepare(slug, config, root, token, checkout):
    package = root / slug / "package"
    output = root / slug / "output"
    package.mkdir(parents=True)
    source = google_get("https://www.googleapis.com/drive/v3/files/" + config["archiveId"] +
                        "?alt=media", token)
    if len(source) != config["archiveBytes"] or digest(source) != config["archiveSHA256"]:
        raise ValueError("Pinned private package mismatch for " + slug)
    safe_extract(source, package)
    manifest = json.loads((package / "manifest.json").read_text())
    for name, expected in (("slug", slug), ("client", config["client"]),
                           ("accountId", config["accountId"]),
                           ("spreadsheetId", config["sheetId"])):
        if manifest["binding"][name] != expected:
            raise ValueError("Client source binding mismatch for " + slug)
    target = checkout / "public" / "dashboard" / slug
    if json.loads((target / "keyring.json").read_text()) != json.loads((package / "keyring.json").read_text()):
        raise ValueError("Existing keyring mismatch for " + slug)
    before = status_bytes(config["sheetId"], token)
    mime = urllib.parse.quote("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", safe="")
    xlsx = google_get("https://www.googleapis.com/drive/v3/files/" + config["sheetId"] +
                      "/export?mimeType=" + mime, token)
    if before != status_bytes(config["sheetId"], token):
        raise ValueError("Export changed during complete download for " + slug)
    export_path = root / slug / "export.xlsx"
    export_path.write_bytes(xlsx)
    run_checked(["python3", str(package / "refresh.py"), "--package", str(package),
                 "--xlsx", str(export_path), "--output", str(output)])
    receipt = json.loads((output / "receipt.json").read_text())
    yesterday = (dt.datetime.now(ZoneInfo("Europe/Amsterdam")).date() - dt.timedelta(days=1)).isoformat()
    bundle = (output / "bundle.json").read_bytes()
    if receipt["client"] != slug or receipt["accountId"] != config["accountId"]:
        raise ValueError("Output identity mismatch")
    if receipt["coverageEndDate"] != yesterday or not receipt["compiledViewerUnchanged"]:
        raise ValueError("Output coverage or immutable viewer verification failed")
    if len(bundle) != receipt["bundleBytes"] or digest(bundle) != receipt["bundleSHA256"]:
        raise ValueError("Complete encrypted output mismatch")
    return output, receipt


def main():
    checkout = Path.cwd()
    if os.environ.get("GITHUB_ACTIONS") != "true":
        raise RuntimeError("This publisher runs only in its ephemeral Actions checkout")
    config = json.loads(os.environ["SDG_DASHBOARD_SOURCES"])
    token = os.environ["SDG_GOOGLE_ACCESS_TOKEN"]
    if set(config) != set(SLUGS) or os.environ.get("GITHUB_REPOSITORY") != REPO:
        raise ValueError("Unexpected source set or destination")
    if run_checked(["git", "status", "--porcelain"]):
        raise ValueError("Checkout must be clean before processing")
    # The runner has no customer password and no decryptable private key.
    with tempfile.TemporaryDirectory(prefix="sdg-private-refresh-") as temporary:
        root = Path(temporary)
        assert_only_approved_sources_visible(config, token)
        prepared = {slug: prepare(slug, config[slug], root, token, checkout) for slug in SLUGS}
        allowed = {"public/dashboard/" + slug + "/bundle.json" for slug in SLUGS}
        for attempt in range(3):
            run_checked(["git", "fetch", "origin", "main"])
            run_checked(["git", "reset", "--hard", "origin/main"])
            # Recheck keyrings after rebasing onto the latest unrelated website changes.
            for slug, (output, receipt) in prepared.items():
                target = checkout / "public" / "dashboard" / slug
                keyring = json.loads((target / "keyring.json").read_text())
                original = json.loads((root / slug / "package" / "keyring.json").read_text())
                if keyring != original or keyring["keyId"] != receipt["keyId"]:
                    raise ValueError("Keyring changed during processing")
                shutil.copyfile(output / "bundle.json", target / "bundle.json")
            paths = set(run_checked(["git", "diff", "--name-only"]).splitlines())
            if not paths or not paths.issubset(allowed):
                raise ValueError("Unexpected publication changes")
            run_checked(["git", "add", "--", *sorted(allowed)])
            staged = set(run_checked(["git", "diff", "--cached", "--name-only"]).splitlines())
            if staged != paths:
                raise ValueError("Unexpected staged publication changes")
            run_checked(["git", "-c", "user.name=SDG dashboard refresh", "-c",
                         "user.email=dashboard-refresh@users.noreply.github.com", "commit", "-m",
                         "Refresh both encrypted client dashboards"])
            push = subprocess.run(["git", "push", "origin", "HEAD:main"], capture_output=True, timeout=120)
            if push.returncode == 0:
                break
            if attempt == 2:
                raise RuntimeError("Fast-forward publication failed; never force push")
        commit = run_checked(["git", "rev-parse", "HEAD"])
        with open(os.environ["GITHUB_OUTPUT"], "a") as result:
            result.write("commit=" + commit + "\n")
        # Only ciphertext identities/hashes are public. No metrics, notes, source bodies or credentials.
        print(json.dumps({"commit": commit, "clients": [
            {"client": slug, "bytes": receipt["bundleBytes"], "sha256": receipt["bundleSHA256"]}
            for slug, (_, receipt) in prepared.items()]}))
    # TemporaryDirectory removes source ZIP contents, XLSX, HTML, JSON and encrypted staging.


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        # Do not print private exception values or subprocess output to public logs.
        raise SystemExit("Dashboard refresh failed safely: " + type(error).__name__)
