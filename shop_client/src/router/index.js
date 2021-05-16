
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite'
// import Order from "../pages/Order/Order";
// import Search from '../pages/Search/Search'
// import Profile from '../pages/Profile/Profile'

const Msite = () => import('../pages/Msite/Msite')
const Order = () => import('../pages/Order/Order')
const Search = () => import('../pages/Search/Search')
const Profile = () => import('../pages/Profile/Profile')

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfos from '../pages/Shop/ShopInfos/ShopInfos'
Vue.use(VueRouter)

export default new VueRouter({
  routes : [
    {
      path : '/msite',
      component : Msite,
      meta : {
        showFooter : true
      }
    },
    {
      path: '/order',
      component: Order,
      meta : {
        showFooter : true
      }
    },
    {
      path: '/search',
      component: Search,
      meta : {
        showFooter : true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta : {
        showFooter : true
      }
    },
    {
      path: '/',
      redirect : '/msite'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children : [
        {
          path: '/shopgoods',
          component: ShopGoods
        },
        {
          path: '/shopratings',
          component: ShopRatings
        },
        {
          path: '/shopinfos',
          component: ShopInfos
        },
        {
          path: '',
          redirect : '/shopgoods'
        },
      ]
    }
  ]
})
