class Lyric {
  constructor (wrap, audio, duration, index) {
    this.index = index
    this.timeArray = []
    this.duration = duration
    this.$lyricWrap = wrap
    this.$audio = audio
    this.lyricLength = 0
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

  moveLyric() {
    if(Math.floor(this.$audio.currentTime)===this.timeArray[this.index+1]){
      this.$lyricWrap.children[this.index].classList.remove('active')
      this.$lyricWrap.children[this.index+1].classList.add('active')
      let move = this.index/this.lyricLength*100
      this.$lyricWrap.setAttribute("style",`transform: translateY(-${move}%)`)
      this.index = this.index+1
      if(this.index === this.lyricLength-1 && this.$audio.currentTime-1 < this.duration) {
        this.index = 0
      }
    }
  }

  formatText(text) {
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }

  timeTransform (textarray) {
    this.timeArray = textarray.map(item => {
      return +item.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
    })
  }
}

export default Lyric