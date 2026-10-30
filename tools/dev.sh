#!/usr/bin/env bash
# Servidor local de desarrollo: ./tools/dev.sh [puerto]  (default 8000)
python3 -m http.server "${1:-8000}"
