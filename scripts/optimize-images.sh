#!/usr/bin/env bash
# Regenerate WebP variants from source PNGs in public/images/source/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../public/images" && pwd)"
SRC="$ROOT/source"
OUT="$ROOT"

if ! command -v cwebp >/dev/null; then
  echo "cwebp not found. Install WebP tools first." >&2
  exit 1
fi

for png in "$SRC"/*.png; do
  [ -f "$png" ] || continue
  name="$(basename "$png" .png)"
  echo "Optimizing $name..."
  cwebp -q 82 -m 6 -resize 768 0 "$png" -o "$OUT/${name}-768.webp"
  cwebp -q 80 -m 6 -resize 1536 0 "$png" -o "$OUT/${name}-1536.webp"
done

echo "Done. WebP files in $OUT"
