import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import { createAuthingMFA } from '@authing/mfa-component-vue3'

import '@authing/mfa-component-vue3/dist/index.min.css'

const app = createApp(App)

app.use(
  createAuthingMFA({
    appId: 'AUTHING_APP_ID',
    mode: 'modal'
  })
)

app.use(router)

app.mount('#app')
