#!/bin/bash

dirName="tp3"
repoName="tp03-ys"

ng build
cd dist/$dirName

# First Use
heroku login
heroku apps:destroy --confirm $repoName
heroku create $repoName

git init
touch composer.json
# /First Use

git add .
git commit -m "first commit"

heroku git:remote -a $repoName

git push heroku master #Or 'main'
