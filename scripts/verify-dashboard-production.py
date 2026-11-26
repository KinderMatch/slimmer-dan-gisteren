"""Verify complete encrypted customer bundles after Pages deployment.

No passwords, decryption, customer data, or authenticated requests. The job prints
only public encrypted-file hashes and sizes, never bundle contents.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import time
from urllib.error import HTTPError, URLError
from urllib.request import HTTPRedirectHandler, Request, build_opener

CLIENTS = ("mkb-advies", "kozijnrubbers")
ORIGIN = "https://slimmerdangisteren.nl"


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def validate_bundle(data, client, ring):
    bundle = json.loads(data)
    if not (
        bundle.get("version") == 1
        and bundle.get("client") == client == ring.get("client")
        and bundle.get("keyId") == ring.get("keyId")
        and bundle.get("algorithm") == "AES-GCM"
        and bundle.get("compression") == "gzip"
        and all(isinstance(bundle.get(k), str) and bundle[k]
                for k in ("iv", "wrappedKey", "ciphertext"))
    ):
        raise ValueError("Encrypted bundle identity or protocol mismatch")


def verify(root, attempts=18, interval=10):
    expected = {}
    for client in CLIENTS:
        folder = root / "public" / "dashboard" / client
        content = (folder / "bundle.json").read_bytes()
        ring = json.loads((folder / "keyring.json").read_bytes())
        validate_bundle(content, client, ring)
        expected[client] = {
            "content": content, "ring": ring, "sha256": sha256(content)
        }

    opener = build_opener(NoRedirect())
    checked = {}
    errors = {}
    for attempt in range(1, attempts + 1):
        for client, source in expected.items():
            if client in checked:
                continue
            url = (ORIGIN + "/dashboard/" + client + "/bundle.json?verify="
                   + source["sha256"])
            request = Request(url, headers={
                "Cache-Control": "no-cache", "Accept": "application/json",
                "User-Agent": "SDG-dashboard-production-verification/1.0",
            })
            try:
                with opener.open(request, timeout=15) as response:
                    if response.status != 200:
                        raise ValueError("Unexpected HTTP status")
                    # A larger or incomplete response cannot match the source.
                    actual = response.read(len(source["content"]) + 1)
                if actual != source["content"]:
                    raise ValueError("Production bytes differ from deployed source")
                validate_bundle(actual, client, source["ring"])
                checked[client] = {
                    "client": client, "bytes": len(actual),
                    "sha256": sha256(actual),
                    "keyId": source["ring"]["keyId"],
                    "fullProductionReadback": True,
                }
                errors.pop(client, None)
            except (HTTPError, URLError, TimeoutError, OSError, ValueError) as error:
                # Do not print response bodies or redirects.
                errors[client] = type(error).__name__ + ": " + str(error)
        if len(checked) == len(CLIENTS):
            receipt = {"status": "success", "origin": ORIGIN,
                       "clients": [checked[c] for c in CLIENTS]}
            print("SDG_DASHBOARD_VERIFY " + json.dumps(receipt, separators=(",", ":")))
            summary = os.getenv("GITHUB_STEP_SUMMARY")
            if summary:
                with open(summary, "a", encoding="utf-8") as file:
                    file.write("## Customer dashboard production verification\n\n")
                    file.write("Both complete encrypted files match this deployment.\n\n")
                    file.write("| Client | Bytes | SHA-256 |\n|---|---:|---|\n")
                    for c in CLIENTS:
                        row = checked[c]
                        file.write(f"| {c} | {row['bytes']} | `{row['sha256']}` |\n")
            return receipt
        if attempt < attempts:
            print("Waiting for dashboard publication: " + ", ".join(sorted(errors)), flush=True)
            time.sleep(interval)
    print("SDG_DASHBOARD_VERIFY " + json.dumps({
        "status": "failed", "clients": errors,
        "verifiedClients": sorted(checked),
    }, separators=(",", ":")))
    raise SystemExit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--attempts", type=int, default=18)
    parser.add_argument("--interval", type=float, default=10)
    args = parser.parse_args()
    if args.attempts < 1 or args.interval < 0:
        parser.error("Invalid retry configuration")
    verify(args.root, args.attempts, args.interval)
