---
title: Angular FormGroup 取得所有 formControl 的值
date: 2017-02-23 23:31:56
category:
- Angular 2
tags:
- Angular 2
- Forms
---

## 消失的欄位資料

最近在專案上遇到表單處理的問題，主要是 UI 上的需求是有條件的 disabled 控制項，換句話說，在某些情況下，指定的表單控制項在畫面上要是鎖定的狀態，但是在呼叫 API 的時候還是得要取得欄位鎖定的內容。強者我同事，在準備回傳給 API 的物件資料時，偶然發現到控制項在 disabled 的狀態下，FormGroup 是取不到 disabled 欄位 Value 的，究竟那消失的欄位到底是去哪了？明明在畫面上，DOM 也有值在裡面，為何就是取不到？

原來...欄位一直都在，從沒離開過。

<!--more-->

![消失的欄位到哪去了？](images/formGroup-getRawValue/missing.jpg)

雖然表單的控制項在畫面上是鎖住的狀態，但在 Call API 送資料的時候還是會用到，要如何取得因 disabled 而“被消失”的控制項的值呢？遇到這種感覺被雷雷的問題該怎麼辦？當然是先去查文件啦！

### 找回失蹤的欄位資料

原來，在預設的情況，Angular 的 `FormGroup` 為我們提供了貼心的過濾功能，它會默默地協（ㄌ ㄟˊ）助（ㄉㄠˋ）你，Angular 認為 Disabled 狀態下的 FormControl 是不需要在 FormGroup 的 Value 屬性中顯示的。

其實直接透過 FormControl 的 Value 是找得到資料的，若真的非要不可的話，只要有心你也可以直接去取得 disabled 的 FormControl Value。以 template-driven 開發模式舉例，在表單的 `fullname` 子群組下找到 firstName 的控制項並取值：

```typescript
f.form.controls.fullName.controls.first
```

但這樣會變得很長，我只是要取個值，而且還只有兩層的情況下就這麼長了...

好在，官方技術文件的 FormGroup 頁面介紹中，在底下的屬性及方法介紹的最後找到了一個方法：

#### getRawValue() : any

The aggregate value of the [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html), including any disabled controls.
取得整個 FormGroup 的值，包含任何被 disabled 的控制項。

> If you'd like to include all values regardless of disabled status, use this method. Otherwise, the `value `    property is the best way to get the value of the group.

相信看到這裡，真相也就水落石出了。如果想要取得表單子群組的所有值，包含 disabled 狀態的控制項，可以透過這個方法，但基本上使用 formGroup 的 `value` 屬性才是最好的取值方式。

### 小結

本日小品文感想，遇到問題時不要忙著靠直覺去亂寫，先去查查文件，或許答案就在裡面，甚至會有意想不到的收穫。

[參考範例](https://plnkr.co/edit/ASkNmDyvxaKx3V6rbNIM?p=preview)