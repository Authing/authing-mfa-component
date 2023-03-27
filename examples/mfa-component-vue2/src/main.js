import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { AuthingMFAPlugin } from '@authing/mfa-component-vue2'

import '@authing/mfa-component-vue2/dist/index.min.css'

Vue.use(AuthingMFAPlugin, {
  appId: '630ed3137dd6f2fd7001da24',
  mode: 'modal'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
