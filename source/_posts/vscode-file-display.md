---
title: VS Code 檔案顯示設定
date: 2016-07-21 20:24:33
description: 開始寫 Typescript 之後，導覽列上總是會看到重複的檔名，使人眼花！
tags: 
- Visual Studio Code
- VScode 設定
---

## 開始寫 Typescript 之後...
編譯後的檔案都會出現在同一個地方，導致每次點選檔案的時候都要留一下自己點到的到底是 **ts** 還是 **js** 很不方面。因此開始尋找是否有辦法可以隱藏 Typescript 編譯後的檔案，畢竟我們很少會去看編譯後的檔案，除了一開始學習 typescript 時，會觀察一下編譯前後的變化...但，到後面還是覺得隱藏起來比較方便！

![重複顯示的檔名使人眼花](images/vscode-file-display/1-no-file-hidden.png)
<!--more-->
### 步驟一：開啟 Workspace Settings
在 VS Code 按 `cmd` + `shift` + `p` 打開指令視窗

![打開指令視窗輸入 Workspace Settings](images/vscode-file-display/2-open-cmd-window.png)

### 步驟二：輸入 Workspace Settings 編輯工作區組態設定
接著輸入 `work`，不需要完整輸入即可看到 `Preference: Open Workspace Settings` 然後按 Enter 打開。

![左邊為設定參考範本，右邊為設定內容](images/vscode-file-display/3-show-setting-content.png)

### 步驟三：開始設定，輸入 files.exclude
在設定編輯區輸入 `files.exclude`，因為有提示字的關係，只要輸入 file 開頭就可以看到選項囉！Enter 選擇之後會有預設的範本。

![輸入 files.exclude](images/vscode-file-display/4-input-settings.png)

### 步驟四：加上新條件，隱藏所有 js 檔案
這時候在下方加個新項目，將我們要隱藏的檔案類型加上去。條件為 “隱藏專案目錄底下所有的 js 檔案”
輸入 `"**/*.js":true`

![新增隱藏所有專案目錄下的 js 檔案](images/vscode-file-display/5-input-filesetting.png)

### 這時候你或許會注意到...
不對阿，有時候我們會抓 js 套件來使用，這些套件不一定都是 typescript 寫的，怎麼辦？別緊張，我們的條件設定是可以有很彈性的。
將剛才輸入的 `"**/*.js"` 後面的 `true` 這段改成 `{ "when": "$(basename).ts" }` 如下圖。
這是什麼意思呢？意思是當 ts 檔案類型的名稱和 js 的檔案類型名稱一樣時，條件就會成立並進行過濾的動作。

![修改過濾條件](images/vscode-file-display/6-setting-advance.png)

### 順便隱藏 map.js 檔案吧
我們也可以再加上一個條件來隱藏 map.js 的檔案。避免太多名稱相同且不一定會用到的檔案出現。

![加入新的設定來隱藏 map.js 檔案](images/vscode-file-display/7-comment.png)

### 完成，看起來清爽多了!
修改完成，這樣看起來是不是比較輕鬆了呢？ XD

![修改完成，看起來輕鬆多了](images/vscode-file-display/8-done.png)

參考: [Hide JS files in visual studio code](http://stackoverflow.com/questions/31587949/hide-js-map-files-in-visual-studio-code)
