echo '[1] Building site...'
npm run build
echo '[1] Completed'
echo '[2] Cleaning up directory...'
ssh drakolis@drakolis.ru 'rm -rf ~/drakolisite/*'
echo '[2] Completed'
echo '[3] Copying new files...'
scp -r ./dist/* drakolis@drakolis.ru:~/drakolisite
echo '[3] Completed'
