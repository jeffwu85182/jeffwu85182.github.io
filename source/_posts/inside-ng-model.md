---
title: Angular 2 ngModel 的內幕(?)
date: 2016-08-03 01:27:56
tags:
 - Angular 2
 - ngModel
category:
 - Angular 2
---

## 關於 NgModel 

這篇文章主要來深入討論 `[(ngModel)]`，若你已經有在開發 Angular 2 的專案，或是自己嘗試練習 Angular 的過程中， `[(ngModel)]` 一定會接觸到的語法，透過`[(ngModel)]` 實現雙向綁定的功能，但，為什麼要使用中括號和小括號呢？

其實，綁定語法中的 **[( )]** 符號是一個很好的提示。

在屬性綁定中，一個值從 Model 中傳到螢幕上的目標屬性。我們把名稱放在中括號 **[ ]** 裡面來標記出目標屬性 。這是一個 **從 Model 到 View** 的單向資料繫結。

在事件綁定中，從螢幕上的目標屬性把值傳到 Model 裡。我們透過小括號 **( )** 把名稱包起來標記出目標屬性。這是一個 **從 View 到 Model** 的反向單向資料綁定 。

由此可知，Angular 選擇了組合符號 **[( )]** 來標記出雙向資料綁定和雙向資料流。

事實上，我們可以把 `NgModel` 繫結拆成兩個獨立的綁定，就像上一篇我們重寫的 「Name」 `<input>`  綁定一樣：

``` html  ./app/hero-form/hero-form.component.html
<input type="text" class="form-control" required
  [ngModel]="model.name"
  (ngModelChange)="model.name = $event" >
  TODO: remove this: {{model.name}}
```

這個屬性綁定看起來很眼熟，但事件綁定看起來有點怪。

`ngModelChange` 並不是 `<input>` 元素的事件。 它實際上是一個來自 `ngModel` directive 的事件屬性。 當 Angular 在表單中看到一個 [(x)] 的綁定目標時， 它會預計這個 `x` directive 有一個名為 `x` 的輸入屬性，和一個名為 `xChange` 的輸出屬性。

樣板表達式 ( template expression ) 中的另一個奇怪的地方是 `model.name = $event` 。 我們以前看到的 `$event` 變數是來自 DOM 事件的。 但 `ngModelChange` 屬性不會產生 DOM 事件，它是一個 Angular 的 `EventEmitter` 類型的屬性，當它觸發時， return 的是輸入框的值 - 這個值剛好和我們必須設給 Model 的 `name` 屬性一樣。

很高興知道這些，但這樣實際嗎？實務上我們幾乎總是較習慣使用 `[(ngModel)]` 形式的雙向綁定。 只有當我們不得不在事件處理函式中做一些特別的事情 (例如合併或限制按鍵頻率) 時，才需要另外拆出獨立的事件處理函式。

想了解更多關於 `ngModel` 和其它樣板語法的內容，請參考 [Template Syntax ](https://angular.cn/docs/ts/latest/guide/template-syntax.html) 章節。