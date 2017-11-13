import {log} from './slider'
import {Player} from "./player"

function SwitchCancelBtn() {
  const input = document.querySelector('#search-in')
  const cancelBtn = document.querySelector('.cancel')
  input.addEventListener('focus', function () {
    cancelBtn.setAttribute('style', 'display:block')
  })
  cancelBtn.addEventListener('click', function () {
    cancelBtn.setAttribute('style', 'display:none')
  })
}

class Search {
  constructor(el) {
    this.$el = el
    this.input = this.$el.querySelector('#search-in')
    this.keyword = ''
    this.page = 1
    this.fetching = false
    this.nomore = false
    this.input.addEventListener('keyup', this.onKeyUp.bind(this))
    this.$song = this.$el.querySelector('.song-wrap')
    window.addEventListener('scroll', this.onScroll.bind(this))
    this.$song.addEventListener('click', function (e) {
      let play = document.querySelector('.player')
      if (e.target.nodeName === "LI") {
        let songid = e.target.getAttribute("songid")
        let duration = e.target.getAttribute("duration")
        play.className = play.className.replace(/hide/,"")
        new Player(play, songid, duration)
      }else if(e.target.parentNode.nodeName === "LI"){
        let songid = e.target.parentNode.getAttribute("songid")
        let duration = e.target.parentNode.getAttribute("duration")
        let promise = Promise.resolve()

        play.className = play.className.replace(/hide/,"")
        new Player(play, songid, duration)
      }
    })
  }

  onKeyUp(e) {
    let keyword = e.target.value.trim() //使用trim()去除两端空白
    if (!keyword) {
      this.reset()
    }
    if (e.key !== 'Enter') {
      return
    }
    this.search(keyword)
  }

  reset() {
    this.page = 1
    this.keyword = ''
    this.$song.innerHTML = ''
  }

  search(key, page) {
    if (this.fetching) return
    document.querySelector('.loading').setAttribute('style', 'display:flex')
    this.keyword = key
    this.fetching = true
    fetch(`http://47.91.156.35:5365/search?keyword=${this.keyword}&page=${page || this.page}`)
        .then(res => res.json())
        .then(json => {
          this.page = json.data.song.curpage
          this.nomore = (json.message === "no results")
          return json.data.song.list
        })
        .then(songs => this.append(songs))
        .then(() => {

          this.fetching = false
          document.querySelector('.loading').setAttribute('style', 'display:none')
        })
  }

  append(songs) {
    let html = songs.map(item =>
        `
        <li class="song-item" songid="${item.songid}" duration="${item.interval}">
        <i class="music-icon"></i>
        <h6 class="song-title">${item.songname}</h6>
        <p class="singer">${item.singer.map(s => s.name).join(' ')}</p>
      </li>
      `,
    ).join('')
    this.$song.insertAdjacentHTML('beforeend', html)
  }

  onScroll() {
    if (this.nomore) {
      document.querySelector('.nomore').setAttribute('style', 'display:block')
      return window.removeEventListener('scroll', this.onScroll)
    }
    if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 1) {
      this.search(this.keyword, this.page + 1)
    }
  }
}

export {SwitchCancelBtn, Search}