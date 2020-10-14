# popupsjs _轻量级弹窗组件
> 3.1.0+ 修复bug, 调整api和className


## 安装
```
// npm 
npm install popupsjs

// yarn
yarn add popupsjs

// Browserify https://github.com/songyijian/Popups.git
<script src="../dist/popupsjs.iife.js"></script>
<link rel="stylesheet" type="text/css" href="../dist/index.css"/>
```



## 快速上手 
```
// es2015+
import Popups from "popupsjs";
import "popupsjs/dist/index.css";  // 注意：使用webpack关闭css exclude: /node_modules/

new Popups(el,{config}) 
```




## 函数 API
```
API
  new Popups(
    contentString,    // 弹框内容 `<p>xxx</p>`
    {
      initShow: true,       // 初始化显示状态 默认显示弹窗
      addClass: '',        // 增加class空间, bg & popups-document
      bg: true,             // 是否有背景
      closeHtml: false,     // 关闭按钮的内容
      timeOut: 0,           // 定时关闭
      append: document.body, // 插入位置
      created: function(){},    // 创建回调未插入 // (_this)=>{}
      show: function(){},       // 显示回调
      close: function(){},      // 关闭回调（从插入位置删除，但内存中存在）
    }
  )

  FN
    this.close()                      //关闭
    this.show()                       //显示
    this.updateHtml('data', fn(This)) //修改内容区域（信息,回调）

  ATTR
    this.live     // 0=dom不存在 | 1=创建并插入了指定位置

    this.nDocument  // .popups-document
    this.nClose     // .popups-closebtn
    this.nBody      // .popups-body


全局api (_this = 实例)
  Popups.createdBefer = function(_this){}
  Popups.showBefer = function(_this){}
  Popups.closeBefer = function(_this){}

```


## 弹框DOM结构：
```
背景
  <div class="popups-bg a"></div>

弹框结构
  <div class="popups-document a">
    <big class="popups-closebtn"></big>
    <div class="popups-body">内容1</div>
  </div>

js节点
  this.nDocument  // .popups-document
  this.nClose     // .popups-closebtn
  this.nBody      // .popups-body

addClass 
  同时追加 popups-bg.a & popups-document.a

```