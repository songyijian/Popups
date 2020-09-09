# popupsjs _轻量级弹窗组件
之前的BombBox包名改为 popupsjs

### 更新说明：
精简代码，只保留核心功能，用es6 class重构





## 安装
```
// npm 
npm install popupsjs

// yarn
yarn add popupsjs

// Browserify https://github.com/songyijian/DragDOM
<script src="../dist/popupsjs.iife.js"></script> 
```


## 快速上手 

```
// es2015+
import DragDOM from 'popupsjs'

new DragDOM(el,{config}) 
```




## 函数 API

```

API
  new Popups(
    contentString,    // 弹框内容 `<p>xxx</p>`
    {
      initShow: true,       // 初始化显示状态 默认显示弹窗
      bombClass: 'a',        // 增加class空间, bg & bomb_document
      bg: true,             // 是否有背景
      closeHtml: false,     // 关闭按钮的内容
      timeOut: 0,           // 定时关闭
      append: document.body, // 插入位置
      // 回调函数(this)=>
      creat: ()=>{},       // 创建回调（未插入）
      show: ()=>{},         // 显示回调
      close: ()=>{},        // 关闭回调（从插入位置删除，但内存中存在）
    }
  )

  FN
    this.close()                      //关闭
    this.show()                       //显示
    this.updateHtml('data', fn(This)) //修改内容区域（信息,回调）

  ATTR
    this.live // 0=dom不存在 | 1=创建并插入了指定位置
```



## 弹框DOM结构：
```
背景
  <div class="bomb_bg a"></div>

弹框结构
  <div class="bomb_document a">
    <big class="bomb_closebtn"></big>
    <div class="bomb_html">内容1</div>
  </div>

bombClass 
  同时追加 bomb_bg.a & bomb_document.a
```