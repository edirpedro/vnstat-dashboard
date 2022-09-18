#!/bin/bash

# Make sure we are on root
cd "$(dirname "$0")"
cd ..

# Compile with git pages path
export BUILD_PATH=docs
export PUBLIC_URL=/vnstat-dashboard
npm run build

# Write config.js
echo "
var vnStat_UNITS = 'IEC';
var vnStat_API = '/vnstat-dashboard/api/demo.json';
var vnStat_INTERFACES = [{ name: 'en0', title: 'Network' }];
" > docs/config.js

# Write .nojekyll
echo "" > docs/.nojekyll