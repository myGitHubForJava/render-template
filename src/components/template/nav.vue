<template>
<div :class="['nav-menu']" id="tab">
  <ul :class="['nav-ul']" v-if="navList.length<=4">
    <li v-for="(item, index) of navList" :class="['nav-li']">
      <a :class="['nav-item', {'nav-item-active' : active === index}]" @click="navClick($event, item.target)" name="nav">
      {{ item.text }}
      </a>
    </li>
  </ul>
  <ul v-if="navList.length>4" :class="['nav-ul', {'isMore': navList.length>4}]">
    <li v-for="(item, index) of navList" :class="['nav-li-more']">
      <a :class="['nav-item', {'nav-item-active' : active === index}]" @click="navClick(index, item.target)" name="nav"
        :style="{'color': color,'border-bottom-color': activeColor}">
      {{ item.text }}
      </a>
    </li>
  </ul>
  <!-- <ul v-if="navShow&&navList.length>4" :class="['nav-ul', 'isMore']">
    <div :class="['nav-text']">切换楼层</div>
  </ul> -->
  <div :class="['drop-down']" @click="openNav" v-if="navList.length>4">
    <mn-icon :name="icons.arrowDown" v-if="arrowDown" :style="{'fill': activeColor}"></mn-icon>
    <mn-icon :name="icons.arrowUp" v-else :style="{'fill': activeColor}"></mn-icon>
  </div>
  <ul :class="['nav-dropdown']" id="dropdownul">
    <li v-for="(item, index) of navList" :class="['nav-dropdown-li']">
      <a :class="['nav-item']" @click="dropdownClick(index, item.target)" name="dropDownNav"
        :style="{'color': color}">
      {{ item.text }}
      </a>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    data () {
      return {
        icons: {
          arrowDown: require('vue-human-icons/js/ios/arrow-down'),
          arrowUp: require('vue-human-icons/js/ios/arrow-up')
        },
        arrowDown: true,
        navShow: false
      }
    },
    props: [
      'navList',
      'color',
      'activeColor',
      'active'
    ],
    methods: {
      navClick (index, target) {
        if (this.navShow) {
          this.openNav()
        }
        this.$emit('changeActive', index)
        this.$emit('goTo', target)
      },
      openNav () {
        this.arrowDown = !this.arrowDown
        this.navShow = !this.navShow
        if (this.navShow) {
          document.getElementById('dropdownul').style.display = 'flex'
        } else {
          document.getElementById('dropdownul').style.display = 'none'
        }
      },
      dropdownClick (index, target) {
        this.openNav()
        this.$emit('changeActive', index)
        this.$emit('goTo', target)
      }
    },
    watch: {
      active: function () {
        let nodeLists = document.getElementsByClassName('nav-item')
        nodeLists = Array.prototype.slice.call(nodeLists)
        let len = nodeLists.length / 2
        nodeLists.forEach((val, index) => {
          if (this.active === index || (this.active + len) === index) {
            val.style.color = this.activeColor
            val.style.borderBottomColor = this.activeColor
          } else {
            val.style.color = this.color
          }
        })
        // 滚动到中间
        let scrollUl = document.getElementsByClassName('nav-ul')[0]
        scrollUl.scrollLeft = nodeLists[this.active].offsetLeft
      }
    },
    mounted () {
      document.getElementById('tab').parentNode.style.height = '1.25rem'
    }
  }
</script>

<style lang="scss">
  @import '../../sass/style.scss'
</style>
