---
title: Angular Directive 初探 - Part.2
date: 2017-04-08 13:31:22
category:
- Angular 2
tags:
- Angular 2
- Directive
- Attribute Directives
---

[上一篇文章](/2017/03/25/angular-directive-reaserch/)，我們初步了解 directive 基本的使用方式，這次來嘗試加入一些事件或值的傳遞，進一步體驗這強大又方便的  Angular Directive。

### 反應由使用者發起的事件

目前 `appHighlight` 很單純的去改變一個元素的樣式而已，但 directive 可以做得更動態，例如我們可以指定當使用者將滑鼠移入或移出元素的時候，進行背景色的改變。在最上方從 `@angular/core` import 的部分加入 `HostListener`：

```typescript
import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';
```

然後加入兩個 eventhandlers 負責處理 mouse enters 或 leaves 的事件，由於滑鼠的進入及離開共有兩個事件，要加上各自的 `@HostListener` decorator 共兩個：

```typescript
  @HostListener('mouseenter') onMouseEnter() {
    this._el.nativeElement.style.backgroundColor = 'green';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._el.nativeElement.style.backgroundColor = 'orange';
  }
```

透過 `HostListener` 來監聽事件並進行處理，就可以讓 directive 實現更多動態的功能囉，那如果要從外部傳值進來讓 directive 進行處理的話呢？我們接著往下看。

<!--more-->

### 藉由 @Input 進行資料綁定的方式將值傳進 Directive

到目前為止，highlight 指定的顏色都是直接寫死 ( hard-coded ) 在 directive，但這樣還不夠，若要自訂顏色的話還要進來 directive 中進行修改，缺乏了可調整的彈性，因此我們可以透過一些方法讓 directive 去接收外面的值，如此一來 direcitve 就變得更有彈性，提供給其他開發者使用時也能快速的進行套用的動作，以加快開發速度。Time is money XD

#### 從 directive class 開始

在開始之前，先在 class 中加入 `@Input` decorator 如下：

```typescript
@Input() bgColor: string;
```

記得要最上方的部分要 import `Input` 才能使用 decorator 喔 :D 接著建立一個 get 屬性方法：

```typescript
// 設定一個 get，如果 bgColor 沒有值，預設給 orange
  get backgroundColor() {
    console.log('this.bgColor', this.bgColor);
    return this.bgColor || 'orange';
  }
```

考慮到使用者在套用 directive 的時候，可能會沒給值，這時會有兩條路：~~勝利或死亡~~ (誤) 直接出現錯誤訊息壞掉或提供預設值，站在貼心的角度，善良的開發者都應該要設個預設值才對（謎之音：廢話）因此這邊我們就先設個 get 屬性方法，直接在取值的時候決定是否給與預設值囉。接著就是將原本 hard-code 的部分改成讀取屬性的值：

```typescript
this._el.nativeElement.style.backgroundColor = this.backgroundColor;
```

#### Template 的使用方式

使用方式就是直接在上面加上 html attribute 並把值加上去，套用的方式有兩種表達型態：

```html
<span appHighlight bgColor="tomato">
  this is span 1
</span>
```

或

```html
<span appHighlight [bgColor]="'royalblue'">
  this is span 2
</span>
```

若沒有用中括號包起來的話，傳入的直接就是字串的值，若你的 component 有屬性是負責提供值的話，可改用第二種方法，上面第二種方法可以看到多了單引號，若沒加單引號的話，傳入的值會是屬性名稱，因此要再多補個單引號來告訴他是傳字串。

### 小結

來個小結吧，這次我們了解要如何讓 directive 變得更有彈性，體會到 directive 帶來封裝的便利性，而且我們從頭到尾都沒有在 AppComponent 中撰寫任何程式碼，只有在 AppModule 的部分加入 `declarations` 並在 template 中的 HTML Tag 加上 attributes 就搞定一切了！做到這邊不知道你的嘴角是否不自覺的上揚，還是只有我而已？~~對，只有你！~~

沒關係，下一篇我們試著來做一個使用第三方套件的 directive，相信一定會有更強烈的感受 XD

參考資料：

- [Angular.io Guide - Attribute Directive](https://angular.io/docs/ts/latest/guide/attribute-directives.html#!#pass-values-into-the-directive-with-an-_-input_-data-binding)
- [練習範例](https://github.com/jeffwu85182/angularDirectiveReaserch)
