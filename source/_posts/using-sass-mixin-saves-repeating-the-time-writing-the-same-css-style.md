---
layout: post
title: 'Sass筆記「@mixin」介紹：節省重複撰寫CSS樣式的時間'
date: 2014-08-13 07:13
comments: true
categories: [sass, mixin]
---
撰寫CSS的時候，時常會遇到一種情況：

在開發多種CSS樣式時，會將第一次寫的程式碼複製貼上後，再進行修改，

日後樣式需要整個大修時(例：圓形改方形)，又必須將所有CSS重新逐一修正，非常不方便。

使用 Sass @mixin 的話，上述的問題可輕鬆解決，同時還可傳入多個變數進去。

我們先來看下面的code：

<!--more-->

```sass
$font-size:13px /*設變數font-size*/
@mixin bg 
	background: #000
	font-size: $font-size
.header
	+bg
```

編譯之後如下：

```css
.header {
  background: black;
  font-size: 13px;
}
```
前面以@mixin開頭，後面的bg則是命名要mixin的名稱。

所以如果.header要載入的話，寫「+」後面接mixin名稱即可載入。

同時你也可以載入在外面的變數，當然也可以在裡面進行運算(加減乘除)。

再來假設背景顏色隨時會更動，你也可以在mixin建立變數：

```sass
$font-size:13px
@mixin bg($bgcolor) /*mixin 建立 bg 加入 bgcolor 變數*/
	background: $bgcolor
	font-size: $font-size
.header
	+bg(#000) /*變數設定#000*/
.content
	+bg(#fff) /*變數設定#fff*/
```

編譯後的結果如下：

```css
.header{
  background: black;
  font-size: 13px;
}	
.content{
  background: white;
  font-size: 13px;
}
```

@mixin 變數也可具有預設值，並載入多種變數：

```sass
@mixin bg($bgcolor:#000,$width:200px) 
	background: $bgcolor
	width: $width
.header
	+bg
.footer
	+bg(#ff0000,300px)
```

編譯後

```css
.header {
  background: black;
  width: 200px;
}
.footer {
  background: red;
  width: 300px;
}
```

透過變數載入的方式，就可以將樣式獨立出來，透過 @mixin 來進行集中管理與設計。

參考來源：[30天掌握Sass語法 - (6)利用Sass「@mixin」，讓你省去重複撰寫相同CSS樣式的時間](http://ithelp.ithome.com.tw/question/10128138)
