import { Rule } from 'shim-antd/lib/form'

import { i18n } from '../locales'

import { phone } from 'phone'

export * from './countryList'

export * from './loop-func'

export * from './noop'

export * from './delay'

// NoCheck | Low | Middle | High | AUTO
export type PasswordStrength = 0 | 1 | 2 | 3 | 4

export function fieldRequiredRule(
  fieldRequiredRule: string,
  fieldRequiredRuleMessage?: string
): Rule[] {
  return [
    {
      required: true,
      validateTrigger: ['onChange'],
      message:
        fieldRequiredRuleMessage ||
        (i18n.t('mfa.isMissing', {
          name: fieldRequiredRule
        }) as string),
      whitespace: true
    }
  ]
}

export const PASSWORD_STRENGTH_TEXT_MAP: Record<
  PasswordStrength,
  {
    placeholder: () => string
    validateMessage: () => string
  }
> = {
  [0]: {
    placeholder: () => i18n.t('mfa.inputPwd'),
    validateMessage: () => i18n.t('mfa.inputPwd')
  },
  [1]: {
    placeholder: () => i18n.t('mfa.setPwdLimit1'),
    validateMessage: () => i18n.t('mfa.setPwdLimitMsg1')
  },
  [2]: {
    placeholder: () => i18n.t('mfa.setPwdLimit2'),
    validateMessage: () => i18n.t('mfa.setPwdLimitMsg2')
  },
  [3]: {
    placeholder: () => i18n.t('mfa.setPwdLimit3'),
    validateMessage: () => i18n.t('mfa.setPwdLimitMsg3')
  },
  [4]: {
    placeholder: () => i18n.t('mfa.inputPwd'),
    validateMessage: () => i18n.t('mfa.inputPwd')
  }
}

const SYMBOL_TYPE_PATTERNS = [
  /\d+/,
  /[a-zA-Z]/,
  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/
  // /[-!$%^&*()_+|~=`{}[\]:";'<>?,@./]/,
]

export function getSymbolTypeLength(pwd: string) {
  return SYMBOL_TYPE_PATTERNS.map(pattern => pattern.test(pwd)).filter(item => item).length
}

export const VALIDATE_PATTERN = {
  // https://emailregex.com/
  // eslint-disable-next-line no-control-regex
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // https://cloud.tencent.com/developer/article/1751120
  // email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  //   以下的来自 authing-user-portal 项目
  phone: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
  ip: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
  host: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+.?$/,
  username: /.?/
} as const

export const mailDesensitization = (mail: string) => {
  const mailArr = mail.split('@')
  const mailName = mailArr[0].substr(0, 1) + '***'
  return mailName + '@' + mailArr[1]
}

export interface PhoneValidResult {
  isValid: boolean
  phoneNumber: string
  countryIso2: string
  countryIso3: string
  countryCode: string
}

export const parsePhone = (isInternationSms: boolean, fieldValue: string, areaCode = 'CN') => {
  let countryCode = undefined

  let phoneNumber = fieldValue
  // 未开启国家化短信
  if (!isInternationSms) {
    return { phoneNumber, countryCode: undefined }
  }
  // 处理 类似 192*******9 情况
  if (phone(fieldValue, { country: areaCode }).isValid) {
    const parsePhone = phone(fieldValue, {
      country: areaCode
    }) as PhoneValidResult

    countryCode = parsePhone.countryCode as string

    phoneNumber = parsePhone.phoneNumber.split(countryCode)[1]
  } else if (phone(fieldValue).isValid) {
    // 处理 +86 19294229909 情况
    const parsePhone = phone(fieldValue) as PhoneValidResult

    countryCode = parsePhone.countryCode as string

    phoneNumber = parsePhone.phoneNumber.split(countryCode)[1]
  }

  return { countryCode, phoneNumber }
}

export const phoneDesensitization = (phone: string) => {
  return phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

export const getClassnames = (classnames: (string | boolean | undefined)[]) => {
  return classnames.filter(Boolean).join(' ')
}
