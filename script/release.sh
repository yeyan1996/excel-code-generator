#!/usr/bin/env sh

set -e
echo "Enter release version: "
read VERSION
echo "Enter git comment: "
read COMMENT
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  npm run build

  # commit
  git add -A
  git commit -m "$COMMENT"
  npm version ${VERSION} --message "[release] $VERSION"


  # publish
  git push
  npm publish
fi
