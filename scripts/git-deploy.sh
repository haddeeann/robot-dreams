#!/bin/bash
git status

git add .

# should commit now, added quotes
if [ -z "$1" ]
then 
    git commit -m "sweet dreams are made of these changes"
else 
    git commit -m $1
fi

git push origin main

yarn build

yarn deploy
