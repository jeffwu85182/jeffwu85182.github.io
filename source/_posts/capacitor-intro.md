---
title: Capacitor - The Native Bridge for Cross-Platform Web Apps
date: 2018-12-03 20:16:22
tags:
- capacitor
- hybrid app
- ionic 4
---

{% asset_img capacitor-logo.jpg %}

## Hybrid App

談到 `Hybrid App` 你會想到什麼呢？大部分的人都一定會想到 Phonegap 或是 Cordova 吧，這些框架讓我們可以將 Web 封裝成 App 的形式，並且能夠在行動裝置的作業系統上運作，例如 Android, iOS 等主流的行動平台。並且讓我們透過各種原生的 plugin 的方式，以一份原始碼能夠在不同平台上執行的目的，提供開發者更有效率且容易維護的一套解決方案。而 Capacitor 呢？

## Native Progressive Web Apps

Capacitor 的靈感來自其他熱門的跨平台工具例如： [React Native](http://facebook.github.io/react-native/) 以及 [Turbolinks](https://github.com/turbolinks/turbolinks) ， 並繼承 [Apache Cordova](https://cordova.apache.org/) 和 [Adobe PhoneGap](https://phonegap.com/) 的精神，完全專注於使現代的網站應用能很簡單的在目前主流的平台上執行。同時也向後兼容許多現有的 [Cordova plugins](https://cordova.apache.org/plugins/)。要入門 Capacitor 其實是相當簡單，馬上就來試試看吧。

<!--more-->

## Installing Capacitor

開始的方式有兩種，直接在現有的前端專案下加入 Capacitor，或是直接建立一個全新的專案。Capacitor 主要是設計成在現有的專案下生成，如果想要以全新的專案開始，也會提供簡單的初始專案架構。Capacitor 提供了一個原生行動平台的 runtime 以及可在網頁應用呼叫的 API。但沒有提供像是遊戲開發所需的特定 UI 控制元件。官方強烈建議使用行動平台的前端框架 ( 例如 [ionic](https://beta.ionicframework.com/docs/) ) 來作為初始化專案，儘管全新初始化的專案有提供完全空白且沒有前端 UI 框架的應用，但以 ionic 建立的起始專案就可以建置生產就緒的 Native App 以及漸進式網站應用 ( PWA ) 。

### 確認所需的相依套件是否有安裝

由於跨平台的原因，所需要的相依套件或環境主要視我們鎖定要支援的平台情況而定，基本所需的就是 [Node v8.6.0](https://nodejs.org/) 以上，NPM 5.6.0 以上 ( 一般安裝 node 之後就會一起安裝了 )。至於 yarn 的部分，目前官方並沒有正式支援使用 yarn 進行安裝，也尚未針對 yarn 提供修復或開放提交相關問題的支援，因此建議還是先使用 node & npm 來進行安裝。至於要執行在哪些平台，以及其相依的準備，整理在下方：

#### iOS 開發

需要 MacOS 以及 Xcode 9 以上。如果你只有 Windows，可以利用 [Ionic Pro](http://ionicframework.com/pro) 建置 iOS 應用。此外還需要安裝 [CocoaPods](https://cocoapods.org/) 以及 **Xcode Command Line tools**

安裝 CocoaPods：

```bash
sudo gem install cocoapods
```

安裝 **Xcode Command Line tools** 除了直接安裝 Xcode 就有內建之外，也可以利用指令安裝：

```bash
xcode-select --install
```

CocoaPods 安裝完成之後，為了確保相依的版本是最新版的，我們需要定期的執行更新的指令：

```bash
pod repo update
```

通常 Capacitor 支援的 iOS 版本為最後的兩個版本，例如 iOS 10 & iOS 11，未來如果要支援舊的版本，就需要安裝舊版的 Capacitor ( 如果可用的話 )。

#### Android 開發

首先要安裝 **Java 8 JDK** 並設定為預設，如果已經有安裝其他版本的話，須留意。至於 Java 9 目前還不能正常運作。此外還需要安裝 [Android Studio](https://developer.android.com/studio/index.html) 的 Android SDK，技術面來說，Android Studio 不是必須的安裝項目，因為也能透過 Android CLI 的方式進行，但為了使建置與執行應用更簡單，官方強烈建議使用 Android Studio。

Capacitor 在 Android 的版本支援上比 iOS 稍微複雜了些，目前鎖定的 API level 為 21 以上，相當於支援 Android 5.0 ( Lollipop ) 以上。在 2018 年一月時，統計的 Android 版本中，5.0 以上的使用者超過 75%，而且這個成長幅度相當快，因此官方認為當 Capacitor 可以準備推出正式版的時候，這個百分比會變得更高。同時，Capacitor 需要的 Android Webview 版本至少為 Chrome 50 以上。

#### Electron 開發

使用 Electron 開發並沒有特定相依需要安裝。

### 在現有的 Web 專案下加入 Capacitor

由於 Capacitor 是設計成能夠直接在現有的 JS Web 專案中加入，因此要加入 Capacitor，我們必須先進入現有的 Web 應用專案，並安裝所需的套件。

```bash
cd my-app
npm install --save @capacitor/core @capacitor/cli
```

進入現有的 Web 應用專案目錄並安裝完成後，執行初始化指令：

```bash
npx cap init
```

這個指令會提示輸入 App 的資訊例如，App 名稱、要使用在 Android 平台的 App ID 以及要產生的目錄名稱。輸入完之後即完成初始化。

### 使用 Capacitor Starter 搭配 Ionic Framework

未來即將整合至 ionic CLI，目前先以 `ionic start` 產生新的專案，初始化之後依照上方的初始化流程加入 Capacitor 專案。新增後可以接著在 ionic 專案目錄下執行建置 `ionic build`，建置完成後進入新增的 capacitor 專案目錄中。

#### Android 

首先要加入 Android 平台到 capacitor 目錄：

```bash
npx cap add android
```

接著進行同步，同步的內容主要為將外部的 dist 檔案內容複製到 `www` 目錄下，並檢查有無新的原生套件。

```bash
npx cap sync
```

我們也可以只更新建置好的 web 內容：

```bash
npx cap copy
```

若沒有新的原生相依套件需要更新，使用 `copy` 可以加快更新的速度。接著打開 Android Studio 並進行建置：

```bash
npx cap open android
```

#### iOS

和上方的順序一樣，只需要將 `android` 的部分改成 `ios` 即可。



## 小結

透過以上的介紹，來初步了解 Capacitor 的初始化以及建置的流程，之後再找時間整理各平台可能較容易遇到的錯誤問題。



Reference

[Capacitor](https://capacitor.ionicframework.com/)
[Capacitor document](https://capacitor.ionicframework.com/docs/)

