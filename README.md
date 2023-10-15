# 展覽檢索平台

使用角色分為

1. 使用者(user 一般帳戶)
2. 策展單位(host 授權管理用戶)
    可授權工作人員帳戶(目前未設定)
    掃碼機器帳戶(用於登入顯示掃碼機器控制)
3. 後台管理者(admin)

## 主要開發目標：

使用者:
追蹤展覽
購買展覽票卷
搜索展覽
釋出快過期票卷(換點數)
QRcode 掃碼進場(目前使用手機端代表進場機器)

策展單位:
後台查詢販賣
工作人員(票卷特例情況)
現時進出場人數掌控
展覽相關販賣資料

後台管理者:
可以管理帳戶
觀看所有資料資訊
即時關閉不當用戶


# 啟動專案
```
npm install -g bun
```

```
 npm i
```


使用本地後端連線
```
 npm run dev
```

使用部署後端連線
```
npm run dev:server
```

後端API 可以參考(https://github.com/s339428326/Exhibition-server)

# 環境變數

請參考
https://github.com/s339428326/Exhibition-front-end/blob/main/.env.example
