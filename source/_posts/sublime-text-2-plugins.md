---
layout: post
title: 'Sublime Text 2 常用插件'
date: 2014-06-17 07:58
comments: true
categories: 
---
在使用SublimeText2之後，覺得真的很棒，尤其是插件的部分更是可以提升撰寫的效率！
以下則是插件安裝方式以及我常用的插件整理。
# SublimeText2 插件安裝方式：    

<!--more-->

第一次使用必須裝 [Package Contorl](https://sublime.wbond.net/installation)，安裝方式：
`ctrl`+`、` 開啟 Python 控制台
將這段碼貼上，`Enter`
```
import urllib2,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')
```
![可以看到Package Control就是成功囉!!](http://user-image.logdown.io/user/8440/blog/8340/post/205711/OdmfoYvJRSueg5Ne7S22_3.jpg)
完成之後重開SublimeText，在 Preferences 有看到 Package Control 即安裝成功。

`Ctrl` + `shift` + `p`
輸入 `package install`
接著輸入要安裝的插件名稱即可。

#1.Emmet
即 Zen coding 的改名，可以快速的進行code的撰寫，加快開發速度。
文件的頁面內容的[Cheat Sheet](http://docs.emmet.io/cheat-sheet/)連結有使用方式可參考。
參考文件[Emmet docs](http://docs.emmet.io/)
#2.SublimeTmpl
![這樣可以少打很多基本的Code~](http://user-image.logdown.io/user/8440/blog/8340/post/205711/TU7msakuQfWFFzZeSN6C_2.jpg)
可以快速產生新的檔案樣板
#3.ConvertToUTF8
SublimeText並非完美，它在開啟 ansi 的檔案時，因為中文的編碼為 big 5，會有亂碼的問題，因此只要安裝這個插件，就可以讓它支援繁體中文與簡體中文啦！
#4.HTML Beautify
在進行公司的網站維護工作時，可能會遇到一些檔案的排版非常獵奇，難以閱讀，安裝之後可在Edit > HTML Beautify 執行。
#5.Color Highlighter
![CSS的色碼直接顯示在選擇的色碼底下很方便查看!](http://user-image.logdown.io/user/8440/blog/8340/post/205711/qwzSgxWmTmWTdj7IA0MB_3.jpg)
對於 CSS 的顏色設定，Color Highlighter 直接顯示目前選擇的色碼底色。
#6.Snippets系列
顧名思義就是有 Snippets 功能，提升速度用。

