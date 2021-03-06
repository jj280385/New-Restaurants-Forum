# 新版餐廳論壇 New Restaurants Forum 
## 預覽頁面畫面
![signin-page](https://github.com/jj280385/New-Restaurants-Forum/blob/main/readme/signin-1440px.png)
![home-page](https://github.com/jj280385/New-Restaurants-Forum/blob/main/readme/2560px.jpg)
![home-mobile](https://github.com/jj280385/New-Restaurants-Forum/blob/main/readme/home-575px.png)

## 專案介紹 Project Introduction
此專案運用Vue串接後端API，並具有RWD，使用者在此論壇註冊帳號，並且新增餐廳資料、評論餐廳等等功能，原版餐廳論壇為AC教案；此版本為新版餐廳論壇，為UI優化版，HTML的架構及Compontent皆有新增及調整，**歡迎點擊[此連結](https://jj280385.github.io/New-Restaurants-Forum/)並輸入下方測試用帳密體驗此專案**。

## 瀏覽專案 
測試用Email :
```
root@example.com
```

測試用Password :
```
12345678
```

## 專案個頁面詳細功能介紹 Page Introduction
* Singin & Singup 使用者登入與註冊
  - 使用者填入Email及Password登入論壇。
  - 點擊「Signup」按鈕註冊使用者資料。

* HOME 論壇首頁
  - 可瀏覽全部餐廳資料。
  - 可運用下方分頁按鈕切換分頁。
  - 點擊餐廳名稱可瀏覽個別餐廳詳細資訊。
  - 點擊「Add to collection」按鈕將該餐廳加入個人collection中收藏。
  - 點擊「LIKE」 按鈕對餐廳按讚。
  - 可點擊餐廳類別名稱篩選頁面要顯示哪種種類的餐廳。

 * 餐廳詳細資訊頁面
   - 頁面瀏覽餐廳名稱、類別、描述。
   - 點擊「Dashboard」按鈕瀏覽評論數量、瀏覽次數。
   - 點擊「Add to collection」按鈕將該餐廳加入個人collection中收藏。
   - 點擊「LIKE」 按鈕對餐廳按讚。
   - 瀏覽餐廳營業時間、連絡電話。
   - 下方文字輸入欄可評論該餐廳。
   - 若使用者身份為管理員，點擊「Delete」按鈕刪除評論。

 * LATEST NEWS 最新消息
    - 點擊 Newest Restaurants最新餐廳列表中餐廳名稱，可進入該餐廳詳細資訊頁面。
    - 點擊 Newest Comments最新評論列表中使用者名稱，可進入該使用者個人資料頁面。
 
 * TOP 10 RESTAURANTS 前10大入門餐廳
   - 點擊餐廳名稱可瀏覽個別餐廳詳細資訊。
   - 點擊「MORE」按鈕瀏覽餐廳詳細資訊。
   - 點擊「Add to collection」按鈕將該餐廳加入個人collection中收藏。

* FOODIES 美食老饕
   - 點擊使用者名稱，可進入該使用者個人資料頁面。
   - 點擊 「Follow」按紐追蹤該使用者。

* Admin System 後臺管理系統(若使用者身份為管理員才可進入)
  1. Restaurants頁面 :
  - 上方類別標籤切換頁面。
  - 點擊「Add New Restaurant」按紐填寫餐廳資料新增餐廳。
  - 點擊餐廳名稱可瀏覽個別餐廳詳細資訊。
  - 點擊「Show」按紐瀏覽餐廳簡易資訊。
  - 點擊「Edit」按紐編輯該餐廳資料。
  - 點擊「Delete」按鈕刪除該餐廳。
  2. Categories頁面 :
  - 輸入框中輸入類別名稱並點擊「Add」按鈕新增類別。
  - 點擊「Edit」按紐編輯該類別。
  - 點擊「Delete」按鈕刪除類別。
  3. Users頁面 :
  - 若使用者身份為管理員，點擊「set as admin」切換管理員身份。

* My Account 使用者個人資料
  - 瀏覽使用者名稱、Email、評論數、收藏數、追蹤數、被追蹤數。
  - 瀏覽該使用者正在追蹤的使用者。
  - 瀏覽誰追蹤此使用者。
  - 瀏覽該使用者評論的餐廳列表。
  - 瀏覽該使用者加入收藏的餐廳列表。
 
 * Logout 登出
   - 點擊Logout按鈕登出論壇。

## 專案下載與安裝 Project setup
### 安裝 Vue 開發環境
**需安裝 node.js 與 npm**
1. 打開終端機輸入下列指令安裝 Vue CLI。
```
npm install -g @vue/cli@4.1.1
```
2. 安裝完成後輸入下列指令，若有看到版本號碼表示安裝成功。
```
vue --version
```
### 本機執行 API 伺服器
#### 啟動後端 API 伺服器
1. 將後端資料夾clone到本地電腦。
```
git clone https://github.com/ALPHACamp/forum-express.git
```
2. clone完成後進入該資料夾中。
```
cd forum-express
```
3. 安裝後端專案套件。
```
npm install
```
#### 安裝 MySQL
1. 至 MySQL Community Server 的[官方下載頁](https://downloads.mysql.com/archives/installer/)。
2. 點開 Product Version 清單，選擇 8.0.15。
3. 在頁面下方找到 Windows (x86, 32-bit), MSI Installer(mysql-installer-community-8.0.15.0.msi)，點擊 Download 按鈕。
4. 接下來會跳出 Oracle 的廣告，點擊「No thanks, just start my download.」。
5. 下載完成後，執行 mysql-installer-community-8.0.15.0.msi，進入安裝精靈，一路按同意往下。
6. 中間需要選擇完成「完整版 (Full)」。
7. 進入到 Type and Networking 設定，Config Type 請選擇 Development Computer；Connectivity請勾選：「TCP/IP」，Port: 3306，X Protocol Port:33060，勾選「Open Windows Firewall pores for network access」，填選完畢後點Next。
8. Authentication Method部分選擇：Use Legacy Authentication Method ，然後點擊 Next。
9. 初始化設定：設定帳號密碼，root 密碼設定成 password，然後點擊 Next。
10. 接下來一直點擊 Next，直到看到 Apply Configuration畫面；先點擊 Execute，待程式跑完即可點擊 Finish 完成安裝。
11. 全部安裝完成後， MySQL Workbench 會自動開啟。
#### Workbench 連線 MySQL Server
1. 點擊我們剛剛建立的 Local instance 3306，並點擊 Server Status；如果出現綠色箭頭，就代表目前 MySQL 與 MySQL Workbench 已成功建立連線。
2. MySQL Workbench 會要你需入密碼。這個密碼是我們在上個單元安裝 Workbench 的時候設定的。
3. 按下閃電符號執行，並輸入下列指令。
```
CREATE DATABASE forum;
```
4. 按一下重新整理，就會看到forum的Database。
5. 執行伺服器，依順序輸入以下指令。
```
npx sequelize db:migrate
```
```
npx sequelize db:seed:all
```
```
npm run dev
```
6. 執行成功的話，終端機會顯示下列訊息。
```
Example app listening on port 3000
```
8. 在進行本專案的過程中，建議讓伺服器保持在運行的狀態。
### 下載專案與啟動。
**請打開另一個新的終端機執行**
1. clone此專案到本地電腦。
```
git clone https://github.com/jj280385/restaurant_list.git
```
2. 進入專案資料夾。
```
cd New-Restaurants-Forum
```
3. 輸入下列指令啟動專案。
```
npm run serve
```
4.若終端機顯示此訊息代表已成功開啟，打開瀏覽器進入此網址 :
```
http://localhost:8080/
```
5. 若要修改程式碼，完成修改後，進行打包：
```
npm run build
```

## 開發工具 Development Tools
- Node.js: 14.16.0
- Vue: 2.6.11
- Vue/cli 4.1.1
- Vuex: 3.6.2
- Vue-router: 3.2.0
- Bootstrap: 4.4.1
- jquery": 3.6.0
- axios: 0.19.2
- animate.css: 4.1.1
- moment: 2.24.0
- sweetalert2: 9.8.2

## 開發人員 Developer
[ZORA CHEN](https://github.com/jj280385)
