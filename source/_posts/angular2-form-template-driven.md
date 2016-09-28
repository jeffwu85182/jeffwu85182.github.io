---
title: Angular 2 Forms 介紹：Template-Driven Forms
date: 2016-09-27 00:56:24
tags:
- Forms
- Template-Driven-Forms
category:
- Angular 2
---

## 介紹如何使用 template driven 快速建立簡易的互動表單

Angular 2 正式版在日前已經正式發佈了，因此較不會再遇到 alpha 或 beta 甚至 rc 的時候還出現的重大變更（BREAK CHANGE）了，真的出現的話，我想也應該是 Angular 3 要出來的時候了 XD。

先前參考官方文件介紹過 Angular 2 Forms 的用法，這次來自己實作，以 Template-Driven 的方式建立簡單的登入表單，並且介紹完整的運作流程，主要的內容如下：

- Import FormsModule & 準備 HTML template
- 在 Template 中的表單控制項加上 `ngModel` Directive 
- 初始化表單控制項預設值
- 使用 `ngModel` 提供的狀態進行 CSS class 裝飾
- 追蹤表單驗證狀態並顯示錯誤訊息提示

登入畫面，是我們在任何的 web application 中最常看到的頁面，因此，就以登入畫面來當範例練習吧！

<!-- more -->

## 首先，import 所需要的 FormsModule

使用 Angular 2 Forms 之前，要先把需要的 Module import 進來，AppModule 的內容如下：

``` typescript app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

接著，準備我們的 HTML Template：

``` html app.component.html
<div class="container">
  <h1>Angular 2 Form Demo</h1>
  <form>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" name="email" placeholder="Email">
    </div>
    <div class="errors">
      <p>請輸入帳號</p>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
    </div>
    <div class="errors">
      <p>請輸入密碼</p>
    </div>
    <div class="checkbox">
      <label>
      <input id="remember" name="remember" type="checkbox"> Remember me
    </label>
    </div>
    <button type="submit" class="btn btn-default">Login</button>
  </form>
</div>
```

這是一個單純的 HTML Template，到目前為止都尚未有任何和 Angular 相關的操作，HTML `class` 的部分則是套用了 [Bootstrap](http://getbootstrap.com/) 的樣式，你也可以先在 index.html 上加上 Bootstrap 的樣式來源。讓畫面看起來比較順眼些。準備好以上的前置步驟後，準備開始套用 `ngModel` 實作 Template-Driven Forms 囉！

## 在 Template 中的表單控制項加上 `ngModel` Directive

打開 `app.component.html` template 檔，在表單中的所有 `input` 加上 `ngModel`，如下：

``` html app.component.html
<!--Template-Driven-->
<div class="container">
  <h1>Angular 2 Form Demo</h1>
  <form #myForm="ngForm">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" name="email" placeholder="Email" ngModel>
    </div>
    <div class="errors">
      <p>請輸入帳號</p>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" name="password" placeholder="Password" ngModel>
    </div>
    <div class="errors">
      <p>請輸入密碼</p>
    </div>
    <div class="checkbox">
      <label>
      <input id="remember" name="remember" type="checkbox" ngModel>
       Remember me
    </label>
    </div>
    <button type="button" class="btn btn-default" (click)="doSome(myForm)">Login</button>
  </form>
</div>


<!-- Show Test Data-->
<hr>
<div class="container">
  <pre>
    {{ myForm.value | json }}
  </pre>
</div>

```

上面這邊我們主要是在表單中的所有控制項加上 `ngModel` 屬性，加上後，首先 Angular 就會在這個 template 產生一個 ngForm 的實體，每個有 `ngModel` directive 的 input 也會產生實體物件，並且存在於 ngForm 實體中，為了可以看到 model 的值，我們在 `form` 標籤新增一個 template 變數 `myForm` ，然後在下方新增一個 `pre` 標籤區塊並加上 Angular 的 expression 來顯示 `myForm` 的值，執行後的結果如下：

{% img /angular2-form-template-driven/template-driven-1.gif "'初步建立的 template-driven form'" "'初步建立的 template-driven form'" %}

## 初始化表單預設值

很多時候我們的表單都會需要有預設值的情況，那在 template-driven form 要如何初始化 model 的預設值呢？

我們需要先在 component class 新增一個屬性來存放 model 資料，然後在 template 把原本的 `ngModel` 改成 `[ngModel]="modelName"` 就可以囉！

``` html app.component.html partial code
<div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" 
      id="email" name="email" placeholder="Email" [ngModel]="email">
</div>
```



## 使用 `ngModel` 提供的狀態進行 CSS class 裝飾

還有一種需求佷也很常見，就是依照表單的狀態來顯示不同的 CSS 樣式，一般的做法通常都是自己針對不同狀態來命名 CSS Class，Angular 預設為表單提供了三種類型的狀態 class，我們就可以直接對預設提供的 class 名稱來設計樣式。表單控制項的狀態預設提供的有：

| 狀態（State  ）      | Class if true | Class if false |
| ---------------- | ------------- | -------------- |
| Control  被點擊接觸過  | ng-touched    | ng-untouched   |
| Control  的值被改變   | ng-dirty      | ng-pristine    |
| Control  的值不符合驗證 | ng-valid      | ng-invalid     |



## 追蹤表單驗證狀態並顯示錯誤訊息提示

表單控制項除了依照狀態來顯示 CSS 樣式之外，我們還需要有提示訊息的顯示來讓使用者可以更容易的了解，透過適當的訊息提示可有效幫助 UI 操作，帶來良好的使用者體驗。`ngModel` 除了依照控制項的狀態來提供 CSS Class 之外，在 formControl 的實體中，也存在著控制項狀態的 model，我們可以依照這些 model 作為訊息顯示的判斷。

一開始準備好的 template 可以看到有 `class="errors"` 的 `div` 元素，但一開始進入頁面的時候，其實不需要馬上顯示錯誤，而是要使用者接觸或輸入之後，若有錯誤再出現提示訊息即可。

我們可以在表單控制項加上 template 變數 `#userMail` 變數名稱可自訂，要以 `#` 字號為開頭，並指定成 `ngModel`，然後每個再加上需要的驗證屬性例如：`required`, `minlength`, `maxlength`, `pattern` 等，這些是 Angular 預設提供的 Validator，套用的方式如下：

``` html app.component.html partial
<div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" name="email" 
        placeholder="Email"
        [ngModel]="email"
        required
        minlength="5"
        pattern="^[a-zA-Z0-9.!#$%&』*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        #iemail="ngModel">
</div>
<div class="errors" *ngIf="iemail.errors">
	<p *ngIf="iemail.errors.minlength">最少要 5 個字</p>
	<p *ngIf="iemail.errors.required">必填項目</p>
	<p *ngIf="iemail.errors.pattern">請輸入正確的 Email 格式</p>
</div>
```

Class errors 的 div 的用途用來顯示錯誤訊息的部分，以上面的 input 為例，Angular 建立實體之後，會有一個 errors 的屬性，當有 Validator 驗證錯誤的時候，會存一個物件到 errors 屬性中。這時候我們做了一個 ngIf 來判斷是哪一個錯誤，然後顯示對應的錯誤訊息。另外我們也可以在按鈕設定，當整張表單的驗證狀態為 invalid 的時候，就可以把按鈕 `disabled` 禁止點擊。

到目前為止的練習，我們的 component 完全沒有任何的邏輯驗證或處理，只設定了一個初始值，所有的驗證都在 template 做完了！Angular 2 Template-Driven Forms 是不是很簡單呢？ :)



