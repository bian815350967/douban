<template>
  <div class="my">
    <div class="list-item" @click="gotoPage(1)">豆瓣读书搜索</div>
    <div class="list-item" @click="gotoPage(2)">豆瓣音乐搜索</div>
    <div id="textarea">
      <div v-html="vhtml"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        vhtml: ''
      }
    },
    created () {
      this.aa()
    },
    methods: {
      gotoPage (index) {
        if (index === 1) this.$router.push('/reading')
        if (index === 2) this.$router.push('/music')
      },
      aa () {
        // axios.get('/zhihu/news/3892357').then(res => {
        //   this.vhtml = res.data
        // })
        // let data = require('@/assets/js/douluodalu.json')
        // this.vhtml = '<p>' + data.txt.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
        // this.vhtml = '<p>' + data.txt.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
      }
    }
  }
</script>

<style scoped lang="stylus">
.my
  width: 100%
  height: 100%
  overflow: auto
  padding-bottom: 80px
.list-item
  width: 80%
  height: 36px
  display: flex
  align-items center
  justify-content center
  margin: 30px auto
  color #42bd56
  border: 1px solid #42bd56
#textarea
  width 100%
  white-space normal
  line-height: 2
  font-size: 14px
  color #000
  text-indent 2em
  padding: 10px
</style>
