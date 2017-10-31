import {log} from "./slider"
function lazyLoad(images) {
  log(images)
  let imgs = [].slice.call(images)
  onscroll()
  window.addEventListener('scroll', onscroll)

  function onscroll() {
    if (clock){
      clearTimeout(clock)
    }
   var clock = setTimeout(function () {
      if (imgs.length === 0) {
        return window.removeEventListener('scroll',onscroll)
      }
      imgs = imgs.filter(img => img.classList.contains('lazyload'))
      imgs.forEach(img => {
        if(isVisible(img)){
          // 加载img
          log(img)
          loadImg(img)
        }
      })
    },300)

  }
  function isVisible(img) {
    var winH = window.screen.height,
        scrollH = window.scrollY,
        top = img.parentNode.offsetTop;
    if(top > scrollH && top < scrollH + winH){
      return true
    }else {
      return false
    }
  }

  function loadImg(img) {
    let src = img.getAttribute('data-src')
    img.setAttribute('src', src)
    img.classList.remove('lazyload')
  }
}

export default lazyLoad