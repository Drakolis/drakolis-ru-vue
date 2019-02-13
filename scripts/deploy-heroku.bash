echo '[1] Building site...'
npm run build
cd dist/
mv index.html index.php
cd ../
echo '[1] Completed'

echo '[2] Logging in to heroku...'
heroku login
echo '[2] Completed'

echo '[3] Cloning heroku repository...'
heroku git:clone -a drakolis-ru-new
echo '[3] Completed'

echo '[4] Cleaning up directory...'
rm -rf drakolis-ru-new/*
echo '[4] Completed'

echo '[5] Copying new files...'
cp -R dist drakolis-ru-new/
echo '[3] Completed'

echo '[6] Pushing new changes to repository...'
cd drakolis-ru-new
git add .
git commit -am "Deploy"
git push heroku master
echo '[6] Completed'

echo '[7] Clean up working directory...'
rm -rf dist
rm -rf drakolis-ru-new
echo '[7] Completed'
