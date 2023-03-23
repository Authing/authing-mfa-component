import { get } from '../request'

import { message } from 'shim-antd'

interface MFAAuthenticatorData {
  mfaToken: string
}

export async function mfaAuthenticator(data: MFAAuthenticatorData) {
  const { mfaToken } = data

  try {
    const { code, message: msg } = await get({
      path: '/api/v2/mfa/authenticator',
      query: '?source=APPLICATION',
      config: {
        headers: {
          authorization: `Bearer ${mfaToken}`
        }
      }
    })

    if (code === 2021) {
      message.error(msg)
      // TODO mfa token 失效
      return
    }
  } catch (error: any) {
    message.error(error?.message)
  }
}
