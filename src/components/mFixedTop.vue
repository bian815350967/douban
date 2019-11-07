<template>
  <div class="fixed-top">
    <div class="goback" v-show="isGoBack" @click="goBack">返回</div>
    <div class="name">{{titleName}}</div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  props: {
    titleName: String,
    isGoBack: {
      type: Boolean,
      default: true
    },
    isGoNumber: Boolean
  },
  methods: {
    goBack () {
      if (this.isGoBack === true && !this.isGoNumber) { // 返回上一页
        this.$router.go(-1)
      } else if (this.isGoBack === true && this.isGoNumber === true) { // 返回指定的页面
        this.$emit('goPath')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.fixed-top
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #19191a;
  border-bottom: 1px solid #ececec;
  background: #fff;
  font-size: 16px;
  .goback
    box-sizing border-box
    padding: 0 10px
    position: absolute;
    left: 0;
    top 0
    height: 50px
    line-height: 50px
    .goback-icon
      font-size: 14px
  .name
    font-weight: bold
    font-size: 16px
</style>
