<template>
  <div class="search-w">
    <div class="logo-w">
      <div class="logo" @click="$router.push('/')">返回</div>
      <input type="text" placeholder="搜索电影/影人" class="input" @input="inputSearch" v-model.trim="keyWords">
      <div class="cancel" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        keyWords: '',
        start: 0,
        count: 10
      }
    },
    methods: {
      cancel () {
        this.keyWords = ''
      },
      inputSearch () {
        if (this.keyWords !== '') {
          // this.$fetch('/search', {
          //   q: this.keyWords,
          //   start: this.start,
          //   count: this.count
          // }).then(res => {
          //   console.log(res)
          // })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
.search-w
  .logo-w
    display: flex
    align-items center
    padding: 10px 0
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
</style>
