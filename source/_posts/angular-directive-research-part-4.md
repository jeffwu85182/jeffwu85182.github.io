---
title: Angular Directive 初探 - Part.4
date: 2017-04-11 11:33:04
category:
- Angular 2
tags:
- Angular 2
- Directive
- Structural Directives
---

在初探 part.1 的時候，提到了 Angular directive 有分三種，Component, Attribute Directive and Structural Directive，而之前介紹了 Attribute Directive，知道如何建立與使用，這次就來研究一下 Structural Directive 吧！

### 什麼是 structural directive ?

Structural directives 負責 HTML 的 layout。通常是藉由加入、移除或操作 element ，將 DOM 架構進行繪製或重繪的動作，就和其他的 directives 使用方式一樣，套用到 HTML host element 上，並且依照這個 directive 有什麼功能去進行處理，而被套用的 host element 本身以及其底下的其他後代都是在 directive 執行的範圍內。

structural directive 很好分辨，directive 的名稱前面有星號 ( * ) 的 directive 就是 structural directive。

```html
<div *ngIf="isChecked"> is checked </div>
```

像上方的範例，我們很常在使用的 directive 之一 `*ngIf ` ，只要帶著設定的屬性名稱，不需要加上任何括號就能執行。稍後會提到使用星號帶來的方便性，以及後面的字串其實是 microsyntax 而不是一般的 template expression 喔，Angular 會對星號的標記語法進行*解語法糖* 的動作，並且將結果放進 `<template>` 標記中，而這個 template 的影響範圍在 host element 以及其底下的後代。每個 strucural directive 都和對應的 template 內容不太一樣。

三個內建且常用的 structural directive —[NgIf](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngIf)、 [NgFor](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor)、 [NgSwitch...](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngSwitch)等，在官網的 [*Template Syntax*](https://angular.io/docs/ts/latest/guide/template-syntax.html) 文件中都有提到，也有提供參考的範例，以下為其中一個 template 的範例：

<!--more-->

```html
<div *ngIf="hero" >{{hero.name}}</div>

<ul>
  <li *ngFor="let hero of heroes">{{hero.name}}</li>
</ul>

<div [ngSwitch]="hero?.emotion">
  <happy-hero    *ngSwitchCase="'happy'"    [hero]="hero"></happy-hero>
  <sad-hero      *ngSwitchCase="'sad'"      [hero]="hero"></sad-hero>
  <confused-hero *ngSwitchCase="'confused'" [hero]="hero"></confused-hero>
  <unknown-hero  *ngSwitchDefault           [hero]="hero"></unknown-hero>
</div>
```

基本上大家都應該知道要怎麼去使用了，所以這篇**不會提到如何使用**，但是會去說明 structural directive 是**如何運作**的，以及要怎麼**寫一個自訂的** structural directive。

關於 directive 大小寫的拼法，在官網文章中有提到這部分，雖然都是駝峰式命名 ( Camel Case )，但有分首字大小寫，首字大寫的例如：`NgIf` 是指 directive class 的名稱；而 `ngIf` 指的是 directive 套用時的 attribute 名稱。

Directive 的 class 是以首字大駝峰式命名 ( `NgIf` )， 套用 Directive 的 attribute 名稱則是首字小駝峰式命名 ( `ngIf` )，如果文章中提到它的屬性或這個 directive 在做什麼的，指的都是 directive class 的部分，如果是在說明如何套用到 template 中的 html，那就是指 directive attribute，這部分多多留意喔！

雖然前面的文章有提到過，但還是先來複習一下：除了本篇的 structural directive，另外還有兩種 Angular directives，`components` 以及 `attribute`。`components` 主要是管理一個區域原生的 HTML  element ，簡單來說，就是帶有 template 的 directive。而 `attribute` directive 可以用來改變 element、component 或其他 directive 的外觀或行為，舉例來說，內建的 `NgStyle` directive 可以同時改變多個 element style。

一個 host element 可以套用多個 `attribute` directive ，但`structural` directive 就只能套用一個。



### NgIf case study

`NgIf` 是最簡單的 structural directive 也最容易理解，它取得 boolean expression 後，把標記的 DOM 整個顯示或消失。

```html
<p *ngIf="true">
  Expression is true and ngIf is true.
  This paragraph is in the DOM.
</p>
<p *ngIf="false">
  Expression is false and ngIf is false.
  This paragraph is not in the DOM.
</p>
```

Angular 的 `ngIf` 並非透過 CSS 來隱藏 element，而是直接從 DOM 本身加入或移除。這可以從瀏覽器的開發者工具檢查元素確定。

![透過 ngIf 可以將要隱藏的 element 不存在於 dom](images/angular-directive-research-part-4/element-not-in-dom.png)

上圖有兩段內容，第一段就是一般正常的 DOM，而下方的第二段是沒有使用的部分，可以看到這個區塊不存在於 DOM 中，取而代之的是關於 "template binding" 的一段註解，詳細的說明後面會提到。

當條件是 false 時，`NgIf` 會將 DOM 上的 host element 移除，同時移除 DOM 相關的附件 ( 指 ngIf 建立在 host element 底下的相關屬性或事件 )，也會透過 Angular 變更偵測的機制將 component 抽離與毀滅，而 component 和 DOM 節點就可以被回收與釋放記憶體空間。

#### 為何移除比隱藏要來得好？

Directive 可以隱藏不需要的段落，但不是將 `display` style 設置為 `none`，例如以下的範例：

```html
<p [style.display]="'block'">
  Expression sets display to "block".
  This paragraph is visible.
</p>
<p [style.display]="'none'">
  Expression sets display to "none".
  This paragraph is hidden but still in the DOM.
</p>
```

雖然設定 CSS `display: none` 在畫面上確實是看不見的，但元素仍會存在 DOM 中。

![只用 display none，雖然畫面上是隱藏的，但實際還存在於 DOM 中](images/angular-directive-research-part-4/element-display-in-dom.png)

對於內容簡單的段落來說，要隱藏或移除都是無關緊要的，但若是 host element 附加到資料密集的 component 中，這樣的 component 即使隱藏起來仍會持續執行並附加自己的 element 在 DOM 上，因此也會持續進行事件的監聽，而 Angular 持續確認改變的特性可以去影響資料的綁定，無論 component 在幹嘛，Angular 都會持續進行這件事。

雖然在畫面上看不到，但 component 以及它底下所有子 components 都會佔用資源。效能和記憶體負擔都會變大，甚至反應變慢，導致使用者啥都看不到。

從正向的角度來看，要再次顯示 element 確實很快，component 先前的資料狀態也會留著且隨時可以準備顯示，就不用再重新初始化一次，畢竟這樣操作的代價可能會不小。所以單純用隱藏與顯示的話，有時候是對的。

但我們不應該總是這樣處理不顯示的內容，而是應該透過像 `NgIf` 這樣的 structural directive 把使用者看不到的 DOM elements 移除且將資源回收。**這是在套用每一個內建或自訂的 structural directive 時都應該去思考的。**在套用 structural directive 之前，你應該停下腳步，去思考加入與刪除 elements 或創造與銷毀 component 的後果。

### 關於星號 ( * ) 前綴

在使用 structural directive 時，你一定會注意到的星號前綴，無論是 `ngIf` 或 `ngFor`...等內建的 structural directives 名稱前面都要加上星號前綴，但為什麼要一定加上星號呢？它是做什麼的呢？

這是個 `ngIf` 範例，如果 hero 存在的話，就要顯示：

```html
<div *ngIf="hero" >{{hero.name}}</div>
```

這個星號是所謂的“語法糖”，簡化了一些複雜的語法，在 Angular 內部在解語法糖時，分成兩個階段，首先會將 `*ngIf="..."` 轉譯到 template attribute，`template="ngIf"`，如下：

```html
<div template="ngIf hero">{{hero.name}}</div>
```

然後它會將 template attribute 轉換成 `<ng-template>` element，並且包著 host element：

```html
<ng-template [ngIf]="hero">
  <div>{{hero.name}}</div>
</ng-template>
```

- `*ngIf` directive 移動到 `ng-template` element，這個 element 會變成 property binding `[ngIf]`。
- `<div>` 的部分，包含 class attribute 會移動到 `<ng-template>` element底下。

而上述這些內容都不會實際運作時呈現出來，只會顯示最後的結果到 DOM 中。

![](images/angular-directive-research-part-4/hero-div-in-dom.png)

Angular 在實際渲染時會消耗 `<ng-template>` 的內容，取而代之的是可用來除錯時參考的註解。

而 `NgFor` 和 `NgSwitch` …等 directive 也是遵循一樣的 pattern 執行的。

### 小結

透過 `NgIf` directive 讓我們可以初步了解 structural directive 的運作機制，接著會再介紹 `NgFor` 的運作機制，看看 `NgFor` 和 `NgIf` 有何不同之處。



### 參考來源

- [Angular.io - Structural Directive](https://angular.io/guide/structural-directives#structural-directives)