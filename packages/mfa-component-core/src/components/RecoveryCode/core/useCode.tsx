import { React } from 'shim-react'

import { Input, Form } from 'shim-antd'

import { IconFont } from '../../../IconFont'

import { SubmitButton } from '../../SubmitButton'

import { i18n } from '../../../locales'

const { useRef } = React

export interface UseCodeProps {
  mfaToken: string
  onSubmit: (recoveryCode: string, user?: any) => void
}

export const UseCode: React.FC<UseCodeProps> = () => {
  const [form] = Form.useForm()

  const submitButtonRef = useRef<any>(null)

  const onFinish = async (values: any) => {
    console.log('values: ', values)

    submitButtonRef.current?.onSpin(true)
    try {
    } catch (error) {
      submitButtonRef.current?.onError()
    } finally {
      submitButtonRef.current?.onSpin(false)
    }
  }

  return (
    <>
      <p className="authing-mfa-title">{i18n.t('mfa.useRecoverCode')}</p>
      <p className="authing-mfa-tips">{i18n.t('mfa.mfaAfterReset')}</p>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={() => submitButtonRef.current.onError()}
      >
        <Form.Item
          validateTrigger={['onBlur', 'onChange']}
          className="authing-mfa-input-form"
          name="recoveryCode"
          rules={[
            {
              required: true,
              message: i18n.t('mfa.inputRecoverCode')
            }
          ]}
        >
          <Input
            className="authing-mfa-input"
            autoComplete="off"
            size="large"
            placeholder={i18n.t('mfa.inputRecoverCode')}
            prefix={<IconFont type="authing-a-lock-line1" style={{ color: '#878A95' }} />}
          />
        </Form.Item>

        <Form.Item className="authing-g2-sumbit-form submit-form">
          <SubmitButton text={i18n.t('mfa.sure')} ref={submitButtonRef} />
        </Form.Item>
      </Form>
    </>
  )
}
