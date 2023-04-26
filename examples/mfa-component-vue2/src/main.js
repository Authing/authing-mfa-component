import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { AuthingMFAPlugin } from '@authing/mfa-component-vue2'

import '@authing/mfa-component-vue2/dist/index.min.css'

Vue.use(AuthingMFAPlugin, {
  appId: 'AUTHING_APP_ID',
  mode: 'modal'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
