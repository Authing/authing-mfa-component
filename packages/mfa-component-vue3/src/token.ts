import { InjectionKey } from 'vue'

import { AuthingMFA } from '@authing/mfa-component-native'

export const AUTHING_TOKEN = '$authingMFA'

export const AUTHING_INJECTION_KEY: InjectionKey<AuthingMFA> = Symbol(AUTHING_TOKEN)
