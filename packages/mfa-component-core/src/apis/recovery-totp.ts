import { post } from '../request'

interface RecoverTotpData {
  recoveryCode: string
  mfaToken: string
}

export async function recoveryTotp(data: RecoverTotpData) {
  const { recoveryCode, mfaToken } = data

  return await post({
    path: '/api/v2/mfa/totp/recovery',
    data: {
      recoveryCode
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
