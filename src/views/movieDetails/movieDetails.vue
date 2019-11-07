<template>
  <div class="movie-details">
    <fixed-top :titleName="titleName"></fixed-top>
    <div v-show="movieData.title">
      <div class="wrap">
        <div class="cont-a">
          <div class="left-avatar" v-if="movieData.images">
            <img v-lazy="movieData.images.medium" alt="">
          </div>
          <div class="right-c">
            <h1>{{movieData.title}}</h1>
            <p>{{movieData.original_title}}</p>
            <div v-if="movieData.rating">{{movieData.rating.average}} 分</div>
            <p>类型：{{getGenres(movieData.genres)}}</p>
            <p v-if="movieData.pubdates"><span v-if="movieData.countries">{{movieData.countries[0]}}</span> / {{movieData.pubdates[0]}}</p>
            <p v-if="movieData.durations">片长：{{movieData.durations[0]}}</p>
          </div>
        </div>
        <div class="btn-w">
          <div class="btn-list">想看</div>
          <div class="btn-list">评分</div>
        </div>
      </div>
      <div class="movie-c">
        <p>剧情简介：</p>
        <div class="summary">{{movieData.summary}}</div>
      </div>
      <div class="people-w">
        <h5>演职人员</h5>
        <ul class="people-uls">
          <li v-for="(item) in movieData.directors" :key="item.id" class="people-list" @click="gotoPeople(item.id)">
            <div v-if="item.avatars">
              <img v-lazy="item.avatars.medium" alt="">
            </div>
            <p class="name-p">{{item.name}}</p>
            <p class="name-p">导演</p>
          </li>
          <li v-for="(item) in movieData.casts" :key="item.id" class="people-list" @click="gotoPeople(item.id)">
            <div v-if="item.avatars">
              <img v-lazy="item.avatars.medium" alt="">
            </div>
            <p class="name-p">{{item.name}}</p>
            <p class="name-p">演员</p>
          </li>
        </ul>
      </div>
      <div class="comments-w">
        <ul class="table-uls">
          <li class="table-list" @click="tableOne(0)" :class="{'current-list': currentIndex === 0}">短评</li>
          <li class="table-list" @click="tableOne(1)" :class="{'current-list': currentIndex === 1}">影评</li>
        </ul>
        <ul class="comments-d-uls" v-show="currentIndex === 0">
          <li v-for="(item, index) in movieData.popular_comments" :key="item.id" class="comments-d-list" v-show="index < 5" @click="gotoDetails(item.id, index)">
            <div class="left">
              <img :src="item.author.avatar" alt="">
            </div>
            <div class="right">
              <div class="name-w">
                <div class="name-left">
                  <span>{{item.author.name}}</span>
                  <span v-if="item.rating">{{item.rating.value}}分</span>
                </div>
                <span>{{item.useful_count}}</span>
              </div>
              <p>{{item.title}}</p>
              <p class="max-text">{{item.content}}</p>
            </div>
          </li>
          <li class="btn-li" @click="gotoComments(0)">查看全部评论{{movieData.comments_count}}个</li>
        </ul>
        <ul class="comments-d-uls" v-show="currentIndex === 1">
          <li v-for="(item, index) in movieData.popular_reviews" :key="item.id" class="comments-d-list" v-show="index < 5" @click="gotoDetails(item.id, index)">
            <div class="left">
              <img v-lazy="item.author.avatar" alt="">
            </div>
            <div class="right">
              <div class="name-w">
                <div class="name-left">
                  <span>{{item.author.name}}</span>
                  <span v-if="item.rating">{{item.rating.value}}分</span>
                </div>
              </div>
              <p>{{item.title}}</p>
              <p class="max-text">{{item.summary}}</p>
            </div>
          </li>
          <li class="btn-li" @click="gotoComments(1)">查看全部评论{{movieData.reviews_count}}个</li>
        </ul>
      </div>
    </div>
    <div class="loading-w" v-show="!movieData.title">
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
        photoArr: [],
        movieData: {},
        titleName: '电影详情'
      }
    },
    created () {
      if (this.$route.query.id) {
        this.getDetails()
      }
    },
    methods: {
      // 去评论详情
      gotoDetails (id, index) {
        this.$router.push({
          path: '/commentDetails',
          query: {
            id: this.$route.query.id,
            mid: id,
            mindex: index,
            index: this.currentIndex
          }
        })
      },
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
        this.$fetch('/subject/' + this.$route.query.id).then(res => {
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
        })
      },
      // 电影类型分割
      getGenres (data) {
        if (data && data.length) {
          return data.join(' / ')
        }
      },
      // 评论切换
      tableOne (index) {
        this.currentIndex = index
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
    background-color: #eee
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
        .max-text
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
      border: 1px solid #42bd56
      height: 36px
      width: 80%
      margin: 0 auto 20px
      line-height: 36px
      text-align: center
      color #42bd56
</style>
