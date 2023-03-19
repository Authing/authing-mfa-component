import { React } from 'shim-react'

import { Form } from 'shim-antd'

import { IMFAInitData, IAuthingPublicConfig, IOnMFAVerify } from '../types'

import { i18n } from '../locales'

import { IconFont } from '../IconFont'

import { CustomFormItem } from './ValidatorRules'

import { SubmitButton } from './SubmitButton'

import { InputNumber } from './InputNumber'

import { InputInternationPhone } from './InputInternationPhone'

import { parsePhone, phoneDesensitization } from '../helpers'

import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'

import { SendCodeBtn } from './SendCode'

const { useState, useRef, useCallback, useMemo } = React

interface SMSProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
}

export function SMS(props: SMSProps) {
  const { initData, authingPublicConfig, onVerify } = props

  const { mfaPhone } = initData

  const [phone, setPhone] = useState<string | undefined>(mfaPhone)

  const sendCodeRef = useRef<HTMLButtonElement>(null)

  const [areaCode, setAreaCode] = useState(
    authingPublicConfig.internationalSmsConfig?.defaultISOType || 'CN'
  )

  const isInternationSms = Boolean(authingPublicConfig.internationalSmsConfig?.enabled)

  if (phone) {
    return (
      <VerifyMFASms
        phone={phone}
        isInternationSms={isInternationSms}
        onVerify={(code: number, data: any) => {
          onVerify(code, data)
        }}
        authingPublicConfig={authingPublicConfig}
        sendCodeRef={sendCodeRef}
        initData={initData}
        areaCode={areaCode}
      />
    )
  }

  return (
    <BindMFASms
      authingPublicConfig={authingPublicConfig}
      initData={initData}
      areaCode={areaCode}
      setAreaCode={setAreaCode}
      isInternationSms={isInternationSms}
      onBind={(phone: string) => {
        setPhone(phone)
        sendCodeRef.current?.click()
      }}
    />
  )
}

interface BindMFASmsProps {
  authingPublicConfig: IAuthingPublicConfig
  initData: IMFAInitData
  areaCode: string
  setAreaCode: (areaCode: string) => void
  isInternationSms: boolean
  onBind: (phone: string) => void
}

function BindMFASms(props: BindMFASmsProps) {
  const { onBind, isInternationSms, areaCode, setAreaCode, initData, authingPublicConfig } = props

  const submitButtonRef = useRef<any>(null)

  const { t } = i18n

  const [form] = Form.useForm()

  const onFinish = async ({ phone }: any) => {
    await form.validateFields()
    submitButtonRef.current?.onSpin(false)
    try {
      onBind(phone)
    } catch (e) {
      submitButtonRef.current?.onError()
    }
  }

  const PhoneAccount = useCallback(
    (props: any) => {
      if (isInternationSms) {
        return (
          <InputInternationPhone
            {...props}
            className="authing-mfa-input"
            size="large"
            areaCode={areaCode}
            onAreaCodeChange={(value: string) => {
              setAreaCode(value)
              form.getFieldValue(['phone']) && form.validateFields(['phone'])
            }}
            maxLength={20}
          />
        )
      } else {
        return (
          <InputNumber
            {...props}
            className="authing-mfa-input"
            autoComplete="off"
            size="large"
            placeholder={t('mfa.inputPhone')}
            prefix={<IconFont type="authing-a-smartphone-line1" style={{ color: '#878A95' }} />}
            maxLength={20}
          />
        )
      }
    },
    [areaCode, form, isInternationSms, setAreaCode, t]
  )

  return (
    <>
      <h3 className="authing-mfa-title">{t('mfa.mfaCertification')}</h3>
      <p className="authing-mfa-tips">{t('mfa.bindPhoneInfo')}</p>
      <Form
        form={form}
        onSubmitCapture={() => submitButtonRef.current.onSpin(true)}
        onFinish={onFinish}
        onFinishFailed={() => submitButtonRef.current.onError()}
      >
        <CustomFormItem.Phone
          className={
            isInternationSms ? 'authing-mfa-input-form remove-padding' : 'authing-mfa-input-form'
          }
          name="phone"
          form={form}
          required={true}
          areaCode={areaCode}
          initData={initData}
          authingPublicConfig={authingPublicConfig}
        >
          <PhoneAccount />
        </CustomFormItem.Phone>
        <SubmitButton text={t('mfa.sure')} ref={submitButtonRef} />
      </Form>
    </>
  )
}

interface VerifyMFASmsProps {
  phone: string
  isInternationSms: boolean
  onVerify: (code: number, data: any) => void
  authingPublicConfig: IAuthingPublicConfig
  sendCodeRef: React.RefObject<HTMLButtonElement>
  initData: IMFAInitData
  areaCode: string
}

function VerifyMFASms(props: VerifyMFASmsProps) {
  const { isInternationSms, initData, areaCode, phone, authingPublicConfig, sendCodeRef } = props

  const { phoneCountryCode } = initData

  const submitButtonRef = useRef<any>(null)

  const { t } = i18n

  const [form] = Form.useForm()

  const [sent, setSent] = useState<boolean>(false)

  const { phoneNumber, countryCode } = parsePhone(isInternationSms, phone, areaCode)

  const codeLength = authingPublicConfig.verifyCodeLength || 4

  console.log('phoneNumber: ', phoneNumber)

  const onFinish = async () => {
    console.log('sms onfinish')
  }

  const tips = useMemo(() => {
    if (sent) {
      return `${t('mfa.verifyCodeSended')} ${
        isInternationSms ? (phoneCountryCode ? phoneCountryCode : countryCode) : ''
      } ${phoneDesensitization(phone)}`
    }
    return t('mfa.SmsMfaCheck')
  }, [countryCode, isInternationSms, phone, phoneCountryCode, sent, t])

  const sendVerifyCode = async () => {
    return true
  }

  return (
    <>
      <h3 className="authing-mfa-title">{t('mfa.mfaCertification')}</h3>
      <p className="authing-mfa-tips">{tips}</p>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={() => submitButtonRef.current.onError()}
      >
        <VerifyCodeFormItem codeLength={codeLength} ruleKeyword={t('mfa.captchaCode')}>
          <VerifyCodeInput length={codeLength} onFinish={onFinish} />
        </VerifyCodeFormItem>

        <SendCodeBtn
          btnRef={sendCodeRef}
          beforeSend={() => sendVerifyCode()}
          type="link"
          setSent={setSent}
        />

        <SubmitButton text={t('mfa.sure')} ref={submitButtonRef} className="g2-mfa-submit-button" />
      </Form>
    </>
  )
}
