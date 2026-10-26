#!/usr/bin/env bash
set -euo pipefail

publish_dir="${1:-dist/github-pages}"

rm -rf "$publish_dir"
mkdir -p "$publish_dir"

cp -R dist/client/. "$publish_dir"/
cp -R dist/server/prerendered-routes/. "$publish_dir"/

# Prerender emits a plain 404; retain the explicit noindex error document.
cp public/404.html "$publish_dir/404.html"

rm -f \
  "$publish_dir/assets/content-airbnb.png" \
  "$publish_dir/assets/content-color-run.png" \
  "$publish_dir/assets/content-maasclaim.png" \
  "$publish_dir/assets/content-nxchange.png" \
  "$publish_dir/assets/content-zb.png"

if [[ -d "$publish_dir/en" ]]; then
  find "$publish_dir/en" -name 'index.html' -exec perl -0pi -e 's/<html lang="nl">/<html lang="en">/' {} +
fi

if [[ -d "$publish_dir/es" ]]; then
  find "$publish_dir/es" -name 'index.html' -exec perl -0pi -e 's/<html lang="nl">/<html lang="es">/' {} +
fi

touch "$publish_dir/.nojekyll"
printf '%s\n' "slimmerdangisteren.nl" > "$publish_dir/CNAME"

base_url="https://slimmerdangisteren.nl"
# Only advertise a verified content change, never the date of an unrelated build.
lastmod_for_path() {
  node -e 'const dates = require("./app/content-dates.json"); process.stdout.write(dates[process.argv[1]] || "");' "$1"
}
paths=(
  "/"
  "/geo/"
  "/seo/"
  "/google-ads/"
  "/social-ads/"
  "/content-creatie/"
  "/website/"
  "/privacy/"
  "/algemene-voorwaarden/"
)

priority_for_path() {
  case "$1" in
    "/") printf "1.0" ;;
    "/geo/"|"/seo/"|"/google-ads/") printf "0.95" ;;
    "/social-ads/"|"/content-creatie/") printf "0.85" ;;
    "/website/") printf "0.70" ;;
    *) printf "0.45" ;;
  esac
}

changefreq_for_path() {
  case "$1" in
    "/") printf "weekly" ;;
    "/privacy/"|"/algemene-voorwaarden/") printf "yearly" ;;
    *) printf "monthly" ;;
  esac
}

localized_path_for_locale() {
  local path="$1"
  local locale="$2"

  if [[ -z "$locale" ]]; then
    printf "%s" "$path"
  elif [[ "$path" == "/" ]]; then
    printf "/%s/" "$locale"
  else
    printf "/%s%s" "$locale" "$path"
  fi
}

print_sitemap_alternates() {
  local path="$1"
  local nl_path en_path es_path

  nl_path="$(localized_path_for_locale "$path" "")"
  en_path="$(localized_path_for_locale "$path" "en")"
  es_path="$(localized_path_for_locale "$path" "es")"

  printf '    <xhtml:link rel="alternate" hreflang="nl-NL" href="%s%s" />\n' "$base_url" "$nl_path"
  printf '    <xhtml:link rel="alternate" hreflang="en-US" href="%s%s" />\n' "$base_url" "$en_path"
  printf '    <xhtml:link rel="alternate" hreflang="es-ES" href="%s%s" />\n' "$base_url" "$es_path"
  printf '    <xhtml:link rel="alternate" hreflang="x-default" href="%s%s" />\n' "$base_url" "$nl_path"
}

{
  printf '%s\n' '<?xml version="1.0" encoding="UTF-8"?>'
  printf '%s\n' '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
  for path in "${paths[@]}"; do
    for locale in "" "en" "es"; do
      localized_path="$(localized_path_for_locale "$path" "$locale")"
      priority="$(priority_for_path "$path")"
      changefreq="$(changefreq_for_path "$path")"
      printf '  <url>\n'
      printf '    <loc>%s%s</loc>\n' "$base_url" "$localized_path"
      print_sitemap_alternates "$path"
      lastmod="$(lastmod_for_path "$localized_path")"
      if [[ -n "$lastmod" ]]; then printf '    <lastmod>%s</lastmod>\n' "$lastmod"; fi
      printf '    <changefreq>%s</changefreq>\n' "$changefreq"
      printf '    <priority>%s</priority>\n' "$priority"
      printf '  </url>\n'
    done
  done
  # Dutch-only guides: do not advertise nonexistent translations.
  for path in "/seo/zoekwoordenonderzoek/" "/seo/technische-seo/"; do
    printf '  <url><loc>%s%s</loc><lastmod>%s</lastmod></url>\n' "$base_url" "$path" "$(lastmod_for_path "$path")"
  done
  printf '%s\n' '</urlset>'
} > "$publish_dir/sitemap.xml"

{
  printf '%s\n' 'User-agent: *'
  printf '%s\n' 'Allow: /'
  printf '%s\n' 'Disallow: /api/'
  printf 'Sitemap: %s/sitemap.xml\n' "$base_url"
} > "$publish_dir/robots.txt"

mkdir -p "$publish_dir/advertenties"
cat > "$publish_dir/advertenties/index.html" <<'HTML'
<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, follow">
    <meta http-equiv="refresh" content="0; url=/social-ads/">
    <link rel="canonical" href="https://slimmerdangisteren.nl/social-ads/">
    <title>Doorverwijzen naar Social Ads</title>
  </head>
  <body>
    <p>Deze pagina is verplaatst naar <a href="/social-ads/">Social Ads</a>.</p>
  </body>
</html>
HTML

printf '%s\n' "$publish_dir"
