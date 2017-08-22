<template>
  <div class="hot-items pointer" :style="calcStyle">
      <div style="padding: 0;margin: 0;">
        <a :class="['hot-item', {'hot-item-right' : data.right===true}]" :href="calcHref">
          <div class="hot-item-img">
            <div class="item-tag">
              <span class="item-tag-text" >{{ data.tip }}</span>
            </div>
            <img :data-src="skusInfo[data.sku].newImageURL" v-if="skusInfo&&skusInfo[data.sku]"
            src="../../assets/loading_1.jpg" :class="['lazy-load']">
            <img src="../../assets/loading_1.jpg" v-else>
          </div>
          <div class="hot-item-info">
            <div class="item-info-title">
              <h2 v-if="skusInfo&&skusInfo[data.sku]">{{ skusInfo[data.sku].Name }}</h2>
              <h2 v-else>暂无</h2>
            </div>
            <div class="item-info-subtitle">
              <ul v-for="list of data.items">
                <li v-if="list.intro&&skusInfo&&skusInfo[data.sku]">{{ list.intro }}</li>
                <!-- <li v-else>暂无</li> -->
              </ul>
            </div>
            <div class="item-info-price" v-if="skusInfo&&skusInfo[data.sku]">
              <p class="old-price">原价 ￥ {{ skusInfo[data.sku].price2 }}</p>
              <p class="new-price">活动价 ￥<span class="new-price-big">
              {{ skusInfo[data.sku].price.split('.')[0] }}</span>.{{ skusInfo[data.sku].price.split('.')[1] }}
              </p>
            </div>
            <div class="item-info-price" v-else>
              <p class="old-price">原价 ￥ 00.00</p>
              <p class="new-price">活动价 ￥<span class="new-price-big">
              00</span>.00
              </p>
            </div>
            <div class="cart">
              <mn-icon :name="icons.cart" :scale="2"></mn-icon>
            </div>
          </div>
        </a>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        icons: {
          cart: require('vue-human-icons/js/ios/cart')
        }
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      skusInfo: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      calcStyle () {
        let str = ''
        let margin = []
        let padding = []
        if (this.data.margin) {
          margin = this.data.margin.trim().split(' ')
        }
        if (this.data.padding) {
          padding = this.data.padding.trim().split(' ')
        }
        if (margin.length > 3) {
          str += `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;`
        }
        if (padding.length > 3) {
          str += `padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px;`
        }
        str += `background-color: ${this.data.background.color};`
        str += `background-size: ${this.data.background.size};`
        str += `background-position: ${this.data.background.position};`
        str += `background-repeat: ${this.data.background.repeat};`
        if (this.data.background.image) {
          str += `background-image: url('${this.data.background.image}');`
        }
        return str
      },
      calcHref () {
        if (this.skusInfo && this.skusInfo[this.data.sku]) {
          return 'http://m.34580.com/good.info/' + this.skusInfo[this.data.sku].href.split('/')[2]
        } else {
          return undefined
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/style.scss'
</style>
