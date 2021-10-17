#!/bin/bash
git status

git add .

if [ -z $1 ]
then 
    git commit -m "sweet dreams"
else 
    git commit -m $1
fi

# 

# git push origin main
