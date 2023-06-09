import { React } from 'shim-react'

import { ConfigProvider, message, Modal } from 'shim-antd'

import { Email } from './Email'

import { SMS } from './SMS'

import { Face } from './Face'

import { OTP } from './OTP'

import { MFASelector } from './MFASelector'

import { IconFont, useIconfont } from '../IconFont'

import { AuthingLoading } from './AuthingLoading'

import { initAuthingMFAI18n } from '../locales'

import { setRequestBaseUrl, setAppId, setUserpoolId } from '../request'

import { getPublicConfig } from '../apis'

import { noop } from '../helpers'

import { AuthingMFAContext } from '../contexts'

import { loopFunc } from '../helpers'

import './style.less'

import {
  IAuthingMFAComponentProps,
  IAuthingPublicConfig,
  IAuthingMFATriggerData,
  MFAType
} from '../types'

const { useState, useEffect, useCallback, useMemo } = React

export interface IMFAFuncProps {
  mfaTriggerData: IAuthingMFATriggerData
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  publicConfig: IAuthingPublicConfig
  updateBackComponent: (component: React.ReactNode) => void // 自定义 back
}

const PREFIX_CLS = 'authing-ant'

message.config({
  prefixCls: `${PREFIX_CLS}-message`
})

const ComponentsMapping: Record<MFAType, (props: IMFAFuncProps) => React.ReactNode> = {
  EMAIL: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig } = props
    return <Email publicConfig={publicConfig} mfaTriggerData={mfaTriggerData} />
  },
  SMS: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig } = props
    return <SMS publicConfig={publicConfig} mfaTriggerData={mfaTriggerData} />
  },
  OTP: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig, setMFASelectorVisible, updateBackComponent } = props
    return (
      <OTP
        publicConfig={publicConfig}
        mfaTriggerData={mfaTriggerData}
        updateBackComponent={updateBackComponent}
        setMFASelectorVisible={setMFASelectorVisible}
      />
    )
  },
  FACE: (props: IMFAFuncProps) => {
    const { mfaTriggerData, publicConfig, setMFASelectorVisible } = props
    return (
      <Face
        publicConfig={publicConfig}
        mfaTriggerData={mfaTriggerData}
        setMFASelectorVisible={setMFASelectorVisible}
      />
    )
  }
}

export function AuthingMFAComponent(props: IAuthingMFAComponentProps) {
  const {
    appId,
    host = '',
    mode = 'normal',
    mfaTriggerData,
    lang,
    onLoad = noop,
    onMount = noop,
    onUnmount = noop,
    onSuccess = noop,
    onFail = noop,
    onSaveRecoveryCode = noop
  } = props

  const events = useMemo(() => {
    return {
      onLoad,
      onMount,
      onUnmount,
      onSuccess,
      onFail,
      onSaveRecoveryCode
    }
  }, [onLoad, onMount, onUnmount, onSuccess, onFail, onSaveRecoveryCode])

  let timer: null | NodeJS.Timeout = null

  const [publicConfig, setPublicConfig] = useState<null | IAuthingPublicConfig>(null)

  const [modalVisible, setModalVisible] = useState<boolean>(mode === 'modal')

  const _getPublicConfig = useCallback(async () => {
    const publicConfig = await getPublicConfig(appId, host)
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

    loopFunc(events.onLoad)

    timer = setTimeout(() => {
      loopFunc(events.onMount)
    })

    return () => {
      loopFunc(events.onUnmount)

      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
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

  const onChange = (type: MFAType) => setCurrentMFAType(type)

  const [CustomBack, setCustomBack] = useState<React.ReactNode>(null)

  const updateBackComponent = (component: React.ReactNode) => {
    setCustomBack(component)
  }

  const context = useMemo(() => {
    return {
      events,
      mfaTriggerData
    }
  }, [events, mfaTriggerData])

  const onCloseModal = () => {
    setModalVisible(false)
  }

  const renderContent = useMemo(() => {
    return (
      <div className="authing-mfa-container">
        {(appId && mfaTriggerData && publicConfig && (
          <div>
            {CustomBack}
            <div className="authing-mfa-content">
              {ComponentsMapping[currentMFAType]({
                mfaTriggerData,
                setMFASelectorVisible,
                publicConfig,
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
          </div>
        )) || <AuthingLoading />}
      </div>
    )
  }, [appId, mfaTriggerData, publicConfig, currentMFAType])

  return (
    <AuthingMFAContext.Provider value={context}>
      <ConfigProvider prefixCls={PREFIX_CLS}>
        {mode === 'modal' ? (
          <Modal
            className="authing-g2-render-module-modal"
            open={modalVisible}
            closeIcon={<IconFont type="authing-close-line" className="g2-modal-close" />}
            closable={true}
            keyboard={true}
            maskClosable={false}
            footer={null}
            onCancel={onCloseModal}
          >
            {renderContent}
          </Modal>
        ) : (
          <div>{renderContent}</div>
        )}
      </ConfigProvider>
    </AuthingMFAContext.Provider>
  )
}
