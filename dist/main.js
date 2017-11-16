!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=console.log.bind(console),a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),this.$el=e.el,this.slides=e.slides,this.interval=e.interval||2e3,this.index=0,this.render(),this.start()}return r(t,[{key:"render",value:function(){this.$el.innerHTML='<div class="slider-wrap"></div>',this.first=this.slides[0],this.slides.push(this.first),this.$wrap=this.$el.firstElementChild,this.length=this.slides.length,this.$wrap.style.width=100*this.length+"%",this.$wrap.innerHTML=this.slides.map(function(t){return'<div class="slider-item">\n          <a href="'+t.link+'">\n            <img src="'+t.image+'" alt="">\n          </a>\n        </div>'}).join("")}},{key:"start",value:function(){setInterval(this.next.bind(this),this.interval)}},{key:"next",value:function(){var t=this;this.index===this.length-1&&(this.$wrap.style.transition="none",this.index=1,this.$wrap.style.transform="translate(0%)"),setTimeout(function(){t.$wrap.style.transition="all 0.3s",t.$wrap.style.transform="translate("+e+")"},50),this.index+=1;var e="-"+100*this.index/this.length+"%"}}]),t}();e.Slider=a,e.log=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(0);e.default=function(t){function e(){t&&clearTimeout(t);var t=setTimeout(function(){if(0===r.length)return window.removeEventListener("scroll",e);(r=r.filter(function(t){return t.classList.contains("lazyload")})).forEach(function(t){n(t)&&i(t)})},300)}function n(t){var e=window.screen.height,n=window.scrollY,i=t.parentNode.offsetTop;return i>n&&i<n+e}function i(t){var e=t.getAttribute("data-src");t.setAttribute("src",e),t.classList.remove("lazyload")}var r=[].slice.call(t);e(),window.addEventListener("scroll",e)}},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Player=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=(n(0),function(t){return t&&t.__esModule?t:{default:t}}(n(6))),a=function(){function t(e){i(this,t),this.$el=e,this.$lyric=this.$el.querySelector(".lyric"),this.$lyricWrap=this.$lyric.querySelector(".lyrics-wrap"),this.songid=0,this.playButton=this.$el.querySelector(".play-icon"),this.duration=0,this.playOrPause(),this.createAudio(),this.index=0,this.$passTimeBar=this.$el.querySelector(".progress-now"),this.$passTime=this.$el.querySelector(".progress-start"),this.$duration=this.$el.querySelector(".progress-end"),document.querySelector(".player .play-list").addEventListener("click",this.hide),this.lyric=new s.default(this.$lyricWrap,this.$audio,this.duration,this.index)}return r(t,[{key:"hide",value:function(){document.querySelector(".player").setAttribute("style",""),document.querySelector(".background").classList.add("hide"),document.querySelector("body").setAttribute("style",""),document.querySelector("html").setAttribute("style","")}},{key:"playOrPause",value:function(){this.playButton.addEventListener("click",function(e){/toplay/.test(e.target.className)?(e.target.className=e.target.className.replace(/toplay/,"topause"),t.$audio.play(),t.update()):/topause/.test(e.target.className)&&(e.target.className=e.target.className.replace(/topause/,"toplay"),t.$audio.pause())});var t=this}},{key:"play",value:function(t){var e=this;t&&(this.setSongInfo(t),this.audioInit(t),this.playButton.className=this.playButton.className.replace(/topause/,"toplay"),this.$duration.innerHTML=this.formatTime(t.duration),this.$el.setAttribute("style","transform: translateY(0%)"),document.querySelector("body").setAttribute("style","overflow : hidden"),document.querySelector("html").setAttribute("style","overflow : hidden"),fetch("https://192.3.229.177:3011/lyric?keyword="+t.songid).then(function(t){return t.json()}).then(function(t){return JSON.parse(t.replace(/json\((.*)\)/,"$1"))}).then(function(t){return e.lyric.getLyric(t.lyric)}))}},{key:"setSongInfo",value:function(t){this.$el.className=this.$el.className.replace(/hide/,""),this.$el.querySelector(".album img").setAttribute("src","//y.gtimg.cn/music/photo_new/T002R150x150M000"+t.albumid+".jpg?max_age=2592000"),this.$el.querySelector(".songname").innerHTML=t.song,this.$el.querySelector(".singer").innerHTML=t.singer,document.querySelector(".background").setAttribute("style",'background-image: url("https://y.gtimg.cn/music/photo_new/T002R150x150M000'+t.albumid+'.jpg")'),document.querySelector(".background").classList.remove("hide"),this.$lyricWrap.setAttribute("style","transform: translateY(0%)")}},{key:"audioInit",value:function(t){this.$audio.src="http://ws.stream.qqmusic.qq.com/"+t.songid+".m4a?fromtag=38",this.duration=t.duration,this.index=0}},{key:"createAudio",value:function(){this.$audio=document.createElement("audio"),this.$audio.loop=!0,document.body.appendChild(this.$audio)}},{key:"moveProgress",value:function(){this.passTime=this.$audio.currentTime,this.baifengbi=100-this.passTime/this.$audio.duration*100,this.$passTime.innerHTML=this.formatTime(this.passTime),this.$passTimeBar.setAttribute("style","transform: translate(-"+this.baifengbi+"%)")}},{key:"formatTime",value:function(t){var e=Math.floor(t/60),n=Math.floor(t%60);return e<10&&(e="0"+e),n<10&&(n="0"+n),e+":"+n}},{key:"update",value:function(){var t=this;this.$lyricWrap.children[0].classList.add("active"),setInterval(function(){t.moveProgress(),t.lyric.moveLyric()},50)}}]),t}();e.Player=a},function(t,e,n){"use strict";var i=function(t){return t&&t.__esModule?t:{default:t}}(n(4)),r=n(5);n(2);n(7),n(8),n(9);new r.Search(document.querySelector(".search"));(0,i.default)(),(0,r.SwitchCancelBtn)(),document.querySelector(".player-button").addEventListener("click",function(){document.querySelector(".player").setAttribute("style","transform: translateY(0%)"),document.querySelector(".background").classList.remove("hide"),document.querySelector("body").setAttribute("style","overflow : hidden"),document.querySelector("html").setAttribute("style","overflow : hidden")})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(0);var i=function(t){return t&&t.__esModule?t:{default:t}}(n(1));e.default=function(){var t=document.querySelector(".nav-list");t.addEventListener("click",function(e){for(var n=t.children,r=new RegExp("(\\s|^)active(\\s|$)"),s=0;s<n.length;s++){n[s].className=n[s].className.replace(r,"");var a="."+n[s].getAttribute("data-view");document.querySelector(a).className+=" hide"}e.target.className+=" active";var o="."+e.target.getAttribute("data-view"),l=(new RegExp("(\\s|^)hide(\\s|$)"),document.querySelector(o));l.className=l.className.replace(/hide/g,""),(0,i.default)(l.querySelectorAll(".lazyload"))})}},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Search=e.SwitchCancelBtn=void 0;var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=(n(0),n(2)),a=function(){function t(e){i(this,t),this.$el=e,this.input=this.$el.querySelector("#search-in"),this.keyword="",this.page=1,this.fetching=!1,this.nomore=!1,this.input.addEventListener("keyup",this.onKeyUp.bind(this)),this.$song=this.$el.querySelector(".song-wrap"),window.addEventListener("scroll",this.onScroll.bind(this));var n=document.querySelector(".player"),r=new s.Player(n);this.$song.addEventListener("click",function(t){if("LI"===t.target.nodeName)e=t.target;else if("LI"===t.target.parentNode.nodeName)var e=t.target.parentNode;var n=e.getAttribute("songid"),i=e.getAttribute("duration"),s=e.getAttribute("albumid"),a=e.getAttribute("singer"),o={song:e.getAttribute("song"),singer:a,albumid:s,songid:n,duration:i};r.play(o)})}return r(t,[{key:"onKeyUp",value:function(t){var e=t.target.value.trim();e||this.reset(),"Enter"===t.key&&this.search(e)}},{key:"reset",value:function(){this.page=1,this.keyword="",this.$song.innerHTML=""}},{key:"search",value:function(t,e){var n=this;this.fetching||(document.querySelector(".loading").setAttribute("style","display:flex"),this.keyword=t,this.fetching=!0,fetch("https://192.3.229.177:3011/search?keyword="+this.keyword+"&page="+(e||this.page)).then(function(t){return t.json()}).then(function(t){return n.page=t.data.song.curpage,n.nomore="no results"===t.message,t.data.song.list}).then(function(t){return n.append(t)}).then(function(){n.fetching=!1,document.querySelector(".loading").setAttribute("style","display:none")}))}},{key:"append",value:function(t){var e=t.map(function(t){return'\n        <li class="song-item" songid="'+t.songid+'" duration="'+t.interval+'" albumid="'+t.albummid+'" singer="'+t.singer.map(function(t){return t.name}).join(" ")+'" song="'+t.songname+'">\n        <i class="music-icon"></i>\n        <h6 class="song-title">'+t.songname+'</h6>\n        <p class="singer">'+t.singer.map(function(t){return t.name}).join(" ")+"</p>\n      </li>\n      "}).join("");this.$song.insertAdjacentHTML("beforeend",e)}},{key:"onScroll",value:function(){if(this.nomore)return document.querySelector(".nomore").setAttribute("style","display:block"),window.removeEventListener("scroll",this.onScroll);document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-1&&this.search(this.keyword,this.page+1)}}]),t}();e.SwitchCancelBtn=function(){var t=document.querySelector("#search-in"),e=document.querySelector(".cancel");t.addEventListener("focus",function(){e.setAttribute("style","display:block")}),e.addEventListener("click",function(){e.setAttribute("style","display:none")})},e.Search=a},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(e,n,r,s){i(this,t),this.index=s,this.timeArray=[],this.duration=r,this.$lyricWrap=e,this.$audio=n,this.lyricLength=0}return r(t,[{key:"getLyric",value:function(t){var e=(this.formatText(t)||"").match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)||[];this.lyricLength=e.length,this.renderLyric(e),this.timeTransform(e)}},{key:"renderLyric",value:function(t){var e=t.map(function(t){return'\n      <div class="lyric-line">'+t.slice(10)+"</div>\n    "}).join("");this.$lyricWrap.innerHTML=e}},{key:"moveLyric",value:function(){if(Math.floor(this.$audio.currentTime)===this.timeArray[this.index+1]){this.$lyricWrap.children[this.index].classList.remove("active"),this.$lyricWrap.children[this.index+1].classList.add("active");var t=this.index/this.lyricLength*100;this.$lyricWrap.setAttribute("style","transform: translateY(-"+t+"%)"),this.index=this.index+1,this.index===this.lyricLength-1&&this.$audio.currentTime-1<this.duration&&(this.index=0)}}},{key:"formatText",value:function(t){var e=document.createElement("div");return e.innerHTML=t,e.innerText}},{key:"timeTransform",value:function(t){this.timeArray=t.map(function(t){return+t.replace(/^\[(\d{2}):(\d{2}).*/,function(t,e,n){return 60*+e+ +n})})}}]),t}();e.default=s},function(t,e,n){"use strict";function i(t){var e=t.map(function(t){return{link:t.linkUrl,image:t.picUrl}});new o.Slider({el:document.querySelector(".slider"),slides:e})}function r(t){document.querySelector(".radio-ct").innerHTML=t.map(function(t){return'\n      <li class="item-list">\n        <a href="#" class="list-main">\n          <div class="list-item">\n            <img class="lazyload" data-src="'+t.picUrl+'" alt="">\n            <span class="icon icon_play"></span>\n          </div>\n          <div class="list_info">\n            <h3 class="list_tit tit_two_row">'+t.Ftitle+"</h3>\n          </div>\n        </a>\n      </li>\n    "}).join("")}function s(t){document.querySelector(".hot-ct").innerHTML=t.map(function(t){return'\n      <li class="item-list">\n        <a href="#" class="list-main">\n          <div class="list-item">\n            <img class="lazyload" data-src="'+t.picUrl+'" alt="">\n            <span class="icon icon_play"></span>\n          </div>\n          <div class="list_info">\n            <h3 class="list_tit tit_two_row">'+t.songListDesc+'</h3>\n            <p class="list_text">'+t.songListAuthor+"</p>\n          </div>\n        </a>\n      </li>\n    "}).join("")}var a=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),o=n(0);fetch("https://192.3.229.177:3011/").then(function(t){return t.json()}).then(function(t){i(t.data.slider),r(t.data.radioList),s(t.data.songList),(0,a.default)(document.querySelectorAll(".lazyload"))})},function(t,e,n){"use strict";function i(t){return t.map(function(t,e){return"\n        <p>"+(e+1)+'<span class="text-name">'+t.songname+"</span>- "+t.singername+"</p>\n\n      "}).join("")}fetch("https://192.3.229.177:3011/rank").then(function(t){return t.json()}).then(function(t){return t.data.topList}).then(function(t){document.querySelector(".rank-container").innerHTML=t.map(function(t){return'\n      <li class="rank-item">\n        <div class="topic-main">\n        <a href="#" class="topic_media">\n          <img data-src="'+t.picUrl+'" class="lazyload">\n          <span class="listen_count"><i class="icon"></i>'+(t.listenCount/1e4).toFixed(1)+'万</span>\n        </a>\n        <div class="topic-info">\n          <div class="topic-cont">\n            <h3 class="topic-title">'+t.topTitle+"</h3>\n            "+i(t.songList)+'\n          </div>\n          <i class="topic-arrow"></i>\n        </div>\n      </div>\n    </li>\n      '}).join("")})},function(t,e){}]);