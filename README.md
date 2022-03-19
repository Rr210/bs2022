<!--
 * @Author: Harry
 * @Date: 2021-12-26 15:16:49
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-19 15:36:03
 * @FilePath: \vant-u\README.md
-->
## 仓库简介

1. 基于深度学习的中草药害虫识别,使用flask框架
2. 微信公众号H5开发
3. 未全部开源（毕业设计项目）

## 效果图

<table>
<tr>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/1_bs.png" />
</td>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/2_bs.png" />
</td>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/3_bs.png" />
</td>
</tr>
<tr>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/4_bs.png" />
</td>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/5_bs.png" />
</td>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/6_bs.png" />
</td>
</tr>
<tr>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/7_bs.png" />
</td>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/8_bs.png" />
</td>
<td>
<img src="https://cdn.jsdelivr.net/gh/rr210/image@master/img/3/9_bs.png" />
</td>
</tr>
</table>

## 配置方法

>待写
### 前端配置

1. 使用框架：`vue3+vant3`
2. 安装node.js
3. 当前文件下`npm install`安装环境
### 后端配置

1. 使用语言:python 版本:`3.8.5`,工具`pycharm`
2. 文件夹`medicine`为后端文件，暂未公开
3. 环境安装 `pip install -r requirements.txt`

### 数据库配置

1. 使用数据库：mysql 版本：`8.0.25`
2. 数据库文件 `back.sql`,暂未公开


## 前端项目结构

```
│  .env.dev
│  .env.pro
│  postcss.config.js
│  
├─public
│  │  
│  ├─banner
│  │      
│  ├─css
│  │  ├─img
│  │  │  └─main
│  │  │          
│  │  ├─loading
│  │  │      
│  │  ├─skin
│  │  │      
│  │  └─svg
│  └─images
│          
└─src
    │  App.vue
    │  main.js
    │  
    ├─assets
    │  └─css
    │      │  
    │      ├─font
    │      │      
    │      └─icon
    │              
    ├─components
    │      CloseBtn.vue
    │      ShowPest.vue
    │      
    ├─router
    │      
    ├─store
    │  │  
    │  └─login
    │          
    ├─utils
    │  │  http.js
    │  │  vantui.js
    │  │  
    │  ├─api
    │  │      
    │  ├─content
    │  │      
    │  ├─serct
    │  │      
    │  ├─service
    │  │      
    │  └─tool
    │          
    └─views
        │  Tabbar.vue
        │  
        ├─history
        │  │  History.vue
        │  │  
        │  └─components
        │          DetailPest.vue
        │          HisItem.vue
        │          HisTabnav.vue
        │          
        ├─home
        │  │  Home.vue
        │  │  
        │  └─components
        │          ItemPest.vue
        │          
        ├─login
        │  │  Login.vue
        │  │  
        │  └─components
        │          Auth.vue
        │          
        ├─main
        │  │  Mains.vue
        │  │  
        │  └─components
        │          IconMain.vue
        │          
        └─mine
                Mine.vue
```