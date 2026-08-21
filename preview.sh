#!/usr/bin/env bash

set -euo pipefail

if command -v bundle >/dev/null 2>&1; then
  bundle_command="$(command -v bundle)"
else
  bundle_command="$(ruby -e 'print Gem.user_dir')/bin/bundle"
  if [[ ! -x "$bundle_command" ]]; then
    echo "Bundler is required. Install it with: gem install --user-install bundler" >&2
    exit 1
  fi
fi

"$bundle_command" config set --local path vendor/bundle
"$bundle_command" check || "$bundle_command" install
exec "$bundle_command" exec jekyll serve --livereload --host 127.0.0.1
