import lazyLoad from './lazyLoad'
import {Slider, log} from "./slider"

fetch('http://47.91.156.35:5365/')
    .then(res => res.json())
    .then(render)

function render(json) {
  renderSlider(json.data.slider)
  renderRadios(json.data.radioList)
  renderPlayList(json.data.songList)
  lazyLoad(document.querySelectorAll('.lazyload'))
}

function renderSlider(slides) {
  let sliders = slides.map(slider => {
    return {link: slider.linkUrl, image: slider.picUrl}
  })
  new Slider({
    el: document.querySelector('.slider'),
    slides: sliders,
  })
}

function renderRadios(radios) {
  document.querySelector('.radio-ct').innerHTML = radios.map(radio =>
      `
      <li class="item-list">
        <a href="#" class="list-main">
          <div class="list-item">
            <img class="lazyload" data-src="${radio.picUrl}" alt="">
            <span class="icon icon_play"></span>
          </div>
          <div class="list_info">
            <h3 class="list_tit tit_two_row">${radio.Ftitle}</h3>
          </div>
        </a>
      </li>
    `).join('')
}

function renderPlayList(list) {
  document.querySelector('.hot-ct').innerHTML = list.map(list =>
      `
      <li class="item-list">
        <a href="#" class="list-main">
          <div class="list-item">
            <img class="lazyload" data-src="${list.picUrl}" alt="">
            <span class="icon icon_play"></span>
          </div>
          <div class="list_info">
            <h3 class="list_tit tit_two_row">${list.songListDesc}</h3>
            <p class="list_text">${list.songListAuthor}</p>
          </div>
        </a>
      </li>
    `).join('')
}