import { React } from 'shim-react'
import { Typography, Form, Checkbox } from 'shim-antd'
import { SubmitButton } from '../../SubmitButton'
import { i18n } from '../../../locales'

const { Paragraph } = Typography
const { useRef } = React

export const SaveCode: React.FC<{
  secret: string
  onBind: any
}> = props => {
  const { secret, onBind } = props

  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const bindSuccess = async () => {
    submitButtonRef.current?.onSpin(true)

    try {
      await form.validateFields()
      onBind()
    } catch (e: any) {
      submitButtonRef.current?.onError()
    } finally {
      submitButtonRef.current?.onSpin(false)
    }
  }

  return (
    <>
      <p className="authing-g2-mfa-title">{i18n.t('mfa.useRecoverCode')}</p>
      <p className="authing-g2-mfa-tips">{i18n.t('mfa.totpGenerateCode')}</p>

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
          className="authing-g2-input-form g2-mfa-totp-recoveryCode-input"
          name="remember"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject(i18n.t('mfa.pleaseRecordKey'))
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

        <SubmitButton text={i18n.t('mfa.confirm')} ref={submitButtonRef} />
      </Form>
    </>
  )
}
