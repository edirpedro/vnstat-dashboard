#!/bin/bash

# Make sure we are on root
cd "$(dirname "$0")"
cd ..

# Compile with git pages path
export BUILD_PATH=docs
export PUBLIC_URL=/vnstat-dashboard
npm run build

# Cleanup /docs
rm -r docs/custom

# Write config.js
echo "window.vnStat = {
	units: 'IEC',
	api: '/vnstat-dashboard/api/demo.json',
	interfaces: [{ name: 'en0', title: 'Network' }]
};" > docs/config.js

# Write .nojekyll
echo "" > docs/.nojekyll