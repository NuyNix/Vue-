/*
  入口文件
*/

import Vue from 'vue'
import App from "./App";
import router from './router/index'
import store from './store'
import { Button } from 'mint-ui'
import './mock/MockServe'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'

Vue.component(Button.name, Button)

Vue.use(VueLazyload, {
  loading
})


new Vue({
  el : '#app',
  render : h => h(App),
  router,
  store
})
