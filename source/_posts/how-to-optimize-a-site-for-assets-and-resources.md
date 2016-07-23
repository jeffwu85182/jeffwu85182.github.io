---
layout: post
title: '如何優化一個網站的靜態檔案 (assets) 和資源 (resources)？'
date: 2014-06-24 12:14
comments: true
categories: 
---
https://developer.yahoo.com/performance/rules.html
http://www.sitepoint.com/web-site-optimization-steps/
準備兩篇文章要翻譯~~
#加速你的網站的最好的方式

*在Yahoo的開發團隊整理出<strong> 35 </strong>項使網頁速度加快的優化方式，其中包含了<strong> 7大類 </strong>：*

- 內容(Content)
- 伺服器(Server)
- Cookie
- CSS
- JavaScript
- 圖片(Images)
- 行動裝置(Mobile)

#盡量減少HTTP請求
tag:content
80%的終端使用者(end-user)回應時間都花在前端上。大部分時間都被綁在下載頁面上的所有組件像是：images, stylesheet, script, Flash...等。減少呈現頁面所需要的組件和HTTP請求的數量是加快頁面的關鍵所在。

簡化頁面設計來減少頁面中的組件數量是一個方法，但有沒有方法是可以使網站內容變得更豐富，同時也能加快回應的時間呢?
這裡有一些技巧來減少HTTP請求的數量，在需要豐富的頁面設計時仍然可支援。