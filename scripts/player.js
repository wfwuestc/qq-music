import {log} from "./slider"
class Player {
  constructor(el, songid, duration) {
    this.$el = el
    this.songid =songid
    this.playButton = this.$el.querySelector('.play-icon')
    this.duration = duration || 0
    this.playOrPause()
    this.createAudio()
    this.$passTimeBar = this.$el.querySelector('.progress-now')
    this.$passTime = this.$el.querySelector('.progress-start')
    this.$duration = this.$el.querySelector('.progress-end')
  }

  playOrPause() {
    this.playButton.addEventListener('click', action)
    let _this = this

    function action(e) {
      if (/toplay/.test(e.target.className)) {
        e.target.className = e.target.className.replace(/toplay/, 'topause')
        _this.$audio.play()
        _this.update()
        _this.$duration.innerHTML = _this.formatTime(_this.duration)

        // duration 可以直接在获取歌曲src时获取
      } else if (/topause/.test(e.target.className)) {
        e.target.className = e.target.className.replace(/topause/, 'toplay')
        _this.$audio.pause()
      }
    }
  }

  createAudio() {
    this.$audio = document.createElement('audio')
    this.$audio.src = `http://ws.stream.qqmusic.qq.com/${this.songid}.m4a?fromtag=38`
    this.$audio.loop = true
    document.body.appendChild(this.$audio)
  }

  moveProgress() {
    this.passTime = this.$audio.currentTime
    this.baifengbi = 100 - this.passTime/this.$audio.duration*100
    this.$passTime.innerHTML = this.formatTime(this.passTime)
    this.$passTimeBar.setAttribute("style",`transform: translate(-${this.baifengbi}%)`)
  }

  formatTime (time) {
    let minutes = Math.round(time/60)
    let seconds = Math.round(time%60)
    if(minutes < 10){
      minutes = '0'+minutes
    }
    if(seconds < 10){
      seconds = '0'+seconds
    }
    return minutes+':'+seconds
  }

  update () {
    let _this = this
    setInterval(
        function () {
          _this.moveProgress()
        },50
    )
  }




}
export {Player}