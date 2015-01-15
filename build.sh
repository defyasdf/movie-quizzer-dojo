#!/usr/bin/env bash

set -e

# Base directory for this entire project
BASEDIR=$(cd $(dirname $0) && pwd)

# Source directory for unbuilt code
SRCDIR="$BASEDIR/src"

# Directory containing dojo build utilities
TOOLSDIR="$SRCDIR/util/buildscripts"

# Destination directory for built code
DISTDIR="$BASEDIR/dist"

# Main application package build configuration
PROFILE="$BASEDIR/profiles/app.profile.js"

# Configuration over. Main application start up!

if [ ! -d "$TOOLSDIR" ]; then
	echo "Can't find Dojo build tools -- did you initialise submodules? (git submodule update --init --recursive)"
	exit 1
fi

if [ ! -d node_modules ]; then
	echo "Can't find Node.js dependencies -- did you install them? (npm install)"
	exit 1
fi

echo "Building application with $PROFILE to $DISTDIR."

echo -n "Cleaning old files..."
rm -rf "$DISTDIR"
echo " Done"

"$TOOLSDIR/build.sh" --profile "$PROFILE" --releaseDir "$DISTDIR" $@

cd "$BASEDIR"

# Copy & minify index.html to dist
cat "$SRCDIR/index.html" | \
perl -pe 's/\/\/.*$//gm;       # Strip JS comments' |
perl -pe 's/\n/ /g;            # Replace newlines with whitespace' |
perl -pe 's/<\!--.*?-->//g;    # Strip HTML comments' |
perl -pe 's/isDebug: *true,//; # Remove isDebug' |
perl -pe 's/\s+/ /g;           # Collapse whitespace' > "$DISTDIR/index.html"

cd "$DISTDIR"

echo "Removing uncompressed and console stripped files..."
find . -name \*.uncompressed.js -type f -delete
find . -name \*.consoleStripped.js -type f -delete

cd "$SRCDIR"

echo "Building documentation..."
./node_modules/.bin/jsdoc src/app -r -c ./profiles/jsdoc.conf.json -d docs

echo "Build complete"
