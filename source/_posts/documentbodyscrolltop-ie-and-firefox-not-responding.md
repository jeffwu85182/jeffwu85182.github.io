---
layout: post
title: 'document.body.scrollTop IE 和 Firefox 沒作用'
date: 2014-09-17 05:57
comments: true
categories: [javascript, jquery, ScrollTop()]
---
今天寫 js 的效果時候，發現 document.body.scrollTop 在 Chrome、Opera 上都可以順利取得瀏覽器的top位置，

但是 IE、Firefox 卻完全沒有反應，console.log出來，捲軸怎麼滾就只是個 0 ，後來問了Google大神，

發現有其他的解決辦法。

只要換成 jQuery 的  **scrollTop()**  就都能正常運作了^^

記錄下來：

<!--more-->

工作上用到的一小段 code

``` js 

// called when the window is scrolled.
window.onscroll = function() {
   var scrollTop = $(document).scrollTop();
  if (scrollTop > 50) {
  	$('#nav').addClass('nav-shadow');
  } else if (document.body.scrollTop < 51) {
 		$('#nav').removeClass('nav-shadow');
  };
  
  if (scrollTop >= 3600) {
    TweenMax.to(".img_m_zip", .7, {
      opacity: 1,
      delay: 0.4,
      left: "10%",
      ease: "easeOut"
    });
  };
  
  if (scrollTop >= 4200) {
    TweenMax.to(".img_g_zip", .7, {
      opacity: 1,
      delay: 0.4,
      left: "13%",
      ease: "easeOut"
    });
  };
};

```

參考資料： [jQuery scrollTop() api](http://api.jquery.com/scrollTop/)