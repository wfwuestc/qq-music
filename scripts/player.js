import {log} from "./slider"

class Player {
  constructor(el) {
    this.$el = el
    this.$lyric = this.$el.querySelector('.lyric')
    this.$lyricWrap = this.$lyric.querySelector('.lyrics-wrap')
    this.lyricLength = 0
    this.songid = 0
    this.playButton = this.$el.querySelector('.play-icon')
    this.duration = 0
    this.index = 0
    this.timeArray = []
    this.playOrPause()
    this.createAudio()
    this.$passTimeBar = this.$el.querySelector('.progress-now')
    this.$passTime = this.$el.querySelector('.progress-start')
    this.$duration = this.$el.querySelector('.progress-end')
    document.querySelector('.player .play-list').addEventListener('click', this.hide)
  }

  hide() {
    document.querySelector('.player').className += "hide"
    document.querySelector('.background').classList.add('hide')

  }

  playOrPause() {
    this.playButton.addEventListener('click', action)
    let _this = this

    function action(e) {
      if (/toplay/.test(e.target.className)) {
        e.target.className = e.target.className.replace(/toplay/, 'topause')
        _this.$audio.play()
        _this.update()
        // duration 可以直接在获取歌曲src时获取
      } else if (/topause/.test(e.target.className)) {
        e.target.className = e.target.className.replace(/topause/, 'toplay')
        _this.$audio.pause()
      }
    }
  }

  play(option) {
    if (!option) return
    let play = document.querySelector('.player')
    play.className = play.className.replace(/hide/, "")
    play.querySelector('.album img').setAttribute("src", `//y.gtimg.cn/music/photo_new/T002R150x150M000${option.albumid}.jpg?max_age=2592000`)
    play.querySelector('.songname').innerHTML = option.song
    play.querySelector('.singer').innerHTML = option.singer
    this.playButton.className = this.playButton.className.replace(/topause/, 'toplay')
    this.$audio.src = `http://ws.stream.qqmusic.qq.com/${option.songid}.m4a?fromtag=38`
    this.duration = option.duration
    this.$duration.innerHTML = this.formatTime(option.duration)
    play.className = play.className.replace(/hide/, "")
    this.index = 0
    this.$lyricWrap.setAttribute("style",`transform: translateY(0%)`)
    document.querySelector('.background').setAttribute("style", `background-image: url("https://y.gtimg.cn/music/photo_new/T002R150x150M000${option.albumid}.jpg")`)
    document.querySelector('.background').classList.remove('hide')
    fetch(`http://localhost:4000/lyric?keyword=${option.songid}`)
        .then(res => res.json())
        .then(string => JSON.parse(string.replace(/json\((.*)\)/, "$1")))
        .then(json => this.getLyric(json.lyric))
  }

  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.loop = true
    document.body.appendChild(this.$audio)
  }

  moveProgress() {
    this.passTime = this.$audio.currentTime
    this.baifengbi = 100 - this.passTime / this.$audio.duration * 100
    this.$passTime.innerHTML = this.formatTime(this.passTime)
    this.$passTimeBar.setAttribute("style", `transform: translate(-${this.baifengbi}%)`)

  }

  formatTime(time) {
    let minutes = Math.round(time / 60)
    let seconds = Math.round(time % 60)
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return minutes + ':' + seconds
  }

  update() {
    let _this = this
    this.$lyricWrap.children[0].classList.add('active')
    setInterval(
        function () {
          _this.moveProgress()
          if(Math.floor(_this.$audio.currentTime)===_this.timeArray[_this.index+1]){
            _this.$lyricWrap.children[_this.index].classList.remove('active')
            _this.$lyricWrap.children[_this.index+1].classList.add('active')
            let move = _this.index/_this.lyricLength*100
            _this.$lyricWrap.setAttribute("style",`transform: translateY(-${move}%)`)
            _this.index = _this.index+1
            if(_this.index === _this.lyricLength-1 && _this.$audio.currentTime-1 < _this.duration) {
              _this.index = 0
            }
          }
        }, 50)
  }

  getLyric(lyric) {
    let text = this.formatText(lyric) || ''
    let textArray = text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
    this.lyricLength = textArray.length
    this.renderLyric(textArray)
    this.timeTransform(textArray)
  }

  renderLyric (text) {
    let html = text.map(line => `
      <div class="lyric-line">${line.slice(10)}</div>
    `).join('')
    this.$lyricWrap.innerHTML = html

  }

  timeTransform (textarray) {
    this.timeArray = textarray.map(item => {
      return +item.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
    })
  }

  formatText(text) {
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }


}

export {Player}