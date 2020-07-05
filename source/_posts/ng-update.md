---
title: 升級! 全新進化 Angular 6！
date: 2018-05-05 16:28:43
categories:
- Angular
tags:
- Angular 6
- angular/cli
- ng update
---

## 前言

Angular 終於發布 6.0 正式版了，當然馬上拿手邊的專案來升級啦！後面也順利升級完成了，[在論壇蓋大樓回報區](https://forum.angular.tw/t/topic/891)回報的同時，也在這紀錄一下。



## 使用 ng update 進行更新

首先更新了 `node_modules` 的 `@angular/cli`：

```bash
全域：yarn global upgrade @angular/cli@latest
專案目錄：yarn upgrade @angular/cli@latest
```
<!--more-->

接著輸入 `ng update` 進行檢查，ng update 會進行相關 package 分析，並提供建議與指令提示：
![ng update 會進行相關 module 的版本分析](step1.png)

根據分析結果先來升級 `@angular/core`：
```bash
ng update @angular/core
```
然後就等了快五分鐘...
看來大部分升級第一個會遇到的問題應該都是 typescript，畢竟不是時常會去動這個。
![可能遇到的錯誤訊息之一](step2.png)
or
![可能遇到的錯誤訊息之二](step3.png)

檢查 typescript 版本：
```bash
$ tsc -v
```
升級 typescript：
```bash
yarn upgrade typescript@2.7
```
輸入 angular cli 的升級指令進行確認：
```bash
ng update
```
![升級完成後並檢查版本](step4.png)

再輸入一次 `ng update`：
![](step5.png)

Good work!



接著最重要的 `ng serve` 死掉了：
![](step6.png)

原來 6.0 的設定檔名稱已經從原本的 `.angular-cli.json` 改成 `angular.json `了，要如何更新呢？一樣透過指令進行，在更新 `@angular/cli` 的時候會根據舊的設定檔重新建立 `angular.json`：
```bash
ng update @angular/cli
```
![ng update @angular/cli](step7.png)

再來一次！！
![重新 ng serve](step8.png)

`localhost:4200` 也確認無誤正常執行，以上。

參考資料：

[Angular blog : version-6-of-angular-now-available](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4)

[Update Angular](https://update.angular.io/)