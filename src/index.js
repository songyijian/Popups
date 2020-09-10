import './style.scss'

class Popups {
  constructor(contentString, config = {}){
    if(typeof contentString !== 'string'){
      console.error('[Popups] contentString error')
      return
    }
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
      this.bombBg.className = 'bomb_bg';
    };

    this.bombClose.addEventListener('click',(params) => {
      this.close()
    },false)

    this.config.creact(this)

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
  };


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



export default Popups;
