import { React } from 'shim-react'

import { Form } from 'shim-antd'

import { IAuthingFunc, IAuthingMFATriggerData, IAuthingPublicConfig } from '../types'

import { i18n } from '../locales'

import { IconFont } from '../IconFont'

import { CustomFormItem } from './ValidatorRules'

import { SubmitButton } from './SubmitButton'

import { InputNumber } from './InputNumber'

import { InputInternationPhone } from './InputInternationPhone'

import { parsePhone, phoneDesensitization } from '../helpers'

import { VerifyCodeInput, VerifyCodeFormItem } from './VerifyCode'

import { SendCodeBtn } from './SendCode'

import { sendSMS, verifySms } from '../apis'

import { useAuthingMFAContext } from '../contexts'

import { loopFunc } from '../helpers'

const { useState, useRef, useCallback, useMemo } = React

interface SMSProps {
  mfaTriggerData: IAuthingMFATriggerData
  publicConfig: IAuthingPublicConfig
}

export function SMS(props: SMSProps) {
  const { mfaTriggerData, publicConfig } = props

  const { mfaPhone } = mfaTriggerData

  const [phone, setPhone] = useState<string | undefined>(mfaPhone)

  const sendCodeRef = useRef<HTMLButtonElement>(null)

  const [areaCode, setAreaCode] = useState(
    publicConfig.internationalSmsConfig?.defaultISOType || 'CN'
  )

  const isInternationSms = Boolean(publicConfig.internationalSmsConfig?.enabled)

  if (phone) {
    return (
      <VerifyMFASms
        phone={phone}
        isInternationSms={isInternationSms}
        publicConfig={publicConfig}
        sendCodeRef={sendCodeRef}
        mfaTriggerData={mfaTriggerData}
        areaCode={areaCode}
      />
    )
  }

  return (
    <BindMFASms
      publicConfig={publicConfig}
      mfaTriggerData={mfaTriggerData}
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
  publicConfig: IAuthingPublicConfig
  mfaTriggerData: IAuthingMFATriggerData
  areaCode: string
  setAreaCode: (areaCode: string) => void
  isInternationSms: boolean
  onBind: (phone: string) => void
}

function BindMFASms(props: BindMFASmsProps) {
  const { onBind, isInternationSms, areaCode, setAreaCode, mfaTriggerData, publicConfig } = props

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
          mfaTriggerData={mfaTriggerData}
          publicConfig={publicConfig}
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
  publicConfig: IAuthingPublicConfig
  sendCodeRef: React.RefObject<HTMLButtonElement>
  mfaTriggerData: IAuthingMFATriggerData
  areaCode: string
}

function VerifyMFASms(props: VerifyMFASmsProps) {
  const { isInternationSms, mfaTriggerData, areaCode, phone, publicConfig, sendCodeRef } = props

  const authingMFAContext = useAuthingMFAContext()

  const { phoneCountryCode } = mfaTriggerData

  const submitButtonRef = useRef<any>(null)

  const { t } = i18n

  const [form] = Form.useForm()

  const [sent, setSent] = useState<boolean>(false)

  const { phoneNumber, countryCode } = parsePhone(isInternationSms, phone, areaCode)

  const codeLength = publicConfig.verifyCodeLength || 4

  const onFinish = async () => {
    submitButtonRef.current?.onSpin(true)

    const mfaCode = form.getFieldValue('mfaCode')

    const requestData: any = {
      mfaToken: mfaTriggerData.mfaToken,
      phone: phone!,
      code: mfaCode.join(''),
      phoneCountryCode: phoneCountryCode || countryCode
    }

    const { code, data, message: tips } = await verifySms(requestData)

    submitButtonRef.current?.onSpin(false)

    if (code === 200 && data) {
      return loopFunc(authingMFAContext?.events.onSuccess as IAuthingFunc, code, data)
    }

    return loopFunc(authingMFAContext?.events.onFail as IAuthingFunc, tips)
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
    const res = await sendSMS({
      phoneNumber: phone || phoneNumber,
      phoneCountryCode: phoneCountryCode || countryCode
    })
    return res
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
