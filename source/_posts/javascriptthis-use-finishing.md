---
layout: post
title: ' Javascript：this用法整理'
date: 2014-07-14 13:04
comments: true
categories: [javascript]
---
看到不錯的文章，轉貼過來紀錄做個分享。
轉貼來源：https://software.intel.com/zh-cn/blogs/2013/10/09/javascript-this

常用Javascript的人都知道，［this這個關鍵字在一個函式內究竟指向誰］的這個問題很令人頭大，這裡整理了一下Javascript中this的指向的五種不同情況，其中前三種屬於基本的情況，而後兩種情況可基於前三種情況的方式來進行思考。



#1.this指向於調用該函式之物件

如果你有學過C/C++，你可能會記得一個物件內的成員函式裡的this指的即是該成員函式所在之物件，但在Javascript裡則有那麼些許不同，Javascript裡的this看的是究竟是誰調用該函式，而不是看該函式被定義在哪個物件內，這個大原則抓到了，基本上就已經可以探知this的奧秘了。底下寫一下這種情況的公式與範例： 

<!--more-->

公式
```
物件.函式(); //函式內的this指向該物件
```

範例

```js
var obj = {
	x: 20,
	f: function(){ console.log(this.x); }
};

obj.f(); //由於調用f函式時，點前面物件為obj，故f內的this指向obj，則輸出為20。

obj.innerobj = {
	x: 30,
	f: function(){ console.log(this.x); }
};

obj.innerobj.f();  //由於調用f函式時，點前面物件為obj.innerobj，故f內的this指向obj.innerobj，則輸出為30。

```

#2.this指向全域物件(瀏覽器：window物件、node.js：GLOBAL物件)

如果調用函式的前方並未有物件，則函式內this就指向全域物件。在瀏覽器內全域物件為window物件，而在node.js中全域物件則為GLOBAL物件。底下一樣寫一下這種情況的公式與範例：

公式
```
函式(); //函式內的this指向全域物件

```

範例
```js
var x = 10;
var f = function(){
	console.log(this.x);
};

f(); /*由於調用f函式時，前方並未有[物件.]的形式，故f內的this指向全域物件，則輸出全域變數的x(10)。*/
```
##<i>例外：在使用node.js時，若使用node file.js這樣的方式執行js檔，並不會讓宣告的全域變數掛在全域物件上(意指會利用function將code整個包起來執行)，故輸出應為undefined。</i>

#前兩種情況常見誤導範例
##範例一、物件之成員函式內有函式
```js
var x = 10;
var obj = {
	x: 20,
	f: function(){
		console.log(this.x);
		var foo = function(){ console.log(this.x); }
		foo(); // (2)
	}
};

obj.f();  // (1)

```
這個範例會輸出多少呢？別忘記大原則，在Javascript裡的this看的是究竟是誰調用該函式，故並不會輸出20 20，而是輸出20 10，為什麼呢？因為(1)obj.f()調用時，f前面物件為obj，故f內的this指向obj。但因為調用f內的(2)foo函式時是用foo()，調用的前方並未有物件，故foo內的this指向全域物件，所以輸出會是全域變數的x的值。

若要讓foo內使用obj.x的值，解法如下：
```js
var x = 10;
var obj = {
	x: 20,
	f: function(){
		console.log(this.x);
		var that = this; //使用that保留在這個函式內的this
		var foo = function(){ console.log(that.x); } //使用that取得obj
		foo();
	}
};

obj.f();
```

##範例二、借用函式
```js
var x = 10;
var obj = {
	x: 20,
	f: function(){ console.log(this.x); }
};

obj.f(); // (1)

var fOut = obj.f;
fOut(); //(2)

var obj2 = {
	x: 30,
	f: obj.f
}

obj2.f(); // (3)

```
範例中三次調用之函式的this所指向的物件為何，不知道各位能不能看得出來。雖然用的是同一個函式，但是因為調用的不同，故this所指向的物件就不同。(1)obj.f()的f所指向的是obj，這比較沒有問題，輸出的會是20；而(2)fOut()裡的this，則是因為調用時前方無物件，則this所指的是全域物件，輸出的會是10；最後(3)obj2.f()則是obj2去呼叫f，故f內的this指向的是obj2，輸出的會是30。

#3.this指向利用call或apply所指派給this的物件
有個方法可以更動前兩種敘述所讓this指派的值，就是利用call與apply。call與apply都是呼叫該函式並讓該函式的this指向給予call或apply的第一個參數。至於call和apply的差別則是在於其後面給予被調用之函式的參數放入的方法不同，一個是直接攤平放在第二個以後的參數；一個是直接放入一個裡面放要給予之參數的陣列。底下一樣看一下公式和範例：

公式
```
(A物件.)函式.call(B物件,參數1,參數2,參數3, ......); //函式的this指向B物件(若B物件為null，則指向全域物件)
(A物件.)函式.apply(B物件,[參數1,參數2,參數3, ......]); //函式的this指向B物件(若B物件為null，則指向全域物件)
```

範例
```
var obj = {
	x: 20;
	f: function(){ console.log(this.x); }
};

var obj2 = {
	x: 30;
};

obj1.f.call(obj2); //利用call指派f的this為指向obj2，故輸出為30

```
#4.this指向new所產生之新物件
若將函式當作建構式(constructor)來用，則內部的this則指向於new所產生之新物件。
公式
```
new 建構式(); //建構式內之this指向new所產生之新物件
```
範例
```js
function Monster(){
	this.hp = 100;
};

var monster = new Monster(); //Monster的this指向new出來之新物件並回傳回來，new的寫法就類似於下面的寫法。
var monster = (function(){
	var _new = { constructor: Monster, __proto__: Monster.prototype }; //在IE內可能不相似
	_new.constructor(); //這也是為何說可以利用前三種情況來變化的原因，constructor呼叫時，this指向的即是_new這個物件。
	return _new;
})();

```
#5.callback函式內的this會指向於調用放入該callback的函式之this所指向之物件
先想想在jQuery中，我們若要讓#button這個元素被click的時候，內容改為“Clicked”這樣的字串，該如何寫呢？
```js
$('#button').click(function(){
	this.html("Clicked");
});

```
此時這個this居然會指向$(‘#button’)這個物件，感覺很自然，但實際想想會覺得很神奇。假設你寫一個function，它可以吃一個function，並在裡面呼叫傳入的function，你該怎麼寫呢？
```js
var f = function(innerf){
	//前面的處理
	innerf(arg1, arg2, arg3, ......);
	//後面的處理
}
```
但如果這樣寫的話，innerf裡的this根據前述規則就應該是全域物件了！那為什麼常常別人實作的callback函式可讓this指向於調用放入該callback的函式之this所指向之物件呢？這表示大家實作上會遵守一個規則，會將自己的this傳給callback當作它的this來用！這也是為什麼我說這個情況其實也是前三種情況的變化而已了！所以上面的code應該改成如下的形式會比較好：
```js
var f = function(innerf){
	//前面的處理
	innerf.call(this, arg1, arg2, arg3, ......);
	//或是innerf.apply(this, [arg1, arg2, arg3, ......])
	//後面的處理
}
```
來源：https://software.intel.com/zh-cn/blogs/2013/10/09/javascript-this