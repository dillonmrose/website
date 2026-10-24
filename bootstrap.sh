#!/usr/bin/env bash
# Stand this repo up from a fresh clone: install or check everything needed to
# build, run and test it. Keep it idempotent and current; see CLAUDE.md.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

PNPM_VERSION=9.15.9  # pnpm-lock.yaml is lockfileVersion 9.0

# Node.js, pinned by major version in .nvmrc (CI reads the same file).
NODE_MAJOR="$(cat .nvmrc)"
if ! command -v node &>/dev/null; then
  echo "  [FAIL] node not found; install Node.js $NODE_MAJOR (e.g. nvm install $NODE_MAJOR) and re-run" >&2
  exit 1
fi
if [ "$(node -p 'process.versions.node.split(".")[0]')" = "$NODE_MAJOR" ]; then
  echo "  [OK] node $(node --version)"
else
  echo "  [FAIL] node $(node --version), but .nvmrc pins $NODE_MAJOR; run: nvm install $NODE_MAJOR" >&2
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

# Playwright's browser, matching the pinned @playwright/test (a no-op once cached).
# Locally, bo installs the Linux libraries it needs; in CI, --with-deps does.
if [ -n "${CI:-}" ]; then
  pnpm exec playwright install --with-deps chromium
else
  pnpm exec playwright install chromium
  # The browser's Linux system libraries come from bo; say so if they're missing.
  if [ "$(uname)" = "Linux" ] && ! /sbin/ldconfig -p | grep -q "^[[:space:]]libnss3.so "; then
    echo "  [WARN] Chromium's system libraries look missing; run bo's bootstrap or: pnpm exec playwright install-deps chromium" >&2
  fi
fi
echo "  [OK] playwright chromium"

# Git hooks: lint staged files before each commit (.githooks/pre-commit).
if git rev-parse --git-dir &>/dev/null; then
  if [ "$(git config core.hooksPath)" != ".githooks" ]; then
    git config core.hooksPath .githooks
  fi
  echo "  [OK] git hooks: .githooks"
fi

echo "  [OK] ready: pnpm dev (http://localhost:3000), pnpm check (everything CI runs)"
