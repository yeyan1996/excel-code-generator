#!/usr/bin/env sh

set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

  echo "Releasing $VERSION ..."

  # build
  npm run build
  npm version ${VERSION} --message "[release] $VERSION"
  npm publish
fi
