import { post } from '../request'

import { message } from 'shim-antd'

import { i18n } from '../locales'

interface SendEmailData {
  email: string
}

export const sendEmail = async (data: SendEmailData) => {
  try {
    const {
      code,
      message: tips,
      apiCode
    } = await post({
      path: '/api/v2/email/send',
      data: {
        ...data,
        scene: 'MFA_VERIFY_CODE'
      }
    })

    if (apiCode === 2080) {
      // 一分钟只能发一次邮箱验证码的提示信息，特殊处理
      message.error(tips)
      return false
    }

    if (code === 200) {
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
