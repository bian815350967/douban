<template>
  <div class="wrap">
    <ul class="uls">
      <li class="list" v-for="(item, index) in pageTotal" :key="index" @click="gotoDetails(index)">{{item.txt}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        pageTotal: [
          {txt: '第1章 秦羽'},
          {txt: '第2章 决心'},
          {txt: '第3章 夜谈'},
        ]
      }
    },
    created () {
    },
    methods: {
      gotoDetails (index) {
        this.$router.push({
          path: '/xingcengbianDetails',
          query: {index}
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.wrap
  padding: 10px
  font-size: 14px
  .uls
    display: flex
    align-items center
    flex-wrap wrap
    .list
      width: 31%
      padding: 10px 0
      text-align: center
      font-size: 14px
      border: 1px solid #ddd
      margin-right: 10px
      &:nth-child(3n)
        margin-right: 0
</style>
