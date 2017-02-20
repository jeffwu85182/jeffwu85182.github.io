---
title: Angular-CLI 設定 - Assets
date: 2017-02-20 20:05:51
category:
- Angular 2
tags:
- Angular 2
- Angular-CLI
---

## 介紹 assets 設定

我們在使用 Angular-CLI 進行開發的時候，一定要會設定 `.angular-cli.json`，為了協助大家了解，究竟 angular-cli 的設定檔中的屬性是要設定什麼？我直接參考 Github 的文件來為大家做介紹，就先從 `assets` 開始吧！

angular-cli.json 中的 assets 屬性存放的是一個陣列，這個陣列會列出有哪些檔案或資料夾是 angular-cli 在建置 ( `ng build` ) 時需要一起複製到專案輸出作為準備佈署的資料夾（ 預設是 `dist` ）中。

在新增專案時，預設的 assets 內容如下，意思是在建置時，路徑 `src/assets` 的目錄和檔案，以及 `src/favicon.ico` 的檔案會進行複製。

```json
"assets": [
  "assets",
  "favicon.ico"
]
```

除了以字串的型態表示之外，我們也能以物件的方式來做進一步的設定，底下的物件陣列和上方預設的內容是相同的：

```json
"assets": [
  { "glob": "**/*", "input": "./assets/", "output": "./assets/" },
  { "glob": "favicon.ico", "input": "./", "output": "./" },
]
```

`glob` 是一個叫 [node-glob](https://github.com/isaacs/node-glob) 的套件使用 `input` 來當作基礎目錄，以相對路徑的方式表示，`input` 相對於專案存放原始碼根目錄的位置，也就是相同檔案 `angular-cli.json`中的 `root` 屬性指定的路徑 ( 預設為 `src/` )，而 `output` 設定的是相對於建置後，輸出的檔案要存放的位置，也就是 `outDir` 屬性指定的路徑 ( 預設為 `dist` )。

相對路徑讓我們可以使用這些進階的設定方式，從專案外部的位置複製需要的資料夾或檔案，例如：從 node_modules 來複製需要的項目：

```json
"assets": [
  { "glob": "**/*", "input": "../node_modules/some-package/images", "output": "./some-package/" },
]
```

上方的範例指的是，當建置時，要從`node_modules/some-package/` 複製 `images` 資料夾及其內容到輸出的資料夾  `dist/some-package/` 中。

## 小結

透過 angular-cli.json 的 assets 設定，可以讓我們在建置時更有彈性，就不需要自己去尋找檔案做人肉複製貼上了！

### 參考來源

[Angular-CLI - asset-configuration](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/asset-configuration.md)

