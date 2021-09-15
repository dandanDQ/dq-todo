#!/usr/bin/env sh

set -e

yarn build

cd ./dist

touch README.md
echo "# DQblog"  >> README.md
echo "#### The job's not over until the paperwork's done." >> README.md
echo "#### My blog address： https://dandandq.github.io/front-end-blog/" >> README.md
git init
git add -A
git commit -m 'feat: deploy'

git push -f git@github.com:dandanDQ/dq-todo.git master:deploy

