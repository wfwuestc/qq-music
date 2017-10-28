var log = console.log.bind(console)

class Slider {
  constructor(options = {}) {
    this.$el = options.el
    this.slides = options.slides
    this.interval = options.interval || 2000
    this.index = 0
    this.render()
    this.start()

  }

  render() {
    this.$el.innerHTML = `<div class="slider-wrap"></div>`
    this.first = this.slides[0]
    this.slides.push(this.first)
    log(this.slides)
    this.$wrap = this.$el.firstElementChild
    this.length = this.slides.length
    this.$wrap.style.width = `${this.length * 100}%`
    this.$wrap.innerHTML = this.slides.map(slide =>
        `<div class="slider-item">
          <a href="${slide.link}">
            <img src="${slide.image}" alt="">
          </a>
        </div>`,
    ).join('')
    log('length', this.length)
  }

  start() {
    setInterval(this.next.bind(this), this.interval)
  }

  next() {


    let x = `-${this.index * 100 / this.length}%`
    this.$wrap.style.transition = `all 0.3s`
    this.$wrap.style.transform = `translate(${x})`
    this.index += 1
    log('index', this.index)
    var _this = this
    setTimeout(function () {
      if (_this.index === _this.length) {
        _this.$wrap.style = `width:600%;transition:none`
        _this.index = 1
        _this.$wrap.style.transform = `translate(0%)`
        // log('1',-100 / _this.length,_this.$wrap,_this.$wrap.style.transform)
      }
    },400)
    
  }
}
