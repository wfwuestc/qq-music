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
    let play = document.querySelector('.player')
    let player = new Player(play)
    this.$song.addEventListener('click', function (e) {
      if (e.target.nodeName === "LI") {
        var node = e.target
      }else if(e.target.parentNode.nodeName === "LI"){
        var node = e.target.parentNode
      }
      let songid = node.getAttribute("songid")
      let songmid = node.getAttribute("songmid")

      let duration = node.getAttribute("duration")
      let albumid = node.getAttribute("albumid")
      let singer = node.getAttribute("singer")
      let song = node.getAttribute("song")
      let option= {
        song:song,
        singer:singer,
        albumid:albumid,
        songid:songid,
        songmid:songmid,
        duration:duration,
      }
      player.play(option)
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
    fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${page || this.page}`)
        .then(res => res.json())
        .then(json => {
          this.page = json.data.song.curpage
          this.nomore = (json.message === "no results")
          log(json.data.song.list)
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
        <li class="song-item" songmid="${item.songmid}" songid="${item.songid}" duration="${item.interval}" albumid="${item.albummid}" singer="${item.singer.map(s => s.name).join(' ')}" song="${item.songname}">
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