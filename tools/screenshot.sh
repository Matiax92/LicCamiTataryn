#!/usr/bin/env bash
# Uso: ./tools/screenshot.sh <archivo.html|url> [desktop|mobile] [etiqueta]
# Captura la página con Chrome headless -> .design/ para evaluar diseño visualmente
set -euo pipefail
page="${1:-index.html}"
viewport="${2:-desktop}"
label="${3:-""}"

case "$viewport" in
  desktop) size="1440x4400" ;;
  mobile)  size="390x6800" ;;
  *)       size="$viewport" ;;
esac

url="$page"
[[ "$url" == file:* || "$url" == http* ]] || url="file://$(cd "$(dirname "$page")" && pwd)/$(basename "$page")"

mkdir -p .design
name="shot-${viewport}${label:+-$label}"
out=".design/${name}.png"

google-chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size="$size" --screenshot="$out" "$url" >/dev/null 2>&1

echo "$out"
