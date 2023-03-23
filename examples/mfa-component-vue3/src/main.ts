import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import { createAuthingMFA } from '@authing/mfa-component-vue3'

import '@authing/mfa-component-vue3/dist/index.min.css'

const app = createApp(App)

app.use(
  createAuthingMFA({
    appId: '630ed3137dd6f2fd7001da24'
  })
)

app.use(router)

app.mount('#app')
