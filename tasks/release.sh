#!/bin/bash

# Make sure we are on root
cd "$(dirname "$0")"
cd ..

# Compile
npm run build
cp README.md ./build
cp LICENSE ./build

# Zip
cd build
rm -f config.js
VERSION=$(npm pkg get version | sed 's/"//g')
zip -r vnstat-dashboard-$VERSION.zip *