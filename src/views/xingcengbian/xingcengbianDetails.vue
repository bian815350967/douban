<template>
  <div>
    <fixed-top :titleName="titleName"></fixed-top>
    <div v-html="replaceString(dataTxt.txt)" class="wrap"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        titleName: '第' + (Number(this.$route.query.index) + 1) + '章',
        dataTxt: '',
        queryIndex: Number(this.$route.query.index)
      }
    },
    created () {
      let data = require('@/assets/js/xingcengbian.json')
      this.dataTxt = data[this.queryIndex]
      let f = this.A(100,10)
      console.log(f)
    },
    methods: {
      replaceString (str) {
        if (str) {
          str = '<p>' + str.replace(/\n*$/g, '').replace(/\n/g, '</p> <p>') + '</p>'
          return str
        }
      },
      A(b, e) {
        var c = "", a = 4 * b.length, d, f, g;
        for (d = 0; d < a; d += 3)
          for (g = (b[d >>> 2] >>> 8 * (3 - d % 4) & 255) << 16 | (b[d + 1 >>> 2] >>> 8 * (3 - (d + 1) % 4) & 255) << 8 | b[d + 2 >>> 2] >>> 8 * (3 - (d + 2) % 4) & 255,
                 f = 0; 4 > f; f += 1)
            c = 8 * d + 6 * f <= 32 * b.length ? c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g >>> 6 * (3 - f) & 63) : c + e.b64Pad;
        return c
      }
    },
    components: {
      fixedTop: resolve => require(['@/components/mFixedTop'], resolve)
    }
  }
</script>

<style scoped lang="stylus">
.wrap
  padding: 60px 10px 10px 10px
  font-size: 18px
  line-height: 2
  text-indent 2em
  user-select auto
</style>
