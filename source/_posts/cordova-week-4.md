---
title: "[Cordova Week-4] Cordova File System"
date: 2018-05-07 12:25:30
category:
- Cordova
tags:
- cordova plugin file
- file
- Cordova Android
---

## 前言

開發 App 的時候，時常會遇到要處理裝置中的圖片或檔案，一陣子沒有碰了，因此這次就來聊聊 Cordova App 中的 File System！Cordova 針對 File System 提供了核心套件 ( Core Plugin ) - `cordova-plugin-file`，主要實作了檔案操作相關的 API 使我們能讀寫裝置中的檔案，不同的平台，提供的屬性或方法都不盡相同，我們先從 Android 的部分開始介紹。



## 安裝套件

透過 Cordova CLI 進行安裝：

```bash
$ cordova plugin add cordova-plugin-file
```

在執行時期，若有正確引入 cordova.js，加入 `cordova-plugin-file` 後，會在全域屬性中找到 cordova.file 物件。所以我們可以在 javascript 的部分加入事件監聽 ( Event Listener )，並 console.log 物件確認是否有成功加入：

```javascript
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(cordova.file);
}
```



## 支援的平台

根據套件 Repo 提供的 `README`，目前支援的平台如下：

- Android
- iOS
- OS X
- Windows
- Browser

其中 Ｗindows 平台目前不支援 `FileReader.readAsArrayBuffer` 以及 `FileWriter.write(blob)` 的方法。 但這次的介紹主軸在於 Android & iOS，因此這部分有個基本的了解即可。

<!--more-->

## Entry：DirectoryEntry & FileEntry

在開始之前，需要先了解一下兩個名詞，主要在進行存取的時候一定會需要使用的入口 ( Entry ) 物件。

- DirectoryEntry：目錄的入口，透過 `window.requestFileSystem` 或 `resolveLocalFileSystemURL` 取得。
- FileEntry：檔案入口，透過 `directoryEntry.getFile()` 取得，若可取得即代表檔案有存在。
  - 若檔案存在則能順利取得物件實體，否則會收到錯誤 `FileError {code: 1}`，即 `NOT_FOUND_ERR`



## 引用 Types

由於我們使用 Angular + Cordova 進行 Hybrid App 開發，寫 Angular 習慣使用 `TypeScript`，負責維護 Cordova 核心套件的團隊也針對套件提供了好用的定義檔，我們只需要引入到 tsconfig.json (tsconfig.app.json) 即可：

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "es2015",
    "types": [
      "../hello/plugins/phonegap-plugin-push/types",
      "../hello/plugins/cordova-plugin-device/types",
      "../hello/plugins/cordova-plugin-file/types"
    ]
  },
  "exclude": ["test.ts", "**/*.spec.ts"]
}
```

範例的 Cordova 專案建立在 angular 專案根目錄下，利用相對路徑，進入 Cordova 專案目錄下的 `node_modules`，在套件加入的時候， `node_module` 會同時產生加入的套件，因此可以在這個目錄下看到加入過的套件，底下都會有 `types` 目錄，而裡面的檔案就是帶給我們更多方便的 types。



## 設定套件 (可選擇)

可透過 config.xml 新增標籤設定，限定特定位置開放存取操作，標籤中的 value 可參考上方 file-system layout 的項目列出來並以逗號隔開，代表只有列出的項目有安裝並開放存取。而在預設的情況下所有的 file-system root 都是啟用的。

```
<preference name="iosExtraFilesystems" value="library,library-nosync,documents,documents-nosync,cache,bundle,root" />
<preference name="AndroidExtraFilesystems" value="files,files-external,documents,sdcard,cache,cache-
```

### Android

- `files`: App 內部的檔案存取目錄
- `files-external`: App 外部檔案存取目錄
- `sdcard`: 全域的外部存取目錄（若有裝的話則是 SD 卡的根目錄），必須先取得 `android.permission.WRITE_EXTERNAL_STORAGE` 權限才能使用。
- `cache`: App 內部的快取目錄
- `cache-external`: App 外部的快取目錄
- `assets`: App 打包的檔案資料 (唯讀)
- `root`: 整個裝置的 file-system

Android 也支援一個特殊的 file-system，名叫 `documents`，這代表是在 `files` 的 file-system 根目錄下的 `Documents` 的子目錄名稱。

### iOS

- `library`: App 的 `Library` 目錄
- `documents`: App 的 `Documents` 目錄
- `cache`: App 的 `Cache` 目錄
- `bundle`: App 的 `bundle` 目錄，是 App 在磁碟中本身的位置 (唯讀)
- `root`: 整個裝置的 file-system

在預設的情況 `library` 與 `documents` 目錄可以同步到 iCloud ，我們也可以要求兩個 file-system，`library-nosync` 與 `documents-nosync`，代表這兩個 file-system 中不會同步到 iCloud 的目錄。



## 初始化目錄實體 ( DirectoryEntry Instance )

每次操作檔案或目錄時，我們需要透過物件實體進行操作，因此需要先進行初始化以取得物件實體，由於一開始是從 `cordova.file.externalDataDirectory` 取得，可以確認是 `DirectoryEntry` 而不是 `FileEntry`，如下的範例，並嘗試使用 Observable 實作：

```typescript
initRootDirectoryEntry() {
    this.resolveLocalFileSystemURL()
      .pipe(map(fs => (this.rootDirectoryEntry = fs)))
      .subscribe();
}  
private resolveLocalFileSystemURL(): Observable<DirectoryEntry> {
    return Observable.create((observer: Observer<DirectoryEntry>) => {
      window.resolveLocalFileSystemURL(
        cordova.file.externalDataDirectory,
        fs => {
          console.log(`resolved fs`, fs);
          this.title = 'file system is resolved';
          // this.rootDirectoryEntry = <DirectoryEntry>fs;
          observer.next(<DirectoryEntry>fs);
        },
        err => {
          console.log(`resolve error`, err);
          observer.error(err);
        }
      );
    });
  }
```

由於 TypeScript 提供了強型別的概念，這段程式碼直接引用的話，在開發時期，會遇到 `cannot find name cordova` 的問題，這時候只需要在檔案的最上方新增一行宣告即可使用：

```typescript
declare const cordova: Cordova;
```

至於 cordova.file 有哪些空間可以使用，可參考文件 [File-System-Layouts](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/#file-system-layouts) 的部分，有整理名稱與對應的裝置路徑。

## 存取檔案

存取檔案的方式是利用 `Entry` 提供的方法 `getFile()` 取得，若有檔案確實存在則會取得 FileEntry，反之則會收到錯誤訊息，若在 `getFile()` 加入設定參數 `{create: true}`，即使沒有檔案存在則一樣會建立檔案。

```typescript
createFile() {
    this.rootDirectoryEntry.getFile(
        'test.txt',
        { create: true }, // 若 create 為 flase，當檔案不存在時會發出錯誤。
        fileEntry => {
            console.log('fileEntry is file?' + fileEntry.isFile.toString());
            this.writeFile(fileEntry, null);
            this.myFileEntry = fileEntry;
        },
        error => console.log(`createFile Error`, error)
    );
}
```



## 建立檔案

建立檔案的方式與存取檔案一樣都是透過 `getFile` 方法進行，取得 `FileEntry` 後寫入檔案內容，寫入的方式是透過 `FileEntry` 提供的 `createWriter` 帶入 Callback Function，並在各個事件例如 `onwritteend`, `onerror` 實作對應的處理，最後則呼叫 `write()` 並帶入 `dataObj`：

```typescript
 createFile() {
    this.rootDirectoryEntry.getFile(
      'test.txt',
      { create: true },
      fileEntry => {
        console.log('fileEntry is file?' + fileEntry.isFile.toString());
        this.writeFile(fileEntry, null);
        this.myFileEntry = fileEntry;
      },
      error => console.log(`createFile Error`, error)
    );
  }

  private writeFile(fileEntry: FileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(fileWriter => {
      fileWriter.onwriteend = () => {
        console.log('Successful file write...');
        this.readFile(fileEntry);
      };

      fileWriter.onerror = e => {
        console.log('Failed file write: ' + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        dataObj = new Blob(['some file data'], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
    });
  }
```



## 讀取檔案

在寫入檔案的範例中，或許有注意到 `this.readFile` 方法的呼叫，這個是我們要自己實作一個讀取檔案的方法，一樣透過 `FileEntry` 進行，並取得 `file` 後 new 一個 `FileReader`，並註冊事件方法在 `onloadend`，最後再選用讀取的方法例如 `readAsText()` 並帶入取得的 `file` 物件：

```typescript
private readFile(fileEntry: FileEntry) {
    fileEntry.file(
        file => {
            const reader = new FileReader();

            reader.onloadend = result => {
                console.log('Successful file read: ', result);
                // displayFileData(fileEntry.fullPath + ": " + this.result);
            };

            reader.readAsText(file);
        },
        readFileError => console.log(`readFileError`, readFileError)
    );
}
```



## 刪除檔案

透過 `FileEntry` 提供的 `remove()` 方法即可刪除檔案：

```typescript
deleteFile() {
    this.myFileEntry.remove(
        () => console.log(`remove sucess`),
        error => console.log(`remove error`, error)
    );
}
```

從上述的例子中，有些有用 `private` 有些則沒有，主要區別提供 UI 呼叫的公開方法及 `component` 使用的私有方法。

## Android 相關注意事項

套件的說明文件中其中有一個段落在描述各平台的 `Quirks`，翻成中文是指『怪癖』，這邊我們就當作有些小奇葩的地方要留意囉。

### Android 持續存取的位置決定

在 Android 裝置上有許多可以持續儲存的空間，可以參考 [Android 官網文件](http://developer.android.com/guide/topics/data/data-storage.html) 延伸討論其可行性。先前的版本套件會在啟動的時候選擇暫存與永久檔案個別的位置，根據裝置是否有宣告安裝了SD卡（或等效的儲存分區），若有安裝 SD 卡，或有較大的內部儲存空間時，則會將檔案存取設定在該空間的根目錄上。換句話說，所有的 Cordova 應用都能看到所有在這張卡上的檔案，若有這樣的疑慮則要多留意了。

若 SD 卡無法使用時，之前的版本套件會將資料在 `/ data / data / <packageId>`下存取，這雖然能將各應用隔離，但還是有可能導致在不同的使用者間分享資料。

現在可以決定是否針對舊版的判斷邏輯來選擇要存取的空間，只需要透過以下兩行的其中一行加入到 Cordova 專案根目錄中的 `config.xml` 即可：

```xml
<preference name="AndroidPersistentFileLocation" value="Internal" />
<preference name="AndroidPersistentFileLocation" value="Compatibility" />
```

若沒有加入上述的其中一行時，預設的行為是 `Internal`，若有加入標籤但 `value` 卻不是這兩個的其中一個，則會導致 App 無法啟動，若是專案是早期的版本，並使用 `3.0.0` 之前版本的套件，而且已經發佈給使用者的話，就要將標籤加入至設定檔，並設定值為 `Compatibility`。若沒有這樣設定，直接切換到 `Internal` 的話，使用者更新之後可能會無法存取到先前操作所留下的檔案，這要視使用者的裝置而定。反之若是新的專案，則建議直接使用 `Internal` 囉。

### 遞迴處理 Android_assets 緩慢問題

若碰到需要處理列出 `android_assets` 資料夾相關遞迴操作時，會發現執行速度非常緩慢的情況，因此套件的 `src/android` 目錄下有提供 `build-extras.gradle` 的檔案，將檔案加至 Cordova platform android 根目錄即可提升速度，但 cordova-android 版本至少要 `4.0.0` 以上。筆者是還沒遇過這樣的操作需求，有遇過的大大可以分享一下。

### Android Marshmallow (android 6.0) 版本權限問題

當 Android 6.0，也就是棉花糖的版本中，預設的情況下是擁有 `cordova.file.applicationStorageDirectory` 以及 `cordova.file.externalApplicationStorageDirectory` 的讀寫權限的，套件並不需要針對這兩個存取空間去請求存取操作的權限，除非外部儲存空間並沒有安裝，由於系統限制的關係，當沒有安裝外部儲存時，就會跳出 `cordova.file.externalApplicationStorageDirectory` 空間的存取權限請求。筆者想嘗試還原情境，但試不出來，參考[這篇討論文](https://github.com/Microsoft/cordova-plugin-code-push/issues/57)，應該是要實體的裝置執行時才會遇到了。

## 錯誤代碼與意義

當有執行過程產生錯誤時，會丟出下方列表中的錯誤：

| Code | Constant                      |
| ---- | ----------------------------- |
| 1    | `NOT_FOUND_ERR`               |
| 2    | `SECURITY_ERR`                |
| 3    | `ABORT_ERR`                   |
| 4    | `NOT_READABLE_ERR`            |
| 5    | `ENCODING_ERR`                |
| 6    | `NO_MODIFICATION_ALLOWED_ERR` |
| 7    | `INVALID_STATE_ERR`           |
| 8    | `SYNTAX_ERR`                  |
| 9    | `INVALID_MODIFICATION_ERR`    |
| 10   | `QUOTA_EXCEEDED_ERR`          |
| 11   | `TYPE_MISMATCH_ERR`           |
| 12   | `PATH_EXISTS_ERR`             |