import { message, Spin } from 'shim-antd'
import { User } from 'authing-js-sdk'
import { React } from 'shim-react'
import { useAsyncFn } from 'react-use'
import { BindSuccess } from './core/bindSuccess'
import { SecurityCode } from './core/securityCode'
import { IAuthingPublicConfig, IMFATriggerData } from '../../types'
import { GuardDownloadATView } from '../DownloadAuthenticator'
import { BackType } from '../OTP'
import { get, post } from '../../request'
import './styles.less'

const { useEffect, useState, useMemo, forwardRef, useImperativeHandle } = React

type BindTotpType = 'securityCode' | 'bindSuccess' | 'downloadAuthenticator'

interface GuardBindTotpProps {
  initData: IMFATriggerData
  authingPublicConfig: IAuthingPublicConfig
  resetBackType: (type: BackType) => void
}

export const GuardBindTotpView = forwardRef((props: GuardBindTotpProps, ref) => {
  const { initData, authingPublicConfig, resetBackType } = props

  const [secret, setSecret] = useState('')

  const [qrcode, setQrcode] = useState('')

  const [bindTotpType, setBindTotpType] = useState<BindTotpType>('securityCode')

  useImperativeHandle(
    ref,
    () => ({
      update: () => {
        setBindTotpType('securityCode')
      }
    }),
    []
  )

  const [bindInfo, fetchBindInfo] = useAsyncFn(async () => {
    const query = {
      source: 'APPLICATION'
    }
    const config = {
      headers: {
        authorization: initData.mfaToken
      }
    }

    try {
      const { code, message: msg } = await get({
        path: `/api/v2/mfa/authenticator?source=${query.source}`,
        config
      })
      if (code === 2021) {
        message.error(msg)
        // TODO mfa token 失效
        return
      }
    } catch (error: any) {
      message.error(error?.message)
    }

    try {
      const { data, code } = await post<any>({
        path: '/api/v2/mfa/totp/associate',
        data: query,
        config
      })
      if (code === 200) {
        setSecret(data.recovery_code)
        setQrcode(data.qrcode_data_url)
      } else {
        // onGuardHandling?.()
      }
    } catch (error: any) {
      message.error(error?.message)
    }
  }, [])

  const onBind = (resUser?: User) => {
    console.log(resUser)
    // if (isAuthFlow && resUser) {
    //   events?.onLogin?.(resUser, authClient)
    // } else {
    //   if (user) {
    //     events?.onLogin?.(user, authClient)
    //   }
    // }
  }

  const onNext = (user?: User) => {
    console.log(user)
    // if (isAuthFlow) {
    setBindTotpType('bindSuccess')
    // } else {
    //   setUser(user)
    //   setBindTotpType(BindTotpType.BIND_SUCCESS)
    // }
  }

  useEffect(() => {
    fetchBindInfo()
  }, [fetchBindInfo])

  const onDownload = () => {
    setBindTotpType('downloadAuthenticator')
  }

  const renderContent = useMemo<Record<BindTotpType, (props: any) => React.ReactNode>>(
    () => ({
      securityCode: props => <SecurityCode {...props} onDownload={onDownload} />,
      bindSuccess: props => <BindSuccess {...props} />,
      downloadAuthenticator: () => <GuardDownloadATView authingPublicConfig={authingPublicConfig} />
    }),
    []
  )

  useEffect(() => {
    if (bindTotpType === 'downloadAuthenticator') {
      resetBackType('verify')
    } else {
      resetBackType('mfa')
    }
  }, [bindTotpType])

  return (
    <>
      {bindInfo.loading ? (
        <Spin />
      ) : (
        <div className="g2-view-container g2-bind-totp">
          <div className="g2-mfa-content g2-mfa-bindTotp">
            {bindInfo.loading
              ? 'loading'
              : renderContent[bindTotpType]({
                mfaToken: initData.mfaToken,
                qrcode,
                secret,
                onBind,
                onNext
              })}
          </div>
        </div>
      )}
    </>
  )
})
