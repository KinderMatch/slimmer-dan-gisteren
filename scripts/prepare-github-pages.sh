#!/usr/bin/env bash
set -euo pipefail

publish_dir="${1:-dist/github-pages}"

rm -rf "$publish_dir"
mkdir -p "$publish_dir"

cp -R dist/client/. "$publish_dir"/
cp -R dist/server/prerendered-routes/. "$publish_dir"/

rm -f \
  "$publish_dir/assets/content-airbnb.png" \
  "$publish_dir/assets/content-color-run.png" \
  "$publish_dir/assets/content-maasclaim.png" \
  "$publish_dir/assets/content-nxchange.png" \
  "$publish_dir/assets/content-zb.png" \
  "$publish_dir/assets/wedding/airfoto.jpg"

touch "$publish_dir/.nojekyll"
printf '%s\n' "www.slimmerdangisteren.nl" > "$publish_dir/CNAME"

base_url="https://slimmerdangisteren.nl"
lastmod="$(date -u +%F)"
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

{
  printf '%s\n' '<?xml version="1.0" encoding="UTF-8"?>'
  printf '%s\n' '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for path in "${paths[@]}"; do
    for locale in "" "en" "es"; do
      if [[ -z "$locale" ]]; then
        localized_path="$path"
      elif [[ "$path" == "/" ]]; then
        localized_path="/$locale/"
      else
        localized_path="/$locale$path"
      fi

      priority="$(priority_for_path "$path")"
      printf '  <url><loc>%s%s</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>%s</priority></url>\n' "$base_url" "$localized_path" "$lastmod" "$priority"
    done
  done
  printf '%s\n' '</urlset>'
} > "$publish_dir/sitemap.xml"

{
  printf '%s\n' 'User-agent: *'
  printf '%s\n' 'Allow: /'
  printf 'Sitemap: %s/sitemap.xml\n' "$base_url"
} > "$publish_dir/robots.txt"

printf '%s\n' "$publish_dir"
