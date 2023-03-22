import { React } from 'shim-react'

import { FormItemProps } from 'shim-antd/lib/form'

import { Form } from 'shim-antd'

import { i18n } from '../../locales'

import './style.less'

export interface VerifyCodeFormItemProps extends FormItemProps {
  codeLength: number
  ruleKeyword: string
}

export const VerifyCodeFormItem: React.FC<VerifyCodeFormItemProps> = props => {
  const { t } = i18n
  const { codeLength, ruleKeyword = t('mfa.captchaCode'), ...formItemProps } = props
  return (
    <Form.Item
      validateTrigger={['onChange']}
      name="mfaCode"
      className="g2-mfa-totp-verify-input"
      validateFirst={true}
      rules={[
        {
          type: 'array',
          validateTrigger: ['onChange'],
          message: t('mfa.isMissing', {
            name: ruleKeyword
          }) as string,
          required: true
        },
        {
          type: 'array',
          validateTrigger: [''],
          message: t('mfa.fullCaptchaCode', {
            name: ruleKeyword
          }) as string,
          min: codeLength
        }
      ]}
      {...formItemProps}
    />
  )
}
