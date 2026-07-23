#!/bin/bash

# Make sure we are on root
cd "$(dirname "$0")"
cd ..

# Compile for git pages
export VITE_APP_API_URL=/vnstat-dashboard/api/demo.json
export VITE_BASE_URL=/vnstat-dashboard/
export BUILD_PATH=docs
rm -rf docs
mkdir -p docs
npm run build

# Write .nojekyll
echo "" > docs/.nojekyll