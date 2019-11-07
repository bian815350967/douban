<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
  @import "assets/css/reset.css"
  body
    user-select text
  .loading-w
    display flex
    flex-direction column
    align-items center
    padding-top: 20px
    .text
      margin-top: 10px
      font-size: 14px
      color #000
</style>
