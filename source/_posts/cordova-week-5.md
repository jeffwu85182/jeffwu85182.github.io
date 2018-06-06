---
title: "[Cordova Week-5] Cordova Plugin Geolocation"
date: 2018-06-03 15:52:20
category:
- Cordova
tags:
- cordova plugin
- geolocation
---

## 前言

來到了第五週，這次要介紹的功能也是時常會用到的，衛星定位功能，無論是在生活還是實務中，一定會用到的功能，因此 Cordova 官方也將 `cordova-plugin-geolocation` 列為核心套件並持續提供維護。套件支援的平台有 Windows, Android 以及 iOS，這次一樣針對 Android & iOS 的部分來做介紹。

## 安裝方式

安裝方式與前面幾篇介紹的一樣，透過 cordova cli 安裝套件：

```bash
$ cordova plugin add cordova-plugin-geolocation
```



## 初始化

在安裝並建置完成之後，套件會建立全域的物件 `navigator` 下的一個 `geolocation` 屬性，雖然是全域屬性，但與其它套件一樣，要在 `deviceready` 觸發之後才能開始使用，因此可以透過事件監聽的方式 console.log 物件：

```javascript
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}
```

<!--more-->



## 方法 ( Method )

`cordova-plugin-geolocation` 提供的方法有以下三個：

- navigator.geolocation.getCurrentPosition
- navigator.geolocation.watchPosition
- navigator.geolocation.clearWatch

### navigator.geolocation.getCurrentPosition

當成功取得裝置目前的位置資訊時會觸發 `geolocationSuccess` callback，並帶 `Position` 物件作為參數，若發生錯誤則會觸發 `geolocationError` callback 並帶有 `PositionError` 物件作為參數：

```javascript
navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                         [geolocationError],
                                         [geolocationOptions]);
```

- **geolocationSuccess**: 會帶入目前位置的 callback function
- **geolocationError**: *(Optional)* 當錯誤發生時會執行的 callback
- **geolocationOptions**: *(Optional)* 地理位置相關的選項設定

範例：

```javascript
// onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
```

#### iOS 注意事項

從 iOS 10 開始，若嘗試存取隱私敏感資料，則必須在 `info.plist` 提供使用說明，當系統提示使用者是否允許存取時，使用說明就會顯示在權限允許確認的視窗中描述。但如果沒有加入使用說明，App 會在顯示是否允許的視窗之前直接閃退，而且 Apple 也會拒絕沒有提供敏感資料使用說明的 App 上架。

這個套件加入資料存取使用說明的方式如下：

- `NSLocationWhenInUseUsageDescription` 是描述存取使用者位置的原因。

要將使用說明加入 `info.plist` 中，可以在 `config.xml` 中加入 `edit-config` 標籤：

```xml
<edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>需要存取位的說明放在這裡</string>
</edit-config>
```

#### Android 注意事項

若 Geolocation service 被關閉，且有設定 `timeout` 的話，則會觸發 `onError` callback，若沒有設定 `timeout` 則不會觸發 callback，因此若要在定位服務被關閉時執行相關動作，則需要留意是否有設定 `timeout`。



### navigator.geolocation.watchPosition

當檢測到位置發生變化時，回傳裝置目前的位置。當裝置檢測到新的位置時，則觸發 `geolocationSuccess` callback 並帶著 `Position` 物件作為參數執行；若發生錯誤，則觸發 `geolocationError` callback 並帶著 `PositionError` 物件作為參數執行。

```javascript
var watchId = navigator.geolocation.watchPosition(geolocationSuccess,
                                                  [geolocationError],
                                                  [geolocationOptions]);
```

和 `getCurrentPosition` 相同，可帶入三個參數，個別為：成功取得位置時 (`geolocationSuccess`)、發生錯誤時 ( `geolocationError`) 與套件設定物件 (`geolocationOptions`)。

#### 回傳值

這個方法呼叫執行後會回傳一個字串，主要是持續監視位置改變的 `watch id`，此 `id` 可用在當我們要停止持續追蹤時呼叫用的，也就是第三個方法 `clearWatch` 呼叫時作為參數帶入執行。

```javascript
// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
        'Longitude: ' + position.coords.longitude     + '<br />' +
        '<hr />'      + element.innerHTML;
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// Options: throw an error if no update is received every 30 seconds.
//
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
```



### navigator.geolocation.clearWatch

藉由 `watchID` 參數傳入並呼叫，以停止追蹤裝置的位置變化。其參數是由 `watchPosition` 呼叫後回傳的值。

```javascript
navigator.geolocation.clearWatch(watchID);
```

範例：

```javascript
// Options: watch for changes in position, and use the most
// accurate position acquisition method available.
//
var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });

// ...later on...

navigator.geolocation.clearWatch(watchID);
```



## 相關物件介紹

### geolocationOptions

在呼叫 `getCurrentPosition` 與 `watchPosition` 兩個方法時，帶入的第三個參數 `geolocationOptions` 主要有以下幾個屬性可設定：

```javascript
{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
```

- **enableHighAccuracy**：提供使 App 取得準確度更高的提示，預設的情況，裝置是藉由網路為基礎的方法取得 `Position`，設定此屬性為 `true` 以提醒可選用精度更高的方式，例如衛星定位。（Boolean）
- **timeout**：允許等待傳入參數並執行 `navigator.geolocation.getCurrentPosition` 或 `navigator.geolocation.watchPosition` 中的 `geolocationSuccess` callback 的最長時間（毫秒），若在設定的時間內未觸發 `geolocationSuccess` 則會帶入 `PositionError.TIMEOUT` 的錯誤碼，觸發 `geolocationError` callback，要注意到若是呼叫 `geolocation.watchPosition`，只要每次超過設定的時間就會觸發 `geolocationError`。(Number)
- **maximumAge**: 設定位置暫存時間，以毫秒為單位，預設為0，該值為0時，定位時會重新獲取一個新的 `Position` 物件；若有設定值則會在設定的時間內回傳上一次的暫存 `Position` 物件，如果超過設定的時間，則重新取得。 (Number)



### Position

由 `geolocation` API 所建立的物件，包含了位置 ( Position ) 的座標與時間戳。

#### 屬性

- **coords**: 一組位置的座標資訊。
- **timestamp**: 建立座標資訊的時間戳。



### Coordinates

A `Coordinates` object is attached to a `Position` object that is available to callback functions in requests for the current position. It contains a set of properties that describe the geographic coordinates of a position.

#### 屬性

- **latitude**: 緯度 *(Number)*
- **longitude**: 經度 *(Number)*
- **altitude**: 高度 *(Number)*
- **accuracy**: 座標經緯度的準確程度，單位為公尺 *(Number)*
- **altitudeAccuracy**: 座標高度的準確程度，單位為公尺 *(Number)*
- **heading**: 面對行徑的方向，以北為起始點順時針計算的度數 *(Number)*
- **speed**: 裝置目前的移動速度，單位為每秒公尺 *(Number)*

#### Android 注意事項

**altitudeAccuracy**: 不支援 Android，會回傳 `null`.



### PositionError

`PositionError` 物件會在 navigator.geolocation 發生錯誤時作為參數傳入 `geolocationError` callback 並觸發。

#### 屬性

- **code**: 如下列，預先定義好的錯誤代碼
- **message**: 描述關於錯誤發生的訊息內容

#### 常數

- ```
  PositionError.PERMISSION_DENIED
  ```

  - 當使用者不允許 App 存取座標資訊時會回傳，視平台而定。

  

- ```
  PositionError.POSITION_UNAVAILABLE
  ```

  - 當裝置無法取得座標時會回傳，一般來說都是未連接網路或沒有啟用定位功能。

  

- ```
  PositionError.TIMEOUT
  ```

  - 當裝置無法在指定的時間 ( `geolocationOptions` 中的 `timeout` ) 內取得座標資訊時回傳，若是透過 `navigator.geolocation.watchPosition` 方式取得，則在每次設定的 `timeout` 發生時，都會藉由 `geolocationError` callback 帶入並觸發。 



 ## 參考資料

[apache/cordova-plugin-geolocation](https://github.com/apache/cordova-plugin-geolocation)