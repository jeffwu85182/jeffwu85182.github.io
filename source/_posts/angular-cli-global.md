---
title: Angular-CLI 設定 Global
date: 2017-02-21 21:09:57
category:
- Angular 2
tags:
- Angular 2
- Angular-CLI
---

## 介紹 Global 設定

上次介紹了 assets 的設定，讓我們不需要再逐一的人肉複製檔案，這次來介紹一下透過 Angular-CLI 進行開發的專案，在全域上相關的設定，主要有三種：`Global Library Installation`, `Global Scripts`, `Global Styles`。接下來我一樣參考 Github 上的文件來做介紹。藉此讓大家可以更了解 Angular CLI 的設定，以節省時間及方便專案內容的管理。

{% img /cover.jpg %}

<!--more-->

### Global Library Installation

顧名思義就是全域的 JS 程式庫 ( Library ) 安裝，例如：相信大家一定很常用的 `jQuery`, `Bootstrap` 等 Framework，像這類 Framework 或 Library 通常需要在 html 中加入 `script` 標籤來進行載入到全域的 scope 下，而我們可以透過 Angular-CLI 的 JSON 設定檔做設定，我們知道 JSON 的格式本身就和 JS 的物件格式是一樣的，都有屬性 ( Property ) 與值 ( Value )，因此這邊我們可以使用 `.angular-cli.json` 中的 `apps[0].scripts` 以及 `apps[0].styles` 的屬性來進行設定。

就以 Bootstrap 4 來當範例吧，要使用 Bootstrap 4 之前，我們需要先做一些前置準備：

首先，透過 `npm` 來安裝 Bootstrap 4：

```
npm install bootstrap@next --save
```

安裝完成後，將需要的 script 檔案加到 `apps[0].scripts` 屬性的陣列中：

```json
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/tether/dist/js/tether.js",
  "../node_modules/bootstrap/dist/js/bootstrap.js"
],
```

最後再加上 Bootstrap 的 CSS 檔案到 `apps[0].styles` 屬性的陣列中：

```json
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "styles.css"
],
```

如果這時候 ng serve 正在執行的話，請重新執行 `ng serve` ，然後試著在 Template 中加入我們熟悉的 Bootstrap 元件預覽看看囉，未來若有其他的程式庫要加入，也是一樣的方式加入即可，就是這麼的輕鬆方便 :)

### Global Scripts

除了全域的框架或程式庫外，如果自訂的 JS 檔也要在 `index.html` 中新增 `script` 標籤在全域執行的話，加入的方式和上方介紹如何加入 Bootstrap 的方式是相同的。

例如 Google 分析 ( Google Analytics ) 或 FB SDK 等等相關的程式碼片段，要加入的話一樣在 `apps[0].scripts` 的屬性陣列中加入檔案的路徑即可：

```json
"scripts": [
  "global-script.js",
],
```

我們也可以在建置輸出的時候進行檔名的變更，或者需要延遲載入的時候，可以使用以下的物件格式加到 `apps[0].scripts` 的陣列中：

```json
"scripts": [
  "global-script.js",
  { "input": "lazy-script.js", "lazy": true },
  { "input": "pre-rename-script.js", "output": "renamed-script" },
],
```

`input` 指的是目標文件的路徑及檔名，`output` 則是要輸出的路徑及檔名，`lazy` 則是帶布林值，設定是否延遲載入。

### Global Styles

透過 Angular-CLI 建立的空專案中，預設提供一個 `styles.css` 檔案，這個檔案主要是提供使用者加入全域的 CSS 樣式並且支援 CSS imports 的功能，當然，在前端開發，CSS 預處理器 ( CSS Preprocessor ) 相信是大家的好朋友，少了它，要進行切版真的會很不方便~~藍瘦香菇~~，因此在建立空專案的時候，記得要加上 `--style=scss` 的參數，一樣的方式，你也能選擇 `sass/less/styl` 等熟悉的預處理器，讓你能愉快的進行切版。

我們一樣可以透過`.angular-cli.json` 中的 `app[0].styles` 屬性加入其他的全域樣式，這些樣式檔會在執行的時候，以新增 `link` 標籤進行讀取，載入到 `index.html` 中：

```json
"styles": [
  "styles.css",
  "more-styles.css",
],
```

我們也可以和 `scripts` 的設定一樣，以物件格式來設定變更檔名及延遲載入的需求：

```json
"styles": [
  "styles.css",
  "more-styles.css",
  { "input": "lazy-style.scss", "lazy": true },
  { "input": "pre-rename-style.scss", "output": "renamed-style" },
],
```

透過 Angular-CLI 的自動化設定，協助我們節省很多瑣碎的時間，這些時間久了湊起來也是可以做很多事情的，除了努力工作之外，更要學會如何聰明工作，這也是很重要的一門課題喔！

以上這些介紹，希望可以為大家節省更多時間，寫出可讀性高，漂亮又好維護的程式碼 XD

### 參考資料

- [Angular-CLI - global-lib.md](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/global-lib.md)
- [Angular-CLI - global-scrips.md](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/global-scripts.md)
- [Angular-CLI - global-styles.md](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/global-styles.md)