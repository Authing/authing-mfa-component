import { VueConstructor } from 'vue'

import { AuthingMFA, IAuthingMFAOptions } from '@authing/mfa-component-native'

import '@authing/mfa-component-native/dist/index.min.css'

export function AuthingMFAPlugin(Vue: VueConstructor, options: IAuthingMFAOptions) {
  Vue.prototype.$authingMFA = new AuthingMFA(options)
}

export * from '@authing/mfa-component-native'
