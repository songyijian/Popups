import './style.scss'

class Popups{
  constructor(contentString, config = {}){
    if(typeof contentString !== 'string'){
      console.error('[Popups] contentString error')
      return
    }
    this.t = contentString; // 内容	
    this.live = 0;          // 0 = dom不存在 | 1=创建并插入了指定位置

    this.config = Object.assign({
      initShow: true,       // 初始化显示状态 默认显示弹窗
      addClass: '',         // 增加class空间, bg & popups-document
      bg: true,             // 是否有背景
      closeHtml: false,     // 关闭按钮的内容
      timeOut: 0,           // 定时关闭
      append: document.body,// 插入位置
      created: function(){},// 创建回调未插入 // (this)=>{}
      show: function(){},   // 显示回调
      close: function(){},  // 关闭回调（从插入位置删除，但内存中存在）
    },config);

    this._init_();
  }

  _init_(){
    this.nDocument = document.createElement('div');
    this.nClose = document.createElement('big');
    this.nBody = document.createElement('div');
    this.nClose.className = 'popups-closebtn';
    if (this.config.closeHtml) { this.nClose.innerHTML = this.config.closeHtml; }
    this.nBody.className = 'popups-body';
    this.updateHtml(this.t)

    this.nDocument.className = 'popups-document '+ this.config.addClass;
    this.nDocument.appendChild(this.nClose);
    this.nDocument.appendChild(this.nBody);

    if (this.config.bg) {
      this.bombBg = document.createElement('div');
      this.bombBg.className = 'popups-bg '+ this.config.addClass;
    };

    const that = this;
    this.nClose.addEventListener('click',function(params) {
      that.close.call(that, that)
    },false);

    typeof Popups.createdBefer === 'function' && Popups.createdBefer(this);
    this.config.created.call(this,this);
    this.config.initShow && this.show.call(this,this)
  }

  show () {
    if(this.live){ return }
    const that = this;
    this.live = 1;
    this.config.append.appendChild(this.nDocument);
    this.config.bg && this.config.append.appendChild(this.bombBg);
    if (this.config.timeOut > 0){
      setTimeout(function (params) {
        that.close.call(that, this)
      }, this.config.timeOut);
    }

    typeof Popups.showBefer === 'function' && Popups.showBefer(this);
    this.config.show.call(this,this)
    return this;
  }

  close () {
    if(this.live === 1){ 
      this.live = 0;
      this.config.append.removeChild(this.nDocument);
      this.config.bg && this.config.append.removeChild(this.bombBg);
      typeof Popups.closeBefer === 'function' && Popups.closeBefer(this);
      this.config.close.call(this,this)
    }
    return this;
  }

  updateHtml(t,fn) {
    this.t = t;
    this.nBody.innerHTML = this.t; 
    fn && fn(this);
    return this
  }

  html(t){
    this.updateHtml(t)
  }
}


Popups.createdBefer = function(){}
Popups.showBefer = function(){}
Popups.closeBefer = function(){}


export default Popups