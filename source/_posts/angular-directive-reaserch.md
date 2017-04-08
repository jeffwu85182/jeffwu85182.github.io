---
title: Angular Directive 初探 - Part.1
date: 2017-03-25 16:19:01
Category:
- Angular 2
tags:
- Angular 2
- Directive
- Attribute Directives
---

最近買了一本中國的 Angular 2 簡體書，想看看有別於自己的角度，如何介紹 Angular ，再加上想深入研究 directive 的部分，因此除了 Angular 官網，也參考了這本書的部分內容，希望對大家有所幫助。

*Directive 又翻做 “指令”，但我還是習慣直接叫 directive*

在 Angular 的世界中，directive 扮演相當重要的角色之一，它可以在特定的 DOM 元素上執行，進而擴充這個元素的功能，為元素增加新的方法。而我們最常用的元件 ( Component )，基本上就是一個帶有 template 的 directive，它繼承了 directive，是 directive 的一個子類別，通常用來打造 UI 的部分。

在開始介紹 directive 之前，稍微複習一下 HTML 的相關內容。

<!--more-->

HTML 檔是一個純文字檔，包含了 HTML 元素、CSS 樣式以及 JavaScript 程式碼。而 HTML 元素指的是從開始標籤到結束標籤的所有程式碼，元素的內容是開始標籤與結束標間之間的內容，例如：

| 開始標籤                        | 元素內容        | 結束標籤   |
| :-------------------------- | :---------- | :----- |
| `<a href="www.google.com">` | Hello World | `</a>` |

HTML 標籤可以設定屬性，屬性為 HTML 元素提供了更多附加資訊。屬性一般以 `Property="Value"` 的形式出現，例如 `href="www.google.com"` 有時候也會只有 `Property` 而沒有 `Value` ，例如我們常用的 Input 若要設為必填項目，就會加上一個 `required` 屬性。

超連結標籤建立了一個前往其他頁面的連接，`href` 作為超連結標籤的屬性，定義了連接的目標位置。以上述為例，當使用者點擊這個超連結時，瀏覽器的 URL 會變成 `www.google.com` 並且連到 Google 的首頁。這樣的一個操作過程，主要是瀏覽器依照 HTML 的標準來進行解析，知道 `<a>` 標籤宣告了一個超連結，href 屬性則指定了連結的目標。Angular 中 directive 的使用方式和 HTML 元素中屬性的使用方式類似，我們可透過自定義的 `CustomHighlightDirective`來為元素加上背景色，範例如下：

```html
<a href="http://google.com" custom-highlight> Google </a>
```

先不管 custom-hightlight directive 的實作內容，從上方的範例我們可得知，只要在標籤加上屬性，就可以實現你想要的功能，這就是 directive 基本的使用方式，是不是超威的阿！ XDD



### Directives 概述 

在 Angular 的世界中，Directives 有分三種類型：

1. 元件 ( Components ) — 擁有 template 的 directives
2. 結構類 directive ( Structural directives ) — 改變 view 的結構
3. 屬性類 directive ( Attribute directives ) — 改變元素 ( Element )、元件 ( Component) 或另一個 directive 的外觀或行為

`Components` 是最常見的 directive， Angular 開發的應用程式基本上就是一群 Component 所組起來的。而結構類 directive 則是藉由加入及移除 DOM 元素 ( Element ) 來改變 DOM layout，最常見的 [NgFor](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor) 及 [NgIf](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngIf) 就是結構型 directive。屬性類 directive 顧名思義，使用方式就像 element 的 attribute 一樣，舉例來說，在官網 [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html) 這篇文章中提到內建的 [NgStyle](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngStyle) directive 就是屬性類 directive，可實現同時改變多個元素的樣式。


### 建立一個簡單的 Attribute Directive

首先我們透過 angular-cli 進行練習，輸入指令 `ng g d directives/highlight` 就可快速建立 directive 囉！
建立好 directive 之後，可以看到 directive 的內容如下：

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

}
```

從 `@angular/core` 將 `Directive` import 進來，這樣才能使用 Directive 的 `decorator`，decorator 目前的 metadata 只有 selector 的部分設為 `[appHighlight]` 。`@Directive` 需要一個 CSS selector 來協助辨識在 template 中與這個 directive 有關聯的 HTML，這裡 Attribute 當作 CSS selector 使用的方式為名稱的前後加上中括號例如： `[AttributeName]` 。意思是在 Angular 的專案底下，無論是哪個 component 的 template，若要使用 highlightDirective，必須在 element 中加上 appHighlight 的 attribute 才會有作用。

```html
<span appHighlight>這樣才會有作用喔！</span>
```

#### 為何不直接取作 "highlight" ?

的確， `highlight` 的命名比 `appHighlight` 更簡潔且能正常執行，在實務上最好還是加上前綴，確保不會和標準的 HTML attribute 發生衝突，這也能降低在使用第三方套件時發生命名衝突的風險。此外，我們自訂的前綴不能用 **ng** 作為開頭，因為這是 Angular 自己要用的，如果跟著用 ng 作為前綴的話，也可能會造成 bug 導致除錯的困難，因此 Angular-CLI 很貼心的（真的太貼心惹~），一開始任何的 component 或 directive 在建立時 selector 都會自動加上前綴，為了就是避免我們自己埋了地雷卻不知道的窘境發生。

如果你沒修改過 `.angular-cli.json` 中 prefix 設定，預設的 prefix 是 app，因此在透過 CLI 產生的 directive selector 預設都是 app 開頭的，接著在 `constructor ` 將 `ElementRef` 進行注入的動作（ 參考下方範例 ），藉此存取目標的 DOM Element。

*關於 decorator 想深入了解，可參考 Kevin Yang 的文章 [自訂 Decorators](http://blog.kevinyang.net/2017/01/30/angular2-decorators/)*

#### 實作 highlightDirective 的功能

直接看 code 吧：

```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor(private _el: ElementRef) {
    // 注入 elementRef 就可以取得 DOM
    console.log('directive init,', this._el);
  }

  ngOnInit() {
    // 設定 CSS 樣式
    this._el.nativeElement.style.backgroundColor = 'orange';
    this._el.nativeElement.style.color = 'white';
    this._el.nativeElement.style.display = 'inline-block';
    this._el.nativeElement.style.width = '120px';
    this._el.nativeElement.style.height = '40px';
    this._el.nativeElement.style.textAlign = 'center';
    this._el.nativeElement.style.lineHeight = '2.5';
  }

}

```

上面這段程式碼基本上就是注入 `ElementRef` 後即可存取目標的 DOM，藉此進行操作，既然我們是要做一個 highlight 的功能，我們只需要針對目標設定 CSS 樣式即可，樣式的設定方式透過上方的範例可以知道，在注入的 elementRef 中，帶有 nativeElement 的屬性，這個屬性可以讓我們進行 DOM 的存取及操作。

這時你或許會有一些疑問，style 的屬性名稱怎麼跟 CSS 的不太一樣，這邊帶一個觀念，英文的 Property 及 Attribute 我們中文翻譯都叫做**屬性**。但事實上這兩個指的完全是不同的東西，來看這擷取自 stackoverflow 的一段回文：

> **Attributes** are defined by **HTML**.
> **Properties** are defined by **DOM**.

*Some HTML attributes have 1:1 mapping onto properties. **id** is one example of such. Some do not (e.g. the `value attribute` specifies the initial value of an input, but the `value property` specifies the **current** value).*

Attributes 是從 HTML 定義來的，而 Properties 則是從 DOM 定義，有些 HTML attributes 的屬性是 1:1 的比對到 DOM 的 properties 中，例如 `id` 就是，兩者的屬性都叫做 `id`，但有些則不是，例如 value attribute 指定的是 input 中初始的預設值，而 value property 指的卻是目前的值。這觀念一定要釐清！才不會一直鬼打牆喔 XD



### 套用 Attribute Directive

在套用之前，先來觀察一下 angular-cli 在幫我們建立 directive 時，做了哪些事情。Angular CLI 很貼心的幫我們在 `app.module.ts` 的 declarations 加入了剛剛新建的 directive，所以 directive 產生之後，實作的部份搞定，就可以直接在 template 中使用了，揪甘心欸。套用的方式就跟一開始提到的一樣簡單，在 HTML Tag 加上 `appHighlight` Attribute 就會有作用囉！



### 小結

Angular 的 directive 真的很強大 BJ4 ( 不解釋 )，透過 directive 我們可以將很多東西進行封裝的動作，例如第三方套件的使用，透過 directive 封裝後，只要在 template 加上 Attribute 就會有作用，而且擁有自己的生命週期，它會隨著 DOM 產生而誕生，隨著 DOM 消失而毀滅。一切是那麼的輕鬆愉快 ;-) 

參考資料：

* [Angular.io Guide - Attribute Directive](https://angular.io/docs/ts/latest/guide/attribute-directives.html)
* [StackOverflow - HTML Attributes VS Properties](http://stackoverflow.com/questions/19246714/html-attributes-vs-properties)
* [練習範例](https://github.com/jeffwu85182/angularDirectiveReaserch)



