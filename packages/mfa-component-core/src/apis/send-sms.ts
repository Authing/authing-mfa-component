import { post } from '../request'

import { message } from 'shim-antd'

import { i18n } from '../locales'

interface SendSMSData {
  phoneNumber: string
  phoneCountryCode?: string
}

export async function sendSMS(data: SendSMSData) {
  try {
    const { statusCode, message: tips } = await post({
      path: '/api/v3/send-sms',
      data: {
        ...data,
        channel: 'CHANNEL_VERIFY_MFA'
      }
    })

    if (statusCode === 422) {
      // 一分钟只能发一次邮箱验证码的提示信息，特殊处理
      message.error(tips)
      return false
    }

    if (statusCode === 200) {
      return true
    } else {
      message.error(i18n.t('mfa.sendCodeTimeout'))
      return false
    }
  } catch (e: any) {
    if (e.code === 'ECONNABORTED') {
      message.error(i18n.t('mfa.sendCodeTimeout'))
      return false
    }
    const errorMessage = JSON.parse(e.message)
    message.error(errorMessage.message)
    return false
  }
}
