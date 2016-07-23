---
layout: post
title: 'Sass環境建置紀錄'
date: 2014-08-05 02:58
comments: true
categories: [sass]
---
最近開始練習 Compass + Sass 的練習，記錄一下如何在 Windows 系統下建置 Sass 開發環境。

**首先，安裝 Ruby**

Sass 與 Compass 是用 ruby 開發的，在 windows 的環境下，

就必須先到他的官網安裝最新的 ruby，[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

**接著安裝Sass、compass**

在開始工作列程式搜尋欄位輸入「CMD」後開啟「命令提示字元」，輸入以下指令後按ENTER。
``` 
gem install compass
```

compass 安裝完成之後接著安裝 sass

<!--more-->

```
gem install sass
```

**建立新專案**

先進入要建立專案的資料夾

接著輸入指令 (以project001名稱為例)
```
compass create project001
```
完成之後可以在資料夾看到新增好的專案及檔案。

**Subelime Text package control 安裝 sass snippets & compass**

接著開啟Sublime Text編輯器，按 `Ctrl + Shift +P` 鍵，再輸入`install`。

當安裝完成後，下方就會出現成功的訊息，再重覆以上步驟，分別再安裝SASS snippets、Compass二個套件。

**在 Sublime Text 使用 Sass：**

都完成上述步驟之後，就可以開始寫 sass 囉！ 

首先，進到 Sublime Text 後，再選擇 Project / Add Folder to Project (項目 > 增加資料夾到項目)選項。 
![](http://user-image.logdown.io/user/8440/blog/8340/post/216345/R8vAOBirT9W5kn6VAElH_test2.jpg)

然後選擇剛所建立好的專案目錄。 

選擇完畢後，再選擇 View / Show Side Bar (檢視 > 顯示/隱藏側邊攔)選項。
![](http://user-image.logdown.io/user/8440/blog/8340/post/216345/SVvIPKPT7WKR61cdRn0d_test.jpg)

接著左側就會出現專案的目錄，sass是儲放原始檔的目錄，而stylesheets是轉存好的css檔。 

按`Alt+Shift+2`，將畫面一分為二，再個別載入檔案，一個是原檔，另一個是編譯後的CSS檔。

開啟命令視窗，進入該專案的目錄下，再輸入compass watch指令，並請勿關閉此視窗，由於它會自動監控，

每當Sublime Text一儲存時，就會立即編譯成css檔。這時可看到，右邊立即就會呈現出，左邊所寫的結果。

**千萬要記得，別關掉命令視窗，否則會無法即時的進行編譯!**

而要停止監控(watch)的話，在命令提示視窗打`ctrl+c`就可以停止。

**config.rb設定**

如果希望sass編譯出來的css不要有註解，那就打開根目錄的config.rb，

將# line_comments = false 前面的#號拿掉就不會產生出註解。
![](http://user-image.logdown.io/user/8440/blog/8340/post/216345/usDYjjyCQaOeycaVSNXK_test3.jpg)

裡面會有四行以下的預設設定碼，如果你放CSS的資料夾名稱為CSS，便把stylesheets名稱改為CSS，

這樣Sass編譯出來的CSS就會在CSS資料夾，而不會style裡面。

**注意**：當修改config設定後，要重新在命令提示字元watch資料夾一次，設定才會生效。



資料來源：[梅問題教學網](http://www.minwt.com/html/10003.html)、[30天掌握Sass語法](http://ithelp.ithome.com.tw/question/10128634)