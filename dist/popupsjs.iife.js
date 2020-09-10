/*!
 * popupsjs v3.0.0
 * repository git+https://github.com/songyijian/Popups.git
 * (c) 2017-2020 yijian.song <397032724@qq.com> (https://github.com/songyijian)
 * Released under the MIT License.
 */
var Popups = (function () {
  'use strict';

  var Popups = /*#__PURE__*/function () {
    function Popups(contentString) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof contentString !== 'string') {
        console.error('[BombBox] contentString error');
        return;
      }

      this.t = contentString; //内容	

      this.live = 0; // 0 = dom不存在 | 1=创建并插入了指定位置

      this.config = Object.assign({
        //配置参数
        'initShow': true,
        //初始化显示状态 默认显示弹窗
        'bombClass': '',
        // 增加一个class
        'bg': true,
        //是否有背景
        'closeHtml': false,
        //关闭按钮的内容
        'timeOut': 0,
        //定时关闭
        'creact': function creact(_this) {},
        //创建回调（未插入）
        'show': function show(_this) {},
        //显示回调
        'close': function close(_this) {},
        //关闭回调（从插入位置删除，但内存中存在）
        'append': document.body //插入位置

      }, config);

      this._init_();
    }

    var _proto = Popups.prototype;

    _proto._init_ = function _init_() {
      var _this2 = this;

      this.bombDocument = document.createElement('div');
      this.bombClose = document.createElement('big');
      this.bombHtml = document.createElement('div');
      this.bombClose.className = 'bomb_closebtn';

      if (this.config.closeHtml) {
        this.bombClose.innerHTML = this.config.closeHtml;
      }

      this.bombHtml.className = 'bomb_html';
      this.updateHtml(this.t);
      this.bombDocument.className = 'bomb_document ' + this.config.bombClass;
      this.bombDocument.appendChild(this.bombClose);
      this.bombDocument.appendChild(this.bombHtml);

      if (this.config.bg) {
        this.bombBg = document.createElement('div');
        this.bombBg.className = 'bomb_bg';
      }
      this.bombClose.addEventListener('click', function (params) {
        _this2.close();
      }, false);
      this.config.creact(this);
      this.config.initShow && this.show();
    };

    _proto.show = function show() {
      var _this3 = this;

      if (this.live) {
        return;
      }

      this.live = 1;
      this.config.append.appendChild(this.bombDocument);
      this.config.bg && this.config.append.appendChild(this.bombBg);

      if (this.config.timeOut > 0) {
        setTimeout(function () {
          _this3.close();
        }, this.config.timeOut);
      }

      this.config.show(this);
      return this;
    };

    _proto.close = function close() {
      if (this.live === 1) {
        this.live = 0;
        this.config.append.removeChild(this.bombDocument);
        this.config.bg && this.config.append.removeChild(this.bombBg);
        this.config.close(this);
      }

      return this;
    };

    _proto.updateHtml = function updateHtml(t, fn) {
      this.t = t;
      this.bombHtml.innerHTML = this.t;
      fn && fn(this);
      return this;
    };

    _proto.html = function html(t) {
      this.updateHtml(t);
    };

    return Popups;
  }();

  return Popups;

}());
