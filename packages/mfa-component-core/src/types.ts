import { FormInstance, FormItemProps } from 'shim-antd/lib/form'

import { Lang } from './locales'
export interface IAuthingMFAOptions {
  el: Element
}

export type IAuthingMFAEventHandler = (...args: any[]) => void

export interface IAuthingMFAEvent {
  [name: string]: IAuthingMFAEventHandler[]
}

export type MFAType = 'SMS' | 'EMAIL' | 'OTP' | 'FACE'

export type MFAVerifyPage = 'RECOVERY'

export interface IMFAInitData {
  applicationMfa: Array<{
    mfaPolicy: MFAType
    status: number
    sort: number
  }>
  avatar?: string
  current?: MFAType
  customPasswordStrength: {
    enMessageOpen: boolean
    enabled: boolean
    jpMessageOpen: boolean
    twMessageOpen: boolean
    zhMessageOpen: boolean
  }
  email?: string
  faceMfaEnabled: boolean
  mfaEmail?: string
  mfaPhone?: string
  mfaPhoneCountryCode?: string
  mfaToken: string
  passwordStrength: number
  phone?: string
  phoneCountryCode?: string
  totpMfaEnabled: boolean
  username?: string
  nickname?: string
}

export interface IAuthingPublicConfig {
  cdnBase: string
  verifyCodeLength?: number
  internationalSmsConfig?: {
    enabled: boolean
    defaultISOType: ''
  }
  userPoolId: string
  mfa?: {
    faceScore?: number
  }
}

export interface IAuthingMFAComponentProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  lang?: Lang
}

export interface IOnMFAVerify {
  (code: number, data: any, message?: string): void
}

export interface ValidatorFormItemProps extends FormItemProps {
  form?: FormInstance
  checkRepeat?: boolean
  checkExist?: boolean
  areaCode?: string //国际化区号
  /**
   * 控制内部FormItem组件关于pattern的校验规则
   */
  isCheckPattern?: boolean
}

export interface ValidatorFormItemMetaProps extends ValidatorFormItemProps {
  method: 'email' | 'phone' | 'username' | string
}

export interface ICheckProps {
  check: (values: any) => void
}
