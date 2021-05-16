/*
  保存需要更新数据状态的函数 并且提交给mutations来执行
  可以执行异步请求
*/

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  REST_USER_INFO,
  RECEIVE_INFO, RECEIVE_GOODS, RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-conType'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUser,
  reqSignOut,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqShopsBykeys
} from  '../api'
import state from "./state";

export default {
  //封装的api函数返回值是promise类型的值 需要处理
  async getAddress({commit,state}){
    let geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if(result.code === 0){
      commit(RECEIVE_ADDRESS,{address : result.data})
    }
  },
  //获取食品分类
  async getCategorys({commit}){
    const result = await reqFoodCategorys()
    if(result.code === 0){
      commit(RECEIVE_CATEGORYS,{categorys : result.data})
    }
  },
  // 获取商家列表
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    if(result.code === 0){
      commit(RECEIVE_SHOPS,{shops:result.data})
    }
  },
//  保存用户信息
  getUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
//获取用户信息
  async getUserInfo({commit}){
    const result = await reqUser()
    if(result.code === 0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  // 退出登录 清除用户信息
  async getLoginOut({commit,state}){
    const result = await reqSignOut()
    if(result.code === 0){
      commit(REST_USER_INFO)
    }
  },

//   异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      const info = result.date
      commit(RECEIVE_INFO,{info})
    }
  },
  async getShopGoods({commit} , callback){
    const result = await reqShopGoods()
    if(result.code === 0){
      console.log()
      const goods = result.date
      commit(RECEIVE_GOODS,{goods})
    }
    // 在传递数据的时候 传递一个回调函数 告诉组件数据更新了
    callback && callback()
  },
  async getShopRatings({commit},callback){
    const result = await reqShopRatings()
    if(result.code === 0){
      const ratings = result.date
      commit(RECEIVE_RATINGS,{ratings})
    }
    // 在传递数据的时候 传递一个回调函数 告诉组件数据更新了
    callback && callback()
  },
  updateFoodCount({commit}, {isAdd,food}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    } else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  // 根据关键词  搜索商品列表
  async getSearchShops({commit,state},keyword){
    let geohash = state.latitude + ',' + state.longitude
    const result = await reqShopsBykeys(keyword,geohash)
    commit(RECEIVE_SEARCH_SHOPS,{searchShops : result.data})
  },





}
