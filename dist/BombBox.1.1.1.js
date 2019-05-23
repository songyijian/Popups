/*
 * @Description: BombBox 1.1.1 更纯粹（谈不上倒退）
 * @Author: songyijian
 * @Date: 2019-05-22 15:43:51
 * @LastEditTime: 2019-05-23 17:58:19
 * @LastEditors: Please set LastEditors
 *  github：https://github.com/songyijian/BombBox
 */

/*
  API
    new BombBox(
      t,  //{string | dom} t string弹框内容（`<p>xxx</p>` | <p>xxx</p>）
      {
        'initShow': true,                //true=new立刻展示 | false=调用.show()显示
        'bombClass': '',                 //bomb-document增加class，同时作用背景
        'bg': true,                      //是否有背景(mr)
        'closeHtml': false,              //关闭按钮的内容
        'timeOut': 0,                    //定时关闭
        'initFn': function (_this) { },  //初始化后fun
        'showFn': function (_this){},    //展示回调
        'closeFn': function (_this) { }, //关闭回调
        'append': document.body          //插入位置
      }
    )
    
  FN
    this.html('data',fn(This))  //修改内容区域（信息,回调）
    this.close()                //关闭, 可以传参false，不传默认是删除dom
    this.show()                 //显示隐藏状态下的弹窗

  ATTR
      this.domStatus   //-1 = 还没dom不存在 | 0 = 创建完成还没插入 | 1 = 插入渲染可以找到该dom
*/

! function () {
    'sue strict'

    function BombBox(t,iconfig) {
        this.t = t;     //内容	
        this.domStatus = -1;  //-1 = 还没dom不存在 | 0 = 创建完成还没插入 | 1 = 插入渲染可以找到该dom
        this.config = {                   //配置参数
            'initShow': true,                //new立刻展示 false了自行调用.show（）
            'type': '',                      //弹框类型  alert,  confirm , prompt , textarea
            'bombClass': '',                 // bomb-document增加class，同时作用背景
            'bg': true,                      //是否有背景(mr)
            'closeHtml': false,              //关闭按钮的内容
            'timeOut': 0,                    //定时关闭
            'initFn': function (_this) { },  //初始化后fun
            'showFn': function (_this) { },    //展示回调
            'closeFn': function (_this) { }, //关闭回调
            'append': document.body          //插入位置
        };
        for (var i in iconfig) { this.config[i] = iconfig[i] };
        this.init()
        return this;
    };

    BombBox.prototype.init = function () {
        this.config.initFn(this);
        if (this.config.initShow) {
            this.render()
            this.show()
        }
        return this;
    };

    BombBox.prototype.updata = function (iconfig) {
        for (var i in iconfig) { this.config[i] = iconfig[i] };
        return this;
    };

    BombBox.prototype.createDom = function () {
        var _this = this

        this.bombDocument = document.createElement('div');
        this.bombHtml = document.createElement('div');
        this.bombClose = document.createElement('big');

        this.bombDocument.className = 'bomb_document';
        this.bombClose.className = 'bomb_closebtn';
        this.bombHtml.className = 'bomb_html';
        if (this.config.closeHtml) { this.bombClose.innerHTML = this.config.closeHtml; }
        if (typeof this.t === 'object') {
            this.bombHtml.appendChild(this.t);
        } else {
            this.bombHtml.innerHTML = this.t;
        }

        this.bombDocument.appendChild(this.bombClose);
        this.bombDocument.appendChild(this.bombHtml);

        if (this.config.bg) {
            this.bombBg = document.createElement('div');
            this.bombBg.className = 'bomb_bg';
        };

        if (this.config.bombClass) {
            this.bombBg && (this.bombBg.className += " " + this.config.bombClass);
            this.bombDocument.className += " " + this.config.bombClass;
        }

        // 事件绑定
        this.bombClose.onclick = function () { _this.close() };

        if (this.config.timeOut > 0) {
            setTimeout(function () {
                _this.close();
            }, this.config.timeOut)
        }

        window.addEventListener('keyup', function (e) {
            var keyCode = (window.event) ? e.which : e.keyCode;
            if (keyCode === 13) {
                _this.close();
            } else if (keyCode === 27) {
                _this.close();
            }
        }, true)

        this.domStatus = 0;
    };

    BombBox.prototype.render = function () {
        this.createDom()
        this.config.append.appendChild(this.bombDocument);
        this.bombBg && this.config.append.appendChild(this.bombBg);
        this.domStatus = 1
        return this;
    }

    BombBox.prototype.show = function () {
        if (this.domStatus > 0) { return this }
        this.render()
        this.domStatus = 1;
        this.config.showFn(this)
        return this;
    }

    //关闭
    BombBox.prototype.close = function () {
        if (this.domStatus > 0) {
            this.bombDocument && this.config.append.removeChild(this.bombDocument);
            this.bombBg && this.config.append.removeChild(this.bombBg)
            this.domStatus = -1;
            this.config.closeFn(this)
        }
        return this;
    };

    BombBox.prototype.html = function (t, fn) {
        if (t) { return this }
        this.t = t;
        this.bombHtml.innerHTML = ''
        if (typeof this.t === 'object') {
            this.bombHtml.appendChild(this.t);
        } else {
            this.bombHtml.innerHTML = this.t;
        }
        fn && fn(this);
        return this;
    }


    window.BombBox = BombBox;
    if (typeof (module) !== 'undefined') {
        module.exports = BombBox;
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return BombBox;
        });
    }

}()