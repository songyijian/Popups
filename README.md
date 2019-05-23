# BombBox 1.1.0 _轻量级弹窗组件（支持amd）  

### 更新说明：
* 1.1.0优化居中方案，
* 默认css3入场动画（.css），
* 增加initStatus:true 默认初始化显示弹窗， 
* 增加form:stick（狗皮膏药模式）关闭隐藏窗口不删除现有dom
* 1.1.1 {t} 支持dom对象,为了适应vue插槽
* 1.1.1 bombClass="" 同时作用背景


## 函数 API
 
### 配置
```
new BombBox(
    t,  //{string | dom} t string弹框内容（`<p>xxx</p>` | <p>xxx</p>）
    {
        'initStatus':true,              //初始化显示状态 默认显示弹窗
        'form':'',                      //默认关闭删除dom， stick只隐藏窗口
        'type':'',                      //弹框类型  alert,  confirm , prompt , textarea
        'bombClass':'',                 // bomb-document增加class，同时作用背景
        'center':true,                  //中间位置 (mr)
        'bg':true,                      //是否有背景(mr)
        'closeHtml':false,              //关闭按钮的内容
        'timeOut':0,                    //定时关闭
        "textareaValue":"",             //textarea = value
        'promptValue':"",               //prompt=Value
        'initFn':function(_this){},     //初始化回调
        'closeFn': function(_this){},   //关闭回调
        'yesBtnFn':function(value){},   //点击确定按钮回调·
        'append': document.body         //插入位置
    }
)
```

### FN
```
this.html('data',fn(This))  //修改内容区域（信息,回调）
this.center()               //居中方法 （1.1.0 已经没有意义）
this.close('stick')         //关闭, 可以传参（‘stick’）模式，不传默认是删除dom
this.show()                 //显示隐藏状态下的弹窗，(stick模式,initStatus:false)

```

### ATTR
```
this.disStatus  //组件状态 -1_DOM不存在 0虚拟dom还没插入渲染  1_DOM存在处于隐藏状态 2_DOM存在并显示
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

### alert
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


### confirm
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

### prompt
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

### textarea
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