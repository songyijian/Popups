/*
  BombBox 2.0.0 _轻量级弹窗组件
  作者：songyijian 
  发布：2020.8.18 
  github：https://github.com/songyijian/BombBox

API
  new BombBox(
    contentString,    // 弹框内容 `<p>xxx</p>`
    {
      initShow: true,       // 初始化显示状态 默认显示弹窗
      addClass: 'a',        // 增加class空间, bg & bomb_document
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
*/


export default class BombBox{
  constructor(contentString, config = {}){
    if(typeof contentString !== 'string'){
      console.error('[BombBox] contentString error')
      return
    }
    this.t = contentString; // 内容	
    this.live = 0;          // 0 = dom不存在 | 1=创建并插入了指定位置

    this.config = Object.assign({
      initShow: true,       // 初始化显示状态 默认显示弹窗
      addClass: '',        // 增加class空间, bg & bomb_document
      bg: true,             // 是否有背景
      closeHtml: false,     // 关闭按钮的内容
      timeOut: 0,           // 定时关闭
      append: document.body, // 插入位置
      // 回调函数(this)=>
      creat: ()=>{},       // 创建回调（未插入）
      show: ()=>{},         // 显示回调
      close: ()=>{},        // 关闭回调（从插入位置删除，但内存中存在）
    },config);

    this._init_();
  }

  _init_(){
    this.bombDocument = document.createElement('div');
    this.bombClose = document.createElement('big');
    this.bombHtml = document.createElement('div');
    this.bombClose.className = 'bomb_closebtn';
    if (this.config.closeHtml) { this.bombClose.innerHTML = this.config.closeHtml; }
    this.bombHtml.className = 'bomb_html';
    this.updateHtml(this.t)

    this.bombDocument.className = 'bomb_document '+ this.config.addClass;
    this.bombDocument.appendChild(this.bombClose);
    this.bombDocument.appendChild(this.bombHtml);

    if (this.config.bg) {
      this.bombBg = document.createElement('div');
      this.bombBg.className = 'bomb_bg '+ this.config.addClass;
    };

    this.bombClose.addEventListener('click',(params) => {
      this.close()
    },false)

    this.config.creat(this)

    this.config.initShow && this.show()
  }

  show () {
    if(this.live){ return }
    this.live = 1;
    this.config.append.appendChild(this.bombDocument);
    this.config.bg && this.config.append.appendChild(this.bombBg);

    if (this.config.timeOut > 0){
      setTimeout(() => {
        this.close()
      }, this.config.timeOut);
    }

    this.config.show(this)
    return this;
  }

  close () {
    if(this.live === 1){ 
      this.live = 0;
      this.config.append.removeChild(this.bombDocument);
      this.config.bg && this.config.append.removeChild(this.bombBg);
      this.config.close(this)
    }
    return this;
  }

  updateHtml(t,fn) { 
    this.t = t
    this.bombHtml.innerHTML = this.t; 
    fn && fn(this)
    return this; 
  }

  html(t){
    this.updateHtml(t)
  }
}

