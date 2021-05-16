<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">流星外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on : loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on : !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on : loginWay}" @click="loginWay=true">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone : rightPhone}"
                      @click.prevent="getCode">
                {{ competeTime ? `已发送${competeTime}s` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册流星外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on : !loginWay}" @click="loginWay=false">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button " @click="showPwd = !showPwd" :class="showPwd? 'on' : 'off'">
                  <div class="switch_circle" :class="{right : showPwd}"></div>
                  <span class="switch_text">{{showPwd ? '显示' : '隐藏'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" ref="captcha" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconicon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alert-text="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </div>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendYanZhenMa,reqLoginByMiMa,reqLoginByCallNumber} from '../../api'
import {mapActions} from 'vuex'
export default {
  name: "Login",
  components : {
    AlertTip
  },
  data() {
    return {
      loginWay: true,//为true是显示短信登录
      competeTime: 0,
      showPwd : false, // 默认不显示密码
      phone: '', // 手机号
      code : '', //手机短信验证码
      name : '' ,// 用户名
      pwd : '' ,// 密码
      captcha : '', //图像验证码
      alertText : '',
      alertShow : false
    }
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 异步获取验证码 和 ajax请求
    async getCode() {
      if(!this.competeTime){
        // 计时
        this.competeTime = 30
        this.timer = setInterval(()=>{
          this.competeTime--
          if (!this.competeTime){
            clearInterval(this.timer)
          }
        },1000)
        //  发送ajax请求
        const result = await reqSendYanZhenMa(this.phone)
        if (result.code === 1){
          // 发送失败显示提示
          this.showAlert(result.msg)
        //  如果到倒计时还没有结束 关闭倒计时
          if(this.competeTime){
            this.competeTime = 0
            clearTimeout(this.timer)
            this.timer = undefined
          }
        }
      }
    },
    showAlert(alertText){
      this.alertShow = true
      this.alertText = alertText
    },
    // 前台登录验证
    async login(){
      let result
      // 短信登录
      if(this.loginWay){
        const {phone,code,rightPhone} = this
        // 发现输入的手机号码格式不正确 提示用户
        if(!rightPhone){
          // 提示用户手机号格式不正确
          this.showAlert('用户手机号格式不正确')
          return ;
        }else if(!/^\d{6}$/.test(code)){ // 提示验证码不正确
          // 提示用户验证码不正确
          this.showAlert('用户验证码不正确,必须是6位数字')
          return ;
        }
      //  发送ajax请求
        result = await reqLoginByCallNumber(phone,code)
      } else {
        const {name,pwd,captcha} = this
        if(!name){
          // 提示用户用户名不正确
          this.showAlert("用户名不正确")
          return ;
        }else if (!pwd){
          //  提示用户密码不正确
          this.showAlert("用户密码不正确")
          return ;
        }else if(!captcha){
        //  提示用户图形验证码不正确
          this.showAlert("验证码不正确")
          return ;
        }
      //  发送ajax请求
        result = await reqLoginByMiMa(name,pwd,captcha)
      }

      //  如果到倒计时还没有结束 关闭倒计时
      if(this.competeTime){
        this.competeTime = 0
        clearTimeout(this.timer)
        this.timer = undefined
      }

      if(result.code === 0){
        //请求成功之后 将用户信息保存到vuex的state中
        const user = result.data
        this.getUser(user)
      //  登录成功之后 切换路由
        this.$router.replace('/profile')
      }else{
        // 请求失败之后 显示失败信息
        const msg = result.msg
        // 在账号密码登录失败之后 重新调用请求一次性验证码的函数  更新验证码
        this.getCaptcha()
        this.showAlert(msg)
      }
    },
    closeTip(){
      this.alertShow = false
      this.alertText = ''
    },
    getCaptcha(){
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    ...mapActions(['getUser'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent

              &.right_phone
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s
                &.right
                  transform translateX(30px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>
