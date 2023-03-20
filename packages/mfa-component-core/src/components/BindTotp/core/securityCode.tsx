import { Form } from 'shim-antd'
import { React } from 'shim-react'
import { i18n } from '../../../locales'
import { useAsyncFn } from 'react-use'
import { SubmitButton } from '../../SubmitButton'
import { VerifyCodeFormItem, VerifyCodeInput } from '../../VerifyCode'
import { ImagePro } from '../../../components/ImagePro'
export interface SecurityCodeProps {
  mfaToken: string
  qrcode: string
  onNext: any
  changeModule: any
  onDownload: any
}

const { useRef } = React

export const SecurityCode: React.FC<SecurityCodeProps> = ({
  mfaToken,
  qrcode,
  onNext,
  // changeModule,
  onDownload
}) => {
  const [form] = Form.useForm()
  const submitButtonRef = useRef<any>(null)

  // 下载认证器
  const onJump = () => {
    onDownload?.()
  }

  const [, bindTotp] = useAsyncFn(async () => {
    submitButtonRef.current?.onSpin(true)

    await form.validateFields()
    // const saftyCode = form.getFieldValue('saftyCode')

    // if (isAuthFlow) {
    //   // 这里绑定成功过返回的是 statusCode
    //   const { statusCode, onGuardHandling } = await authFlow(
    //     BindTotpBusinessAction.VerifyTotpFirstTime,
    //     {
    //       totp: saftyCode.join(''),
    //     }
    //   )
    //   submitButtonRef.current?.onSpin(false)

    //   if (statusCode === 200) {
    //     onNext()
    //   } else {
    //     submitButtonRef.current?.onError()
    //     onGuardHandling?.()
    //   }
    // } else {
    //   const { code, data, onGuardHandling } = await post(
    //     '/api/v2/mfa/totp/associate/confirm',
    //     {
    //       authenticator_type: 'totp',
    //       totp: saftyCode.join(''),
    //       source: 'APPLICATION',
    //     },
    //     {
    //       headers: {
    //         authorization: mfaToken,
    //       },
    //     }
    //   )
    //   submitButtonRef.current?.onSpin(false)

    //   if (code === 200) {
    //     onNext(data)
    //   } else {
    //     submitButtonRef.current?.onError()
    //     onGuardHandling?.()
    //   }
    // }
    try {
      submitButtonRef.current?.onSpin(false)
      onNext('')
    } catch (error) {
      submitButtonRef.current?.onError()
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
          onClick={onJump}
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
          console.log('cap')
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
