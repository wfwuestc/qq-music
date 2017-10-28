(function () {
  let slider = new Slider({
    el: document.querySelector('.slider'),
    slides: [
      {link: '#1', image: 'images/brs.jpg'},
      {link: '#2', image: 'images/lrh.jpg'},
      {link: '#3', image: 'images/qt.jpg'},
      {link: '#4', image: 'images/wzt.jpg'},
      {link: '#5', image: 'images/zbc.jpg'},
    ],
  })
  window.slider = slider
})()