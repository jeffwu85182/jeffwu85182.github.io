---
layout: post
title: 'Bootstap nav-scroller 用法紀錄'
date: 2014-09-11 06:48
comments: true
categories: [Bootstap, Nav-Scrolling]
---
現在 Bootstrap 非常的流行，只要打好 html 架構後套上 class 就可以呈現出很有質感的效果。

今天用 Bootstrap 製作 nav 導覽列點擊連結移動到同頁面的目標區塊，使它有動態滾動捲軸的效果，

於是找到了 **scrolling-nav.js** !!

我們來看下方的原始碼

<!--more-->


```html
<script src="./js/scrolling-nav.js"></script>
<div id="nav" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#home">Project name</a>
        </div>
        <div class="collapse navbar-collapse">
        	<!-- 這邊是nav連結的區塊 start -->
          <ul class="nav navbar-nav">
            <li class="active"><a class="page-scroll" href="#home">Home</a></li>
            <li><a class="page-scroll" href="#about">About</a></li>
            <li><a class="page-scroll" href="#contact">Contact</a></li>
          </ul>
          <!-- 這邊是nav連結的區塊 end -->
        </div>
      </div>
</div>

<section id="home">....</section>
<section id="about">....</section>
<section id="contact">....</section>

```

先將 **scrolling-nav.js** 放上去後，在各個連結加上 **page-scroll** 的 class。

一般靜態的用法就只是將 href 補上區塊的 id，我們透過這個方法就可以很輕鬆的呈現動態滾動的效果。

另外在練習的過程中，可能會遇到滾動的位置被上方的 nav 蓋到，原因滾動的目標**區塊其定位是在瀏覽器視窗最上方**。

那我們最上方有固定到 nav 所以才會有這樣的情況，所以各個區塊可以再加上padding-top 即可解決。

**[參考JSbin範例](http://jsbin.com/valawu/4)**