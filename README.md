# BombBox.1.0.1   轻量级的弹窗 组件


## 函数 API
 
* 配置
```
new BombBox(t,{
    'type':'',						//弹框类型 alert,	confirm , prompt , textarea
    'bombClass':'', 		  		// div class="bomb-document 这里增加一个class" >
    'center':true,            		//中间位置 (mr)
    'bg':true,                		//是否有背景(mr)
    'closeHtml':false,        		//关闭按钮的内容
    'timeOut':0,			  		//定时关闭
    "textareaValue":"",				//textarea = value
    'promptValue':"",				//prompt=Value
    'initFn':function(_this){}, 	//初始化后fun
    'closeFn': function(_this){},  	//关闭回调
    'yesBtnFn':function(value){},	//点击确定按钮回调
    'append': document.body   		//插入位置
})
```

* FN
```
this.html('') 	//更新内容区域信息
this.center()	//居中方法
this.close()	//关闭
```


## 弹框DOM结构：

* 默认常规
```
背景
    <div class="bomb_bg"></div>
弹框结构：
    <div class="bomb_document" >
        <big class="bomb_closebtn">按钮</big>
        <div class="bomb_html"></div>
    </div>
```

* 替代原生 alert
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


* 替代原生 confirm
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

* 替代原生 prompt
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

* 替代原生 textarea
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