#!/usr/bin/env bash
# Stand this repo up from a fresh clone: install or check everything needed to
# build, run and test it. Keep it idempotent and current; see CLAUDE.md.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

PNPM_VERSION=9.15.9  # pnpm-lock.yaml is lockfileVersion 9.0

# Node.js: Next.js 15 needs >= 18.18.
if ! command -v node &>/dev/null; then
  echo "  [FAIL] node not found; install Node.js 20+ (e.g. via nvm) and re-run" >&2
  exit 1
fi
if node -e 'const [a,b]=process.versions.node.split(".").map(Number); process.exit(a>18||(a===18&&b>=18)?0:1)'; then
  echo "  [OK] node $(node --version)"
else
  echo "  [FAIL] node $(node --version) is too old; Next.js 15 needs >= 18.18" >&2
  exit 1
fi

# pnpm, pinned, via corepack (ships with Node).
if command -v pnpm &>/dev/null && [ "$(pnpm --version)" = "$PNPM_VERSION" ]; then
  echo "  [OK] pnpm $PNPM_VERSION"
else
  if ! command -v corepack &>/dev/null; then
    echo "  [FAIL] pnpm $PNPM_VERSION missing and corepack unavailable; run: npm install -g pnpm@$PNPM_VERSION" >&2
    exit 1
  fi
  echo "  [..] activating pnpm $PNPM_VERSION via corepack"
  corepack enable pnpm
  corepack prepare "pnpm@$PNPM_VERSION" --activate
  echo "  [OK] pnpm $(pnpm --version)"
fi

# Dependencies, exactly as locked.
echo "  [..] pnpm install --frozen-lockfile"
pnpm install --frozen-lockfile
echo "  [OK] dependencies installed"

echo "  [OK] ready: pnpm dev (http://localhost:3000), pnpm build"
