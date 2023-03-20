import { message, Spin } from 'shim-antd'
import { User } from 'authing-js-sdk'
import { React } from 'shim-react'
import { useAsyncFn } from 'react-use'
// import { ErrorCode } from '../_utils/GuardErrorCode'
// import { useGuardHttp } from '../_utils/guardHttp'
// import { useGuardAuthClient } from '../Guard/authClient'
// import { GuardModuleType } from '../Guard/module'
// import { ShieldSpin, Spin } from '../ShieldSpin'
import { BindSuccess } from './core/bindSuccess'
import { SecurityCode } from './core/securityCode'
// import { GuardBindTotpInitData } from './interface'
// import { useTranslation } from 'react-i18next'
import './styles.less'
import { IAuthingPublicConfig, IMFAInitData } from '../../types'
// import axios from 'axios'
import { GuardDownloadATView } from '../DownloadAuthenticator'
// import {
//   useGuardEvents,
//   useGuardInitData,
//   useGuardIsAuthFlow,
//   useGuardModule,
// } from '../_utils/context'
// import { MFAType } from '../MFA/interface'
// import { BackCustom } from '../Back'

// import { useGuardView } from '../Guard/core/hooks/useGuardView'

const { useEffect, useState, useMemo } = React

// enum BindTotpType {
//   SECURITY_CODE = 'securityCode',
//   BIND_SUCCESS = 'bindSuccess',
// }

type BindTotpType = 'securityCode' | 'bindSuccess' | 'downloadAuthenticator'

interface GuardBindTotpProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
}

export const GuardBindTotpView: React.FC<GuardBindTotpProps> = ({
  initData,
  authingPublicConfig
}) => {
  // const initData = useGuardInitData<GuardBindTotpInitData>()

  // const events = useGuardEvents()

  // const { changeModule } = useGuardModule()

  // const { get, post } = useGuardHttp()

  // const isAuthFlow = useGuardIsAuthFlow()

  // useGuardView()

  // const { t } = useTranslation()

  const [secret, setSecret] = useState('')

  const [qrcode, setQrcode] = useState('')

  // const [user, setUser] = useState<User>()

  const [bindTotpType, setBindTotpType] = useState<BindTotpType>('securityCode')

  // const authClient = useGuardAuthClient()

  const [bindInfo, fetchBindInfo] = useAsyncFn(async () => {
    // const query = {
    //   source: 'APPLICATION',
    // }
    // const config = {
    //   headers: {
    //     authorization: initData.mfaToken
    //   }
    // }

    try {
      // const data = await axios.get<any>(
      //   `/api/v2/mfa/authenticator?source=APPLICATION`,
      //   config
      // )
      // console.log("data: ", data);
      // if (code === ErrorCode.LOGIN_INVALID) {
      //   message.error(msg)
      //   changeModule?.(GuardModuleType.LOGIN, {})
      //   return
      // }
    } catch (error: any) {
      message.error(error?.message)
    }

    // try {
    //   const { data, code, onGuardHandling } = await post<any>(
    //     '/api/v2/mfa/totp/associate',
    //     query,
    //     config
    //   )
    //   if (code === 200) {
    //     setSecret(data.recovery_code)
    //     setQrcode(data.qrcode_data_url)
    //   } else {
    //     onGuardHandling?.()
    //   }
    // } catch (error: any) {
    //   message.error(error?.message)
    // }
    setQrcode(
      'data:image/png;base64,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'
    )
    setSecret('0510-1303-8acc-72f0-badc-5972')
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

  // const renderBack = useMemo(() => {
  //   const onBack = () => {
  //     changeModule?.(GuardModuleType.MFA, {
  //       ...initData,
  //       current: MFAType.TOTP,
  //     })
  //   }

  //   return <BackCustom onBack={onBack}>{t('common.backToVerify')}</BackCustom>
  // }, [changeModule, initData, t])

  return (
    <>
      {bindInfo.loading ? (
        <Spin />
      ) : (
        <div className="g2-view-container g2-bind-totp">
          {/* {renderBack} */}
          <div className="g2-mfa-content g2-mfa-bindTotp">
            {bindInfo.loading
              ? 'loading'
              : renderContent[bindTotpType]({
                mfaToken: initData.mfaToken,
                qrcode,
                secret,
                onBind,
                onNext
                // changeModule: changeModule,
              })}
          </div>
        </div>
      )}
    </>
  )
}
