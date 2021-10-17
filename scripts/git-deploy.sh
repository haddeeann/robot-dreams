#!/bin/bash


git add .

echo $1

git commit -m $1

git status

# if [ -z $1 ]
# then 
#     git commit -m "sweet dreams are made of these changes"
# else 
#     
# fi

# git push origin main

# yarn build

# yarn deploy
