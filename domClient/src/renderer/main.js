import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'

import App from './App'
import router from './router'
import store from './store'

import ErrorDialog from '@/components/ErrorDialog'

import 'vuetify/dist/vuetify.min.css'
import '@/assets/main.css'

axios.defaults.baseURL = 'http://localhost:3333'
//axios.defaults.port = 3333

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'fa'
})

Vue.use(VueMoment)

Vue.component('error-dialog', ErrorDialog)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
