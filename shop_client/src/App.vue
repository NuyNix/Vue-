<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import {mapActions} from 'vuex'

export default {
  name: "App",
  components: {
    FooterGuide
  },
  mounted(){
    this.getAddress()
    this.getCategorys()
    this.getShops()
    this.getUserInfo()
  },
  methods : {
    ...mapActions(['getAddress','getCategorys','getShops','getUserInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
