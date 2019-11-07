<template>
  <div class="movie-details">
    <fixed-top :titleName="titleName">
      <router-link to="/" class="link">首页</router-link>
    </fixed-top>
    <div v-show="commentsData" class="wrap-w">
      <ul class="comments-d-uls">
        <li v-for="(item) in commentsData" :key="item.id">
          <div class="comments-d-list">
            <div class="left" v-show="item.author">
              <img :src="item.author.avatar" alt="">
            </div>
            <div class="right">
              <div class="name-w">
                <div class="name-left">
                  <span>{{item.author.name}}</span>
                  <span>{{item.created_at}}</span>
                  <span v-if="item.rating">{{item.rating.value}}分</span>
                </div>
                <span>{{item.useful_count}}❥</span>
              </div>
              <p>{{item.author.signature}}</p>
              <p class="text title">{{item.title}}</p>
              <p class="text" v-html="replaceString(item.summary)"></p>
            </div>
          </div>
          <p class="text content-t" v-html="replaceString(item.content)"></p>
          <div class="loading-w bottom">
            <p class="text">————————  我是有底线的  ————————</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading-w" v-show="!commentsData.length">
      <cube-loading></cube-loading>
      <p class="text">正在加载中...</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        nodata: false,
        scrollOptions: {
          directionLockThreshold: 0,
          pullUpLoad: true
        },
        pageStart: this.$route.query.mindex,
        pageCount: 1,
        currentIndex: 0,
        movieData: {},
        commentsData: [],
        titleName: '个人影评'
      }
    },
    created () {
      if (this.$route.query.id) {
        if (Number(this.$route.query.index) === 1) {
          this.getReviews()
        } else {
          this.getDetails()
        }
      }
    },
    methods: {
      // 获取电影短评
      getDetails () {
        this.$fetch('/subject/' + this.$route.query.id + '/comments', {
          start: this.pageStart,
          count: this.pageCount
        }).then(res => {
          if (res.comments) {
            this.commentsData = res.comments
          }
        })
      },
      // 获取电影长评
      getReviews () {
        this.$fetch('/subject/' + this.$route.query.id + '/reviews', {
          start: this.pageStart,
          count: this.pageCount
        }).then(res => {
          if (res.reviews) {
            this.commentsData = res.reviews
          }
        })
      },
      // 电影类型分割
      getGenres (data) {
        if (data && data.length) {
          return data.join(' / ')
        }
      },
      getGenres2 (arr) {
        if (arr && arr.length) {
          let newArr = []
          arr.forEach((item) => {
            if (item !== '') {
              newArr.push(item)
            }
          })
          return newArr.join(' / ')
        }
      },
      // 去电影详情
      gotoDetails (id) {
        this.$router.push({
          path: '/movieDetails',
          query: {id}
        })
      },
      // 评论切换
      tableOne (index) {
        this.currentIndex = index
      },
      replaceString (str) {
        if (str) {
          // str = str.replace(/\n/g,"<br>")
          str = '<p>' + str.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
          return str
        }
      }
    },
    components: {
      fixedTop: resolve => require(['@/components/mFixedTop'], resolve)
    }
  }
</script>

<style scoped lang="stylus">
  .movie-details
    padding-top: 50px
    .bottom
      padding-bottom: 20px
      .text
        color #ccc
    .wrap-w
      position: fixed
      top: 50px
      bottom: 0
      width: 100%
      overflow auto
    .link
      position: absolute
      top: 0
      right: 0
      padding: 0 10px
      display: block
      height: 100%
      font-size: 14px
    .wrap
      // background: rgba(0,0,0,.3);
      padding: 10px
    .cont-a
      display: flex
      align-items center
      .left-avatar
        width: 30%
        border: 1px solid #000
        margin-right: 15px
        img
          width: 100%
          display: block
      .right-c
        font-size: 12px
        color #000
        p
          margin-bottom: 10px
    .btn-w
      margin-top: 10px
      display: flex
      align-items center
      .btn-list
        flex 1
        height: 30px
        line-height: 30px
        color #000
        border: 1px solid #000
        text-align: center
        background-color: #fff
        &:nth-child(1)
          margin-right: 10px
    .movie-c
      background-color: #eee
      padding: 10px
      .summary
        margin-top: 10px
        font-size: 14px
        color #000
        line-height: 1.5
        text-indent 2em
    .people-w
      padding: 10px
      .people-uls
        overflow-x: auto
        display: flex
        align-items center
        width auto
        padding-bottom: 20px
        .people-list
          font-size: 12px
          width: 120px
          min-width 120px
          margin-right: 10px
          float left
          .flex-item
            display: flex
            flex-direction column
          img
            width: 100%
            display: block
          .name-p
            min-height 36px
            text-align: center
            line-height: 1.5
    .comments-w
      .table-uls
        display: flex
        align-items center
        justify-content center
        padding: 10px
        .table-list
          flex 1
          font-size: 14px
          text-align: center
          height: 30px
          line-height: 30px
          &.current-list
            color: #42bd56
            border-bottom: 1px solid #42bd56
    .comments-d-uls
      font-size: 14px
      .content-t
        padding: 10px
        line-height: 2
        text-indent 2em
      .comments-d-list
        padding: 10px
        display: flex
        border-bottom: 1px solid #eee
        .left
          width: 48px
          margin-right: 10px
          img
            width: 100%
            border-radius 100%
        .right
          flex 1
          line-height: 1.5
          .text
            padding-bottom: 10px
            &.title
              font-weight: bold
              font-size: 14px
          .name-w
            display: flex
            align-items center
            justify-content space-between
            .name-left
              span
                margin-right: 10px
      .btn-li
        border: 1px solid #FF234A
        height: 50px
        line-height: 50px
        text-align: center
        color #FF234A
</style>
