import { React } from 'shim-react'

import { Form, FormItemProps } from 'shim-antd'

import { fieldRequiredRule, VALIDATE_PATTERN } from '../../helpers'

import { Rule, FormInstance } from 'shim-antd/lib/form'

import { phone } from 'phone'

import { useCheckRepeat } from './useCheckRepeat'

import { i18n } from '../../locales'

import { IAuthingPublicConfig, IMFATriggerData } from '../../types'

interface ValidatorFormItemProps extends FormItemProps {
  checkRepeat?: boolean
  checkExist?: boolean
  validatorType: string
  name: string
  areaCode?: string
  isCheckPattern?: boolean
  publicConfig: IAuthingPublicConfig
  validatorRules?: []
}

function ValidatorFormItem(props: ValidatorFormItemProps) {
  const { useMemo } = React

  const { t } = i18n

  const {
    checkRepeat = false,
    checkExist = false,
    validatorType,
    name,
    required,
    areaCode, //国际化区号
    isCheckPattern = true,
    publicConfig,
    validatorRules = [],
    ...formItemProps
  } = props

  const checkInternationalSms = useMemo(() => {
    return (
      publicConfig.internationalSmsConfig?.enabled && validatorType === 'phone' && isCheckPattern
    )
  }, [isCheckPattern, validatorType, publicConfig.internationalSmsConfig?.enabled])

  const methodContent = useMemo(() => {
    if (validatorType === 'email') {
      return {
        field: t('mfa.emailLabel'),
        checkRepeatErrorMessage: t('mfa.checkEmail'),
        formatErrorMessage: t('mfa.emailFormatError'),
        checkExistErrorMessage: t('mfa.noFindEmail'),
        pattern: VALIDATE_PATTERN.email
      }
    }

    if (validatorType === 'phone') {
      return {
        field: t('mfa.phone'),
        checkRepeatErrorMessage: t('mfa.checkPhone'),
        checkExistErrorMessage: t('mfa.noFindPhone'),
        formatErrorMessage: t('mfa.phoneFormateError'),
        pattern:
          !isCheckPattern && publicConfig.internationalSmsConfig?.enabled
            ? /^[0-9]*$/
            : VALIDATE_PATTERN.phone
      }
    }

    // 自定义字段
    return {
      field: t('mfa.account'),
      checkRepeatErrorMessage: t('mfa.checkCustomName'),
      checkExistErrorMessage: t('mfa.noFindUsername'),
      formatErrorMessage: t('mfa.customNameFormatError'),
      pattern: VALIDATE_PATTERN.username
    }
  }, [isCheckPattern, validatorType, publicConfig.internationalSmsConfig?.enabled, i18n])

  const checkRepeatRet = (
    value: any,
    resolve: (value: unknown) => void,
    reject: (reason?: any) => void
  ) => {
    console.log(value, resolve, reject)
    // get<boolean>('/api/v2/users/find', {
    //   userPoolId: publicConfig?.userPoolId,
    //   key: value,
    //   type: validatorType
    // }).then(({ data }) => {
    //   if (checkExist) {
    //     Boolean(data) ? resolve(true) : reject(methodContent.checkExistErrorMessage)
    //   }
    //   if (checkRepeat) {
    //     Boolean(data) ? reject(methodContent.checkRepeatErrorMessage) : resolve(true)
    //   }
    // })
  }

  const checkRepeatFn = useCheckRepeat(checkRepeatRet)

  const formatRules = useMemo<Rule>(() => {
    if (checkInternationalSms) {
      return {
        validateTrigger: 'onBlur',
        validator: async (_, value) => {
          if (!value || phone(value, { country: areaCode }).isValid) {
            return Promise.resolve()
          }
          return Promise.reject(t('mfa.internationPhoneMessage'))
        }
      }
    }

    return {
      validateTrigger: 'onBlur',
      pattern: methodContent.pattern,
      message: methodContent.formatErrorMessage
    }
  }, [areaCode, checkInternationalSms, methodContent.formatErrorMessage, methodContent.pattern, t])

  const rules = useMemo<Rule[]>(() => {
    // 如果不是必填就不校验
    if (required === false) return []

    // 必填项的默认校验规则
    const rules = [...fieldRequiredRule(methodContent.field)]

    // 格式校验
    rules.push(formatRules)

    // 是否校验重复
    if (checkRepeat || checkExist) {
      rules.push({
        validator: checkRepeatFn,
        validateTrigger: []
      })
    }

    return rules
  }, [required, methodContent.field, formatRules, checkRepeat, checkExist, checkRepeatFn])

  return (
    <Form.Item
      validateFirst={true}
      validateTrigger={['onBlur', 'onChange']}
      rules={[...rules, ...validatorRules]}
      name={name || validatorType}
      {...formItemProps}
    />
  )
}

interface EmailFormItemProps extends FormItemProps {
  name: string
  form?: FormInstance
  mfaTriggerData: IMFATriggerData
  publicConfig: IAuthingPublicConfig
}

export function EmailFormItem(props: EmailFormItemProps) {
  return <ValidatorFormItem validatorType="email" {...props} />
}

export function PhoneFormItem(props: any) {
  return <ValidatorFormItem required validatorType="phone" {...props} />
}
