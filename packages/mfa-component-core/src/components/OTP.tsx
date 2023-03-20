import { React } from 'shim-react'
import { Form } from 'shim-antd'
import { IMFATriggerData, IAuthingPublicConfig, IOnMFAVerify } from '../types'
import { i18n } from '../locales'
import { useAsyncFn } from 'react-use'
import { SubmitButton } from './SubmitButton'
import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'
import { MFAButton } from './MFAButton'
import { GuardRecoveryCodeView } from './RecoveryCode'

const { useRef, useState, useEffect, useMemo } = React

interface IOTPProps {
  mfaTriggerData: IMFATriggerData
  publicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  updateBackComponent: (component: React.ReactNode) => void
}

export function OTP(props: IOTPProps) {
  const { mfaTriggerData, setMFASelectorVisible, updateBackComponent } = props

  const { mfaToken } = mfaTriggerData

  const [isMFAPage, setIsMFAPage] = useState(true)

  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const [, onFinish] = useAsyncFn(async () => {
    submitButtonRef.current?.onSpin(true)

    const mfaCode = form.getFieldValue('mfaCode')

    console.log('mfaCode: ', mfaCode)

    submitButtonRef.current?.onSpin(false)
  }, [mfaToken])

  const CustomBack = useMemo(
    () => (
      <>
        <p
          onClick={() => {
            updateBackComponent(null)
            setMFASelectorVisible(true)
            setIsMFAPage(true)
          }}
        >
          {i18n.t('mfa.backToVerify')}
        </p>
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
              console.log('cap')
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
        <GuardRecoveryCodeView mfaTriggerData={mfaTriggerData} />
      )}
    </>
  )
}
