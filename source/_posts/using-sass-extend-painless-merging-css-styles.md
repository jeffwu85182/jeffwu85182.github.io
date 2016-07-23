---
layout: post
title: 'Sass筆記「@extend」介紹：無痛合併CSS樣式'
date: 2014-08-12 03:51
comments: true
categories: [sass, extend]
---
在撰寫CSS過程中，為了避免CSS太龐大，當我們有用到相同的樣式時，

都會將它合併起來如下：

```css
/* 第200行位置 */ 
.header h1, .content h1, .footer h1 {
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 1px;
}
/* 第400行位置 */ 
.header h1 {
  color: black;
}
/* 第1000行位置 */ 
.content h1 {
  color: green;
}
/* 第N000行位置 */ 
.footer {
  color: pink;
}
```

但這樣子會有個麻煩的地方是，假設合併樣式程式碼的位置在第200行，而我目前位置是在N千多行。

當需要合併樣式時，又必須回到第200行來合併class樣式，所以當程式碼越變越多時，

要集中相同樣式的工作流程相對也會變得更加繁瑣。

因此Sass ＠extend 繼承的方式可以解決這樣的問題。

<!--more-->


使用Sass的 ＠extend：

```sass
.all-h1 /*建立繼承用的樣式*/
	font-size: 20px
	line-height: 1.8
	letter-spacing: 1px
.header h1
	@extend .all-h1
	color: #000
.content h1
	@extend .all-h1	
	color: green
.footer
	@extend .all-h1	
	color: pink
```
這樣產生的結果會是

```css
/* 第200行位置 */ 
.all-h1, .header h1, .content h1, .footer h1 {
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 1px;
}
/* 第400行位置 */ 
.header h1 {
  color: black;
}
/* 第1000行位置 */ 
.content h1 {
  color: green;
}
/* 第N000行位置 */ 
.footer {
  color: pink;
}
```

但這樣還不是夠好，因為多出來的 ```.all-h1``` 不一定會用到，是多出來的。

因此，我們可以在繼承的類別名稱前面，加上「%」來將它合併起來。

```sass
%all-h1 /*建立繼承用的樣式*/
	font-size: 20px
	line-height: 1.8
	letter-spacing: 1px
.header h1
	@extend %all-h1
	color: #000
.content h1
	@extend %all-h1	
	color: green
.footer
	@extend %all-h1	
	color: pink
```

編譯後的結果也會和最上面的CSS一樣，首先於上方撰寫合併用的程式碼，也就是「%all-h1」。

「```%```」後面加上自己命名要合併樣式的名稱例如：

```sass
%all-class_name
```

再來在繼承用的class加上@extend後面接%all-h2，編譯出來的程式碼便會將其合併。

所以往後寫css有樣式需要合併時，直接用@extend的用法就可以輕鬆達成囉！

###問題來了
究竟**Mixin**與**extend**的使用時機該如何抉擇？

基本上，

**@mixin**是將程式碼帶入到對應的class去，同時可帶入變數。

**@extend**則是藉由合併class，並吃到共通樣式，但沒辦法帶入變數。

所以如果你的樣式都固定不變的，不會需要帶參數去改變樣式的話，

使用@extend，程式碼會比較少些。

但如果你的程式碼需要帶入多個變數進行運算時，那用@mixin則較適合。


參考來源：[sfisonly](https://www.facebook.com/sfismy)，[30天掌握Sass語法 - (7)利用Sass「@extend」，讓你無痛合併CSS樣式](http://ithelp.ithome.com.tw/question/10128359)