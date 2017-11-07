import {log} from './slider'
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
    this.page = 2
    this.input.addEventListener('keyup', this.onKeyUp.bind(this))
    this.$song = this.$el.querySelector('.song-wrap')
  }
  onKeyUp(e) {
    let keyword = e.target.value.trim() //使用trim()去除两端空白
    log('search:',keyword)
    if(!keyword) {return}
    if(e.key !== 'Enter') {return}
    this.search(keyword)
  }

  search(key) {
    this.keyword = key
    fetch(`http://47.91.156.35:5365/search?keyword=${this.keyword}&page=${this.page}`)
        .then(res => res.json())
        .then(json => json.data.song.list)
        .then(songs => this.append(songs))
  }

  append(songs){
    log(songs)
    let html = songs.map(item =>
      `
        <li class="song-item">
        <i class="music-icon"></i>
        <h6 class="song-title">${item.songname}</h6>
        <p class="singer">${item.singer.map(s => s.name).join(' ')}</p>
      </li>
      `
    ).join('')
    log('html',html)
    this.$song.insertAdjacentHTML('beforeend', html)
    this.scroll()
  }
  scroll() {

  }
}
export {SwitchCancelBtn, Search}