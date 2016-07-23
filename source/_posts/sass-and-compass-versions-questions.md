---
layout: post
title: 'Sass版本與Compass版本的相依問題'
date: 2014-08-08 07:30
comments: true
categories: [sass, Compass, Bourbon]
---
今天想嘗試 Sass framework ，Bourbon !!

但是在編譯的過程中遇到了一些問題，就是 **sass 已經更新到3.3版了，compass 仍然使用3.2版**，於是上網四處找資料。

在經過苦痛的google搜尋之後，才發現原來 compass 有對應的 sass 版本相依，由於沒有裝 compass 相關 app，

所以不清楚是不是可以直接在哪邊做sass版本的修改。

<!--more-->

因此最後發現的解決辦法是，把現有的 compass 移除，並安裝最新版(或beta版)的compass。

**目前安裝完的compass版本是(1.0.0.rc.1)**
輸入

```
gem install compass --pre
```

![compass版本安裝與確認](http://user-image.logdown.io/user/8440/blog/8340/post/218090/qB6AqqgSSVguPjqZBpdg_test4.jpg)


如此一來就可以讓使用Bourbon的sass檔案順利進行編譯囉！

參考來源：[stackoverflow：Is sass 3.3.3 compatible with compass](http://stackoverflow.com/questions/22427567/is-sass-3-3-3-compatible-with-compass)