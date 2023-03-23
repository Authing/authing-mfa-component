import { App } from 'vue'

import { IAuthingMFAOptions, AuthingMFA } from '@authing/mfa-component-native'

import { AUTHING_INJECTION_KEY, AUTHING_TOKEN } from './token'

export class AuthingMFAPlugin {
  private authingMFA: AuthingMFA

  constructor(options: IAuthingMFAOptions) {
    this.authingMFA = new AuthingMFA(options)
  }

  install(app: App) {
    app.config.globalProperties[AUTHING_TOKEN] = this.authingMFA
    app.provide(AUTHING_INJECTION_KEY, this.authingMFA)
  }
}
