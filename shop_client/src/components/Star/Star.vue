<template>
  <div class="star " :class="'star-' + size">
    <span class="star-item on" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  name: "Star",
  props : {
    score : Number,
    size : Number
  },
  computed : {
    // 根据评分的高低显示的星星的颗数
    starClasses(){
      let {score} = this
    //  添加n个on
      let sc = []
      let ons = Math.floor(score)
      for (let i = 0; i < ons; i++) {
        sc.push(CLASS_ON)
      }
    //  添加0/1个half
      if(score*10 - ons*10 >= 5){
        sc.push(CLASS_HALF)
      }
    //  添加n个off
      while (sc.length < 5){
        sc.push(CLASS_OFF)
      }
      return sc
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
