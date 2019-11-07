<template>
  <div class="rank-details">
    <fixed-top :titleName="titleName" :isGoNumber="true" @goPath="goback"></fixed-top>
    <div class="wrap">
      <div class="banner"></div>
      <cube-scroll :data="doubanData" :options="scrollOptions" @pulling-up="pullingUp" ref="scroll2" class="scroll-movie">
        <ul class="movie-uls">
          <li v-if="$route.query.name === 'TOP250' || $route.query.name === '新片榜'">
            <div class="cont-a" v-for="(movieData, index) in doubanData" :key="movieData.id"  @click="gotoDetails(movieData.id)">
              <div class="left-avatar" v-if="movieData.images">
                <div class="rank">{{index + 1}}</div>
                <img v-lazy="movieData.images.medium" alt="">
              </div>
              <div class="right-c">
                <h1>{{movieData.title}}（{{movieData.original_title}}）</h1>
                <div v-if="movieData.rating" class="rating">☆☆☆☆☆{{movieData.rating.average}}分</div>
                <p>导演：{{joinName(movieData.directors)}}</p>
                <p>主演：{{joinName(movieData.casts)}}</p>
                <p>类型：{{getGenres(movieData.genres)}}</p>
                <p v-if="movieData.pubdates">上映时间：{{movieData.pubdates[0]}}</p>
                <p v-if="movieData.durations">片长：{{movieData.durations[0]}}</p>
              </div>
            </div>
          </li>
          <li v-else >
            <div class="cont-a" v-for="(movieData, index) in doubanData" :key="movieData.subject.id" @click="gotoDetails(movieData.subject.id)">
              <div class="left-avatar" v-if="movieData.subject.images">
                <div class="rank">{{index + 1}}</div>
                <img v-lazy="movieData.subject.images.medium" alt="">
              </div>
              <div class="right-c">
                <h1>{{movieData.subject.title}}</h1>
                <p>{{movieData.subject.original_title}}</p>
                <div v-if="movieData.subject.rating" class="rating">☆☆☆☆☆ {{movieData.subject.rating.average}}分</div>
                <p>导演：{{joinName(movieData.subject.directors)}}</p>
                <p>主演：{{joinName(movieData.subject.casts)}}</p>
                <p>类型：{{getGenres(movieData.subject.genres)}}</p>
                <p v-if="movieData.subject.pubdates">上映时间：{{movieData.subject.pubdates[0]}}</p>
                <p v-if="movieData.subject.durations">片长：{{movieData.subject.durations[0]}}</p>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
      <div class="loading-w" v-show="!doubanData.length">
        <cube-loading></cube-loading>
        <p class="text">正在加载中...</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        pageStart: 0,
        pageCount: 10,
        doubanData: [],
        movieData: {},
        scrollOptions: {
          directionLockThreshold: 0,
          pullUpLoad: true
        },
        titleName: this.$route.query.name
      }
    },
    created () {
      if (this.titleName === 'TOP250') this.getTop250()
      if (this.titleName === '本周口碑榜') this.weekly()
      if (this.titleName === '新片榜') this.new_movies()
      if (this.titleName === '北美票房榜') this.us_box()
    },
    methods: {
      // 去电影详情
      gotoDetails (id) {
        this.$router.push({
          path: '/movieDetails',
          query: {id}
        })
      },
      // 电影类型分割
      getGenres (data) {
        if (data && data.length) {
          return data.join(' / ')
        }
      },
      // 分割名字
      joinName (arr) {
        let newArr = []
        if (!arr || arr.length < 1) return ''
        arr.forEach((item) => {
          newArr.push(item.name)
        })
        return newArr.join(' / ')
      },
      pullingUp () {},
      getTop250 () {
        this.$fetch('/top250', {
          start: this.pageStart,
          count: this.pageCount
        }).then(res => {
          this.doubanData = res.subjects
        })
      },
      // 北美票房榜
      us_box () {
        this.$fetch('/us_box').then(res => {
          this.doubanData = res.subjects
        })
      },
      // 新片榜
      new_movies () {
        this.$fetch('/new_movies').then(res => {
          this.doubanData = res.subjects
        })
      },
      weekly () {
        this.$fetch('/weekly').then(res => {
          this.doubanData = res.subjects
        })
      },
      goback () {
        this.$router.push({
          path: '/',
          query: {
            index: 1
          }
        })
      }
    },
    components: {
      fixedTop: resolve => require(['@/components/mFixedTop'], resolve),
    }
  }
</script>

<style scoped lang="stylus">
.rank-details
  padding-top: 50px
  .scroll-movie
    position: fixed
    top: 50px
    bottom: 0
    left: 0
    width: 100%
    height auto
.movie-uls
  .cont-a
    display: flex
    align-items center
    margin-bottom: 20px
    padding: 10px
    border-bottom: 1px solid #eee
    .left-avatar
      margin-right: 15px
      display: flex
      align-items center
      .rank
        width: 30px
        height: 30px
        background-color: #eee
        font-weight: bold
        text-align: center
        line-height: 30px
        border-radius 50%
        margin-right: 10px
      img
        width: 80px
        display: block
    .right-c
      flex 1
      font-size: 12px
      color #000
      .rating
        font-weight: bold
        margin: 10px 0
      p
        line-height: 1.5
        margin-bottom: 10px
        &:last-child
          margin-bottom: 0
</style>
