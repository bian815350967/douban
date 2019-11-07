<template>
  <div class="movie-details">
    <fixed-top :titleName="titleName">
      <router-link to="/" class="link">首页</router-link>
    </fixed-top>
    <div v-show="movieData.name">
      <div class="wrap">
        <div class="cont-a">
          <div class="left-avatar" v-if="movieData.avatars">
            <img v-lazy="movieData.avatars.medium" alt="">
          </div>
          <div class="right-c">
            <h1>{{movieData.name}}</h1>
            <p>{{movieData.name_en}}</p>
            <div>出生日期：{{movieData.birthday}}</div>
            <div v-show="movieData.born_place">出生地：{{movieData.born_place}}</div>
            <div>性别：{{movieData.gender}}</div>
            <div>职业：{{getGenres2(movieData.professions)}}</div>
          </div>
        </div>
        <div class="btn-w">
          <div class="btn-list">想看</div>
          <div class="btn-list">评分</div>
        </div>
      </div>
      <div class="movie-c">
        <p>剧情简介：</p>
        <div class="summary" v-html="replaceString(movieData.summary)"></div>
      </div>
      <div class="people-w">
        <h5>最受好评的作品</h5>
        <ul class="people-uls">
          <li v-for="(item, index) in movieData.works" :key="index" class="people-list" @click="gotoDetails(item.subject.id)">
            <div v-show="item.subject" class="flex-item">
              <div v-show="item.subject.images" class="imgs-w">
                <img v-lazy="item.subject.images.medium" alt="">
              </div>
              <p class="name-p">{{item.subject.title}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="people-w">
        <h5>影人图片</h5>
        <ul class="people-uls">
          <li v-for="(item, index) in movieData.photos" :key="index" class="people-list">
            <div  class="flex-item">
              <div class="imgs-w">
                <img v-lazy="item.image" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-w" v-show="!movieData.name">
      <cube-loading></cube-loading>
      <p class="text">正在加载中...</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        currentIndex: 0,
        movieData: {},
        titleName: '电影详情'
      }
    },
    created () {
      if (this.$route.query.id) this.getDetails()
    },
    methods: {
      // 获取数据
      getDetails () {
        this.$fetch('/celebrity/' + this.$route.query.id).then(res => {
          if (res.name) {
            this.movieData = res
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
        if (str) return  str.replace(/\n/g,"<br>");
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
          .imgs-w
            display: flex
            align-items center
            justify-content center
          img
            // width: 100%
            max-width  120px
            max-height 130px
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
        border: 1px solid #FF234A
        height: 50px
        line-height: 50px
        text-align: center
        color #FF234A
</style>
