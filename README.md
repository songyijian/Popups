# BombBox 1.1.0 _轻量级弹窗组件（支持amd）  

### 更新说明：
1.1.0优化居中方案，
默认css3入场动画（可配置），
增加initStatus:true默认初始化显示弹窗， 
增加form:stick（狗皮膏药模式）

## 函数 API
 
### 配置
```
    t，string弹框内容（`<p>xxx</p>`）
new BombBox(t,{
    'initStatus':true,              //默认初始化显示弹窗，
    'form':'',                      //默认dom动态创建删除， stick样式显示隐藏dom不会二次创建删除
    'type':'',                      //弹框类型  alert,  confirm , prompt , textarea
    'bombClass':'',                 // div class="bomb-document 这里增加一个class" >
    'center':true,                  //中间位置 (mr)
    'bg':true,                      //是否有背景(mr)
    'closeHtml':false,              //关闭按钮的内容
    'timeOut':0,                    //定时关闭
    "textareaValue":"",             //textarea = value
    'promptValue':"",               //prompt=Value
    'initFn':function(_this){},     //初始化回调
    'closeFn': function(_this){},   //关闭回调
    'yesBtnFn':function(value){},   //点击确定按钮回调
    'append': document.body         //插入位置
})
```

### FN
```
this.html('data',fn(This))  //修改内容区域信息,回调
this.center()               //居中方法 （1.1.0 已经没有意义）
this.close('stick')         //关闭, stick隐藏 !删除，可以通过参数控制DOM的删除还是隐藏
this.show()                 //显示隐藏状态下的弹窗

```

### ARR
```
this.disStatus  //组件状态 0_DOM不存在 1_DOM存在处于隐藏状态 2_DOM存在并显示
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

### 替代原生 alert
```
背景
    <div class="bomb_bg"></div>

弹框结构：
    <div class="alert_document">
        <button class="bomb_yes_btn">确定</button>
        <big class="bomb_closebtn"></big>
        <div class="bomb_html">
            <!-- 允许在这里插入内容 -->
        </div>
    </div>
```


### 替代原生 confirm
```
背景
    <div class="bomb_bg"></div>

弹框结构：
    <div class="confirm_document">
        <button class="bomb_no_btn">取消</button>
        <button class="bomb_yes_btn">确定</button>
        <big class="bomb_closebtn"></big>
        <div class="bomb_html">
                <!-- 允许在这里插入内容 -->
        </div>
    </div>
```

### 替代原生 prompt
```
背景
    <div class="bomb_bg"></div>

弹框结构：
    <div class="prompt_document">
        <button class="bomb_no_btn">取消</button>
        <button class="bomb_yes_btn">确定</button>
        <big class="bomb_closebtn"></big>
        <div class="bomb_html">
                <!-- 允许在这里插入内容 -->
            <input class="prompt_input" type="text">
        </div>
    </div>
```

### 替代原生 textarea
```
背景
    <div class="bomb_bg"></div>

弹框结构：
    <div class="textarea_document">
        <button class="bomb_no_btn">取消</button>
        <button class="bomb_yes_btn">确定</button>
        <big class="bomb_closebtn"></big>
        <div class="bomb_html">
                <!-- 允许在这里插入内容 -->
            <textarea class="textarea_input"></textarea>
        </div>
    </div>
```