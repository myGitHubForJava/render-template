<template>
<div class="normal-items pointer":style="calcStyle(data)" :id="data.id" :name="data.id">
  <ul class="item-ul" style="margin: 0;padding: 0;" v-if="skusInfo">
    <li :class="['item-li', 'col-' + 12/data.col]" v-for="item of data.items">
      <a :href="calcHref(item)" style="display: block;">
        <div class="item-img">
          <div class="item-tag">
            <span class="item-tag-text">{{ item.tip }}</span>
          </div>
          <img :src="skusInfo[item.sku].newImageURL">
        </div>
        <div class="item-info">
          <div class="item-info-title">
          {{ skusInfo[item.sku].Name }}
          </div>
          <div class="item-info-price">
            <div class="old-price">
              {{ skusInfo[item.sku].price2 }}
            </div>
            <div class="new-price">
              <span class="new-price-big">{{ skusInfo[item.sku].price.split('.')[0] }}</span>.{{ skusInfo[item.sku].price.split('.')[1] }}
            </div>
          </div>
          <div class="cart">
            <mn-icon :name="icons.cart" :scale="2"></mn-icon>
          </div>
        </div>
      </a>
    </li>
  </ul>
  <ul class="item-ul" style="margin: 0;padding: 0;" v-else>
    <li :class="['item-li', 'col-' + 12/data.col]" v-for="n in 4">
      <div class="item-img">
        <div class="item-tag">
          <span class="item-tag-text">{{ data.items[0].tip }}</span>
        </div>
        <img src="http://images4sz-app.34580.com/images/ProductImages/SH_Image_46272_jpeg_100.jpeg">
      </div>
      <div class="item-info">
        <div class="item-info-title">
        标题标题
        </div>
        <div class="item-info-price">
          <div class="old-price">
            00.00
          </div>
          <div class="new-price">
            <span class="new-price-big">00</span>.00
          </div>
        </div>
        <div class="cart">
          <mn-icon :name="icons.cart" :scale="2"></mn-icon>
        </div>
      </div>
    </li>
  </ul>
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
  methods: {
    calcStyle (data) {
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
      str += `background-color: ${this.data.background.color};`
      str += `background-size: ${this.data.background.size};`
      str += `background-position: ${this.data.background.position};`
      str += `background-repeat: ${this.data.background.repeat};`
      if (this.data.background.image) {
        str += `background-image: url('${this.data.background.image}');`
      }
      return str
    },
    calcHref (item) {
      if (this.skusInfo) {
        return 'http://m.34580.com/good.info/' + this.skusInfo[item.sku].href.split('/')[2]
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
