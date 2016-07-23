---
layout: post
title: 'Http status 狀態筆記'
date: 2014-10-09 07:28
comments: true
categories: [HTML_Status]
---
# HTTP Status 狀態代表的意思

**網頁接收到伺服器的回應後，都會自動去判讀網頁的狀態，其中的 Http Status代碼的意思如下：**

    - 200 伺服器回應Data成功。
    - 206 取得片段資料，Http Request 中有的 Range 屬性，可以指定要取得那一段Bytes數。
    - 301 目標網頁移到新網址(永久轉址)。
    - 302 暫時轉址
    - 304 已讀取過的圖片或網頁，由瀏覽器緩存 (cache) 中讀取。
    - 401 需身分驗證，如 SSL key or htaccess pasword。
    - 403 沒有權限讀取，可能是 IP 被阻檔或是伺服器限制。
    - 404 伺服器未找到目標網址，檔案不存在。
    - 408 Client Request timeout
    - 411 沒有指定 content-length，使用 POST 傳送參數時，必須指定參數的總長度
    - 414 URL 太長導致伺服器拒絕處理。
    - 500 伺服器發生錯誤 : 可能是 htaccess 有錯
    - 503 伺服器當掉 : maybe is code dump
    - 505 不支此 HTTP 版本
    
資料來源： [Http status 狀態 404 304](http://www.puritys.me/docs-blog/article-45-Http-status-%E7%8B%80%E6%85%8B-404-304.html) 