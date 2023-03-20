import { React } from 'shim-react'

import { Email } from './Email'

import { SMS } from './SMS'

import { Face } from './Face'

import { OTP } from './OTP'

import { MFASelector } from './MFASelector'

// import { Back } from './Back'

import { useIconfont } from '../IconFont'

import { initAuthingMFAI18n } from '../locales'

import { setRequestBaseUrl, setAppId, setUserpoolId } from '../request'

import { getPublicConfig } from '../apis'

import './style.less'

import {
  IAuthingMFAComponentProps,
  IAuthingPublicConfig,
  IMFATriggerData,
  IOnMFAVerify,
  MFAType
} from '../types'
import { ConfigProvider, message, Spin } from 'shim-antd'

export interface IMFAFuncProps {
  mfaTriggerData: IMFATriggerData
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  publicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
  updateBackComponent: (component: React.ReactNode) => void // 自定义 back
}

const PREFIX_CLS = 'authing-ant'

message.config({
  prefixCls: `${PREFIX_CLS}-message`
})

const ComponentsMapping: Record<MFAType, (props: IMFAFuncProps) => React.ReactNode> = {
  EMAIL: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig, onVerify } = props
    return <Email publicConfig={publicConfig} mfaTriggerData={mfaTriggerData} onVerify={onVerify} />
  },
  SMS: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig, onVerify } = props
    return <SMS publicConfig={publicConfig} mfaTriggerData={mfaTriggerData} onVerify={onVerify} />
  },
  OTP: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig, onVerify, setMFASelectorVisible, updateBackComponent } =
      props
    return (
      <OTP
        publicConfig={publicConfig}
        mfaTriggerData={mfaTriggerData}
        onVerify={onVerify}
        updateBackComponent={updateBackComponent}
        setMFASelectorVisible={setMFASelectorVisible}
      />
    )
  },
  FACE: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig, onVerify, setMFASelectorVisible } = props
    return (
      <Face
        publicConfig={publicConfig}
        mfaTriggerData={mfaTriggerData}
        onVerify={onVerify}
        setMFASelectorVisible={setMFASelectorVisible}
      />
    )
  }
}

export function AuthingMFAComponent(props: IAuthingMFAComponentProps) {
  const { useState, useEffect, useCallback } = React

  const { appId, mfaTriggerData, lang } = props

  const [publicConfig, setPublicConfig] = useState<null | IAuthingPublicConfig>(null)

  const _getPublicConfig = useCallback(async () => {
    const publicConfig = await getPublicConfig(appId)
    setPublicConfig(publicConfig)
  }, [appId])

  useEffect(() => {
    _getPublicConfig()
  }, [appId])

  useEffect(() => {
    if (!publicConfig) {
      return
    }
    setAppId(appId)
    setUserpoolId(publicConfig.userPoolId)
    setRequestBaseUrl(`https://${publicConfig.requestHostname || 'core.authing.cn'}`)
  }, [publicConfig])

  useIconfont(publicConfig?.cdnBase || '')

  initAuthingMFAI18n({
    defaultLanguage: lang || 'browser'
  })

  const [currentMFAType, setCurrentMFAType] = useState<MFAType>(
    mfaTriggerData.current ||
      mfaTriggerData.applicationMfa.sort((a, b) => a.sort - b.sort)[0].mfaPolicy ||
      'EMAIL'
  )

  const [MFASelectorVisible, setMFASelectorVisible] = useState<boolean>(true)

  const onVerify = (code: number, data: any, message?: string) => {
    console.log(code, data, message)
  }

  const onChange = (type: MFAType) => setCurrentMFAType(type)

  const [CustomBack, setCustomBack] = useState<React.ReactNode>(null)

  console.log(CustomBack)

  const updateBackComponent = (component: React.ReactNode) => {
    setCustomBack(component)
  }

  return (
    <ConfigProvider prefixCls={PREFIX_CLS}>
      <div className="authing-mfa-container">
        {(appId && mfaTriggerData && publicConfig && (
          <>
            {/* {CustomBack ?? <Back />} */}
            <div className="authing-mfa-content">
              {ComponentsMapping[currentMFAType]({
                mfaTriggerData,
                setMFASelectorVisible,
                publicConfig,
                onVerify,
                updateBackComponent
              })}
            </div>
            {MFASelectorVisible && (
              <MFASelector
                mfaTriggerData={mfaTriggerData}
                current={currentMFAType as MFAType}
                onChange={onChange}
              ></MFASelector>
            )}
          </>
        )) || <Spin className="authing-mfa-container-placeholder"></Spin>}
      </div>
    </ConfigProvider>
  )
}
