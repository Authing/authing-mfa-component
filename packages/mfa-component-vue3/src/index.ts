import { inject } from 'vue'

import { AUTHING_INJECTION_KEY } from './token'

import { IAuthingMFAOptions, AuthingMFA } from '@authing/mfa-component-native'

import '@authing/mfa-component-native/dist/index.min.css'

import { AuthingMFAPlugin } from './plugin'

export function createAuthingMFA(options: IAuthingMFAOptions) {
  return new AuthingMFAPlugin(options)
}

export function useAuthingMFA(): AuthingMFA {
  return inject(AUTHING_INJECTION_KEY) as AuthingMFA
}

export * from '@authing/mfa-component-native'
