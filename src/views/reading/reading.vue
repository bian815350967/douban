<template>
  <div class="movie-details">
    <div class="logo-w">
      <div class="logo" @click="goback">返回</div>
      <input type="text" placeholder="搜索豆瓣读书" class="input" @input="inputSearch" v-model.trim="keyWords">
      <div class="cancel" @click="inputSearch">确定</div>
    </div>
    <div v-show="movieData" class="wrap-w">
      <cube-scroll :data="commentsData" :options="scrollOptions" @pulling-up="pullingUp" ref="scroll3">
        <ul class="comments-d-uls">
          <li v-for="(item) in commentsData" :key="item.id" class="comments-d-list" @click="gotoDetails(item.id)">
            <div class="left" v-show="item.images">
              <img v-lazy="item.images.medium" alt="">
            </div>
            <div class="right">
              <p class="text title">{{item.title}}</p>
              <p class="name-w">作者：{{getGenres(item.author)}}</p>
              <p>{{item.rating.average}}分 （{{item.rating.numRaters}}人评价）</p>
              <p>价格：{{item.price}}</p>
              <p>出版社：{{item.publisher}}</p>
              <p>出版年：{{item.pubdate}}</p>

<!--              <p class="text">{{item.summary}}</p>-->
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loadingShow: false,
        keyWords: '',
        nodata: false,
        scrollOptions: {
          directionLockThreshold: 0,
          pullUpLoad: true
        },
        pageStart: 0,
        pageCount: 20,
        currentIndex: 0,
        movieData: {},
        commentsData: [],
        titleName: '搜索豆瓣读书',
        tiemr1: null
      }
    },
    created () {
    },
    methods: {
      goback () {
        this.$router.push({
          path: '/',
          query: { index: 2 }
        })
      },
      // 搜索豆瓣读书
      inputSearch () {
        if (this.keyWords !== '') {
          this.commentsData = []
          this.loadingShow = true
          clearTimeout(this.tiemr1)
          this.tiemr1 = setTimeout(() => {
            if (this.keyWords.trim() === '') return
            this.$fetch('/search', {
              start: this.pageStart,
              count: this.pageCount,
              q: this.keyWords
            }, 'book').then(res => {
              if (res.books) {
                this.loadingShow = false
                this.commentsData = res.books
                if (res.books.length < this.pageCount) {
                  this.scrollOptions.pullUpLoad = false
                  this.nodata = true
                }
                setTimeout(() => {
                  this.$refs.scroll3.forceUpdate()
                }, 500)
              }
            })
          }, 2000)
        } else {
          this.commentsData = []
        }
      },
      // 获取电影长评
      getReviews () {
        this.$fetch('/subject/' + this.$route.query.id + '/reviews', {
          start: this.pageStart,
          count: this.pageCount
        }).then(res => {
          if (res.reviews) {
            this.commentsData = res.reviews
            if (res.reviews.length < this.pageCount) {
              this.scrollOptions.pullUpLoad = false
              this.nodata = true
            }
          }
        })
      },
      pullingUp () {
        this.pageStart += this.pageCount
        if (Number(this.$route.query.index) === 1) {
          this.$fetch('/subject/' + this.$route.query.id + '/reviews', {
            start: this.pageStart,
            count: this.pageCount
          }).then(res => {
            if (res.subject) {
              this.commentsData = this.commentsData.concat(res.reviews)
              this.$refs.scroll2.forceUpdate()
              if (res.reviews.length < this.pageCount) {
                this.scrollOptions.pullUpLoad = false
                this.nodata = true
              }
            }
          })
        } else {
          this.$fetch('/subject/' + this.$route.query.id + '/comments', {
            start: this.pageStart,
            count: this.pageCount
          }).then(res => {
            if (res.subject) {
              this.commentsData = this.commentsData.concat(res.comments)
              this.$refs.scroll2.forceUpdate()
              if (res.comments.length < this.pageCount) {
                this.scrollOptions.pullUpLoad = false
                this.nodata = true
              }
            }
          })
        }
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
          return newArr.join('/')
        }
      },
      // 去电影详情
      gotoDetails (id) {
        this.$router.push({
          path: '/readingDetails',
          query: {id}
        })
      },
      // 评论切换
      tableOne (index) {
        this.currentIndex = index
      },
      replaceString (str) {
        if (str) {
          return  str.replace(/\n/g,"<br>");
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
    .logo-w
      display: flex
      align-items center
      padding: 10px 0
      position: fixed
      top: 0
      width: 100%
      .logo
        display: flex
        align-items center
        justify-content center
        border-radius 8px
        padding: 0 10px
      .input
        flex 1
        margin-left: 10px
        height: 40px
        border-radius 4px
        padding: 0 10px
        font-size: 14px
        text-align: center
        background-color: #eee
      .cancel
        padding: 0 10px
    .wrap-w
      position: fixed
      top: 50px
      bottom: 0
      width: 100%
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
      .comments-d-list
        padding: 10px
        display: flex
        border-bottom: 1px solid #eee
        .left
          width: 100px
          margin-right: 10px
          display: flex
          align-items center
          justify-content center
          img
            width: 100%
            display: block
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
