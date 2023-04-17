---
title: Angular 2 Forms 介紹
date: 2016-07-30 13:30:03
tags: 
- Angular 2
- Forms
category:
- Angular 2
---

## 前言

Angular 2 目前已經來到 RC 4 了，相信再過不久就會即將正式的 Release，這次就先針對官網上表單（Forms）文件的部分來做研究與紀錄。之後再寫其他關於 Angular 2 的介紹。現今的 Web 應用 ，不論是登入頁面、會員申請、購物車等各式各樣的應用一定都會使用到表單，透過表單來建立一個有凝聚力且有效、引人注目的資料輸入體驗。Angular 表單整合了使用者資料繫結控制，追蹤變更、驗證輸入的正確性並提供錯誤訊息顯示。

我們將會從頭開始建立一個範例表單，分成幾個項目並按照逐一實作。實作的項目有：

- 使用 Component 與 Template 建立一個 Angular 表單
- 使用 `[(ngModel)]` 語法實現雙向資料繫結，提供讀取與寫入控制項的值
- 結合一個表單來使用 `ngModel` ，能讓我們跟蹤狀態的變化並對表單控制項做驗證
- 特殊的 CSS 類別 ( Class )會用來反應控制項的狀態，並能提供強烈的視覺反饋
- 向使用者顯示有效性驗證的錯誤提示和啟用/關閉表單控制項
- 透過 Template 參考變數，在控制項之間共享資訊

<!--more-->

## 啟動 ( Bootstarp )

先來了解一下如何啟動 應用 並加入表單所需要的相依模組。在啟動的期間，呼叫 ` provideForms()`，並將它的結果傳給 `providers` 陣列，以註冊這些新的表單模組。

``` typescript app/main.ts
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { AppComponent } from './app.component';
bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms()
 ])
 .catch((err: any) => console.error(err));
```

舊版的表單 API 已經進入了棄用階段。在這個過渡期， Angular 會同時支援兩個表單模組。為了提醒我們 「舊版 API 已被棄用」， Angular 會在 console 顯示一些警告訊息。

![在 Devtool console 中會顯示舊版表單 API 即將被棄用提示訊息](images/angular2-forms-study/angualr-warn-console.png)

當我們完全轉換成新的 API 而不再用舊版的時候，可以呼叫 `disableDeprecatedForms()` 來徹底禁用舊版的表單功能，並消除警告訊息。

## 表單驅動模式

建立表單的方法有兩種，樣板驅動表單 ( Template-Driven Forms ) 與模型驅動表單 ( Model-Driven Forms ) ，這兩種有什麼地方不同，之後再寫篇文章做介紹。或是直接參考 [Introduction to Angular 2 Forms - Template Driven, Model Driven or In-Between](http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/)

### Template 驅動表單 ( Template-Driven Forms )

利用 Angular template ，幾乎所有的表單都可以建構，例如：登錄表單、聯絡表單…… 等大量的各種商務表單。 我們可以自由的擺放各種控制項並把它們繫結到資料、指定驗證規則、顯示驗證錯誤、有條件的禁用 / 啟用特定的控制項、觸發內建的視覺反饋等等，不勝枚舉。它的確很簡單，因為 Angular 幫我們處理了大多數重複、單調的任務，讓我們可以不必親自操刀、身陷其中。

我們將討論與學習建構如下的 「 Template 驅動」 表單：

![建立template 驅動表單](images/angular2-forms-study/hero-form-1.png)

這個表單中的三個欄位都是必填的。這些欄位左側會有一個綠色的小標籤色塊，讓它們更容易辨識。如果我們刪除了 Name，表單就會用一種引人注目的樣式把驗證錯誤顯示出來。

![表單欄位驗證錯誤提示](images/angular2-forms-study/hero-form-2.png)

我們將按照一系列的步驟來建構此表單：

1. 建立 **Hero** 模型類別 ( Model Class )
2. 建立控制此表單的元件
3. 建立具有初始表單佈局的 template 
4. 使用 **ngModel** 雙向資料繫結語法把資料屬性繫結到每個表單輸入控制項
5. 在每個表單輸入控制項中加入 **ngControl** directive
6. 新增自定義 CSS 來提供視覺反饋
7. 顯示和隱藏有效性驗證的錯誤訊息
8. 使用 **ngSubmit** 處理表單送出
9. 禁用此表單的送出按鈕，直到表單變為有效

## 開始建置

我們直接透過 Angular Cli 來建立一個練習專案

![使用 Angular-Cli 新增練習專案](images/angular2-forms-study/ng-cli-new-project.png)

### Step 1. 建立一個 Hero 模型類 ( Model Class )

當使用者輸入表單資料時，我們要截取到其中的變化，並更新到模型的實體中。 除非我們知道模型裡有什麼，否則無法設計表單。最簡單的模型就是一個「屬性包」( Property bag )，用來存放應用中一件事物的事實。這裡使用三個必填欄位 (`id` 、 `name` 、 `power`) ，和一個選填欄位 (`alterEgo`)。

在應用文件夾中建立一個 `hero.ts` 文件，並且寫入下列 Class 定義內容：

``` typescript ./app/shared/hero.ts
export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }
}
```

TypeScript 編譯器為建構式 ( constructor ) 中每個標為 `public` 的參數建立一個公共欄位，並在建立新的 Hero 實體時，把參數值自動賦給這些公共欄位。注意 `alterEgo` 後面的問號 (?) 代表`alterEgo` 是非必要的，允許省略 。

建立一個新 Hero 資料：

``` typescript
let myHero =  new Hero(42, 'SkyDog', 
                       'Fetch any object at any distance', 'Leslie Rollover');
console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
```

### Step 2. 建立表單元件

每個 Angular 表單分成兩部分：一個基於 HTML 的 template ，和一個基於程式碼的元件，它用來處理資料和使用者互動。我們從元件開始，是因為它能夠簡要說明英雄編輯器能做什麼。

使用 Angular Cli 輸入指令  `ng g component hero-form` 建立 hero-form 元件，並在 `hero-form.component.ts` 修改內容如下：

``` typescript ./app/hero-form/hero-form.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Hero } from '../shared/hero';

@Component({
  moduleId: module.id,
  selector: 'app-hero-form',
  templateUrl: 'hero-form.component.html',
  styleUrls: ['hero-form.component.css']
})

export class HeroFormComponent {
  public powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  public model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  public submitted = false;

  onSubmit() { this.submitted = true; }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
```

在 hero-form 元件中新增 powers 與 model 建立 Demo 用假資料，並新增一個 submitted 為 false 並在最後增加一個 `diagnostic` 屬性，它回傳這個模型的 JSON 格式。 協助查看開發過程中發生的事，最後做清理時再移除它即可。

### Step 3. 建立一個初始 HTML 表單 template 

建立一個新的template 文件，命名為 `hero-form.component.html`並加入內容：

```html ./app/hero-form/hero-form.component.html
<div class="container">
    <h1>Hero Form</h1>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
</div>
```

這只是一段普通的 HTML，出現了兩個 `Hero` 的欄位， `name` 和 `alterEgo` ，讓使用者可以輸入與編輯。**Name** `<input>` 控制項加上 `required` 屬性；但 **Alter Ego** `<input>` 控制項就沒有加了，因為`alterEgo` 是選填的欄位。最後底部有一個 **Submit** 按鈕，它有一些 CSS 的 Class。目前這個 template 還沒有任何的 Angular 語法，只是個 Layout。Class 的部分， `container` 、 `form-group` 、 `form-control` 和 `btn` 來自 [Twitter Bootstrap](http://getbootstrap.com/css/) 。純粹是裝飾。 

使用 Bootstrap 來裝飾表單，在 `index.html` 的 head 中加上 css 來源。

``` html
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

#### 修改 *app.component.ts* 檔案

接著修改由 Angular Cli 新增專案而產生的 app.component.ts 檔案，將 `hero-form` 元件 import 進來。

``` typescript ./app/app.component.ts
import { Component } from '@angular/core';
import { HeroFormComponent } from './hero-form/hero-form.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HeroFormComponent]
})
export class AppComponent {
  title = 'app works!';
}
```

#### 修改 *app.component.html* 檔案

加入剛新增的 hero-form 元件的標籤到 app.component.html 

``` html ./app/app.component.html
<h1>
  {{title}}
</h1>
<app-hero-form></app-hero-form>
```

#### 用 **ngFor** 新增 Select Option

我們將新增一個 `select` 到表單中，並且用 `ngFor` 把 `powers` 列表繫結到 `option` 中。 

``` html ./app/hero-form/hero-form.component.html
<div class="container">
    <h1>Hero Form</h1>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" required>
          <option *ngFor="let p of powers" [value]="p">{{p}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
</div>
```

在列表中的每一個選項渲染出一個 `option` 標籤。 template 輸入變數 `p` 在每個迭代中都代表一個不同的項目，使用雙大括號 的表達式語法來顯示它的值。

### Step 4. 使用 ngModel 雙向資料繫結  

目前還沒有看到其他欄位的資料，這是因為還沒有繫結到 `Hero` 。 從以前的章節中，我們知道該怎麼解決。 [顯示資料](https://angular.cn/docs/ts/latest/guide/displaying-data.html)教會我們屬性繫結。 [使用者輸入](https://angular.cn/docs/ts/latest/guide/user-input.html)告訴我們如何透過事件繫結來監聽 DOM 事件，以及如何用所顯示的值更新元件的屬性。現在，我們需要同時進行顯示、監聽和提取。雖然可以在表單中再次使用這些技術。 但是，這裡將引入一個新東西， `[(ngModel)]` 語法，它使用一種非常簡單的方式把表單繫結到模型。找到 「Name」 對應的 `<input>` 標籤，並像這樣進行修改。

``` html
<div class="form-group">
    <label for="name">Name</label>
    <input type="text"  class="form-control" required
  [(ngModel)]="model.name" name="name">
  TODO: remove this: {{model.name}}
</div>
```

在 input 標籤後新增一個偵錯用的表達式，以便查看正在發生什麼事。 並留下註解提醒：在完成後移除。

現在看一下繫結語法 `[(ngModel)]="..."` ，如果現在執行這個應用，並在**姓名**輸入框中鍵入，新增和刪除字符，我們將看到下方的訊息中顯示和消失。它看起來像這樣：

![雙向資料繫結](images/angular2-forms-study/binding-test.gif)

偵錯訊息證明了資料從輸入框流動到模型，再反向流動回來的整個過程。 **這就是雙向資料繫結！**

注意，我們還在 `<input>` 標籤上新增了一個 **ngModel** 屬性 ( Attribute ) 。當在表單中使用 `[(ngModel)]`時，這是必須的，這樣才能輕鬆的引用它來收集表單的值以及校驗狀態。接著用相同的方式把 `[(ngModel)]` 繫結新增到 **Alter Ego** 和  **Hero Power** 屬性。 我們將拋棄輸入框的繫結訊息，並在元件頂部新增一個到 `diagnostic` 的新繫結。 這樣就能確認雙向資料繫結**在整個 Hero 模型上**都能正常工作了。修改後的表單，其核心是三個 `[(ngModel)]` 繫結，如下：

``` html ./app/hero-form/hero-form.component.html
<div class="container">
    <h1>Hero Form</h1>
    {{diagnostic}}
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text"  class="form-control" required [(ngModel)]="model.name" name="name">
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text"  class="form-control" [(ngModel)]="model.alterEgo" name="alterEgo">
      </div>
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control"  required [(ngModel)]="model.power" name="power">
          <option *ngFor="let p of powers" [value]="p">{{p}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
</div>
```

如果現在執行應用，並且修改 Hero 模型的每一個屬性，表單看起來會像這樣：

![表單頂部的偵錯訊息反映出了我們所做的一切更改](images/angular2-forms-study/ng-model-in-action-2.png)

表單頂部的 `diagnostic` 繫結表達式已經完成了它的使命，可以刪除它了。

### Step 5. 透過 **ngModel** 跟蹤修改狀態與有效性驗證

表單不僅是關於資料繫結的。我們還希望知道表單中各個控制項的狀態。

在表單中使用 `ngModel` 能讓我們比只使用雙向資料繫結獲得更多的控制權。它還會告訴我們很多訊息：User 接觸過此控制項？值是否變更過？資料是否有效？

這個 directive 不只是追蹤狀態，它還會使用下面列出的這些特殊 CSS 的 Class 更新此控制項。 我們可以透過自訂這些 CSS 的 Class 來更改控制項的外觀，以及讓訊息顯示或隱藏。

很快就會看到那些效果。在這之前要確保在所有這三個表單控制項中都有 `ngModel` 以及相應的`name` 屬性。那就從 *Name* 輸入框開始吧：

``` html ./app/hero-form/hero-form.component.html ( 控制項加入 ngControl )
<input type="text" class="form-control" required
  [(ngModel)]="model.name"
  ngControl="name" >
```

對本範例來說，把這個 `name` 屬性設定為 "name" 會更容易理解。但也可以設定成任何唯一的值。

Angular 內部會建立 `FormControls` 並註冊在 `NgForm` directive 中，讓 Angular 附加在 `tag` 上。每個 `FormControl` 會被註冊在我們所設定的 name 屬性下面，關於 `NgForm` 的介紹，我們後面會再提到。

### Step 6. 新增自定義 CSS 來提供視覺反饋

**NgModel** directive 不僅僅跟蹤狀態。它還使用三個 CSS 的 Class 來更新控制項，以反應目前的狀態。

| 狀態        | 為真時的 CSS Class | 為假時的 CSS Class |
| --------- | -------------- | -------------- |
| 控制項已經被訪問過 | `ng-touched`   | `ng-untouched` |
| 控制項的值已經變化 | `ng-dirty`     | `ng-pristine`  |
| 控制項的值是有效的 | `ng-valid`     | `ng-invalid`   |

我們往姓名 `<input>` 標籤上新增一個名叫 **spy** 的臨時 [template 參考變數](https://angular.cn/docs/ts/latest/guide/template-syntax.html#local-vars)，然後用 spy 來顯示它上面的所有 CSS 的 Class。

現在，執行應用，並讓**姓名**輸入框在 Focus 的狀態。 然後按照下面四個步驟來做：

1. 查看輸入框，但別碰它
2. 點擊輸入框，然後點擊輸入框外的空白處
3. 在名字的末尾新增一個斜線
4. 刪除名字

動作和對應的效果如下：

![class test](images/angular2-forms-study/control-state-transitions-anim.gif)

可以看到下列四組 CSS Class 以及它們的變化：

![class test](images/angular2-forms-study/ng-control-class-changes.png)

當資料驗證失敗時，我們希望發出一個強力的視覺提醒並標記出必填欄位。因此在輸入框的左側新增一個帶顏色的色塊，透過 (`ng-valid` | `ng-invalid`) 這兩個 CSS Class 來進行裝飾。

![indicator](images/angular2-forms-study/validity-required-indicator.png)

在 hero-form 的資料夾下有 `hero-form.component.css` 檔案，針對這個元件新增兩個樣式如下：

``` scss ./app/hero-form/hero-form.component.css
.ng-valid[required] {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid {
  border-left: 5px solid #a94442; /* red */
}
```

這些樣式的選擇器分別為 Angular 驗證 Class 與 HTML 5 的 `required` 屬性。

### Step 7. 顯示和隱藏有效性驗證的錯誤訊息

「Name」 輸入框是必填的，清空它會讓左側的條變紅。這表示 **某些東西**是錯的，但不知道錯在哪裡，或者如何糾正。 我們可以透過 `ng-invalid` Class 來提供一個更明確的訊息。例如當姓名是空白的時後，可以在下方出現提示訊息：

![錯誤訊息提示](images/angular2-forms-study/name-required-error.png)

要實作這樣的效果，需要在template 做些調整，在控制項新增一個template 參考變數，並在下方加入一個提示訊息區塊，當驗證失敗的時候才會顯示。

``` html ./app/hero-form/hero-form.component.html 控制項新增樣板參考變數
<label for="name">Name</label>
<input type="text" class="form-control" required [(ngModel)]="model.name" ngControl="name" #name="ngForm">
<div [hidden]="name.valid || name.pristine" class="alert alert-danger">
  Name is required
</div>
```

我們需要一個 template 參考變數來存取 template 中輸入框的 Angular 控制項。 這裡建立了一個名叫`name` 的變數 ( #name ) ，並且把它設為 "ngModel" 。

為什麼是 "ngModel"？ 

Directive 的 [exportAs](https://angular.cn/docs/ts/latest/api/core/index/DirectiveMetadata-class.html#!#exportAs) 屬性會告訴 Angular 如何連接參考變數到 directive 中。 這裡我們把 `name` 設定為 `ngModel` 就是因為 `ngModel` 這個 directive 的 `exportAs` 屬性恰好是 「ngModel」。

現在，把 `div` 元素的 `hidden` 屬性繫結到 `name` 控制項的屬性，就可以控制 「姓名」 欄位錯誤訊息的顯示了。

``` html ./app/hero-form/hero-form.component.html 繫結 hidden 屬性
<div [hidden]="name.valid || name.pristine" class="alert alert-danger">
```

這個範例中，當控制項是有效或全新 ( pristine ) 時，我們要隱藏訊息。「全新」 意味著從它被顯示在表單中開始使用者從未修改過它的值。這種使用者體驗取決於開發或設計人員的選擇。有些人會希望任何時候都顯示這條訊息。 如果忽略了`pristine` 狀態，就會只在欄位值有效時隱藏此訊息。

#### 加入一個 Hero 並重置表單

我們希望在這個表單中加入一個新的 Hero。 先在表單的底部放一個 「 New Hero 」 按鈕，並且把它的點擊事件繫結到一個元件的方法上。

``` html ./app/hero-form/hero-form.component.html 新增紀錄按鈕
<button type="button" class="btn btn-default" (click)="newHero()">New Hero</button>
```

``` typescript ./app/hero-form/hero-form.component.ts ( 新增紀錄方法 )
newHero() {
  this.model = new Hero(42, '', '');
}
```

再次執行應用，點擊 **New Hero** 按鈕，表單被清空了。 輸入框左側的**必填欄位**豎條是紅色的，表示 `name` 和 `power` 屬性是無效的。 對必填欄位來說，這樣的方式簡單易懂。 錯誤訊息目前是隱藏的，這是因為表單還是全新的，我們還沒有修改任何東西。輸入一個名字，並再次點擊 **New Hero** 按鈕。 這次，我們看到了錯誤訊息！為什麼？當我們顯示一個新 ( 空白 ) 的 Hero 時，我們不希望如此。使用瀏覽器工具檢查元素就會發現，這個 **name** 輸入框並不是全新的。 更換了 Hero **並不會重置控制項的「全新」狀態 **。

由此可知，在這種實現方式下， Angular 沒辦法區分是替換了整個英雄資料還是用程式單獨清除了 `name` 屬性。 Angular 不能作出假設，因此只好讓控制項保留當前狀態—髒狀態 ( dirty state )。

這時候在元件新增一個 `active` 變數預設為`true` 。當我們新增一個新紀錄時，它把變數 `active` 設為 `false` ， 然後透過一個快速的`setTimeout` 函式迅速把它設定回 `true` 。

``` typescript ./app/hero-form/hero-form.component.ts ( 最終版 )
  active = true;

  newHero() {
    this.model = new Hero(42, '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
```

然後，我們把 form 元素繫結到這個 `active` 變數上。

``` html ./app/hero-form/hero-form.component.html ( Form 的部分 )
<form *ngIf="active">
```

在透過 `NgIf` 繫結到 `active` 變數之後，點擊 「 New Hero 」 將從 DOM 中移除這個表單，並在一眨眼的功夫重建它。 重新建立的表單處於 「全新」 狀態。錯誤訊息被隱藏了。這只是一個臨時的變通方案，將來我們還會有一個更合適的方案來重置表單。

### Step 8. 透過 **ngSubmit** 來送出表單

在填表完成之後，使用者要能送出這個表單。 「送出」 按鈕位於表單的底部，它自己不會做任何事，但因為 type 屬性是 **submit**，所以它會觸發表單送出。僅僅觸發 「表單提交」 在目前是沒用的。 還要用另一個 Angular directive 更新`<form>` 標籤，那就是 `NgSubmit` ， 並且透過事件繫結機制把它繫結到 `HeroFormComponent.submit()`方法上。

``` html ./app/hero-form/hero-form.component.html ( 新增 NgSubmit directive )
<form *ngIf="active" (ngSubmit)="onSubmit()" #heroForm="ngForm">
```

最後，我們定義了一個template 參考變數 **#heroForm** ，並且把它初始化為 "ngForm" 。這個 `heroForm` 變數現在引用的是 `NgForm` directive，它代表的是表單的整體。

#### NgForm directive

什麼 `NgForm` directive？ 我們沒有新增過 [NgForm](https://angular.cn/docs/ts/latest/api/common/index/NgForm-directive.html) directive 啊！

其實是 Angular 幫我們做了，它自動建立了 `NgForm` directive，並且把它附加到 `<form>` 標籤上。

`NgForm` directive 為普通的 `form` 元素擴充了額外的特性。 它持有我們透過 `ngModel` directive 和 `name` 屬性為各個元素建立的那些控制項 Class，並且監視它們的屬性變化，包括有效性。 它還有自己的 `valid` 屬性，只有當**每一個被包含的控制項**都有效時，它才有效。

### Step 9. 禁用此表單的送出按鈕，直到表單變為有效

template 中後的部分，透過 `heroForm` 變量，把按鈕的 `disabled` 屬性繫結到了表單的全員有效性。

``` html ./app/hero-form/hero-form.component.html ( 新增 disabled 屬性繫結到表單 )
<button type="submit" class="btn btn-default" [disabled]="!heroForm.form.valid">Submit</button>
```

重新執行應用。表單打開時，狀態是有效的，按鈕是可用的。

現在，刪除**姓名**。我們違反了 「必填姓名」 規則，它還是像以前那樣顯示了錯誤訊息來提醒我們。同時，「送出」 按鈕也被禁用了。

沒想明白？再想一會兒。如果沒有 Angular `NgForm` 的幫助，我們又該怎麼讓按鈕的禁用 / 啟用狀態和表單的有效性關聯起來呢？

有了 Angular ，它就是這麼簡單：

1. 定義一個template 參考變數，放在 ( 強化過的 ) form 元素上
2. 從 50 行之外的按鈕上引用這個變數。

### 切換兩個表單區域 ( 延伸學習 )

來實現一些更明顯的視覺效果。 隱藏掉資料輸入框，並且顯示一些別的東西。

先把表單包裹進 `<div>` 中，並且把它的 `hidden` 屬性繫結到 `HeroFormComponent.submitted` 屬性上。

``` html ./app/hero-form/hero-form.component.html
<div  [hidden]="submitted">
    <h1>Hero Form</h1>
    <form *ngIf="active" (ngSubmit)="onSubmit()" #heroForm="ngForm">

       <!-- ... all of the form ... -->

    </form>
  </div>
```

主表單從一開始就是可見的，因為 `submitted` 屬性是 false ，直到我們送出這個表單。來自`HeroFormComponent` 的程式碼片段告訴了我們這一點：

``` typescript
submitted = false;
onSubmit() { this.submitted = true; }
```

當我們點擊提交按鈕時， `submitted` 標誌會變成 true ，並且表單像預想中一樣消失了。

現在，當表單處於已送出狀態時，我們需要顯示一些別的東西。 在我們剛剛寫的 `<div>` 下方，新增下列 HTML ：

``` html
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div class="row">
    <div class="col-xs-3">Name</div>
    <div class="col-xs-9  pull-left">{{ model.name }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Alter Ego</div>
    <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Power</div>
    <div class="col-xs-9 pull-left">{{ model.power }}</div>
  </div>
  <br>
  <button class="btn btn-default" (click)="submitted=false">Edit</button>
</div>
```

它透過插值表達式繫結顯示為唯讀內容。 這一小段 HTML 只在元件處於已提交狀態時才會顯示。然後新增了一個 「編輯」 按鈕，它的 click 事件被繫結到了一個表達式來重設 `submitted` 為 false。當我們點它時，這個唯讀區塊消失了，可編輯的表單重新出現了。



## 結論

本章討論的 Angular 2 表單利用了下列框架特性來支援資料修改、驗證和更多操作：

- Angular HTML 表單template 。
- 帶有 `Component` 裝飾器的元件類別。
- 用來處理表單提交的 `ngSubmit` directive。
- template 參考變數，如 `#heroForm` 、 `#name` 、 `#alter-ego` 和 `#power` 。
- 用於雙向資料繫結、資料驗證和追蹤變更的 `[(ngModel)]` 語法
- 指向 input 控制項中參考變數上的 `valid` 屬性，可用於檢查控制項是否有效、是否顯示 / 隱藏錯誤訊息。
- 透過繫結到 `NgForm` 的有效性狀態，控制送出按鈕的禁用狀態。
- 對無效控制項，自訂 CSS Class 來為使用者提供視覺反饋。