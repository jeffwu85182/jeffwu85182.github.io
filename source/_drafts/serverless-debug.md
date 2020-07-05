---
layout: false
title: 初探 Serverless
categories: default
tags: note
date: 2020-07-04 15:48:02
---

## 關於 Serverless

顧名思義 Serverless 翻成中文就是**無伺服器**的意思，從架構的角度來上來，對於一個應用來說，是依賴第三方服務（例如：後端即服務：Backend as a Service, BaaS)，或是將程式碼交由託管，並在短生命週期的容器中執行（函式即服務：Function as a Service, FaaS)，目前在市面上最知名的平台就是 AWS 的 Lambda，[AWS Lambda](https://aws.amazon.com/tw/lambda/) 可以透過虛擬方式執行任何類型的應用程式或後端服務，全部免管理。只需上傳程式碼，Lambda 就會運用其高可用性來處理執行程式碼及擴展規模所需的各項工作。您可以將自己的程式碼設成可以從其他 AWS 服務自動觸發，或從任何 Web 或行動應用程式直接呼叫。

## 目前遇到的問題

Serverless 也不全都是優點，無論是在什麼樣的平台下，都存在一定程度的學習成本，像目前工作上使用的 AWS 服務，其中的 Cloudformation 也需要花點時間理解，而且在組織架構中有不同的執行角色以及權限管理，這部分以後有機會再筆記一番。因此，在相關的設置不完整的情況下，開發體驗是充滿挑戰的，後來找到了一個 Serverless framework，可以簡化了 Cloudformation 的一些內容。


## Debug 挑戰
由於工作上的開發是整合公司產品服務以及第三方服務例如: Slack, MSTeams...etc. 我們必須每次實際發布上去之後才知道運行的結果是否符合預期。

所以我嘗試尋找了相關的文章，並記錄下來。