/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = console.log.bind(console);

var Slider = function () {
  function Slider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    this.$el = options.el;
    this.slides = options.slides;
    this.interval = options.interval || 2000;
    this.index = 0;
    this.render();
    this.start();
  }

  _createClass(Slider, [{
    key: "render",
    value: function render() {
      this.$el.innerHTML = "<div class=\"slider-wrap\"></div>";
      this.first = this.slides[0];
      this.slides.push(this.first);
      this.$wrap = this.$el.firstElementChild;
      this.length = this.slides.length;
      this.$wrap.style.width = this.length * 100 + "%";
      this.$wrap.innerHTML = this.slides.map(function (slide) {
        return "<div class=\"slider-item\">\n          <a href=\"" + slide.link + "\">\n            <img src=\"" + slide.image.replace(/http/, "https") + "\" alt=\"\">\n          </a>\n        </div>";
      }).join('');
    }
  }, {
    key: "start",
    value: function start() {
      setInterval(this.next.bind(this), this.interval);
    }
  }, {
    key: "next",
    value: function next() {
      var _this = this;
      if (this.index === this.length - 1) {
        this.$wrap.style.transition = "none";
        this.index = 1;
        this.$wrap.style.transform = "translate(0%)";
      }
      //设置延时是留给程序操作DOM的时间
      setTimeout(function () {
        _this.$wrap.style.transition = "all 0.3s";
        _this.$wrap.style.transform = "translate(" + x + ")";
      }, 50);
      this.index += 1;
      var x = "-" + this.index * 100 / this.length + "%";
    }
  }]);

  return Slider;
}();

exports.Slider = Slider;
exports.log = log;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slider = __webpack_require__(0);

function lazyLoad(images) {
  var imgs = [].slice.call(images);
  onscroll();
  window.addEventListener('scroll', onscroll);

  function onscroll() {
    if (clock) {
      clearTimeout(clock);
    }
    var clock = setTimeout(function () {
      if (imgs.length === 0) {
        return window.removeEventListener('scroll', onscroll);
      }
      imgs = imgs.filter(function (img) {
        return img.classList.contains('lazyload');
      });
      imgs.forEach(function (img) {
        if (isVisible(img)) {
          // 加载img
          loadImg(img);
        }
      });
    }, 300);
  }
  function isVisible(img) {
    var winH = window.screen.height,
        scrollH = window.scrollY,
        top = img.parentNode.offsetTop;
    if (top > scrollH && top < scrollH + winH) {
      return true;
    } else {
      return false;
    }
  }

  function loadImg(img) {
    var src = img.getAttribute('data-src');
    img.setAttribute('src', src);
    img.classList.remove('lazyload');
  }
}

exports.default = lazyLoad;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slider = __webpack_require__(0);

var _lyric = __webpack_require__(6);

var _lyric2 = _interopRequireDefault(_lyric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(el) {
    _classCallCheck(this, Player);

    this.$el = el;
    this.$lyric = this.$el.querySelector('.lyric');
    this.$lyricWrap = this.$lyric.querySelector('.lyrics-wrap');
    this.songid = 0;
    this.playButton = this.$el.querySelector('.play-icon');
    this.duration = 0;
    this.playOrPause();
    this.createAudio();
    this.index = 0;
    this.$passTimeBar = this.$el.querySelector('.progress-now');
    this.$passTime = this.$el.querySelector('.progress-start');
    this.$duration = this.$el.querySelector('.progress-end');
    document.querySelector('.player .play-list').addEventListener('click', this.hide);
    this.lyric = new _lyric2.default(this.$lyricWrap, this.$audio, this.duration, this.index);
  }

  _createClass(Player, [{
    key: "hide",
    value: function hide() {
      document.querySelector('.player').setAttribute("style", "");
      document.querySelector('.background').classList.add('hide');
      document.querySelector('body').setAttribute("style", "");
      document.querySelector('html').setAttribute("style", "");
    }
  }, {
    key: "playOrPause",
    value: function playOrPause() {
      this.playButton.addEventListener('click', action);
      var _this = this;

      function action(e) {
        if (/toplay/.test(e.target.className)) {
          e.target.className = e.target.className.replace(/toplay/, 'topause');
          _this.$audio.play();
          _this.update();
        } else if (/topause/.test(e.target.className)) {
          e.target.className = e.target.className.replace(/topause/, 'toplay');
          _this.$audio.pause();
        }
      }
    }
  }, {
    key: "play",
    value: function play(option) {
      var _this2 = this;

      if (!option) return;
      this.setSongInfo(option);
      this.audioInit(option);
      this.playButton.className = this.playButton.className.replace(/topause/, 'toplay');
      this.$duration.innerHTML = this.formatTime(option.duration);
      this.$el.setAttribute("style", "transform: translateY(0%)");
      document.querySelector('body').setAttribute("style", "overflow : hidden");
      document.querySelector('html').setAttribute("style", "overflow : hidden");
      fetch("https://192.3.229.177:3011/lyric?keyword=" + option.songid).then(function (res) {
        return res.json();
      }).then(function (string) {
        return JSON.parse(string.replace(/json\((.*)\)/, "$1"));
      }).then(function (json) {
        return _this2.lyric.getLyric(json.lyric);
      });
    }
  }, {
    key: "setSongInfo",
    value: function setSongInfo(option) {
      this.$el.className = this.$el.className.replace(/hide/, "");
      this.$el.querySelector('.album img').setAttribute("src", "https://y.gtimg.cn/music/photo_new/T002R150x150M000" + option.albumid + ".jpg?max_age=2592000");
      this.$el.querySelector('.songname').innerHTML = option.song;
      this.$el.querySelector('.singer').innerHTML = option.singer;
      document.querySelector('.background').setAttribute("style", "background-image: url(\"https://y.gtimg.cn/music/photo_new/T002R150x150M000" + option.albumid + ".jpg\")");
      document.querySelector('.background').classList.remove('hide');
      this.$lyricWrap.setAttribute("style", "transform: translateY(0%)");
    }
  }, {
    key: "audioInit",
    value: function audioInit(option) {
      this.$audio.src = "https://ws.stream.qqmusic.qq.com/" + option.songid + ".m4a?fromtag=38";
      this.duration = option.duration;
      this.index = 0;
    }
  }, {
    key: "createAudio",
    value: function createAudio() {
      this.$audio = document.createElement('audio');
      this.$audio.loop = true;
      document.body.appendChild(this.$audio);
    }
  }, {
    key: "moveProgress",
    value: function moveProgress() {
      this.passTime = this.$audio.currentTime;
      this.baifengbi = 100 - this.passTime / this.$audio.duration * 100;
      this.$passTime.innerHTML = this.formatTime(this.passTime);
      this.$passTimeBar.setAttribute("style", "transform: translate(-" + this.baifengbi + "%)");
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;
      this.$lyricWrap.children[0].classList.add('active');
      setInterval(function () {
        _this.moveProgress();
        _this.lyric.moveLyric();
      }, 50);
    }
  }]);

  return Player;
}();

exports.Player = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tab = __webpack_require__(4);

var _tab2 = _interopRequireDefault(_tab);

var _search = __webpack_require__(5);

var _player = __webpack_require__(2);

__webpack_require__(7);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(9);


var search = new _search.Search(document.querySelector('.search'));
(0, _tab2.default)();
(0, _search.SwitchCancelBtn)();
document.querySelector('.player-button').addEventListener('click', function () {
  document.querySelector('.player').setAttribute("style", "transform: translateY(0%)");
  document.querySelector('.background').classList.remove('hide');
  document.querySelector('body').setAttribute("style", "overflow : hidden");
  document.querySelector('html').setAttribute("style", "overflow : hidden");
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slider = __webpack_require__(0);

var _lazyLoad = __webpack_require__(1);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tab() {
  var nav = document.querySelector('.nav-list');
  nav.addEventListener('click', function (e) {
    var nodeList = nav.children;
    var className1 = new RegExp("(\\s|^)" + "active" + "(\\s|$)");
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].className = nodeList[i].className.replace(className1, "");
      var divClass = "." + nodeList[i].getAttribute('data-view');
      document.querySelector(divClass).className += " " + "hide";
    }
    e.target.className += " " + "active";
    var activeName = "." + e.target.getAttribute('data-view');
    var className2 = new RegExp("(\\s|^)" + "hide" + "(\\s|$)");
    var actDiv = document.querySelector(activeName);
    actDiv.className = actDiv.className.replace(/hide/g, "");
    (0, _lazyLoad2.default)(actDiv.querySelectorAll('.lazyload'));
  });
}

exports.default = Tab;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = exports.SwitchCancelBtn = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slider = __webpack_require__(0);

var _player = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SwitchCancelBtn() {
  var input = document.querySelector('#search-in');
  var cancelBtn = document.querySelector('.cancel');
  input.addEventListener('focus', function () {
    cancelBtn.setAttribute('style', 'display:block');
  });
  cancelBtn.addEventListener('click', function () {
    cancelBtn.setAttribute('style', 'display:none');
  });
}

var Search = function () {
  function Search(el) {
    _classCallCheck(this, Search);

    this.$el = el;
    this.input = this.$el.querySelector('#search-in');
    this.keyword = '';
    this.page = 1;
    this.fetching = false;
    this.nomore = false;
    this.input.addEventListener('keyup', this.onKeyUp.bind(this));
    this.$song = this.$el.querySelector('.song-wrap');
    window.addEventListener('scroll', this.onScroll.bind(this));
    var play = document.querySelector('.player');
    var player = new _player.Player(play);
    this.$song.addEventListener('click', function (e) {
      if (e.target.nodeName === "LI") {
        var node = e.target;
      } else if (e.target.parentNode.nodeName === "LI") {
        var node = e.target.parentNode;
      }
      var songid = node.getAttribute("songid");
      var duration = node.getAttribute("duration");
      var albumid = node.getAttribute("albumid");
      var singer = node.getAttribute("singer");
      var song = node.getAttribute("song");
      var option = {
        song: song,
        singer: singer,
        albumid: albumid,
        songid: songid,
        duration: duration
      };
      player.play(option);
    });
  }

  _createClass(Search, [{
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      var keyword = e.target.value.trim(); //使用trim()去除两端空白
      if (!keyword) {
        this.reset();
      }
      if (e.key !== 'Enter') {
        return;
      }
      this.search(keyword);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.page = 1;
      this.keyword = '';
      this.$song.innerHTML = '';
    }
  }, {
    key: 'search',
    value: function search(key, page) {
      var _this = this;

      if (this.fetching) return;
      document.querySelector('.loading').setAttribute('style', 'display:flex');
      this.keyword = key;
      this.fetching = true;
      fetch('https://192.3.229.177:3011/search?keyword=' + this.keyword + '&page=' + (page || this.page)).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this.page = json.data.song.curpage;
        _this.nomore = json.message === "no results";
        return json.data.song.list;
      }).then(function (songs) {
        return _this.append(songs);
      }).then(function () {

        _this.fetching = false;
        document.querySelector('.loading').setAttribute('style', 'display:none');
      });
    }
  }, {
    key: 'append',
    value: function append(songs) {
      var html = songs.map(function (item) {
        return '\n        <li class="song-item" songid="' + item.songid + '" duration="' + item.interval + '" albumid="' + item.albummid + '" singer="' + item.singer.map(function (s) {
          return s.name;
        }).join(' ') + '" song="' + item.songname + '">\n        <i class="music-icon"></i>\n        <h6 class="song-title">' + item.songname + '</h6>\n        <p class="singer">' + item.singer.map(function (s) {
          return s.name;
        }).join(' ') + '</p>\n      </li>\n      ';
      }).join('');
      this.$song.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (this.nomore) {
        document.querySelector('.nomore').setAttribute('style', 'display:block');
        return window.removeEventListener('scroll', this.onScroll);
      }
      if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 1) {
        this.search(this.keyword, this.page + 1);
      }
    }
  }]);

  return Search;
}();

exports.SwitchCancelBtn = SwitchCancelBtn;
exports.Search = Search;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lyric = function () {
  function Lyric(wrap, audio, duration, index) {
    _classCallCheck(this, Lyric);

    this.index = index;
    this.timeArray = [];
    this.duration = duration;
    this.$lyricWrap = wrap;
    this.$audio = audio;
    this.lyricLength = 0;
  }

  _createClass(Lyric, [{
    key: 'getLyric',
    value: function getLyric(lyric) {
      var text = this.formatText(lyric) || '';
      var textArray = text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];
      this.lyricLength = textArray.length;
      this.renderLyric(textArray);
      this.timeTransform(textArray);
    }
  }, {
    key: 'renderLyric',
    value: function renderLyric(text) {
      var html = text.map(function (line) {
        return '\n      <div class="lyric-line">' + line.slice(10) + '</div>\n    ';
      }).join('');
      this.$lyricWrap.innerHTML = html;
    }
  }, {
    key: 'moveLyric',
    value: function moveLyric() {
      if (Math.floor(this.$audio.currentTime) === this.timeArray[this.index + 1]) {
        this.$lyricWrap.children[this.index].classList.remove('active');
        this.$lyricWrap.children[this.index + 1].classList.add('active');
        var move = this.index / this.lyricLength * 100;
        this.$lyricWrap.setAttribute("style", 'transform: translateY(-' + move + '%)');
        this.index = this.index + 1;
        if (this.index === this.lyricLength - 1 && this.$audio.currentTime - 1 < this.duration) {
          this.index = 0;
        }
      }
    }
  }, {
    key: 'formatText',
    value: function formatText(text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      return div.innerText;
    }
  }, {
    key: 'timeTransform',
    value: function timeTransform(textarray) {
      this.timeArray = textarray.map(function (item) {
        return +item.replace(/^\[(\d{2}):(\d{2}).*/, function (match, p1, p2) {
          return 60 * +p1 + +p2;
        });
      });
    }
  }]);

  return Lyric;
}();

exports.default = Lyric;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lazyLoad = __webpack_require__(1);

var _lazyLoad2 = _interopRequireDefault(_lazyLoad);

var _slider = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

fetch('https://qq-music-api.now.sh/').then(function (res) {
  return res.json();
}).then(render);

function render(json) {
  renderSlider(json.data.slider);
  renderRadios(json.data.radioList);
  renderPlayList(json.data.songList);
  (0, _lazyLoad2.default)(document.querySelectorAll('.lazyload'));
}

function renderSlider(slides) {
  var sliders = slides.map(function (slider) {
    return { link: slider.linkUrl, image: slider.picUrl };
  });
  new _slider.Slider({
    el: document.querySelector('.slider'),
    slides: sliders
  });
}

function renderRadios(radios) {
  document.querySelector('.radio-ct').innerHTML = radios.map(function (radio) {
    return '\n      <li class="item-list">\n        <a href="#" class="list-main">\n          <div class="list-item">\n            <img class="lazyload" data-src="' + radio.picUrl.replace(/http/, "https") + '" alt="">\n            <span class="icon icon_play"></span>\n          </div>\n          <div class="list_info">\n            <h3 class="list_tit tit_two_row">' + radio.Ftitle + '</h3>\n          </div>\n        </a>\n      </li>\n    ';
  }).join('');
}

function renderPlayList(list) {
  document.querySelector('.hot-ct').innerHTML = list.map(function (list) {
    return '\n      <li class="item-list">\n        <a href="#" class="list-main">\n          <div class="list-item">\n            <img class="lazyload" data-src="' + list.picUrl.replace(/http/, "https") + '" alt="">\n            <span class="icon icon_play"></span>\n          </div>\n          <div class="list_info">\n            <h3 class="list_tit tit_two_row">' + list.songListDesc + '</h3>\n            <p class="list_text">' + list.songListAuthor + '</p>\n          </div>\n        </a>\n      </li>\n    ';
  }).join('');
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


fetch('https://192.3.229.177:3011/rank').then(function (res) {
  return res.json();
}).then(function (json) {
  return json.data.topList;
}).then(renderTopList);
function renderTopList(list) {
  document.querySelector('.rank-container').innerHTML = list.map(function (item) {
    return '\n      <li class="rank-item">\n        <div class="topic-main">\n        <a href="#" class="topic_media">\n          <img data-src="' + item.picUrl.replace(/http/, "https") + '" class="lazyload">\n          <span class="listen_count"><i class="icon"></i>' + ((item.listenCount / 10000).toFixed(1) + "万") + '</span>\n        </a>\n        <div class="topic-info">\n          <div class="topic-cont">\n            <h3 class="topic-title">' + item.topTitle + '</h3>\n            ' + rankContain(item.songList) + '\n          </div>\n          <i class="topic-arrow"></i>\n        </div>\n      </div>\n    </li>\n      ';
  }).join('');
}

function rankContain(songList) {
  return songList.map(function (item, index) {
    return '\n        <p>' + (index + 1) + '<span class="text-name">' + item.songname + '</span>- ' + item.singername + '</p>\n\n      ';
  }).join('');
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);