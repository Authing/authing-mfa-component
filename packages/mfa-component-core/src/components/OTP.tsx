import { React } from 'shim-react'

import { Form } from 'shim-antd'

import { IAuthingMFATriggerData, IAuthingPublicConfig } from '../types'

import { i18n } from '../locales'

import { useAsyncFn } from 'react-use'

import { SubmitButton } from './SubmitButton'

import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'

import { MFAButton } from './MFAButton'

import { AuthingMFARecoveryCodeView } from './RecoveryCode'

import { IconFont } from '../IconFont'

import { AuthingMFABindTotpView } from './BindTotp'

import { BackCustom } from './Back'

import { verifyTotp } from '../apis'

import { useAuthingMFAContext } from '../contexts'

const { useRef, useState, useEffect, useMemo } = React

interface OTPProps {
  mfaTriggerData: IAuthingMFATriggerData
  publicConfig: IAuthingPublicConfig
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  updateBackComponent: (component: React.ReactNode) => void
}

export type BackType = 'mfa' | 'verify'

export function OTP(props: OTPProps) {
  const { mfaTriggerData } = props

  if (mfaTriggerData.totpMfaEnabled) {
    return <VerifyMFAOtp {...props} />
  }

  return <BindMFATotp {...props} />
}

function BindMFATotp(props: OTPProps) {
  const { mfaTriggerData, publicConfig, updateBackComponent, setMFASelectorVisible } = props

  const [isMFAPage, setIsMFAPage] = useState(true)

  const bindRef = useRef<{ update: () => void }>(null)

  const MFACustomBack = useMemo(() => {
    return (
      <BackCustom
        onBack={() => {
          updateBackComponent(null)
          setMFASelectorVisible(true)
          setIsMFAPage(true)
        }}
      >
        {i18n.t('mfa.backToVerify')}
      </BackCustom>
    )
  }, [])

  const VerifyCustomBack = useMemo(() => {
    return (
      <BackCustom
        onBack={() => {
          updateBackComponent(MFACustomBack)
          // 修改绑定页状态
          bindRef?.current?.update()
        }}
      >
        {i18n.t('mfa.backToMFA')}
      </BackCustom>
    )
  }, [])

  const resetBackType = (type: BackType) => {
    // 返回 mfa 页面或绑定页面
    if (type === 'mfa') {
      updateBackComponent(MFACustomBack)
    } else {
      updateBackComponent(VerifyCustomBack)
    }
  }

  useEffect(() => {
    return () => {
      updateBackComponent(null)
    }
  }, [])

  if (isMFAPage) {
    return (
      <>
        <p className="authing-mfa-title">{i18n.t('mfa.mfaCertification')}</p>

        <p className="authing-mfa-tips">{i18n.t('mfa.otpText1')}</p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconFont type="authing-otp" style={{ width: 247, height: 131 }} />
        </div>

        <SubmitButton
          text={i18n.t('mfa.sure')}
          onClick={() => {
            updateBackComponent(MFACustomBack)
            setMFASelectorVisible(false)
            setIsMFAPage(false)
          }}
          className="g2-mfa-submit-button bind-totp"
        />
      </>
    )
  }

  return (
    <AuthingMFABindTotpView
      mfaTriggerData={mfaTriggerData}
      publicConfig={publicConfig}
      resetBackType={resetBackType}
      ref={bindRef}
    />
  )
}

function VerifyMFAOtp(props: OTPProps) {
  const { mfaTriggerData, setMFASelectorVisible, updateBackComponent } = props

  const authingMFAContext = useAuthingMFAContext()

  const { mfaToken } = mfaTriggerData

  const [isMFAPage, setIsMFAPage] = useState(true)

  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const [, onFinish] = useAsyncFn(async () => {
    submitButtonRef.current?.onSpin(true)

    const mfaCode = form.getFieldValue('mfaCode')

    const {
      code,
      data,
      message: tips
    } = await verifyTotp({
      totp: mfaCode.join(''),
      mfaToken
    })

    submitButtonRef.current?.onSpin(false)

    if (code === 200) {
      return authingMFAContext?.events.onSuccess?.(code, data)
    }

    return authingMFAContext?.events.onFail?.(tips)
  }, [mfaToken])

  const CustomBack = useMemo(
    () => (
      <>
        <BackCustom
          onBack={() => {
            updateBackComponent(null)
            setMFASelectorVisible(true)
            setIsMFAPage(true)
          }}
        >
          {i18n.t('mfa.backToVerify')}
        </BackCustom>
      </>
    ),
    []
  )

  useEffect(() => {
    return () => {
      updateBackComponent(null)
    }
  }, [])

  return (
    <>
      {isMFAPage ? (
        <>
          <p className="authing-mfa-title">{i18n.t('mfa.mfaCertification')}</p>
          <p className="authing-mfa-tips">{i18n.t('mfa.inputSixCode')}</p>

          <Form
            form={form}
            onSubmitCapture={() => {
              onFinish()
            }}
            onFinish={onFinish}
            onFinishFailed={() => submitButtonRef.current.onError()}
          >
            <VerifyCodeFormItem codeLength={6} ruleKeyword={i18n.t('mfa.captchaCode')}>
              <VerifyCodeInput length={6} showDivider={false} gutter={'10px'} onFinish={onFinish} />
            </VerifyCodeFormItem>

            <SubmitButton text={i18n.t('mfa.sure')} ref={submitButtonRef} />
            <p className="authing-g2-mfa-totp-recoveryCode">
              {i18n.t('mfa.hasLooseSaftyCode')}
              <MFAButton
                type="link"
                onClick={() => {
                  updateBackComponent(CustomBack)
                  setMFASelectorVisible(false)
                  setIsMFAPage(false)
                }}
              >
                {i18n.t('mfa.useRecoverCode')}
              </MFAButton>
            </p>
          </Form>
        </>
      ) : (
        <AuthingMFARecoveryCodeView mfaTriggerData={mfaTriggerData} />
      )}
    </>
  )
}
