/*
    BombBox 1.1.0 _轻量级弹窗组件（支持AMD、链式写法）
    作者：songyijian 
    发布：2017.6.6 
    github：https://github.com/songyijian/BombBox

    更新说明：1.1.0优化居中方案，
          默认css3入场动画（.css），
          增加initStatus:true 默认初始化显示弹窗， 
          增加form:stick（狗皮膏药模式）关闭隐藏窗口不删除现有dom


    API
            t，string弹框内容（`<p>xxx</p>`）
        new BombBox(t,{
            'initStatus':true,              //初始化显示状态 默认显示弹窗
            'form':'',                      //默认关闭删除dom， stick只隐藏窗口
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
            'yesBtnFn':function(value){},   //点击确定按钮回调·
            'append': document.body         //插入位置
        })
        
        FN
            this.html('data',fn(This))  //修改内容区域（信息,回调）
            this.center()               //居中方法 （1.1.0 已经没有意义）
            this.close('stick')         //关闭, 可以传参（‘stick’）模式，不传默认是删除dom
            this.show()                 //显示隐藏状态下的弹窗，(stick模式,initStatus:false)

        ATTR
            this.disStatus  //组件状态 0_DOM不存在 1_DOM存在处于隐藏状态 2_DOM存在并显示
*/

!function(){function BombBox(t,key){this.t=t;this.key=key;this.disStatus=0;this.dataJ={"initStatus":true,"form":"","type":"","bombClass":"","center":true,"bg":true,"closeHtml":false,"timeOut":0,"textareaValue":"","promptValue":"","initFn":function(_this){},"closeFn":function(_this){},"yesBtnFn":function(value){},"append":document.body};for(var i in key){this.dataJ[i]=key[i]}this.init(this.dataJ.type);return this}BombBox.prototype.init=function(type){this.createDom(type);if(this.dataJ.center){this.center()}var _this=this;if(this.promptInput||this.bombYesBtn){this.promptInput?this.promptInput.focus():this.bombYesBtn.focus()}if(type==="alert"||type==="confirm"||type==="prompt"||type==="textarea"){this.bombDocument.onkeyup=function(e){var keyCode=(window.event)?e.which:e.keyCode;if(keyCode===13){_this.yesFn(this,type)}else{if(keyCode===27){_this.close(_this.dataJ.form)}}}}if(this.bombClose){this.bombClose.onclick=function(){_this.close(_this.dataJ.form)}}if(this.bombNoBtn){this.bombNoBtn.onclick=function(){_this.close(_this.dataJ.form)}}if(this.bombYesBtn){this.bombYesBtn.onclick=function(){_this.yesFn(this,type)}}if(_this.dataJ.timeOut){setTimeout(function(){_this.close(_this.dataJ.form)},_this.dataJ.timeOut)}this.dataJ.initFn(this);return this};BombBox.prototype.createDom=function(type){this.bombDocument=document.createElement("div");this.bombClose=document.createElement("big");this.bombHtml=document.createElement("div");this.bombClose.className="bomb_closebtn";if(this.dataJ.closeHtml){this.bombClose.innerHTML=this.dataJ.closeHtml}this.bombHtml.className="bomb_html";this.bombHtml.innerHTML=this.t;if(!type){this.bombDocument.className="bomb_document"}else{if(type==="alert"||type==="confirm"||type==="prompt"||type==="textarea"){if(type==="alert"){this.bombDocument.className="alert_document";this.bombYesBtn=document.createElement("button");this.bombYesBtn.className="bomb_yes_btn";this.bombYesBtn.innerHTML="确定";this.bombDocument.appendChild(this.bombYesBtn)}else{if(type==="confirm"||type==="prompt"||type==="textarea"){if(type==="confirm"){this.bombDocument.className="confirm_document"}if(type==="prompt"||type==="textarea"){type==="prompt"?this.bombDocument.className="prompt_document":this.bombDocument.className="textarea_document"}this.bombYesBtn=document.createElement("button");this.bombYesBtn.className="bomb_yes_btn";this.bombYesBtn.innerHTML="确定";this.bombNoBtn=document.createElement("button");this.bombNoBtn.className="bomb_no_btn";this.bombNoBtn.innerHTML="取消";this.bombDocument.appendChild(this.bombYesBtn);this.bombDocument.appendChild(this.bombNoBtn);if(type==="prompt"){this.promptInput=document.createElement("input");this.promptInput.className="prompt_input";this.promptInput.type="text";this.promptInput.value=this.dataJ.promptValue;this.bombHtml.appendChild(this.promptInput)}if(type==="textarea"){this.promptInput=document.createElement("textarea");this.promptInput.className="textarea_input";this.promptInput.value=this.dataJ.textareaValue;this.bombHtml.appendChild(this.promptInput)}this.bombDocument.appendChild(this.bombNoBtn);this.bombDocument.appendChild(this.bombYesBtn)}}}}this.bombDocument.appendChild(this.bombClose);this.bombDocument.appendChild(this.bombHtml);if(this.dataJ.bombClass){this.bombDocument.className+=" "+this.dataJ.bombClass}if(this.dataJ.bg){this.bombBg=document.createElement("div");this.bombBg.className="bomb_bg";if(!this.dataJ.initStatus){this.bombBg.style.display="none"}this.dataJ.append.appendChild(this.bombBg)}if(!this.dataJ.initStatus){this.bombDocument.style.display="none"}this.dataJ.append.appendChild(this.bombDocument);if(!this.dataJ.initStatus){this.disStatus=1}else{this.disStatus=2}};BombBox.prototype.show=function(){if(this.disStatus===1){this.disStatus=2;if(this.bombBg){this.bombBg.style.display="block"}this.bombDocument.style.display="block"}return this};BombBox.prototype.html=function(t,fn){this.bombHtml.innerHTML=t;if(fn){fn(this)}return this};BombBox.prototype.yesFn=function(This,type){var _value=true;this.close(this.dataJ.form);if(type==="prompt"||type==="textarea"){this.promptInput.value?_value=this.promptInput.value:_value=true}else{if(type==="confirm"){_value=true}}this.dataJ.yesBtnFn(_value);return this};BombBox.prototype.center=function(fn){this.bombDocument.style.top=0;this.bombDocument.style.left=0;this.bombDocument.style.bottom=0;this.bombDocument.style.right=0;this.bombDocument.style.margin="auto";if(fn){fn()}return this};BombBox.prototype.close=function(type){if(type==="stick"){this.bombBg.style.display="none";this.bombDocument.style.display="none";this.disStatus=1}else{this.dataJ.append.removeChild(this.bombDocument);if(this.dataJ.bg==true){this.dataJ.append.removeChild(this.bombBg)}this.disStatus=0}this.dataJ.closeFn(this);return this};window.BombBox=BombBox}();if(typeof(module)!=="undefined"){module.exports=window.BombBox}else{if(typeof define==="function"&&define.amd){define([],function(){return window.BombBox})}};