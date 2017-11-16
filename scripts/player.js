import {log} from "./slider"
import Lyric from "./lyric"

class Player {
  constructor(el) {
    this.$el = el
    this.$lyric = this.$el.querySelector('.lyric')
    this.$lyricWrap = this.$lyric.querySelector('.lyrics-wrap')
    this.songid = 0
    this.playButton = this.$el.querySelector('.play-icon')
    this.duration = 0
    this.playOrPause()
    this.createAudio()
    this.index = 0
    this.$passTimeBar = this.$el.querySelector('.progress-now')
    this.$passTime = this.$el.querySelector('.progress-start')
    this.$duration = this.$el.querySelector('.progress-end')
    document.querySelector('.player .play-list').addEventListener('click', this.hide)
    this.lyric = new Lyric(this.$lyricWrap, this.$audio, this.duration, this.index)
  }

  hide() {
    document.querySelector('.player').setAttribute("style", "")
    document.querySelector('.background').classList.add('hide')
    document.querySelector('body').setAttribute("style", "")
    document.querySelector('html').setAttribute("style", "")
  }

  playOrPause() {
    this.playButton.addEventListener('click', action)
    let _this = this

    function action(e) {
      if (/toplay/.test(e.target.className)) {
        e.target.className = e.target.className.replace(/toplay/, 'topause')
        _this.$audio.play()
        _this.update()
      } else if (/topause/.test(e.target.className)) {
        e.target.className = e.target.className.replace(/topause/, 'toplay')
        _this.$audio.pause()
      }
    }
  }

  play(option) {
    if (!option) return
    this.setSongInfo(option)
    this.audioInit(option)
    this.playButton.className = this.playButton.className.replace(/topause/, 'toplay')
    this.$duration.innerHTML = this.formatTime(option.duration)
    this.$el.setAttribute("style","transform: translateY(0%); opacity: 1")
    document.querySelector('body').setAttribute("style", "overflow : hidden")
    document.querySelector('html').setAttribute("style", "overflow : hidden")
    fetch(`https://qq-music-api.now.sh/lyrics?id=${option.songid}`)
        .then(res => res.json())
        .then(json => {
           this.lyric.getLyric(json.lyric)

        })
  }
  setSongInfo(option) {
    this.$el.className = this.$el.className.replace(/hide/, "")
    this.$el.querySelector('.album img').setAttribute("src", `https://y.gtimg.cn/music/photo_new/T002R150x150M000${option.albumid}.jpg?max_age=2592000`)
    this.$el.querySelector('.songname').innerHTML = option.song
    this.$el.querySelector('.singer').innerHTML = option.singer
    document.querySelector('.background').setAttribute("style", `background-image: url("https://y.gtimg.cn/music/photo_new/T002R150x150M000${option.albumid}.jpg")`)
    document.querySelector('.background').classList.remove('hide')
    this.$lyricWrap.setAttribute("style",`transform: translateY(0%); opacity: 1;`)
  }

  audioInit(option){
    this.$audio.src = `http://ws.stream.qqmusic.qq.com/${option.songid}.m4a?fromtag=38`
    this.duration = option.duration
    this.index = 0
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
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
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
          _this.lyric.moveLyric()
        }, 50)
  }
}

export {Player}