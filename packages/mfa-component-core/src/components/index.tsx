import { React } from 'shim-react'

import { useTranslation } from 'react-i18next'

import { Email } from './Email'
import { SMS } from './SMS'
import { Face } from './Face'
import { OTP } from './OTP'

import { MFASelector } from './MFASelector'
import { Back } from './Back'

import { useIconfont } from '../IconFont'

import { initAuthingMFAI18n } from '../locales'

import './style.less'

import {
  IAuthingMFAComponentProps,
  IAuthingPublicConfig,
  IMFAInitData,
  IOnMFAVerify,
  MFAType
} from '../types'

export interface IMFAFuncProps {
  initData: IMFAInitData
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
}

const ComponentsMapping: Record<MFAType, (props: IMFAFuncProps) => React.ReactNode> = {
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
    const { initData, authingPublicConfig, onVerify } = props
    return <OTP authingPublicConfig={authingPublicConfig} initData={initData} onVerify={onVerify} />
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
  }
}

export function AuthingMFAComponent(props: IAuthingMFAComponentProps) {
  const { useState } = React

  const { initData, authingPublicConfig, lang } = props

  initAuthingMFAI18n({
    defaultLanguage: lang || 'browser'
  })

  useIconfont(authingPublicConfig.cdnBase)

  const { t } = useTranslation()

  const [currentMFAType, setCurrentMFAType] = useState<MFAType>(
    initData.current ||
      initData.applicationMfa.sort((a, b) => a.sort - b.sort)[0].mfaPolicy ||
      'EMAIL'
  )

  const [MFASelectorVisible, setMFASelectorVisible] = useState<boolean>(true)

  console.log(t, setCurrentMFAType, setMFASelectorVisible)

  const onVerify = (code: number, data: any, message?: string) => {
    console.log(code, data, message)
  }

  return (
    <div className="authing-mfa-container">
      <Back></Back>
      <div className="authing-mfa-content">
        {ComponentsMapping[currentMFAType]({
          initData,
          setMFASelectorVisible,
          authingPublicConfig,
          onVerify
        })}
      </div>
      {MFASelectorVisible && (
        <MFASelector
          initData={initData}
          current={currentMFAType}
          onChange={(type: MFAType) => setCurrentMFAType(type)}
        ></MFASelector>
      )}
    </div>
  )
}

AuthingMFAComponent.name = 'authing-mfa-component'
