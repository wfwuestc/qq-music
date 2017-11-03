require('../scss/app.scss')
import Tab from './tab'
import {Slider, log} from "./slider"
import lazyLoad from './lazyLoad'

(function () {
  fetch('http://47.91.156.35:5365/')
      .then(res => res.json())
      .then(render)

  fetch('http://47.91.156.35:5365/rank')
      .then(res => res.json())
      .then(renderRank)

  function renderRank(json) {
    renderTopList(json.data.topList)
    lazyLoad(document.querySelectorAll('.lazyload'))
    log('2222')
  }


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

  function renderTopList(list) {
    document.querySelector('.rank-container').innerHTML = list.map(item =>
      `
      <li class="rank-item">
        <div class="topic-main">
        <a href="#" class="topic_media">
          <img data-src="${item.picUrl}" class="lazyload">
          <span class="listen_count"><i class="icon"></i>${((item.listenCount)/10000).toFixed(1) + "万"}</span>
        </a>
        <div class="topic-info">
          <div class="topic-cont">
            <h3 class="topic-title">${item.topTitle}</h3>
            ${rankContain(item.songList)}
          </div>
          <i class="topic-arrow"></i>
        </div>
      </div>
    </li>
      `
    ).join('')
  }

  function rankContain(songList) {
    log(songList)
    return songList.map((item, index) =>
      `
        <p>${index + 1}<span class="text-name">${item.songname}</span>- ${item.singername}</p>

      `
    ).join('')
  }


})()
Tab()