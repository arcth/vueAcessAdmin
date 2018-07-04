// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 *                   //
 *                 /
 *                |
 *
 */
import  Vue from 'vue'
import iView from 'iview'
import  App from './App.vue'
import  router from './router'
// import  api from './common/api'
import  store from './store'
import 'iview/dist/styles/iview.css'
import './assets/style/reset.css'
import './assets/fontawesome/css/fontawesome-all.min.css'
Vue.config.productionTip = false
Vue.use(iView)
// Vue.use(api);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components:{App},
  router,
  store
})
