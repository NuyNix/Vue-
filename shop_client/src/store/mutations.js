/*
  通过执行函数直接更新数据的状态
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  REST_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-conType'
import Vue from 'vue'

export default {
//  执行函数 实际在actions中提交的函数是以小写字符串的形式复制给大写变量名
//  在这里大写的函数名是一个字符串不能直接执行
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [REST_USER_INFO](state){
    state.userInfo = {}

  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count){ // 第一次点击 如果没有的count就给对象添加count属性 并且进行数据绑定
      Vue.set(food,'count',1)
      state.shopCart.push(food)
    } else {
      food.count ++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count){ // 当count中有值的时候执行操作  防止频繁的点击将count修改为负数
      food.count --
      //点击减号的时候 根据点击的food  如果它的count属性的属性值是0 就将这个food从shopCart中删除
      if(food.count === 0){
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    state.shopCart.forEach(food => food.count = 0)
    // 清空数组
    state.shopCart = []
  },
  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops
  }

}
