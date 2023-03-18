import { React } from 'shim-react'
import { Form } from 'shim-antd'
import { IMFAInitData, IAuthingPublicConfig, IOnMFAVerify, MFAType, MFAVerifyPage } from '../types'
import { i18n } from '../locales'
import { useAsyncFn } from 'react-use'
import { SubmitButton } from './SubmitButton'
import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'
import { MFAButton } from './MFAButton'

const { useRef } = React

interface IOTPProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
  onChange?: (type: MFAType | MFAVerifyPage) => void
}

export function OTP(props: IOTPProps) {
  const { initData, onChange, setMFASelectorVisible } = props

  const { mfaToken } = initData

  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const [, onFinish] = useAsyncFn(async () => {
    submitButtonRef.current?.onSpin(true)

    const mfaCode = form.getFieldValue('mfaCode')

    console.log('mfaCode: ', mfaCode)

    submitButtonRef.current?.onSpin(false)
  }, [mfaToken])
  return (
    <>
      <p className="authing-g2-mfa-title">{i18n.t('mfa.mfaCertification')}</p>
      <p className="authing-g2-mfa-tips">{i18n.t('mfa.inputSixCode')}</p>

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
              onChange?.('RECOVERY')
              setMFASelectorVisible(false)
            }}
          >
            {i18n.t('mfa.useRecoverCode')}
          </MFAButton>
        </p>
      </Form>
    </>
  )
}
