# ScanSqlTestchromeExtensions

### chrome version >=17 suppot webrequest api.  if want to post sqlInjection ,please update chrome.
- check version command: `chrome://version/`

***

##
```bash
tree

.
├── icon.png
├── inject.js
├── lib
│   └── utils
│       └── api.py
└── manifest.json
```

##Example:
```bash
git clone https://github.com/liuxigu/ScanSqlTestchromeExtensions.git
cd ScanSqlTestchromeExtensions
mv lib/utils/api.py sqlmap/lib/utils/api.py
python sqlmapapi.py -s
```
-	add extension to chrome browser.
-	browse page
- 	delay time
```bash
cd /tmp
ls -l
sqlmap -u http://www.evil.com/test.php?id=1
```
-	hack it!

