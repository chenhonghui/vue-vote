// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import './assets/icon/iconfont.css'
import 'reset-css'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

import './constant/constant.scss'

Vue.config.productionTip = false

Vue.use(Toast)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
