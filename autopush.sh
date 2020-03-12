#!/bin/bash

cd /home/ubuntu/hipda-simple-search
python3 gettitles.py

cp titles_D.db docs/
cp titles_BS.db docs/
git add .
git commit -m 'update db'
git push origin
git push gitee
git push mirror
