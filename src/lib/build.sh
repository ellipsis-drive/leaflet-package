#!/bin/sh

mkdir ./build

now=$(date)
buildfile="./build/Ellipsis.js"

echo "// Build date: $now\n" > "$buildfile"

cat EllipsisApi.js >> "$buildfile"
echo '\n' >> "$buildfile"

cat EllipsisVectorLayer.js >> "$buildfile"
echo '\n' >> "$buildfile"

cat EllipsisRasterLayer.js >> "$buildfile"
echo '\n' >> "$buildfile"

cat Ellipsis.js >> "$buildfile"