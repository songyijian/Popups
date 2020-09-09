class Popups{
  constructor(contentString, config = {}){
    if(typeof contentString !== 'string'){
      console.error('[BombBox] contentString error')
      return
    }
    this.t = contentString; //内容	
    this.live = 0;   // 0 = dom不存在 | 1=创建并插入了指定位置
    this.config = Object.assign({ //配置参数
      'initShow': true, //初始化显示状态 默认显示弹窗
      'bombClass': '', // 增加一个class
      'bg': true, //是否有背景
      'closeHtml': false, //关闭按钮的内容
      'timeOut': 0, //定时关闭
      'creact': function (_this) {}, //创建回调（未插入）
      'show': function (_this) {}, //显示回调
      'close': function (_this) {}, //关闭回调（从插入位置删除，但内存中存在）
      'append': document.body //插入位置
    },config);


    // console.log(this.config)

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

    this.bombDocument.className = 'bomb_document '+ this.config.bombClass;
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