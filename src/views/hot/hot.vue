<template>
  <div class="hot-w">
    <div class="logo-w">
      <div class="logo">豆瓣</div>
      <input type="text" placeholder="搜索电影/影人" class="input" @click="goToSearch">
    </div>
    <ul class="table-uls">
      <li class="position-city">深圳 <div class="sanjiao"></div></li>
      <li class="table-list" v-for="(item, index) in menuArr" :key="index" @click="switchTable(index)" :class="{'active-list': activeIndex === index}">{{item}}</li>
    </ul>
    <cube-scroll :data="hotData" :options="scrollOptions" @pulling-up="pullingUp" ref="scroll1">
      <ul class="list-wrapper">
        <li v-for="(item, index) in hotData" class="list-item" :key="index" @click="gotoDetails(item.id)">
          <div class="left-a" v-show="item.images">
            <img v-lazy="item.images.medium" alt="">
          </div>
          <div class="right-content">
            <h3 class="light">{{item.title}}({{item.original_title}})</h3>
            <div v-if="item.rating && activeIndex === 0">☆☆☆☆☆  {{item.rating.average}} 分</div>
            <p>导演：<span>{{joinName(item.directors)}}</span></p>
            <p>主演：<span>{{joinName(item.casts)}}</span></p>
          </div>
        </li>
        <li class="loading-w" v-show="loadingShow">
          <cube-loading></cube-loading>
          <p class="text">正在加载中...</p>
        </li>
        <li class="loading-w" v-show="nodata">
          <p class="text">————————  我是有底线的  ————————</p>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loadingShow: true,
        nodata: false,
        activeIndex: 0,
        menuArr: ['正在热映', '即将上映'],
        hotData: [],
        pageStart: 0,
        pageCount: 10,
        scrollOptions: {
          directionLockThreshold: 0,
          pullUpLoad: true
        },
        secondStop: 26
      }
    },
    props: {
      initialIndex: Number
    },
    created () {
      if (this.hotData.length === 0) {
        this.getHot()
      }
    },
    methods: {
      // 去搜索页面
      goToSearch () {
        this.$router.push('/search')
      },
      // table切换
      switchTable (index) {
        this.nodata = false
        this.$refs.scroll1.forceUpdate()
        this.$refs.scroll1.refresh()
        this.$refs.scroll1.scrollTo(0, this.secondStop, 300)
        this.loadingShow = true
        this.activeIndex = index
        this.hotData = []
        this.pageStart = 0
        this.scrollOptions.pullUpLoad = true
        if (index === 0) {
          this.getHot()
        } else {
          this.comingSoon()
        }
      },
      // 去电影详情
      gotoDetails (id) {
        this.$router.push({
          path: '/movieDetails',
          query: {id}
        })
      },
      // 分割名字
      joinName (arr) {
        let newArr = []
        arr.forEach((item) => {
          newArr.push(item.name)
        })
        return newArr.join(' / ')
      },
      // 正在热映
      getHot () {
        this.$fetch('/in_theaters',{
          city: '深圳',
          start: this.pageStart,
          count: this.pageCount
        }).then(res => {
          if (res.subjects) {
            setTimeout(() => {
              this.$refs.scroll1.forceUpdate()
            }, 500)
            this.loadingShow = false
            this.hotData = res.subjects
            if (res.subjects.length < this.pageCount) {
              this.scrollOptions.pullUpLoad = false
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 加载更多
      pullingUp () {
        this.pageStart += this.pageCount
        if (this.activeIndex === 0) { // 正在热映
          this.$fetch('/in_theaters',{
            city: '深圳',
            start: this.pageStart,
            count: this.pageCount
          }).then(res => {
            if (res.subjects) {
              this.hotData = this.hotData.concat(res.subjects)
              this.$refs.scroll1.forceUpdate()
              if (res.subjects.length < this.pageCount) {
                this.scrollOptions.pullUpLoad = false
                this.nodata = true
              }
            }
          }).catch(err => {
            console.log(err)
          })
        } else { // 即将上映
          this.$fetch('/coming_soon',{
            start: this.pageStart,
            count: this.pageCount
          }).then(res => {
            if (res.subjects) {
              this.hotData = this.hotData.concat(res.subjects)
              this.$refs.scroll1.forceUpdate()
              if (res.subjects.length < this.pageCount) {
                this.scrollOptions.pullUpLoad = false
                this.nodata = true
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 即将上映
      comingSoon () {
        this.$fetch('/coming_soon',{
          start: this.pageStart,
          count: this.pageCount
        }).then(res => {
          if (res.subjects) {
            setTimeout(() => {
              this.$refs.scroll1.forceUpdate()
            }, 500)
            this.loadingShow = false
            this.hotData = res.subjects
            this.$refs.scroll1.forceUpdate()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .hot-w
    height: 100%
    overflow: hidden
    > .cube-scroll-wrapper
      height calc(100vh - 150px)
    .logo-w
      display: flex
      align-items center
      padding: 10px
      .logo
        width: 60px
        height: 30px
        font-size: 20px
        font-weight: bold
        display: flex
        align-items center
        justify-content center
        color #fff
        background-color: #42bd56
        border-radius 8px
      .input
        flex 1
        margin-left: 10px
        height: 40px
        border-radius 4px
        padding: 0 10px
        font-size: 14px
        text-align: center
        background-color: #eee
    .table-uls
      display: flex
      align-items center
      .position-city
        width: 80px
        text-align: center
        height: 36px
        line-height: 36px
        font-size: 14px
        color #000
      .table-list
        flex 1
        height: 36px
        line-height: 36px
        text-align: center
        &.active-list
          color #42bd56
          border-bottom: 1px solid #42bd56
  .list-wrapper
    overflow: hidden
    .loading-w
      display flex
      flex-direction column
      align-items center
      .text
        margin-top: 10px
        color #000
    .list-item
      display: flex
      align-items center
      padding: 10px
      border-bottom: 1px solid #eee
      .left-a
        width: 80px
        min-width 80px
        img
          width: 100%
          display: block
      .right-content
        margin-left: 16px
        line-height: 2
        font-size: 14px
        color #666
        flex 1
        white-space: normal;
        .light
          color #000
</style>
