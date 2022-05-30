<!--
 * @Author: Harry
 * @Date: 2021-12-26 15:16:49
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-30 20:41:32
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
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/2cbb28d24c1986b40f37f3c8ec958b9.jpg" />
</td>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/5453c207b987b200b49094778a731d8.jpg" />
</td>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/56ecc02ee539bf110d5e42d4c7359c3.png" />
</td>
</tr>
<tr>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/58495a9a000c9e3e87d1af06d717512.png" />
</td>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/64a4aee2db1e1a0f2cc44f105acdf2e.jpg" />
</td>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/67c2b2600a02bc3ab9ea6968b3df8dd.jpg" />
</td>
</tr>
<tr>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/80a6d29403da91fb553ef97bd81846e.jpg" />
</td>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/8414664f15c5e146517dd293c16c85c.jpg" />
</td>
<td>
<img src="https://cloud.mr90.top/file/imagecloud/hexo/bs/b8204e82cf210098623edbd03fd752d.jpg" />
</td>
</tr>
</table>

## 配置方法

>待写
### 前端配置

1. 使用框架：`vue3+vant3`
2. 安装node.js
3. 当前文件下`npm install`安装环境
#### 前端优化
1. 白屏优化：组件的懒加载,开启gzip压缩---优化效果使用后将首页的访问速度从12s优化到1.68s
### 后端配置

1. 使用语言:python 版本:`3.8.5`,工具`pycharm`
2. 文件夹`medicine`为后端文件，暂未公开
3. 环境安装 `pip install -r requirements.txt`

### 数据库配置

1. 使用数据库：mysql 版本：`8.0.25`
2. 数据库文件 `back.sql`,暂未公开

### 如需详细代码联系作者
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