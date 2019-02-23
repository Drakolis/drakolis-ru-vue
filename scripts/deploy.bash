echo '[1] Building site...'
npm run build
echo '[1] Completed'
echo '[2] Cleaning up directory...'
ssh pi@192.168.1.103 'rm -rf ~/sites/drakolis-pw/*'
echo '[2] Completed'
echo '[3] Copying new files...'
scp -r ./dist/* pi@192.168.1.103:~/sites/drakolis-pw
echo '[3] Completed'
