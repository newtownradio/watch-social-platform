#!/bin/bash
echo "Killing Python HTTP servers..."
pkill -f "python3 -m http.server" || true
echo "Cleaning Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*
echo "Done!"
