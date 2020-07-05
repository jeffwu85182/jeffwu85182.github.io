---
title: Hexo 預設 template 頁面切換按鈕問題
date: 2016-07-23 00:07:47
tags:
- hexo
- template issue
---

最近開始在使用 Hexo 來寫部落格文章，這是一個 blog framework，使用起來很方便。只要透過 Markdown 語法就可以做出常用的基本排版了，之後再寫篇介紹的文章囉！

今天遇到了一個問題，Hexo 的預設佈景主題 landscape 文章列表的頁面切換按鈕顯示異常。看到覺得奇怪，難道這是什麼神奇的格式嗎？

{% asset_img 1-the-next-issue.png 280 "'神秘的按鈕文字'" "'按鈕文字應該是要顯示下一頁才對吧？'" %}

經過抽絲剝繭的調查，原來是預設的佈景主題在頁面切換的按鈕語法似乎寫錯了。
下面是 template 中 archive.ejs 的檔案其中一部分的內容，主要就是 page-nav 的部分有誤。

``` ejs
<% if (page.total > 1){ %>
  <nav id="page-nav">
    <%- paginator({
      prev_text: "&laquo; +__('prev')",
      next_text: "__('next')+ &raquo;"
    }) %>
  </nav>
<% } %>
```

將上方的 `prev_text` 與 `next_text` 後面的內容修改一下，引號的位置錯囉...

``` ejs
prev_text: "&laquo; "+__('prev'),
next_text: __('next')+" &raquo;"
```

這樣就可以正常顯示囉 XD

{% asset_img 2-slove-way.png 280 "'修正後'" "'這才是正確的按鈕文字的顯示'" %}