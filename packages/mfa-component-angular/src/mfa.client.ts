import { InjectionToken } from '@angular/core'

import { AuthingMFA } from '@authing/mfa-component-native'

import { AuthingMFAClientConfig } from './mfa.config'

export const AuthingMFAClientService = new InjectionToken<AuthingMFA>('authingMFA.client')

export class AuthingMFAClientFactory {
  static createClient(configFactory: AuthingMFAClientConfig): AuthingMFA {
    const options = configFactory.get()

    if (!options) {
      throw new Error(
        'Configuration must be specified either through AuthingMFAModule.forRoot or through AuthingMFAClientConfig.set'
      )
    }

    return new AuthingMFA(options)
  }
}
