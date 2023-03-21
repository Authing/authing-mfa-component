import { Form } from 'shim-antd'

import { React } from 'shim-react'

import { i18n } from '../../../locales'

import { useAsyncFn } from 'react-use'

import { SubmitButton } from '../../SubmitButton'

import { VerifyCodeFormItem, VerifyCodeInput } from '../../VerifyCode'

import { ImagePro } from '../../../components/ImagePro'

import { confirmOtp } from '../../../apis'
export interface SecurityCodeProps {
  mfaToken: string
  qrcode: string
  onConfirmOTP: any
  onDownload: any
}

const { useRef } = React

export const SecurityCode: React.FC<SecurityCodeProps> = ({
  mfaToken,
  qrcode,
  onConfirmOTP,
  onDownload
}) => {
  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const [, bindTotp] = useAsyncFn(async () => {
    submitButtonRef.current?.onSpin(true)

    await form.validateFields()

    const saftyCode = form.getFieldValue('saftyCode')

    try {
      const { code, data } = await confirmOtp({
        authenticator_type: 'totp',
        totp: saftyCode.join(''),
        source: 'APPLICATION',
        mfaToken
      })
      if (code === 200) {
        onConfirmOTP(data)
      } else {
        submitButtonRef.current?.onError()
      }
    } catch (e) {
      submitButtonRef.current?.onError()
    } finally {
      submitButtonRef.current?.onSpin(false)
    }
  }, [mfaToken])

  return (
    <>
      <p className="authing-mfa-title">{i18n.t('mfa.mfaBind')}</p>
      <p
        className="authing-mfa-tips"
        style={{
          textAlign: 'left'
        }}
      >
        {i18n.t('mfa.usePhoneOpen')}（{i18n.t('mfa.noValidator')}{' '}
        <span
          style={{
            color: '#215AE5',
            cursor: 'pointer'
          }}
          onClick={onDownload}
        >
          {i18n.t('mfa.clickTodownload')}
        </span>
        ） {i18n.t('mfa.mfaText1')}
      </p>
      <ImagePro className="g2-mfa-bindTotp-qrcode" src={qrcode} alt="qrcode" />
      <Form
        className="g2-mfa-bindTotp-securityCode-form"
        form={form}
        onSubmitCapture={() => {
          bindTotp()
        }}
        onFinish={bindTotp}
        onFinishFailed={() => {
          submitButtonRef.current.onError()
        }}
      >
        <VerifyCodeFormItem
          codeLength={6}
          name="saftyCode"
          ruleKeyword={i18n.t('mfa.numberSafteyCode')}
        >
          <VerifyCodeInput length={6} showDivider={false} gutter={'10px'} onFinish={bindTotp} />
        </VerifyCodeFormItem>

        <SubmitButton text={i18n.t('mfa.nextStep')} ref={submitButtonRef} />
      </Form>
    </>
  )
}
