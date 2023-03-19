import { React } from 'shim-react'

import { Email } from './Email'
import { SMS } from './SMS'
import { Face } from './Face'
import { OTP } from './OTP'

import { MFASelector } from './MFASelector'
import { Back } from './Back'

import { useIconfont } from '../IconFont'

import { i18n, initAuthingMFAI18n } from '../locales'

import './style.less'

import {
  IAuthingMFAComponentProps,
  IAuthingPublicConfig,
  IMFAInitData,
  IOnMFAVerify,
  MFAType,
  MFAVerifyPage
} from '../types'
import { GuardRecoveryCodeView } from './RecoveryCode'
import { ConfigProvider } from 'shim-antd'

export interface IMFAFuncProps {
  initData: IMFAInitData
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
  onChange?: (type: MFAType | MFAVerifyPage) => void
}

const ComponentsMapping: Record<
  MFAType | MFAVerifyPage,
  (props: IMFAFuncProps) => React.ReactNode
> = {
  EMAIL: (props: IMFAFuncProps) => {
    const { initData, authingPublicConfig, onVerify } = props
    return (
      <Email authingPublicConfig={authingPublicConfig} initData={initData} onVerify={onVerify} />
    )
  },
  SMS: (props: IMFAFuncProps) => {
    const { initData, authingPublicConfig, onVerify } = props
    return <SMS authingPublicConfig={authingPublicConfig} initData={initData} onVerify={onVerify} />
  },
  OTP: (props: IMFAFuncProps) => {
    const { initData, authingPublicConfig, onVerify, onChange, setMFASelectorVisible } = props
    return (
      <OTP
        authingPublicConfig={authingPublicConfig}
        initData={initData}
        onVerify={onVerify}
        onChange={onChange}
        setMFASelectorVisible={setMFASelectorVisible}
      />
    )
  },
  FACE: (props: IMFAFuncProps) => {
    const { initData, authingPublicConfig, onVerify, setMFASelectorVisible } = props
    return (
      <Face
        authingPublicConfig={authingPublicConfig}
        initData={initData}
        onVerify={onVerify}
        setMFASelectorVisible={setMFASelectorVisible}
      />
    )
  },
  RECOVERY: (props: IMFAFuncProps) => {
    const { initData } = props
    return <GuardRecoveryCodeView initData={initData} />
  }
}

export function AuthingMFAComponent(props: IAuthingMFAComponentProps) {
  const { useState } = React

  const { initData, authingPublicConfig, lang } = props

  initAuthingMFAI18n({
    defaultLanguage: lang || 'browser'
  })

  useIconfont(authingPublicConfig.cdnBase)

  const { t } = i18n

  const [currentMFAType, setCurrentMFAType] = useState<MFAType | MFAVerifyPage>(
    initData.current ||
      initData.applicationMfa.sort((a, b) => a.sort - b.sort)[0].mfaPolicy ||
      'EMAIL'
  )

  const [MFASelectorVisible, setMFASelectorVisible] = useState<boolean>(true)

  console.log(t, setCurrentMFAType, setMFASelectorVisible)

  const onVerify = (code: number, data: any, message?: string) => {
    console.log(code, data, message)
  }

  const onChange = (type: MFAType | MFAVerifyPage) => setCurrentMFAType(type)

  return (
    <ConfigProvider prefixCls="authing-ant">
      <div className="authing-mfa-container">
        <Back></Back>
        <div className="authing-mfa-content">
          {ComponentsMapping[currentMFAType]({
            initData,
            setMFASelectorVisible,
            authingPublicConfig,
            onVerify,
            onChange
          })}
        </div>
        {MFASelectorVisible && (
          <MFASelector
            initData={initData}
            current={currentMFAType as MFAType}
            onChange={onChange}
          ></MFASelector>
        )}
      </div>
    </ConfigProvider>
  )
}

// AuthingMFAComponent.name = 'authing-mfa-component'
