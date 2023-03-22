import { Form, Checkbox, Typography } from 'shim-antd'

import { React } from 'shim-react'

import { i18n } from '../../../locales'

import { SubmitButton } from '../../SubmitButton'

const { Paragraph } = Typography

interface BindSuccessProps {
  onBind: any
  secret: string
}

const { useRef } = React

export const BindSuccess: React.FC<BindSuccessProps> = ({ secret, onBind }) => {
  const submitButtonRef = useRef<any>(null)

  const [form] = Form.useForm()

  const bindSuccess = async () => {
    submitButtonRef.current?.onSpin(true)
    await form.validateFields()
    submitButtonRef.current?.onSpin(false)
    onBind()
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

        <SubmitButton text={i18n.t('mfa.bindSuccess') as string} ref={submitButtonRef} />
      </Form>
    </>
  )
}
