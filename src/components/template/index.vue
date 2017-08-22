<template>
  <mn-scroller @scroll="scrolling">
    <div class="container" id="container" :style="backStyle">
      <div :class="['content']" v-if="isShow">
        <div :class="['items']" v-for="(item, index) of config.data" :key="index">
          <!-- tab -->
          <nav-menu :navList="item.items" :color="item.color" :activeColor="item.activeColor"
            @goTo="goTo" :active="activeNav" @changeActive="changeActive" v-if="item.type==='tab'"></nav-menu>
          <!-- image -->
          <div
            :class="['header-image']"
            v-if="item.type==='image'"
            :style="calcMargin(item)"
          >
            <a :href="item.url" v-if="item.url" alt="headimage"><img :src="item.src"></a>
            <img :src="item.src" v-else alt="headimage">
          </div>
          <!-- banner -->
          <div class="banner" v-if="item.type==='banner'" :style="calcMargin(item)">
            <mn-carousel v-if="item.items.length>1">
              <mn-carousel-item v-for="data of item.items" :key="data">
                <a v-if="data.url" :href="data.url"><img :src="data.src"></a>
                <img :src="data.src" v-else>
              </mn-carousel-item>
            </mn-carousel>
            <div class="banner-img" v-else>
              <a :href="item.items[0].url" v-if="item.items[0].url"><img :src="item.items[0].src"></a>
              <img :src="item.items[0].src" v-else>
            </div>
          </div>
          <!-- product -->
          <product :data="item" v-if="item.type==='product'" :skusInfo="skusinfo"></product>
          <!-- products -->
          <products :data="item" v-if="item.type==='products'" :skusInfo="skusinfo"></products>
          <!-- button -->
          <div class="footer" v-if="item.type==='button'">
            <div class="to-top" @click="backToTop" id="toTop">
              <mn-icon :name="icons.arrowUp" :width="60" :height="60"></mn-icon>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading-text">
        <mn-loading-icon></mn-loading-icon>loading...
      </div>
    </div>
  </mn-scroller>
</template>

<script>
  import {showTemplate} from '../../axios/template'
  import NavMenu from './nav'
  import carousel from 'vue-human/suites/carousel'
  import scroller from 'vue-human/suites/scroller'
  import product from './product'
  import products from './products'

  export default {
    data () {
      return {
        icons: {
          cart: require('vue-human-icons/js/ios/cart'),
          arrowUp: require('vue-human-icons/js/ios/arrow-up')
        },
        config: {},
        skusinfo: {},
        isShow: false,
        timer: null,
        start: null,
        timer2: null,
        activeNav: undefined,
        ids: [],
        count: 0
      }
    },
    components: {
      NavMenu,
      ...carousel.map(),
      ...scroller.map(),
      product,
      products
    },
    mounted () {
      return showTemplate(this.$route.query.id, this.$route.query.city).then(response => {
        this.skusinfo = response.data.JsonData.skusinfo
        this.config = JSON.parse(response.data.JsonData.data)
        // Object.keys(this.config.data).forEach(key => {
        //   if (this.config.data[key].cartIcon) {
        //     document.getElementById('container').addEventListener('scroll', () => {
        //       this.debounce(this.handleScronll)()
        //     })
        //   }
        //   document.getElementById('container').addEventListener('scroll', () => {
        //     this.debounce(this.handleScronll)()
        //     console.log(222)
        //   })
        // })
        console.log(1, this.config)
        console.log(this.skusinfo)
        this.isShow = true
        this.onInit()
      }).catch(error => {
        console.log(error)
      })
    },
    computed: {
      backStyle () {
        let str = ''
        let obj = {}
        if (this.config.data) {
          this.config.data.forEach(key => {
            if (key.type === 'other') {
              obj = key
            }
          })
          str += `background-color: ${obj.background.color};`
          str += `background-size: ${obj.background.size};`
          str += `background-position: ${obj.background.position};`
          str += `background-repeat: ${obj.background.repeat};`
          str += `background-image: url('${obj.background.image}');`
        }
        return str
      }
    },
    methods: {
      Observe () {
        this.$nextTick(() => {
          let imgs = document.querySelectorAll('.lazy-load')
          Array.from(imgs).forEach(el => {
            if ((!!el.getAttribute('data-src')) && this.isInsight(el)) {
              this.loadImg(el)
            }
          })
        })
      },
      isInsight (el) {
        let obj = el.getBoundingClientRect()
        let clientHeight = window.innerHeight
        return obj.top <= clientHeight + 100
      },
      loadImg (el) {
        el.src = el.getAttribute('data-src')
        el.removeAttribute('data-src')
      },
      onInit () {
        this.config.data.forEach(key => {
          if (key.type === 'other') {
            window.document.title = key.title
          } else if (key.type === 'tab') {
            key.items.forEach(val => {
              this.ids.push(val.target)
            })
          }
        })
        this.Observe()
      },
      calcMargin (data) {
        let str = ''
        let margin = []
        let padding = []
        if (data.margin) {
          margin = data.margin.trim().split(' ')
        }
        if (data.padding) {
          padding = data.padding.trim().split(' ')
        }
        if (margin.length > 3) {
          str += `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;`
        }
        if (padding.length > 3) {
          str += `padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px;`
        }
        return str
      },
      backToTop () {
        this.animate(0, 200)
        document.getElementById('toTop').style.display = 'none'
      },
      goTo (val) {
        let target = document.getElementById(val)
        if (target) {
          let preNode = target.parentNode.previousSibling.children[0]
          if (preNode.className === 'banner') {
            this.animate(target.offsetTop - preNode.offsetHeight - 80, 300)
          } else {
            this.animate(target.offsetTop - 80, 300)
          }
        }
      },
      debounce (func) {
        return () => {
          let now = new Date()
          if (!this.start) {
            this.start = now
          }
          if (now - this.start > 500) {
            func()
            this.start = now
            clearTimeout(this.timer)
          } else {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              func()
              this.start = null
            }, 300)
          }
        }
      },
      handleScronll () {
        let node = document.getElementsByClassName('mn-scroller')[0]
        let topNode = document.getElementById('toTop')
        let tab = document.getElementById('tab')
        let windowHeight = window.screen.height
        let afterTabTop = 0
        if (topNode) {
          if (node.scrollTop >= windowHeight) {
            topNode.style.display = 'block'
          } else {
            topNode.style.display = 'none'
          }
        }
        // tab
        if (tab) {
          afterTabTop = tab.parentNode.offsetTop
          if (afterTabTop <= node.scrollTop) {
            tab.className = 'nav-menu isFixed'
          } else {
            tab.className = 'nav-menu'
          }
          // 导航随滚动而移动
          this.ids.forEach((val, index) => {
            let targetNodeTop = document.getElementById(val).offsetTop
            if (targetNodeTop <= node.scrollTop + windowHeight * 2) {
              this.activeNav = index
            }
          })
        }
        this.Observe()
      },
      animate (end, time) {
        let container = document.getElementsByClassName('mn-scroller')[0]
        let scroll = end - container.scrollTop
        let startTime = Date.now()
        let percent = null
        clearInterval(this.timer2)
        this.timer2 = setInterval(() => {
          let remaintime = Math.max(0, startTime + time - Date.now())
          let pre = scroll * percent
          percent = 1 - remaintime / time
          if (percent !== 1) {
            container.scrollTop += scroll * percent - pre
          } else {
            clearInterval(this.timer2)
            container.scrollTop = end
          }
        }, 13)
      },
      scrolling (e, t) {
        this.debounce(this.handleScronll)()
      },
      changeActive (val) {
        this.activeNav = val
      }
    }
}
</script>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    transition: 3s;

    .content {
      margin: 0 auto;
      max-width: 1080px;

      .items {
        width: 100%;
      }
    }
  }

  .isFixed {
    position: fixed !important;
    left: 0;
    box-shadow: 0px 3px 0px 3px rgba(0,0,0,0.1);
    top: 0;
  }
</style>
