import { CSSProperties, ReactNode } from 'shim-react'

import { FormInstance, FormItemProps } from 'shim-antd/lib/form'

import { Lang } from './locales'
export interface IAuthingMFAOptions {
  appId: string
  host?: string
  style?: CSSProperties
}

export type IAuthingMFAEventHandler = (...args: any[]) => void

export interface IAuthingMFAEvent {
  [name: string]: IAuthingMFAEventHandler[]
}

export type MFAType = 'SMS' | 'EMAIL' | 'OTP' | 'FACE'

export type MFAVerifyPage = 'RECOVERY'

export interface IAuthingMFATriggerData {
  applicationMfa: Array<{
    mfaPolicy: MFAType
    status: number
    sort: number
  }>
  avatar?: string
  current?: MFAType
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
  requestHostname?: string
}

interface OnSuccess {
  (code: number, data: any): void
}

interface OnFail {
  (message?: string): void
}

export interface IAuthingMFAEventFunc {
  onLoad?: IAuthingMFAEventHandler | IAuthingMFAEventHandler[]
  onMount?: IAuthingMFAEventHandler | IAuthingMFAEventHandler[]
  onUnmount?: IAuthingMFAEventHandler | IAuthingMFAEventHandler[]
  onSuccess?: OnSuccess | OnSuccess[]
  onFail?: OnFail | OnFail[]
  onBindOTP?: IAuthingMFAEventHandler | IAuthingMFAEventHandler[]
}

export interface IStartProps {
  el: Element
  mfaTriggerData: IAuthingMFATriggerData
}

export interface IAuthingMFAComponentProps extends IAuthingMFAEventFunc {
  appId: string
  host?: string
  mfaTriggerData: IAuthingMFATriggerData
  lang?: Lang
  children?: ReactNode
}

export interface ContainerProps extends IAuthingMFAComponentProps {
  customBack?: React.ReactNode
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

export interface IAuthingMFAContext {
  events: IAuthingMFAEventFunc
  mfaTriggerData: IAuthingMFATriggerData
}

export interface IAuthingFunc {
  (...args: any[]): any
}
