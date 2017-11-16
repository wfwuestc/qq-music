require('../scss/app.scss')
import Tab from './tab'
import {SwitchCancelBtn, Search} from "./search"
import {Player} from "./player"
import "./rec"
import "./rank"

let search = new Search(document.querySelector('.search'))
Tab()
SwitchCancelBtn()
document.querySelector('.player-button').addEventListener('click', function () {
  document.querySelector('.player').setAttribute("style","transform: translateY(0%);opacity: 1")
  document.querySelector('.background').classList.remove('hide')
  document.querySelector('body').setAttribute("style", "overflow : hidden")
  document.querySelector('html').setAttribute("style", "overflow : hidden")
})

