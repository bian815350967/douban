<template>
  <div class="movie-details">
    <fixed-top :titleName="titleName"></fixed-top>
    <div class="loading-w" v-show="!movieData.title">
      <cube-loading></cube-loading>
      <p class="text">正在加载中...</p>
    </div>
    <div v-show="movieData.title">
      <div class="wrap">
        <div class="cont-a">
          <div class="left-avatar">
            <img v-lazy="movieData.image" alt="">
          </div>
          <div class="right-c">
            <div class="right">
              <p class="text title">{{movieData.title}} <span v-show="movieData.subtitle">（{{movieData.subtitle}}）</span></p>
              <p class="name-w">作者：{{getGenres(movieData.author)}}</p>
              <p v-if="movieData.rating && movieData.rating.average">{{movieData.rating.average}}分 （{{movieData.rating.numRaters}}人评价）</p>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-c">
        <p>剧情简介：</p>
        <div class="summary" v-html="replaceString(movieData.catalog)"></div>
        <div class="summary" v-html="replaceString(movieData.summary)"></div>
      </div>
      <div class="movie-c" v-if="movieData.attrs && movieData.attrs.tracks">
        <p>曲目：</p>
        <div class="summary" v-for="(item, index) in movieData.attrs.tracks" :key="index">
          <div v-html="replaceString(item)"></div>
        </div>
      </div>
      <div class="movie-c" v-show="movieData.author_intro">
        <p>作者简介：</p>
        <div class="summary" v-html="replaceString(movieData.author_intro)"></div>
      </div>
      <div class="movie-c">
        <p>标签：</p>
        <div class="summary" v-for="(item, index) in movieData.tags" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        currentIndex: 0,
        photoArr: [],
        movieData: {},
        titleName: '书籍详情'
      }
    },
    created () {
      if (this.$route.query.id) {
        this.getDetails()
      }
    },
    methods: {
      // 去评论
      gotoComments (index) {
        this.$router.push({
          path: '/comments',
          query: {
            id: this.$route.query.id,
            index
          }
        })
      },
      // 去影人详情
      gotoPeople (id) {
        this.$router.push({
          path: '/peopleDetails',
          query: {id}
        })
      },
      // 获取数据
      getDetails () {
        this.$fetch('/' + this.$route.query.id, {}, 'music').then(res => {
          if (res.title) {
            this.movieData = res
          }
        })
      },
      // 电影剧照
      getPhotos () {
        this.$fetch('/subject/' + this.$route.query.id + '/photos', {
          count: 20
        }).then(res => {
          this.photoArr = res.photos
          console.log(res)
        })
      },
      // 电影类型分割
      getGenres (data) {
        if (data && data.length) {
          let newArr = []
          data.forEach((item) => {
            if (item !== '') {
              newArr.push(item.name)
            }
          })
          return newArr.join(' / ')
        }
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
      fixedTop: resolve => require(['@/components/mFixedTop'], resolve),
    }
  }
</script>

<style scoped lang="stylus">
.movie-details
  padding-top: 50px
  .wrap
    // background: rgba(0,0,0,.3);
    padding: 10px
  .cont-a
    display: flex
    align-items center
    .left-avatar
      width: 30%
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
    display: flex
    align-items center
    margin-top: 10px
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
    background-color: #f5f5f5
    padding: 10px
    .summary
      margin-top: 10px
      font-size: 14px
      color #000
      line-height: 1.5
  .people-w
    padding: 10px
    .people-uls
      overflow-x: auto
      display: flex
      align-items center
      width auto
      height 200px
      .people-list
        font-size: 12px
        width: 120px
        min-width 120px
        margin-right: 10px
        float left
        img
          width: 100%
        .name-p
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
      .left
        width: 48px
        margin-right: 10px
        img
          width: 100%
          border-radius 100%
      .right
        flex 1
        line-height: 1.5
        .name-w
          display: flex
          align-items center
          justify-content space-between
          .name-left
            span
              margin-right: 10px
    .btn-li
      border: 1px solid #42bd56
      height: 36px
      width: 80%
      margin: 0 auto 20px
      line-height: 36px
      text-align: center
      color #42bd56
</style>
