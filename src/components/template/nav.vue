<template>
<div :class="['nav-menu']" id="tab">
  <ul :class="['nav-ul']" v-if="navList.length<=4">
    <li v-for="item of navList" :class="['nav-li']">
      <a :class="['nav-item']" @click="navClick($event, item.target)" name="nav">
      {{ item.text }}
      </a>
    </li>
  </ul>
  <ul v-if="!navShow&&navList.length>4" :class="['nav-ul', {'isMore': navList.length>4}]">
    <li v-for="item of navList" :class="['nav-li-more']">
      <a :class="['nav-item']" @click="navClick($event, item.target)" name="nav"
        :style="{'color': color,'border-bottom-color': activeColor}">
      {{ item.text }}
      </a>
    </li>
  </ul>
  <ul v-if="navShow&&navList.length>4" :class="['nav-ul', 'isMore']">
    <div :class="['nav-text']">切换楼层</div>
  </ul>
  <div :class="['drop-down']" @click="openNav" v-if="navList.length>4">
    <mn-icon :name="icons.arrowDown" :width="80" :height="80" v-if="arrowDown" :style="{'fill': activeColor}"></mn-icon>
    <mn-icon :name="icons.arrowUp" :width="80" :height="80" v-else :style="{'fill': activeColor}"></mn-icon>
  </div>
  <ul :class="['nav-dropdown']" id="dropdownul">
    <li v-for="item of navList" :class="['nav-dropdown-li']">
      <div :class="['nav-dropdown-item']" @click="dropdownClick($event, item.target)" name="dropDownNav"
        :style="{'color': color}">
      {{ item.text }}
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
      'activeColor'
    ],
    methods: {
      navClick (e, target) {
        let nodes = document.getElementsByName('nav')
        nodes.forEach(key => {
          key.className = 'nav-item'
          key.style.color = this.color
        })
        e.target.className = 'nav-item nav-item-active'
        e.target.style.color = this.activeColor
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
      dropdownClick (e, target) {
        let nodess = document.getElementsByName('dropDownNav')
        nodess.forEach(key => {
          key.className = 'nav-dropdown-item'
        })
        e.target.className = 'nav-dropdown-item active'
        this.$emit('goTo', target)
        this.openNav()
      }
    },
    mounted () {
      document.getElementById('tab').parentNode.style.height = '80px'
    }
  }
</script>

<style lang="scss">
  @import '../../sass/style.scss'
</style>
