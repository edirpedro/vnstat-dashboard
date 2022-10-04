#!/bin/bash

# Make sure we are on root
cd "$(dirname "$0")"
cd ..

# Compile for git pages
export REACT_APP_API_URL=/vnstat-dashboard/api/demo.json
export BUILD_PATH=docs
export PUBLIC_URL=/vnstat-dashboard
npm run build

# Write .nojekyll
echo "" > docs/.nojekyll