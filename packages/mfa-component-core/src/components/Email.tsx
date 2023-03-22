import { React } from 'shim-react'

import { Input, message, Form } from 'shim-antd'

import { IAuthingFunc, IAuthingMFATriggerData, IAuthingPublicConfig } from '../types'

import { IconFont } from '../IconFont'

import { CustomFormItem } from './ValidatorRules'

import { i18n } from '../locales'

import { SubmitButton } from './SubmitButton'

import { mailDesensitization } from '../helpers'

import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'

import { SendCodeBtn } from './SendCode'

import { sendEmail, verifyEmail } from '../apis'

import { useAuthingMFAContext } from '../contexts'

import { loopFunc } from '../helpers'

const { useState, useRef } = React

interface IEmailProps {
  mfaTriggerData: IAuthingMFATriggerData
  publicConfig: IAuthingPublicConfig
}

export function Email(props: IEmailProps) {
  const { mfaTriggerData, publicConfig } = props

  const { mfaEmail } = mfaTriggerData

  const [email, setEmail] = useState<string | undefined>(mfaEmail)

  const sendCodeRef = useRef<HTMLButtonElement>(null)

  const codeLength = publicConfig.verifyCodeLength

  if (email) {
    return (
      <VerifyMFAEmail
        mfaTriggerData={mfaTriggerData}
        email={email}
        sendCodeRef={sendCodeRef}
        codeLength={codeLength ?? 4}
      ></VerifyMFAEmail>
    )
  }

  return (
    <BindMFAEmail
      mfaTriggerData={mfaTriggerData}
      onBind={(email: string) => {
        setEmail(email)
        sendCodeRef.current?.click()
      }}
      publicConfig={publicConfig}
    ></BindMFAEmail>
  )
}

interface BindMFAEmailProps {
  mfaTriggerData: IAuthingMFATriggerData
  onBind: (email: string) => void
  publicConfig: IAuthingPublicConfig
}

function BindMFAEmail(props: BindMFAEmailProps) {
  const { onBind, mfaTriggerData, publicConfig } = props

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
          mfaTriggerData={mfaTriggerData}
          publicConfig={publicConfig}
        >
          <Input
            className="authing-mfa-input"
            autoComplete="off"
            size="large"
            placeholder={i18n.t('mfa.inputEmail') as string}
            prefix={<IconFont type="authing-a-mail-line3" style={{ color: '#878A95' }} />}
          />
        </CustomFormItem.Email>

        <SubmitButton text={i18n.t('mfa.sure') as string} ref={submitButtonRef} />
      </Form>
    </>
  )
}

interface VerifyMFAEmailProps {
  mfaTriggerData: IAuthingMFATriggerData
  email: string
  codeLength: number
  sendCodeRef: React.RefObject<HTMLButtonElement>
}

function VerifyMFAEmail(props: VerifyMFAEmailProps) {
  const { mfaTriggerData, email, codeLength, sendCodeRef } = props

  const authingMFAContext = useAuthingMFAContext()

  const { mfaToken } = mfaTriggerData

  const submitButtonRef = useRef<any>(null)

  const [form] = Form.useForm()

  const [sent, setSent] = useState(false)

  const sendVerifyCode = async () => {
    const res = await sendEmail({
      email
    })
    setSent(res)
    return res
  }

  const onFinish = async () => {
    submitButtonRef.current?.onSpin(true)

    const mfaCode = form.getFieldValue('mfaCode')

    const {
      code,
      data,
      message: tips
    } = await verifyEmail({
      mfaToken,
      email: email,
      code: mfaCode.join('')
    })

    submitButtonRef.current?.onSpin(false)

    if (code === 200 && data) {
      return loopFunc(authingMFAContext?.events.onSuccess as IAuthingFunc, code, data)
    }

    return loopFunc(authingMFAContext?.events.onFail as IAuthingFunc, tips)
  }

  return (
    <>
      <p className="authing-mfa-title">{i18n.t('mfa.mfaCertification')}</p>
      <p className="authing-mfa-tips">
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
          text={i18n.t('mfa.sure') as string}
          ref={submitButtonRef}
          className="g2-mfa-submit-button"
        />
      </Form>
    </>
  )
}
