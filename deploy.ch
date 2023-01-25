#!/usr/bin/env sh

set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Stanislavsonder/fate-extended-character-sheet.git main:gh-pages

cd -
