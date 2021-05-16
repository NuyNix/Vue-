
/*
  实现接口函数
    返回值还是一个Promise对象
*/
import './ajax'
import ajax from "./ajax";
const BASE_URL = './api'
// 长理坐标 ： 113.015628,28.073469
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')

// 3、根据经纬度获取商铺列表 将传递的参数定义成一个对象传递给ajax
export const reqShops = (longitude,latitude) => ajax(BASE_URL + '/shops',{longitude,latitude})

// 4、根据经纬度和关键字搜索商铺列表
export const reqShopsBykeys = (keyword,geohash) => ajax(BASE_URL + '/search_shops',{keyword,geohash})

// 6、用户名密码登陆
export const reqLoginByMiMa = (name,pwd,captcha) => ajax(BASE_URL + '/login_pwd',{name,pwd,captcha},'POST')

// 7、发送短信验证码
export const reqSendYanZhenMa = (phone) => ajax(BASE_URL + '/sendcode',{phone})

// 8、手机号验证码登陆
export const reqLoginByCallNumber = (phone,code) => ajax(BASE_URL + '/login_sms',{phone,code},'POST')

// 9、根据会话获取用户信息
export const reqUser = () => ajax(BASE_URL + '/userinfo')

// 10、用户登出
export const reqSignOut = () => ajax(BASE_URL + 'logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')


/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')


/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
