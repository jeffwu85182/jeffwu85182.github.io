---
title: 讓萬惡的舊 IE 支援 Angular 2
date: 2017-02-19 09:41:27
category:
- Angular 2
tags:
- Angular
- Polyfill
- FuxkIE
---

## 萬惡的根源

西元 2017 年，在網站技術蓬勃發展的情況下，各種技術不斷的推陳出新，目的讓網站的效能變得更好，開發模式的優化，對使用者的使用經驗變得更友善，但，世界不可能是完美的，有個萬惡的根源到現在都還無法根除，它讓許多開發者曾經頭痛不已，每次認為告一段落的時候，它，總是會讓許多網站開發者面臨絕望，它就是 **Internet Explorer** 瀏覽器。

Angular 2 也是一樣，對於舊版的 IE 預設的情況下是沒有支援的，但生命總是會找到屬於自己的出口，在許多熱情的開發者不斷的努力情況下，出現了針對讓舊版瀏覽器支援新程式碼的函式庫，我們稱這些套件為 **Polyfill**。

<!-- more -->

{% img http://i.imgur.com/cdI1K9o.jpg "'你以為你做完了？不，你還有 IE 要處理'" "'你以為你做完了？不，你還有 IE 要處理'" %}

## Angular 2 Polyfill

根據 Angular 官網的技術文件中瀏覽器支援說明的部分，目前最多能支援到 IE 9：

{% img /angular-browser-support.png "'Angular 2 目前對於各版本瀏覽器的支援度一覽'" %}

Angular 2 是基於最新的 web paltform 標準進行開發的，要能支援多樣的瀏覽器版本著實是一大挑戰，因為這些瀏覽器不一定能支援現代瀏覽器的所有新功能，而我們在專案開發時，若遇到支援 IE 的需求也不得不勇敢的面對，而我們可以藉由在 `index.html` 載入 **Polyfill** 來補足一些舊版瀏覽器不支援的功能，如下：

```html
<script src="node_modules/core-js/client/shim.min.js"></script>
```

除了對特定瀏覽器缺少的功能加入 polyfill 之外，若有使用到其他功能但舊版瀏覽器不支援的情況，也需要再額外加入 polyfill，以下的表格可以協助你了解對於缺少的功能來加入特定的 polyfill 進行讀取，而這些特定的 polyfill 則依據我們設定的瀏覽器相容範圍以及有使用到的功能來進行追加的動作。

這些建議的 polyfill 是官網建議已知能讓 Angular 應用完整執行的項目，也有可能有用到其他功能是不在這清單上的，要知道，這些 **polyfill 是沒有神奇魔力可以讓一個又老又慢的瀏覽器變的跟新的一樣快**。

### 必裝的 polyfill

要能正常執行 Angular 應用，這些 polyfill 是一定要加入在每個支援的瀏覽器上的：

| Polyfills required                       | Browsers (desktop & mobile)           |
| ---------------------------------------- | ------------------------------------- |
| None                                     | Chrome, Firefox, Edge, Safari 9+      |
| [ES6](https://github.com/zloirock/core-js) | Safari 7 & 8, IE10 & 11, Android 4.1+ |
| [ES6classList](https://github.com/eligrey/classList.js) | IE9                                   |

### 選擇性功能以及搭配的 polyfill

Angular 中的一些功能可能會需要額外的 polyfill，例如，`animation library` 依靠標準的 web animation API，目前只有 Chrome 以及 Firefox 存在，因此若需要在其他瀏覽器使用 animations，我們就需要加入 polyfill 來支援。以下這些功能可能需要額外加入 polyfill：

| Feature                                  | Polyfill                                 | Browsers (desktop & mobile)              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| [Animations](https://angular.io/docs/ts/latest/guide/animations.html) | [Web Animations](https://angular.io/docs/ts/latest/guide/browser-support.html#web-animations) | All but Chrome and FirefoxNot supported in IE9 |
| [Date](https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html), [currency](https://angular.io/docs/ts/latest/api/common/index/CurrencyPipe-pipe.html), [decimal](https://angular.io/docs/ts/latest/api/common/index/DecimalPipe-pipe.html) and [percent](https://angular.io/docs/ts/latest/api/common/index/PercentPipe-pipe.html) pipes | [Intl API](https://github.com/andyearnshaw/Intl.js) | All but Chrome, Firefox, Edge, IE11 and Safari 10 |
| [NgClass](https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html) on SVG elements | [classList](https://github.com/eligrey/classList.js) | IE10, IE11                               |
| [Http](https://angular.io/docs/ts/latest/guide/server-communication.html) when sending and receiving binary data | [Typed Array](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js) [Blob](https://github.com/eligrey/Blob.js)[FormData](https://github.com/francois2metz/html5-formdata) | IE 9                                     |

### 建議的 polyfill

這些是用在測試框架本身的 polyfill，可以參考上表的 Angular 功能以及要支援的瀏覽器來選擇：

| Polyfill                                 | Licence               | Size*  |
| ---------------------------------------- | --------------------- | ------ |
| [ES6](https://github.com/zloirock/core-js) | MIT                   | 27.4KB |
| [classList](https://github.com/eligrey/classList.js) | Public domain         | 1KB    |
| [Intl](https://github.com/andyearnshaw/Intl.js) | MIT / Unicode licence | 13.5KB |
| [Web Animations](https://github.com/web-animations/web-animations-js) | Apache                | 14.8KB |
| [Typed Array](https://github.com/inexorabletash/polyfill/blob/master/typedarray.js) | MIT                   | 4KB    |
| [Blob](https://github.com/eligrey/Blob.js) | MIT                   | 1.3KB  |
| [FormData](https://github.com/francois2metz/html5-formdata) | MIT                   | 0.4KB  |

## 透過 Angular-CLI 設定 Polyfill

若專案是透過 Angular-CLI 進行開發，你或許會覺得奇怪，為什麼我們新增完專案後直接 `ng serve` 後就能馬上在瀏覽器上看到了？原來，在我們使用 `ng new` 建立專案的時候，Angular-CLI 已經在專案目錄下新增了一個名為 [`polyfills.ts`](https://github.com/angular/angular-cli/blob/137a0dea183d48b28bdec2d1e65b3a9addcd812c/packages/%40angular/cli/blueprints/ng2/files/__path__/polyfills.ts) 的檔案，其實這個檔案的內容已經準備好相關的 polyfill 了，而且上面還有很親切的註解，我們只要針對需要用到的 import 項目解除註解即可 。

## 小結

最近筆者在專案開發上遇到要支援 IE 9 的需求，一開始我們針對瀏覽器顯示的錯誤訊息來尋找對應的 polyfill，殊不知 [Angular 官網文件](https://angular.io/docs/ts/latest/guide/browser-support.html)已經有提到舊版瀏覽器支援的問題，按照官網技術文件的提示，將有使用到的 Angular 功能逐一補上 polyfill，總算能正常執行了 Orz，後來在 Angular CLI 建立的專案中發現預設已經有提供 polyfills.ts，忽然有一種繞了一圈的感覺，但，事情能順利解決最重要啦 XD 畢竟這些都是一趟努力的旅程，LOL

### 參考資料



- [An easier way of using polyfills](https://hacks.mozilla.org/2014/11/an-easier-way-of-using-polyfills/)
- [Angular-CLI polyfills.ts](https://github.com/angular/angular-cli/blob/137a0dea183d48b28bdec2d1e65b3a9addcd812c/packages/%40angular/cli/blueprints/ng2/files/__path__/polyfills.ts)
- [Angular.io - Browser Support](https://angular.io/docs/ts/latest/guide/browser-support.html)