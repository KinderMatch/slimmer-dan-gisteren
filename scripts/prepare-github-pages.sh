#!/usr/bin/env bash
set -euo pipefail

publish_dir="${1:-dist/github-pages}"

rm -rf "$publish_dir"
mkdir -p "$publish_dir"

cp -R dist/client/. "$publish_dir"/
cp -R dist/server/prerendered-routes/. "$publish_dir"/

touch "$publish_dir/.nojekyll"
printf '%s\n' "slimmerdangisteren.nl" > "$publish_dir/CNAME"

printf '%s\n' "$publish_dir"
