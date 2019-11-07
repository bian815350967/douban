<template>
  <div class="movie-details">
    <fixed-top :titleName="titleName">
      <router-link to="/" class="link">首页</router-link>
    </fixed-top>
    <div v-show="commentsData" class="wrap-w">
      <cube-scroll :data="commentsData" :options="scrollOptions" @pulling-up="pullingUp" ref="scroll2">
        <ul class="comments-d-uls">
          <li v-for="(item, index) in commentsData" :key="item.id" @click="gotoDetails(item.id, index)">
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
                <p class="text mheight" v-show="Number($route.query.index) === 0">{{item.content}}</p>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="loading-w" v-show="!commentsData.length">
      <cube-loading></cube-loading>
      <p class="text">正在加载中...</p>
    </div>
    <div class="loading-w" v-show="nodata">
      <p class="text">————————  我是有底线的  ————————</p>
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
        pageStart: 0,
        pageCount: 20,
        currentIndex: 0,
        movieData: {},
        commentsData: [],
        titleName: ''
      }
    },
    created () {
      if (this.$route.query.id) {
        if (Number(this.$route.query.index) === 1) {
          this.titleName = '电影长评'
          this.getReviews()
        } else {
          this.titleName = '电影短评'
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
            if (res.comments.length < this.pageCount) {
              this.scrollOptions.pullUpLoad = false
              this.nodata = true
            }
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
            if (res.reviews) {
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
            if (res.comments) {
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
          return newArr.join(' / ')
        }
      },
      // 去电影详情
      gotoDetails (id, index) {
        this.$router.push({
          path: '/commentDetails',
          query: {
            id: this.$route.query.id,
            mid: id,
            mindex: index,
            index: this.$route.query.index
          }
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
      .content-t
        padding: 20px
        line-height: 2
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
            &.mheight
              overflow: hidden
              word-break: break-all;
              text-overflow: ellipsis; /** 多行 **/
              display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
              -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
              -webkit-line-clamp: 2; /** 显示的行数 **/
              padding: 0
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
