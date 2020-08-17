# BombBox 1.1.0 _轻量级弹窗组件（支持amd）  

### 更新说明：
精简代码，只保留核心功能，用es6 class重构



## 函数 API

```

API
    new BombBox(
      contentString,  // 弹框内容 innerHTML = htmlstring（ `<p>xxx</p>`）
      {
        'initshow': true, //初始化显示状态 默认显示弹窗
        'bombClass': '', // 增加一个class
        'bg': true, //是否有背景
        'closeHtml': false, //关闭按钮的内容
        'timeOut': 0, //定时关闭
        'initFn': function (_this) {}, //初始回调
        'closeFn': function (_this) {}, //关闭回调
        'creact': function (_this) {}, //关闭回调
        'remove': function (_this) {}, //关闭回调
        'append': document.body //插入位置
      }
    )


FN
    this.updateHtml('data', fn(This)) //修改内容区域（信息,回调）
    this.close()                    //关闭
    this.show()                 //显示隐藏状态下的弹窗，(stick模式,initStatus:false)

ATTR
    this.live // 0=dom不存在 | 1=创建并插入了指定位置
```



## 弹框DOM结构：

### 默认常规
```
背景
    <div class="bomb_bg"></div>
弹框结构：
    <div class="bomb_document" >
        <big class="bomb_closebtn">按钮</big>
        <div class="bomb_html"></div>
    </div>
```

