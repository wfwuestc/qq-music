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
  }

  start() {
    setInterval(this.next.bind(this), this.interval)
  }

  next() {
    let _this = this
    if (this.index === this.length - 1) {
      this.$wrap.style.transition =`none`
      this.index = 1
      this.$wrap.style.transform = `translate(0%)`
    }
    //设置延时是留给程序操作DOM的时间
    setTimeout(function () {
      _this.$wrap.style.transition = `all 0.3s`
      _this.$wrap.style.transform = `translate(${x})`
    },50)
    this.index += 1
    let x = `-${this.index * 100 / this.length}%`
  }
}
export {Slider,log}