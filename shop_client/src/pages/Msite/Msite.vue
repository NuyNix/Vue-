<template>
  <div class="msite">
    <!--首页头部-->
    <HeadTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont iconsousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userInfo' : '/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icongeren"></i>
        </span>
      </router-link>
    </HeadTop>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgesUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/msite_back.svg" alt="black">
      </div>
    </nav>
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
import HeadTop from "../../components/HeadTop/HeadTop";
import ShopList from '../../components/ShopList/ShopList'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
export default {
  name: "FooterGuide",
  data(){
    return {
      baseImgesUrl : 'https://fuss10.elemecdn.com'
    }
  },
  components : {
    HeadTop,
    ShopList
  },
  computed : {
    ...mapState(['address','categorys','userInfo']),
    categorysArr(){
      const {categorys} = this
      let arr = []
      let minArr = []
      // 循环遍历categorys
      categorys.forEach(c => {
        // 如果小数组的长度是8的时候 将其压入大数组并清空小数组
        if(minArr.length === 8){
          minArr = []
        }
        if(minArr.length === 0){
          arr.push(minArr)
        }
        minArr.push(c)
      })
      return arr
    }
  },
  watch : {
    // 监视数据 在数据更新之后根据数据跟新的情况 判断是否创建轮播图的翻页效果 如果只有一页  就不用创建分页
    categorys(){
      this.$nextTick(() => { // 一旦界面完成更新 回调函数就执行（函数要写在数据更新之后）
        new Swiper('.swiper-container',{
          loop: true, // 循环模式选项
          pagination: {
            el: '.swiper-pagination',
          }
        })
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite  //首页
  width 100%
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .iconsousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        > span.swiper-pagination-bullet-active
          background #02a774
</style>
