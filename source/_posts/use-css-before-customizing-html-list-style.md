---
layout: post
title: '使用 CSS 的 ::before 自訂 HTML 列表樣式'
date: 2014-09-18 02:53
comments: true
categories: [css3, counter-increment]
---
今天看到一篇關於 CSS 的自訂列表計數器的相關運用，來分享一下。

以下介紹如何使用 CSS 的 ::before selector 自訂 HTML ordered lists（ol）的編號樣式。


一般 HTML 的 ordered lists（ol）呈現的效果是這樣：
<ol>
	<li>aaaa</li>
  <li>bbbb</li>
  <li>cccc</li>
  <li>dddd</li>
  <li>eeee</li>
</ol>

我們這裡介紹如何使用 CSS 自訂每一個項目的編號：
![](http://user-image.logdown.io/user/8440/blog/8340/post/233845/mhWsUIn3Q7GB1aCj3pHv_1.png)

步驟練習：

<!--more-->

Step1.首先，將既有的編號拿掉，並加上一些邊界空白的設定。
```css
.custom-counter
  padding-left: 10px
  margin-left: 0
  padding-right: 0
  list-style-type: none
```

Step2.使用 **counter-increment** 自訂計數器的名稱。
```css
.custom-counter li
  counter-increment: step-counter
  margin: 10px 0
```
這裡的 **step-counter** 是一個自訂的名稱，您可以隨便取，只要跟隨後 ::before 中的名稱有對應好即可。

Step3.使用 **::before** 在每個項目前面插入自訂的編號，並設定編號的樣式。
```css
.custom-counter li::before
  content: counter(step-counter)
  margin-right: 5px
  font-size: 80%
  background-color: #2ecc71
  color: white
  font-weight: blod
  padding: 3px 8px
  border-radius: 4px
```
這裡的 counter 要對應 Step2. 的自訂計數器名稱（這裡是 step-counter），
這樣瀏覽器就會自動計算 li 的個數並依序編號，這樣就可以完成自訂列表編號的樣式囉^^

參考來源：[http://www.gtwang.org/2014/09/customize-ordered-lists-pseudo-element.html](http://www.gtwang.org/2014/09/customize-ordered-lists-pseudo-element.html)