---
title: Angular 2 Forms 介紹：Model-Driven Forms
date: 2016-10-26 20:54:26
categories: 
- Angular 2
tags:
- Angular 2
- Forms
- Model-Driven
---

## 面對各種神奇需求的表單，要能克服重重挑戰，就用 Model-Driven 實作吧！

上一篇我們已經介紹了如何使用 Template-Driven 進行表單的開發，對於大部分簡易的表單，搭配預設提供的 Validator Directive，就能輕鬆的實作出可驗證、有提示互動的表單。但人生總不會是都那麼的簡單，在實戰開發上，我們往往會遇到各種神奇的表單需求，可能是多個欄位之間會有複雜的驗證，抑或是動態的驗證，甚至連表單的欄位是動態的！

對於這些奇葩的需求，相信有遇過的朋友都知道，光靠是 Template-Driven 是不夠的，雖然 Template-Driven 也可以實作出複雜的表單，但會造成 Template 會非常的髒亂，而且開發過程中會在 Template 與 Component 之間來回進行，這樣的開發會很沒有效率，而且做到後面可能頭都昏了。

生命是有限的，我們不該把生命浪費在這奇葩的表單上，因此 Angular 2 提供了另一種表單的實作方式： **Model-Driven Forms** ！話不多說，直接開始吧！首先，我們直接透過 Angular CLI 新增一個專案：

[範例~~飯粒~~在此](https://github.com/jeffwu85182/model-driven-demo)

<!--more-->

``` shell
ng new model-driven-demo -sn
cd model-driven-demo
```

接著為了有效節省時間，在新增指令的後面加上 `-sn` 略過 npm install ，直接用 yarn 來安裝 npm !!

```shell
yarn
```

安裝完成之後，執行專案

``` shell
ng serve
```

有看到 **app works!** 字樣就代表初步執行成功囉！

### Import ReactiveFormsModule

我們在實作 template-driven forms 的時候，會在 app.module import  **FormsModule**，現在我們要用 mode-driven 的方式來開發，因此我們要在 app.module 中 import **ReactiveFormsModule** ，才能進行 model-driven 的實作。

``` typescript app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

在開始之前，先準備一份純 HTML 的表單 template：

```html app.component.html
<!-- Model-Driven -->
<div class="container">
  <form [formGroup]="form">
    <div class="profile">
      <h2>基本資料</h2>
      <div class="form-group">
        <label>請輸入名字</label>
        <input type="text" class="form-control" id="firstName" name="firstName" placeholder="請輸入名字">
      </div>
      <div class="form-group">
        <label>請輸入英文名</label>
        <input type="text" class="form-control" id="nickName" name="nickName" placeholder="請輸入英文名">
      </div>
      <div class="form-group">
        <label>請輸入Email</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="請輸入Email">
      </div>
      <div class="form-group">
        <label>請輸入電話</label>
        <input type="text" class="form-control" id="keyNum" name="keyNum" placeholder="請輸入電話">
      </div>
      <div class="form-group">
        <label>請輸入生日</label>
        <input type="text" class="form-control" id="birthday" name="birthday" placeholder="yyyy/mm/dd">
      </div>
      <h3>請選擇興趣</h3>
      <div class="form-group">
        <label>
          <input type="checkbox" id="movie" name="checkArea" value="movie"> 電影
        </label>
        <label>
          <input type="checkbox" id="music" name="checkArea" value="music"> 音樂
        </label>
        <label>
          <input type="checkbox" id="technology" name="checkArea" value="technology"> 技術
        </label>
        <label>
          <input type="checkbox" id="sports" name="checkArea" value="sports"> 運動
        </label>
        <label>
          <input type="checkbox" id="games" name="checkArea" value="games"> 遊戲
        </label>
      </div>
      <h3>性別</h3>
      <div class="form-group">
        <label>
          <input type="radio" id="male" name="sex" value="male"> 漢子
        </label>
        <label>
          <input type="radio" id="female" name="sex" value="female"> 妹子
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-default">下一位</button>
  </form>
</div>
```

重整後，你會在 Devtool 看到以下的畫面：

{% img /angular-model-driven/template-error.png "'未綁定 formGroup 實體的錯誤訊息'" "'然後他就壞掉了'" %}

因為在只有 Import **ReactiveFormsModule** 的情況下，`<form>` 必須綁定一個 `formGroup` 的實體，否則會產生像上方的錯誤訊息。

### 建立 FromModel 

或許你有注意到，我在 template 的 `<form>` 標籤上已經先加了 `[formGroup]="form"` ，這是綁定 FormGroup 實體的方式，接著我們到 **app.component.ts** 建立名為 `form` 的 Form Model：

``` typescript app.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form;
  constructor() {
    this.form = new FormGroup({
      firstName: new FormControl(),
      nickName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl,
      birthday: new FormControl(),
      interest: new FormGroup({
        movie: new FormControl(),
        music: new FormControl(),
        technology: new FormControl(),
        sports: new FormControl(),
        games: new FormControl()
      }),
      sex: new FormControl()
    });
  }
}
```

首先，我們先從 @angular/forms Import 了 `FormGroup` `FormControl` 這兩個 class，我們就可以直接在建構式 ( Constructor ) 中建立 form model 實體。為了看得到 form 實體的值，可以在 template 最下方加上這行：

```html
<pre>
  {{form.value | json}}
</pre>
```

重整之後就可以看到表單的下方會印出 form 的 value，並使用 `json pipe` 來做 render，這就是 model-driven 基本的建立方式。但你或許會覺得，每個欄位都要實體化一個 FormControl 或 FromGroup 實在很麻煩，別擔心，Angular 提供了一個 `FormBuilder` 讓我們更容易的方式建立 Form Model。

``` typescript app.component.ts
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      firstName: '',
      nickName: '',
      email: '',
      phone: '',
      birthday: '',
      interest: this._fb.group({
        movie: '',
        music: '',
        technology: '',
        sports: '',
        games: ''
      }),
      sex: ''
    });
  }
}
```

這樣看起來是不是清爽多了呢？若欄位需要預設值的話，直接加上就可以囉！等同於 new 一個 FormControl。關於 FormControl 與 FormGroup 之間的關係，單一的表單控制項綁定的實體就叫做 FormControl，FormGroup 則是一群 FormControl 的集合，通常用於表單中的部分區塊，使用 FormGroup 最大的好處就是針對驗證的部分，當 FormGoup 底下的某一個 FormControl 有問題，那 FormGroup 的 Valid 也會跟著變成 false，在偵測表單子區塊的狀態會較方便。

### 綁定表單實體

到目前為止，你會發現到，雖然實體都有印出來，但我們還沒進行表單的綁定，表單綁定的方法也很容易，在表單的最外層，通常是 `<form>` 標籤，加上`formGroup` Directive 像這樣： `[formGroup]="form"`，來表示綁定的表單實體與範圍，接著將現有的控制項的 `name` 改成 `formControlName` 即可，如下：

```html app.component.html
<!-- Model-Driven -->
<div class="container">
  <form [formGroup]="form">
    <div class="profile">
      <h2>基本資料</h2>
      <div class="form-group">
        <label>請輸入名字</label>
        <input type="text" class="form-control" id="firstName" formControlName="firstName" placeholder="請輸入名字">
      </div>
      <div class="form-group">
        <label>請輸入英文名</label>
        <input type="text" class="form-control" id="nickName" formControlName="nickName" placeholder="請輸入英文名">
      </div>
      <div class="form-group">
        <label>請輸入Email</label>
        <input type="email" class="form-control" id="email" formControlName="email" placeholder="請輸入Email">
      </div>
      <div class="form-group">
        <label>請輸入電話</label>
        <input type="text" class="form-control" id="phone" formControlName="phone" placeholder="請輸入電話">
      </div>
      <div class="form-group">
        <label>請輸入生日</label>
        <input type="text" class="form-control" id="birthday" formControlName="birthday" placeholder="yyyy/mm/dd">
      </div>
      <h3>請選擇興趣</h3>
      <div class="form-group" formGroupName="interest">
        <label>
          <input type="checkbox" id="movie" formControlName="movie" value="movie"> 電影
        </label>
        <label>
          <input type="checkbox" id="music" formControlName="music" value="music"> 音樂
        </label>
        <label>
          <input type="checkbox" id="technology" formControlName="technology" value="technology"> 技術
        </label>
        <label>
          <input type="checkbox" id="sports" formControlName="sports" value="sports"> 運動
        </label>
        <label>
          <input type="checkbox" id="games" formControlName="games" value="games"> 遊戲
        </label>
      </div>
      <h3>性別</h3>
      <div class="form-group">
        <label>
          <input type="radio" id="male" formControlName="sex" value="male"> 漢子
        </label>
        <label>
          <input type="radio" id="female" formControlName="sex" value="female"> 妹子
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-default">下一位</button>
  </form>
</div>
```

別忘了，我們也把 `checkbox` 的部分建立了一個 `formGroup` 子區塊，對於子項目綁定的 Directive 我們常用的有： `formControlName`, `formGroupName`, `formArrayName`，所以也要在這區塊加上 `formGroupName` 進行子表單區塊的綁定喔！

### 初始化資料

我們一定都會遇到欄位要有預設值的情況，要如何設定初始化資料呢？很簡單，透過 `formBuilder` 建立 `formControl` 的過程中，欄位後面直接加上字串就可以囉，我們做個簡單的範例：

``` typescript
this.form = this._fb.group({
      firstName: 'Jeff',
      nickName: 'crazy',
      email: 'abc@def.com',
      phone: '0912345678'
})
```

像這樣，就可以很輕鬆的將初始預設值設定到 FormControl 上了。

### 表單驗證與錯誤訊息提示

既然是表單，那一定會有表單驗證，這是一件很正常的事情。Angular 也提供了很好用的 Validator 讓我們可以快速建立基本的表單控制項的驗證，只要在 Component 最上方 Import 一個 `Validators` 就能馬上使用了，例如我們要 firstName 為必填項目，且長度至少要 5 個字元；email 也是必填項目，而且要是正確的 email 格式：

```typescript part of app.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  form;
  emailPattern = '^[a-zA-Z0-9.!#$%&』*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$';
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      nickName: 'crazy',
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],,
      phone: '0912345678'
      ...
    });
  }
}
```



在上面的範例中，首先 Import @angular/form 提供的 Validators，接著建立待會要用到的 emailPattern，並直接在 FormBuilder 中的欄位 formControl 以陣列的方式加入，陣列第一個項目為**狀態 ( State )**，也就是資料的值，第二個再加上一組陣列，主要放的是 **Validators**，除了可以使用 Angular 預設提供的 Validator，我們也可以自己建立所謂的 **CustomValidator**，關於自訂驗證，之後再另外寫一篇文章來做介紹。

### 建立動態表單以表單陣列為例

最後一個部分，動態表單，目前我們用了 formControl 、 formGroup，還有一個 `formArray` 可以使用，常見的使用情境例如有些表單的子區塊項目是會重複出現多筆的時候，就很適合用 **formArray**，馬上來看如何使用吧！我們直接將目前的練習改寫成動態的表單。

我們先把 `constructor` 建構式中，用 `formBuilder` 建立表單 Model 的動作寫成 function，然後一樣透過 `formBuilder` 建立 FormArray：

```typescript part of app.component.ts
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.array([
      this.buildGroup()
    ]);
  }
  
  buildGroup(): FormGroup {
    return this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      nickName: 'crazy',
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: '0912345678',
      birthday: '',
      interest: this._fb.group({
        movie: '',
        music: '',
        technology: '',
        sports: '',
        games: ''
      }),
      sex: ''
    });
  }
```

然後再回到 Template 的部分，我們將 `profile` Class 的 `div` 標籤加上 *ngFor 並且綁定 FormGroup 為 `i`，`i` 是前面用 *ngFor 時宣告的 index，因為現在我們的 form 是 FormArray，它是個陣列，所以在陣列中要綁定每個 FormGroup 就透過 index 來進行，所以後面還有一個 `formGroupName` 來做綁定。此外，錯誤訊息提示也要改由 form.controls 改為 profile.control ，因為綁定的是 ngFor 的 item，這裡的 item 我命名為 profile。

```html part of app.component.html
<div class="container">
  <form [formGroup]="form">
    <div class="profile" *ngFor="let profile of form.controls; let i=index" [formGroupName]="i">
      <h2>基本資料</h2>
      <div class="form-group">
        <label>請輸入名字</label>
        <input type="text" class="form-control" id="firstName" formControlName="firstName" placeholder="請輸入名字">
        <div *ngIf="profile.controls.firstName.errors">
          <span *ngIf="profile.controls.firstName.valid">合格</span>
          <span *ngIf="profile.controls.firstName.errors.required">必填項目</span>
          <span *ngIf="profile.controls.firstName.errors.minlength">欄位長度不足</span>
        </div>
      </div>
      <div class="form-group">
        <label>請輸入英文名</label>
        <input type="text" class="form-control" id="nickName" formControlName="nickName" placeholder="請輸入英文名">
      </div>
      <div class="form-group">
        <label>請輸入Email</label>
        <input type="email" class="form-control" id="email" formControlName="email" placeholder="請輸入Email">
        <div *ngIf="profile.controls.email.errors">
          <span *ngIf="profile.controls.email.valid">合格</span>
          <span *ngIf="profile.controls.email.errors.required">必填項目</span>
          <span *ngIf="profile.controls.email.errors.pattern">請輸入正確的 email</span>
        </div>
      </div>
      ...
```

既然是 FormArray，那我們當然也要加一個新增項目的方法：

```typescript part of app.component.ts
  add() {
    this.form.push(this.buildGroup());
  }
```

並且 template 的部分，底下有一個等候多時的按鈕，為它加上 `click` 事件：

```html part of app.component.html
<button type="button" class="btn btn-default" (click)="add()">下一位</button>
```

重新整理之後，可以試著按一下按鈕觀察看看表單的變化囉！

### 小結

- Model-Driven Form 是透過 Component 來建立 Form Model，並且在 Template 進行綁定。
- Template 綁定的方式：
  - 最外層的表單實體一律用 `formGroup` Directive 進行綁定。
  - 子項目或區塊則使用 formControlName, formGroupName, formArrayName 進行綁定。
- 在 Template 搭配 ngIf 進行錯誤訊息顯示操作時，要存取名為 form 的實體中的錯誤項目
  - 一般表單控制項：form.control.firstName.errors，firstName 是表單的控制項名稱
  - 陣列表單控制項：透過 ngFor 輸出的項目，假設為 item，則存取方式為 item.control.firstName.errors



### 參考資源 & 延伸閱讀

- [Angular API Reference](https://angular.io/docs/ts/latest/api/)
- [Angular Dynamic Forms](https://angular.io/docs/ts/latest/api/)
- [REACTIVE FORMS IN ANGULAR 2](http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html)
- [Using Angular 2's Model-Driven Forms with FormGroup and FormControl](https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol)
- [Introduction to Angular 2 Forms - Template Driven vs Model Driven or Reactive Forms](http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/)