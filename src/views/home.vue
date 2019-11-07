<template>
  <cube-page type="tab-composite-view" title="tab-composite">
    <div slot="content">
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 热门 -->
          <cube-slide-item>
            <v-hot :initial-index="initialIndex"></v-hot>
          </cube-slide-item>
          <!-- 榜单 -->
          <cube-slide-item>
            <v-rank :initial-index="initialIndex"></v-rank>
          </cube-slide-item>
          <!-- 我的 -->
          <cube-slide-item>
            <v-my :initial-index="initialIndex"></v-my>
          </cube-slide-item>
        </cube-slide>
      </div>
      <cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabLabels">
      </cube-tab-bar>
    </div>
  </cube-page>
</template>

<script type="text/ecmascript-6">
  import CubePage from './scroll/cube-page.vue'
  import { findIndex } from '../assets/js/util'
  export default {
    data () {
      return {
        selectedLabel: '热映',
        disabled: false,
        tabLabels: [{
          label: '热映'
        }, {
          label: '排行'
        }, {
          label: '我的'
        }],
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        },
        scrollOptions: {
          directionLockThreshold: 0
        }
      }
    },
    created () {
      if (this.$route.query.index) {
        this.selectedLabel = this.tabLabels[this.$route.query.index].label
      }
    },
    methods: {
      changePage (current) {
        this.selectedLabel = this.tabLabels[current].label
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      }
    },
    computed: {
      initialIndex () {
        let index = 0
        index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
        return index
      }
    },
    watch: {
      selectedLabel () {
        let index = this.tabLabels.findIndex((value) => {
          return this.selectedLabel === value.label
        })
        this.$router.push({
          path: '/',
          query: {index}
        })
      }
    },
    components: {
      CubePage,
      vHot:  resolve => require(['./hot/hot'], resolve),
      vRank:  resolve => require(['./rank/rank'], resolve),
      vMy:  resolve => require(['./my/my'], resolve)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /* 覆盖样式 */
  .cube-page
    &.tab-composite-view
      > .wrapper
        > .content
          margin: 0
  .tab-composite-view
    .cube-tab-bar
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      height: 50px
      background-color: white
      border-top: 1px solid #ccc
    .cube-tab, .cube-tab_active
      color: black
    .cube-tab-bar-slider
      background-color: black
    .tab-slide-container
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 50px
    .list-wrapper
      overflow: hidden
      li
        padding: 15px 10px
        margin-top: 10px
        text-align: left
        background-color: white
        font-size: 14px
        color: #999
        white-space: normal
        .line-height
          line-height: 1.5
        .is-black
          color: black
        .is-grey
          color: #999
        .is-bold
          font-weight: bold
        .top
          display: flex
          .avatar
            width: 15px
            height: 15px
            margin-right: 2px
            border-radius: 100%
          .time
            flex: 1
        .middle
          display: flex
          margin: 10px 0
          color: black
        .hot-title
          display: flex
          align-items: center
          font-size: 12px
          .hot-sequence
            display: inline-block
            margin-right: 2px
            padding: 3px 6px
            border-radius: 2px
            background-color: darkgoldenrod
            color: white
        .hot-content
          margin-top: 15px
</style>
