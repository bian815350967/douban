import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 首页
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/movieDetails', // 电影详情
      name: 'movieDetails',
      component: () => import('./views/movieDetails/movieDetails.vue')
    },
    {
      path: '/rankDetails', // 排行详情
      name: 'rankDetails',
      component: () => import('./views/rank/rankDetails.vue')
    },
    {
      path: '/search', // 搜索
      name: 'search',
      component: () => import('./views/search/search.vue')
    },
    {
      path: '/my', // 我的
      name: 'my',
      component: () => import('./views/my/my.vue')
    },
    {
      path: '/reading', // 豆瓣读书
      name: 'reading',
      component: () => import('./views/reading/reading.vue')
    },
    {
      path: '/readingDetails', // 豆瓣读书详情
      name: 'readingDetails',
      component: () => import('./views/reading/readingDetails.vue')
    },
    {
      path: '/music', // 豆瓣音乐
      name: 'music',
      component: () => import('./views/music/music.vue')
    },
    {
      path: '/musicDetails', // 豆瓣音乐详情
      name: 'musicDetails',
      component: () => import('./views/music/musicDetails.vue')
    },
    {
      path: '/peopleDetails', // 影人信息详情
      name: 'peopleDetails',
      component: () => import('./views/movieDetails/peopleDetails.vue')
    },
    {
      path: '/comments', // 电影评论
      name: 'comments',
      component: () => import('./views/movieDetails/comments.vue')
    },
    {
      path: '/commentDetails', // 电影评论详情
      name: 'commentDetails',
      component: () => import('./views/movieDetails/commentDetails.vue')
    },
    {
      path: '/xingcengbian', // 星辰变
      name: 'xingcengbian',
      component: () => import('./views/xingcengbian/xingcengbian.vue')
    },
    {
      path: '/xingcengbianDetails', // 星辰变 章节详情
      name: 'xingcengbianDetails',
      component: () => import('./views/xingcengbian/xingcengbianDetails.vue')
    }
  ]
})
