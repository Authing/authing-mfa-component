import { message, Spin } from 'shim-antd'

import { React } from 'shim-react'

import { useAsyncFn } from 'react-use'

import { BindSuccess } from './core/bind'

import { SecurityCode } from './core/securityCode'

import { IAuthingPublicConfig, IAuthingMFATriggerData, IAuthingFunc } from '../../types'

import { AuthingMFADownloadATView } from '../DownloadAuthenticator'

import { BackType } from '../OTP'

import { mfaAuthenticator, otpAssociate } from '../../apis'

import { useAuthingMFAContext } from '../../contexts'

import { loopFunc } from '../../helpers'

import { i18n } from '../../locales'

import './styles.less'

const { useEffect, useState, useMemo, forwardRef, useImperativeHandle } = React

type BindTotpType = 'securityCode' | 'bindSuccess' | 'downloadAuthenticator'

interface GuardBindTotpProps {
  mfaTriggerData: IAuthingMFATriggerData
  publicConfig: IAuthingPublicConfig
  resetBackType: (type: BackType) => void
}

export const AuthingMFABindTotpView = forwardRef((props: GuardBindTotpProps, ref) => {
  const { mfaTriggerData, publicConfig, resetBackType } = props

  const [secret, setSecret] = useState('')

  const [qrcode, setQrcode] = useState('')

  const [bindTotpType, setBindTotpType] = useState<BindTotpType>('securityCode')

  const [successCallbackData, setSuccessCallbackData] = useState(null)

  const authingMFAContext = useAuthingMFAContext()

  useImperativeHandle(
    ref,
    () => {
      return {
        update: () => {
          setBindTotpType('securityCode')
        }
      }
    },
    []
  )

  const [bindInfo, fetchBindInfo] = useAsyncFn(async () => {
    mfaAuthenticator({
      mfaToken: mfaTriggerData.mfaToken
    })

    try {
      const {
        code,
        message: tips,
        data
      } = await otpAssociate({
        mfaToken: mfaTriggerData.mfaToken
      })

      if (code === 200 && data) {
        setSecret(data.recovery_code)
        setQrcode(data.qrcode_data_url)
      } else {
        message.error(tips)
      }
    } catch (e: any) {
      message.error(e?.message)
    }
  }, [])

  const onBind = () => {
    message.success(i18n.t('mfa.bindSuccess'))
    loopFunc(authingMFAContext?.events.onSuccess as IAuthingFunc, 200, successCallbackData)
  }

  const onConfirmOTP = (data: any) => {
    setSuccessCallbackData(data)
    setBindTotpType('bindSuccess')
  }

  useEffect(() => {
    fetchBindInfo()
  }, [fetchBindInfo])

  const onDownload = () => {
    setBindTotpType('downloadAuthenticator')
  }

  const renderContent = useMemo<Record<BindTotpType, (props: any) => React.ReactNode>>(() => {
    return {
      securityCode: props => <SecurityCode {...props} onDownload={onDownload} />,
      bindSuccess: props => <BindSuccess {...props} />,
      downloadAuthenticator: () => <AuthingMFADownloadATView publicConfig={publicConfig} />
    }
  }, [])

  useEffect(() => {
    if (bindTotpType === 'downloadAuthenticator') {
      resetBackType('verify')
    } else {
      resetBackType('mfa')
    }
  }, [bindTotpType])

  const component = useMemo(() => {
    if (bindInfo.loading) {
      return 'loading'
    }

    return renderContent[bindTotpType]({
      mfaToken: mfaTriggerData.mfaToken,
      qrcode,
      secret,
      onConfirmOTP,
      onBind
    })
  }, [bindInfo.loading, bindTotpType])

  if (bindInfo.loading) {
    return (
      <Spin
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    )
  }

  return (
    <div className="g2-view-container g2-bind-totp">
      <div className="g2-mfa-content g2-mfa-bindTotp">{component}</div>
    </div>
  )
})
