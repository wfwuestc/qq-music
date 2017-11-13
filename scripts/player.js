import {log} from "./slider"

class Player {
  constructor(el) {
    this.$el = el
    this.songid = 0
    this.playButton = this.$el.querySelector('.play-icon')
    this.duration = 0
    this.playOrPause()
    this.createAudio()
    this.$passTimeBar = this.$el.querySelector('.progress-now')
    this.$passTime = this.$el.querySelector('.progress-start')
    this.$duration = this.$el.querySelector('.progress-end')
    document.querySelector('.player .play-list').addEventListener('click', this.hide)
  }

  hide() {
    document.querySelector('.player').className += "hide"
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
    this.playButton.className =  this.playButton.className.replace(/topause/, 'toplay')
    this.$audio.src = `http://ws.stream.qqmusic.qq.com/${option.songid}.m4a?fromtag=38`
    this.$duration.innerHTML = this.formatTime(option.duration)
    play.className = play.className.replace(/hide/, "")
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
    setInterval(
        function () {
          _this.moveProgress()
        }, 50,
    )
  }


}

export {Player}