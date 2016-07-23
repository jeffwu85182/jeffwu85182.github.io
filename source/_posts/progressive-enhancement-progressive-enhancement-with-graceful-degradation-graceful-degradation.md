---
layout: post
title: '漸進增強 (progressive enhancement)與優美退化 (graceful degradation) '
date: 2014-06-18 06:43
comments: true
categories: 
---
#1.觀念部分
在動手開發軟體時，通常我們會先考慮的問題就是使用者將在何種設備、系統、平台以及這些係同平台的版本使用它，最後決定一個方向，開始開發。
以開發網站為例，目標使用者可能會使用IE, Chrome, Firefox 甚至是行動裝置上瀏覽器來使用這個網站
可能問題如下：

* 是否支援所有瀏覽器？
* 是否針對先進瀏覽器增強使用經驗？
* 主要功能支援就好？
* 完全支援開發成本比較高？
* 需要顧慮到這麼多瀏覽器好麻煩？

這些問題通常有兩種作法，分別為「優雅降級」、「漸進增強」。
以下分別會介紹兩者的概念，以及它們之間的不同到最後實際應用時我們該如何決策。

<!--more-->


#何謂優雅降級 (Graceful Degradation)
> *Progressive enhancement is a strategy for web design that emphasizes accessibility, semantic HTML markup, and external stylesheet and scripting technologies. - wiki*

**優雅降級（Graceful Degradation）**就是在一開始建構一個系統或網站時，就針對最新、最完善的環境來設計，然後針對其它環境進行測時與修復。使用這個方案時，我們首先會挑選一個較完善的平台完成所有的功能和經驗，然後再針對無法支援所有功能的平台或環境撰寫候選方案，讓那些較舊的平台不致於無法使用主要的功能。

這種作法是在主要的環境上
**提供「最好的使用者經驗」，「簡陋卻無妨 (poor, but passable)」**
是看待那些**被認為過時或功能有缺失的平台** 的方式。

Craig Buckler在Sitepoint上也提出類似的看法
> *Graceful degradation is one solution. It is the practice of building a web site or application so it provides a good level of user experience in modern browsers. However, it will degrade gracefully for those using older browsers. The system may not be as pleasant or as pretty, but the basic functionality will work on older systems. - Craig Buckler*

#何謂漸進增強 (Progressive Enhancement)
> *Progressive enhancement is similar concept to graceful degradation but in reverse. The web site or application would establish a base-level of user experience for most browsers. More advanced functionality would then be added when a browser supports it. - Craig Buckler*

**漸進增強(Progressive Enhancement)**
就是從最基本的功能出發，在保證系統在任何環境中的可用性的基礎上，逐步增加功能及提高使用者經驗。
**漸進增強**首先考慮到的是一般性，必須提供所有的平台完整的功能，然後再去針對較新的平台進行改良與優化。
簡單來說，**先求有、再求好**

上述兩種做法的選擇，主要在於視當時的需求情況來進行選擇，有好有壞。

例如建立一個完美支援所有平台的應用程式是一個理想的情況，然而那是不太可能的。
開發過程中有技術、預算、工作時程等問題，那麼要做的就是去「需求評估」，從需求開始。
如果要開發一個電子商務平台，使用「漸進增強」可能會是個好的方法；
如果要開發線上互動會議系統，完美的平台支援相對就沒那麼重要了。

#成本的花費
使用**漸進增強**的方法需要更多的時間、人力、資源開發，初期開發成本較高，但是能提供更好的穩定性以及平台支援，以長期來說反而減少維護、開發成本。

使用**優雅降級**的方法，開發初期僅需要把所有火力集中在一個平台上，迅速的開發出產品的雛形，進行市場試水溫的測試，對於功能尚未確定的產品來說，使用優雅降級的方式也許能夠節省資源不必要的浪費。

#參考資料

* [Progressive_enhancement Wiki](http://en.wikipedia.org/wiki/Progressive_enhancement)
* [Progressive Enhancement and Graceful Degradation: an Overview](http://www.sitepoint.com/progressive-enhancement-graceful-degradation-basics/)
* [Progressive Enhancement and Graceful Degradation: Making a Choice](http://www.sitepoint.com/progressive-enhancement-graceful-degradation-choice/)
* [fatesinger](http://fatesinger.com/archives/764.html)
* [web前端開發](http://www.candoudou.com/archives/481)
* [yrzhll.com](http://yrzhll.com/blog/2013/01/06/web/)
* [優雅降級和漸進增強 - 血鐵藍獅](http://hanazawakana.iteye.com/blog/1711556)
* [Augus's Blog](http://augus-blog.logdown.com/posts/143403-graceful_degradation_and_progressive_enhancement)


