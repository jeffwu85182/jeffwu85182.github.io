---
title: Angular Directive 初探 - Part.3
date: 2017-04-09 11:48:03
category:
- Angular 2
tags:
- Angular 2
- Directive
- Attribute Directives
---

前兩篇文章，Part.1 和 Part.2 的介紹，可以認識到如何寫一個簡單且富有彈性的 directive 並套用，這次來嘗試將 jQuery datepicker 的執行改成 directive ，並認識一下 Angular Directive 的 `Decorator` 吧！

### 製作 jQuery datepicker 的 directive

首先，npm 要先準備好 jquery 以及 bootstrap-datepicker，包含定義檔的部分：

```
npm install jquery bootstrap @types/jquery @types/bootstrap-datepicker --save
```

相依套件安裝完成後，到 tsconfig.app.ts 中，將 types 的陣列加上 "jquery" 字串，代表加入定義。或許你會有疑問，為什麼 `tsconfig.json` 中已經有設定 `typeRoots` 了，為何 `tsconfig.app.json` 還要再加上 "jquery"？

雖然 `tsconfig.app.json` 繼承了 `tsconfig.json` 但這裡的 types 是空陣列，因此造成 tsconfig 的 `typeRoots` 不會讀進來，在編譯的過程中就會報錯，這還滿雷的...Orz 除了在 `tsconfig.app.json`補上 `types` 之外，你也可以直接刪除 `types`，如此一來就只會抓 `tsconfig.ts` 的 `typeRoots` 囉...

npm, tsconfig 都準備好之後，把剛才安裝好的套件加入 Angular-CLI 的設定檔，主要是 jquery 的 js 以及 datepicker 的 css & js 檔案要進行引入的動作：

<!--more-->

```json
"styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css",
        "styles.css"
],
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js"
],
```

接著透過 Angular CLI 新增一個 directive：

```
ng g directive directives/datepicker
```

實作 datepikcer directive：

```typescript
import { Directive, ElementRef, NgZone } from '@angular/core';
@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective {
  constructor(
    private _elementRef: ElementRef,
    private _ngZone: NgZone
  ) {
    const date = new Date();
    this._ngZone.run(() => {
      jQuery(this._elementRef.nativeElement).datepicker({
        startDate: date,
        todayBtn: 'linked',
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'yyyy/mm/dd'
      }).on('changeDate', function (e) {
        console.log(e.date);
      });
    });
  }
}
```

完成之後，在 template 中加入 directive 就會有效果出來囉！！！

```html
<div>
  <label for="myDate">選擇時間</label>
  <input type="text" class="form-control" id="myDate" name="myDate" appDatepicker/>
</div>
```

我們也能夠透過之前提到的 `@HostListener`, `@Input` 讓 directive 可以存取參數或進行事件的處理，變得更有彈性，以上就是簡單的將第三方套件執行的程式把包裝成 directive，這麼做的好處就是可以和 Angular 較無直接關係的程式碼隔開，我們的 component 或 service 就不會變的太雜亂，套件的管理也能更容易去進行維護了。



### 關於 Directive decorator

Directive decorator 可以讓你將 class 標記為 directive 並提供 metadata，以確定如何在運行時處理，實例化和使用。Directives 可以讓我們把行為附加到 DOM 中的元素中。為了可以被其他的 directive、component 或 application 所使用，Directive 必須屬於在某一個 NgModule 下。若要明確指定 directive 是 NgModule 中的成員，你必須將 directive 加在 NgModule 的 `declaralations` 屬性中。

除了透過 Directive decorator 指定的 metadata 配置之外，directive 可以藉由實作各種生命週期鉤子 ( Life-Cycle hooks ) 來控制執行時的行為。

Directive Decorator 的 metadata 屬性包含了：

- **exportAs** - Component 實體在 template 中匯出的名稱
- **host** - 將 host element 綁定的事件, DOM 或 HTML 的屬性比對到 class 中的屬性
- **inputs** - 列出提供給 directive 輸入時作為資料綁定用的 class 屬性
- **outputs** - 列出其他可以訂閱輸出事件的 class 屬性
- **providers** - 列出這個 directive 及底下的 directive 可用的 providers
- **queries** - 設定可以被注入到這個 directive 的 queries
- **selector** - 用來提供在 template 中能辨識 directive 的 css selector

### exportAs

在 directive decorator 中加上 `exportAs` 屬性，並自訂名稱，我們就拿之前的[範例](https://github.com/jeffwu85182/angularDirectiveResearch)的 highlight directive 當作練習，加上 `exportAs:'appHighlight'` 我們一樣取名為 appHighlight。

```typescript
@Directive({
  selector: '[appHighlight]',
  exportAs: 'appHighlight'
})
```

接著直接在這個 directive 新增一個方法叫 `sayHello()`：

```typescript
sayHello() {
  alert('Hello!!!');
}
```

我們先不做太複雜的處理，單純的 alert 就好，完成後到 template 的部分，將有套 appHighlight directive 的元素後面加上範本參考變數並給予剛剛設定好的 exportAs 名稱：

```html
<span appHighlight bgColor="tomato" #jeff="appHighlight">
  this is span 1
</span>
```

這邊的變數名稱我就先取自己的名字 `#jeff`，為了驗證是否確實有資料，可以到 appComponent 來做確認，app component 的部分，從 `@angular/core` import `ViewChild`, `AfterViewInit`，並且將 HighlightDirective 也 import 進來，等等要派上用場：

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
```

import 之後，先在 class 中加上 `@ViewChild` 來取得我們的範本變數 `jeff`：

```typescript
@ViewChild('jeff') myJeff: HighlightDirective;
```

為了有提示可方便參考，我們指定透過 ViewChild 取得的範本變數 `jeff` 的屬性， `myJeff` 型別為 `HighlightDirective` ，這個型別需要 import HighlightDirective 作為參考，所以上一個步驟就先 import 了。

要取得 directive 的實體， AppComponent Class 需要實作 AfterViewInit，為什麼呢？之前的文章有稍微提到 directive 的生命週期，它跟 Component 一樣擁有生命週期，但 **directive 會隨著套用的元素誕生而初始化，也會隨著套用的元素消失而毀滅**，如果直接在 component 的 `constructor()` 或 `ngOnInit()` 是取不到的，因此要在 AppComponent 取得 directive 的實體，一定要在 View 初始化之後，所以就要實作這個生命週期掛鉤，在這個階段才取得到：

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('jeff') myJeff: HighlightDirective;

  title = 'app works!';

  ngAfterViewInit() {
    console.log('this is jeff', this.myJeff);
  }

  callHelloByHighlight() {
    this.myJeff.sayHello();
  }
}
```

最後建立一個 `callHelloByHighlight()` 的方法，裡面先 alert 就好。接著再回到 template 的部分，我們加一個按鈕上去，並在 `click` 的時候呼叫 `callHelloByHighligh()`：

```html
<div>
  <button (click)="callHelloByHighlight()">
    click this button to call directive method.
  </button>
</div>
```

重整之後，點擊按鈕，就可以呼叫 directive 實體中的方法囉！

### Host

Directives 的 metadata  Host 屬性可綁定目標元素的事件 ( Event )、DOM 或 HTML 的屬性 ( Property or Attributes ) ，其實就是 `@HostListener()` & `@HostBinding()` ，寫在 metadata 是較早期的寫法，如果屬性很多的話，建議直接使用 @HostListener() & @HostBinding()，避免 metadata 太大包，要進行追蹤比較不容易，雖然也有 F12 能用就是了...但用 decorator 比較清楚，這點是確定的。

```typescript
@Directive({
  selector: '[tohValidator2]',
  host: {
    'attr.role': 'button',
    '(mouseenter)': 'onMouseEnter()'
  }
})
export class Validator2Directive {
  role = 'button';
  onMouseEnter() {
    // do work
  }
}
```

[參考資料 - Angular StyleGuide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#06-03)



### Input & Output

其實就是 `@Input` 和 `@Output`，這也是早期的寫法了，為了方便屬性的管理，建議還是使用 decorator 將屬性寫在 Class 中比較適合。



### Selector

提供在 template 中進行辨識的 CSS selector，確定有這個 selector 才會進行套用的動作，Selector 可以是多個或是有條件性的，例如：

```typescript
selector: '[appHighlight], span.needHighlight'
```

這代表說只要有套用 appHighlight attribute 或是 html class 名稱為 `needHighlight` 的元素，都會有效果。

### 小結

透過這次的練習，我們學會要如何存取 directive 的實體，只要拿到實體物件之後，想要做什麼基本上都不會有太大的問題，就看自己的想像力囉 XD

參考資料

* [Angular.io Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#06-03)
* [Angular ViewChild decorator](https://angular.io/docs/ts/latest/api/core/index/ViewChild-decorator.html)
* [Angular Directive decorator](https://angular.io/docs/ts/latest/api/core/index/Directive-decorator.html)
* [練習範例](https://github.com/jeffwu85182/angularDirectiveResearch)