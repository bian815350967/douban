<template>
  <div class="hot-w">
    <div class="logo-w">
      <div class="logo">豆瓣</div>
      <input type="text" placeholder="搜索电影/影人" class="input" @click="goToSearch">
    </div>
    <h3 class="title-m">精选榜单</h3>
    <div class="loading-w" v-show="!us_boxData.length">
      <cube-loading></cube-loading>
      <p class="text">正在加载中...</p>
    </div>
    <cube-scroll :data="top250Data" :options="scrollOptions">
      <div class="list-wrapper" v-show="us_boxData.length">
        <div class="list-item" @click="gotoDetails(0)">
          <div class="left-a">
            <h3>豆瓣 TOP250</h3>
            <p>8分以上好电影</p>
          </div>
          <div class="right-content">
            <div class="img-list" v-for="(item) in top250Data" :key="item.id">
              <img v-lazy="item.images.medium" alt="">
            </div>
          </div>
        </div>
        <div class="list-item" @click="gotoDetails(1)">
          <div class="left-a">
            <h3>本周口碑榜</h3>
            <p>7月1日-7月7日</p>
          </div>
          <div class="right-content">
            <div class="img-list" v-for="(item) in weeklyData" :key="item.id">
              <img v-lazy="item.subject.images.medium" alt="" v-show="item.subject">
            </div>
          </div>
        </div>
        <div class="list-item" @click="gotoDetails(2)">
          <div class="left-a">
            <h3>新片榜</h3>
            <p>7月1日-7月7日</p>
          </div>
          <div class="right-content">
            <div class="img-list" v-for="(item) in new_moviesData" :key="item.id">
              <img v-lazy="item.images.medium" alt="">
            </div>
          </div>
        </div>
        <div class="list-item" @click="gotoDetails(3)">
          <div class="left-a">
            <h3>北美票房榜</h3>
            <p>票房最高排行</p>
          </div>
          <div class="right-content">
            <div class="img-list" v-for="(item) in us_boxData" :key="item.id">
              <img v-lazy="item.subject.images.medium" alt="" v-show="item.subject">
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        pageStart: 0,
        pageCount: 3,
        scrollOptions: {
          directionLockThreshold: 0
        },
        rankData: [],
        top250Data: [],
        weeklyData: [],
        new_moviesData: [],
        us_boxData: []
      }
    },
    props: {
      initialIndex: Number
    },
    created () {
      if (this.initialIndex === 1) {
        this.top250()
        this.us_box()
        this.new_movies()
        this.weekly()
      }
    },
    watch: {
      initialIndex () {
        if (this.initialIndex === 1 && this.top250Data.length === 0) {
          this.top250()
          this.us_box()
          this.new_movies()
          this.weekly()
        }
      }
    },
    methods: {
      // 去搜索页面
      goToSearch () {
        this.$router.push('/search')
      },
      // top250
      top250 () {
        this.getAjax('/top250').then(res => {
          this.top250Data = res
        })
      },
      // 北美票房榜
      us_box () {
        this.getAjax('/us_box').then(res => {
          this.us_boxData = res.splice(0, 3)
        })
      },
      // 新片榜
      new_movies () {
        this.getAjax('/new_movies').then(res => {
          this.new_moviesData = res.splice(0, 3)
        })
      },
      weekly () {
        this.getAjax('/weekly').then(res => {
          this.weeklyData = res.splice(0, 3)
        })
      },
      gotoDetails (index) {
        let name = ''
        if (index === 0) name = 'TOP250'
        if (index === 1) name = '本周口碑榜'
        if (index === 2) name = '新片榜'
        if (index === 3) name = '北美票房榜'
        this.$router.push({
          path: '/rankDetails',
          query: {name}
        })
      },
      getAjax (url) {
        return new Promise((resolve, reject) => {
          this.$fetch(url,{
            start: this.pageStart,
            count: this.pageCount
          }).then(res => {
            if (res.subjects) {
              return resolve(res.subjects)
            }
          }).catch(err => {
            return reject(err)
          })
        })
      },
      resolveTitle (item) {
        return `${item.name}关注了问题 · ${item.postTime} 小时前`
      },
      resolveQuestionFollowers (item) {
        return `${item.answers} 赞同 · ${item.followers} 评论`
      }
    }
  }
</script>

<style scoped lang="stylus">
  .hot-w
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
    .title-m
      font-size: 16px
      color #000
      line-height: 36px
      padding-left: 10px
  .list-wrapper
    overflow: hidden
    padding: 10px 10px 0 10px
    .list-item
      display: flex
      align-items center
      margin-bottom: 10px
      margin-top: 0
      padding: 10px
      border-radius 8px
      background: linear-gradient(#e1a708,#efd491);
      .left-a
        flex 1
        font-size: 16px
        color #fff
        line-height: 1.5
      .right-content
        display: flex
        align-items center
        justify-content center
        .img-list
          width: 56px
          &:nth-child(2)
            width: 76px
          img
            width: 100%
            display: block
</style>
