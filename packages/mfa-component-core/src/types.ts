export interface IAuthingMFAOptions {
  el: Element
}

export type IAuthingMFAEventHandler = (...args: any[]) => void

export interface IAuthingMFAEvent {
  [name: string]: IAuthingMFAEventHandler[]
}

export type MFAType = 'SMS' | 'EMAIL' | 'OTP' | 'FACE'

export interface IMFAInitData {
  applicationMfa?: Array<{
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

export interface IAuthingMFAComponentProps {
  initData: IMFAInitData
}
