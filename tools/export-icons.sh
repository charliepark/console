#!/bin/bash
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, you can obtain one at https://mozilla.org/MPL/2.0/.
#  
# Copyright Oxide Computer Company


set -e
set -o pipefail
shopt -s nullglob

ICONS_DIR="libs/ui/lib/icons"
CODEMOD_DIR="codemods"

# Parse .dotenv if it exists
export $(egrep -v '^#' .env | xargs)

rm -rf $ICONS_DIR

# This command requires a FIGMA_TOKEN env var with read access to Oxide's DS to be set
npx figma-export use-config

for file in $ICONS_DIR/*.js $ICONS_DIR/**/*.js; do
  mv -- "$file" "${file%.js}.ts"
done

for file in $CODEMOD_DIR/*.icons.js; do
    npx jscodeshift -t $file --extensions=ts,tsx --parser=tsx $ICONS_DIR
done

npm run fmt .
