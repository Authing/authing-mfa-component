import { Form, Checkbox, Typography } from 'shim-antd'
import { React } from 'shim-react'
// import { useTranslation } from 'react-i18next'
import { i18n } from '../../../locales'
import { SubmitButton } from '../../SubmitButton'
// import { useGuardIsAuthFlow } from '../../_utils/context'
// import { authFlow, BindTotpBusinessAction } from '../businessRequest'

const { Paragraph } = Typography

export interface BindSuccessProps {
  onBind: any
  secret: string
}

const { useRef } = React

export const BindSuccess: React.FC<BindSuccessProps> = ({ secret, onBind }) => {
  // const [isSaved, setIsSaved] = useState(false)
  const submitButtonRef = useRef<any>(null)

  const [form] = Form.useForm()

  // const { t } = useTranslation()

  // const isAuthFlow = useGuardIsAuthFlow()

  const bindSuccess = async () => {
    submitButtonRef.current?.onSpin(true)

    await form.validateFields()

    console.log('onBind', onBind)

    //   if (isAuthFlow) {
    //     const { data, isFlowEnd, onGuardHandling } = await authFlow(
    //       BindTotpBusinessAction.ConfirmTotpRecoveryCode,
    //       {}
    //     )
    //     submitButtonRef.current?.onSpin(false)
    //     if (isFlowEnd) {
    //       onBind(data)
    //     } else {
    //       // TODO 需要 onError 抖动吗 当 from 表单校验通过的时候 onError 是没有意义的
    //       submitButtonRef.current?.onError()
    //       onGuardHandling?.()
    //     }
    //   } else {
    //     submitButtonRef.current?.onSpin(false)
    //     onBind()
    //   }
  }

  return (
    <>
      <p className="authing-mfa-title">{i18n.t('mfa.totpText1')}</p>
      <p className="authing-mfa-tips">{i18n.t('mfa.totpText2')}</p>

      <div className="g2-mfa-bindTotp-copySecret">
        <Paragraph copyable>{secret}</Paragraph>
      </div>

      <Form
        form={form}
        onFinish={bindSuccess}
        style={{ width: '100%' }}
        onFinishFailed={() => submitButtonRef.current?.onError()}
      >
        <Form.Item
          className="authing-g2-input-form g2-mfa-totp-verify-input"
          name="remember"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject()
                }
                return Promise.resolve()
              }
            }
          ]}
          valuePropName="checked"
        >
          <Checkbox className="g2-mfa-bindTotp-secretSave">
            {i18n.t('mfa.rememberedSecret')}
          </Checkbox>
        </Form.Item>

        <SubmitButton text={i18n.t('mfa.bindSuccess')} ref={submitButtonRef} />
      </Form>
    </>
  )
}
