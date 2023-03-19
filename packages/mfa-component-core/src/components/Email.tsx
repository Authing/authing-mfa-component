import { React } from 'shim-react'

import { Input, message, Form } from 'shim-antd'

import { IMFAInitData, IAuthingPublicConfig, IOnMFAVerify } from '../types'

import { IconFont } from '../IconFont'

import { CustomFormItem } from './ValidatorRules'

import { i18n } from '../locales'

import { SubmitButton } from './SubmitButton'

import { mailDesensitization } from '../helpers'

import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'

import { SendCodeBtn } from './SendCode'

const { useState, useRef } = React

interface IEmailProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
}

export function Email(props: IEmailProps) {
  const { initData, authingPublicConfig, onVerify } = props

  const { mfaEmail } = initData

  const [email, setEmail] = useState<string | undefined>(mfaEmail)

  const sendCodeRef = useRef<HTMLButtonElement>(null)

  const codeLength = authingPublicConfig.verifyCodeLength

  if (email) {
    return (
      <VerifyMFAEmail
        initData={initData}
        email={email}
        onVerify={(code: number, data: any) => {
          onVerify(code, data)
        }}
        sendCodeRef={sendCodeRef}
        codeLength={codeLength ?? 4}
      ></VerifyMFAEmail>
    )
  }

  return (
    <BindMFAEmail
      initData={initData}
      onBind={(email: string) => {
        setEmail(email)
        sendCodeRef.current?.click()
      }}
      authingPublicConfig={authingPublicConfig}
    ></BindMFAEmail>
  )
}

interface BindMFAEmailProps {
  initData: IMFAInitData
  onBind: (email: string) => void
  authingPublicConfig: IAuthingPublicConfig
}

function BindMFAEmail(props: BindMFAEmailProps) {
  const { onBind, initData, authingPublicConfig } = props

  const { useRef } = React

  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const onFinish = async ({ email }: any) => {
    await form.validateFields()

    submitButtonRef.current?.onSpin(false)

    try {
      onBind(email)
    } catch (e: any) {
      const error = JSON.parse(e?.message)
      submitButtonRef.current.onError()
      message.error(error.message)
    }
  }

  return (
    <>
      <p className="authing-mfa-title">{i18n.t('mfa.mfaCertification')}</p>
      <p className="authing-mfa-tips">{i18n.t('mfa.bindEmailDoc')}</p>
      <Form
        form={form}
        onSubmitCapture={() => submitButtonRef.current.onSpin(true)}
        onFinish={onFinish}
        onFinishFailed={() => submitButtonRef.current.onError()}
      >
        <CustomFormItem.Email
          className="authing-mfa-input-form"
          name="email"
          form={form}
          required={true}
          initData={initData}
          authingPublicConfig={authingPublicConfig}
        >
          <Input
            className="authing-mfa-input"
            autoComplete="off"
            size="large"
            placeholder={i18n.t('mfa.inputEmail')}
            prefix={<IconFont type="authing-a-mail-line3" style={{ color: '#878A95' }} />}
          />
        </CustomFormItem.Email>

        <SubmitButton text={i18n.t('mfa.sure')} ref={submitButtonRef} />
      </Form>
    </>
  )
}

interface VerifyMFAEmailProps {
  initData: IMFAInitData
  email: string
  onVerify: (code: number, data: any) => void
  codeLength: number
  sendCodeRef: React.RefObject<HTMLButtonElement>
}

function VerifyMFAEmail(props: VerifyMFAEmailProps) {
  const { initData, email, onVerify, codeLength, sendCodeRef } = props

  const { mfaToken } = initData

  console.log(onVerify, mfaToken)

  const submitButtonRef = useRef<any>(null)

  const [form] = Form.useForm()

  const [sent, setSent] = useState(false)

  const sendVerifyCode = async () => {
    return true
  }

  const onFinish = async () => {
    submitButtonRef.current?.onSpin(true)

    const mfaCode = form.getFieldValue('mfaCode')

    console.log('mfaCode: ', mfaCode)

    submitButtonRef.current?.onSpin(false)
  }

  return (
    <>
      <p className="authing-g2-mfa-title">{i18n.t('mfa.mfaCertification')}</p>
      <p className="authing-g2-mfa-tips">
        {sent
          ? `${i18n.t('mfa.verifyCodeSended')} ${mailDesensitization(email)}`
          : i18n.t('mfa.emailMfaCheck')}
      </p>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={() => submitButtonRef.current?.onError()}
      >
        <VerifyCodeFormItem codeLength={codeLength} ruleKeyword={i18n.t('mfa.captchaCode')}>
          <VerifyCodeInput length={codeLength} onFinish={onFinish} />
        </VerifyCodeFormItem>

        <SendCodeBtn
          btnRef={sendCodeRef}
          setSent={setSent}
          beforeSend={() => sendVerifyCode()}
          type="link"
        />

        <SubmitButton
          text={i18n.t('mfa.sure')}
          ref={submitButtonRef}
          className="g2-mfa-submit-button"
        />
      </Form>
    </>
  )
}
