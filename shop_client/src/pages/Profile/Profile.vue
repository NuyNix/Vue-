<template>
  <section class="profile">
    <HeadTop title="我的"></HeadTop>
    <section class="profile-number">
      <router-link :to="userInfo._id ? '/userInfo' : '/login'" class="profile-link">
        <div class="profile_image">
          <i class="iconfont icongeren"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfo.phone">{{ userInfo.name || '登录/注册' }}</p>
          <p>
                <span class="user-icon">
                  <i class="iconfont iconshouji"></i>
                </span>
            <span class="icon-mobile-number">{{ userInfo.phone || '暂无绑定手机号' }}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont iconicon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont iconorder"></i>
            </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
                <i class="iconfont iconicon-jiantou1"></i>
              </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont iconicon-jifen"></i>
            </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
                <i class="iconfont iconicon-jiantou1"></i>
              </span>
        </div>
      </a>
      <!-- 流星外卖会员卡 -->
      <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont iconhuiyuan"></i>
            </span>
        <div class="my_order_div">
          <span>流星外卖会员卡</span>
          <span class="my_order_icon">
                <i class="iconfont iconicon-jiantou1"></i>
              </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont iconfuwuzhongxin"></i>
            </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
                <i class="iconfont iconicon-jiantou1"></i>
              </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px" v-show="userInfo._id">
      <mt-button type="danger" style="width: 100%" @click="signOut">
        退出登录
      </mt-button>
    </section>
  </section>
</template>

<script>
import HeadTop from "../../components/HeadTop/HeadTop";
import Login from '../../pages/Login/Login'
import {MessageBox , Toast } from 'mint-ui';
import {mapState,mapActions} from 'vuex'

export default {
  name: "Profile",
  components: {
    HeadTop,
    Login
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getLoginOut']),
    signOut() {
      MessageBox.confirm('确定退出登录吗').then(
        action => {
          //  发送异步ajax请求
          this.getLoginOut()
          Toast('操作成功');
        }
      );
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.profile //我的
  width 100%
  overflow hidden

  .profile-number
    margin-top 45.5px

    .profile-link
      clearFix()
      position relative
      display block
      background #02a774
      padding 20px 10px

      .profile_image
        float left
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        vertical-align top

        .icongeren
          background #e4e4e4
          font-size 62px

      .user-info
        float left
        margin-top 8px
        margin-left 15px

        p
          font-weight: 700
          font-size 18px
          color #fff

          &.user-info-top
            padding-bottom 8px

          .user-icon
            display inline-block
            margin-left -5px
            margin-right -3px
            width 20px
            height 20px

            .iconshouji
              font-size 25px
              vertical-align text-top

          .icon-mobile-number
            font-size 14px
            color #fff

      .arrow
        width 12px
        height 12px
        position absolute
        right 15px
        top 40%

        .iconicon-jiantou1
          color #fff
          font-size 5px

  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden

    .info_data_list
      clearFix()

      .info_data_link
        float left
        width 33%
        text-align center
        border-right 1px solid #f1f1f1

        .info_data_top
          display block
          width 100%
          font-size 14px
          color #333
          padding 15px 5px 10px

          span
            display inline-block
            font-size 30px
            color #f90
            font-weight 700
            line-height 30px

        .info_data_bottom
          display inline-block
          font-size 14px
          color #666
          font-weight 400
          padding-bottom 10px

      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e

      .info_data_link:nth-of-type(3)
        border 0

        .info_data_top
          span
            color #6ac20b

  .profile_my_order
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff

    .my_order
      display flex
      align-items center
      padding-left 15px

      > span
        display flex
        align-items center
        width 20px
        height 20px

        > .iconfont
          margin-left -10px
          font-size 25px

        .iconorder
          color #02a774

        .iconicon-jifen
          color #ff5f3e

        .iconhuiyuan
          color #f90
          font-size 20px

        .iconfuwuzhongxin
          color #02a774

      .my_order_div
        width 100%
        border-bottom 1px solid #f1f1f1
        padding 18px 10px 18px 0
        font-size 16px
        color #333
        display flex
        justify-content space-between

        span
          display block

        .my_order_icon
          width 10px
          height 10px

          .icon-jiantou1
            color #bbb
            font-size 10px
</style>
