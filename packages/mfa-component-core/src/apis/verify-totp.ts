import { post } from '../request'

interface VerifyTotpData {
  totp: string
  mfaToken: string
}

export const verifyTotp = async (data: VerifyTotpData) => {
  const { totp, mfaToken } = data

  return await post({
    path: '/api/v3/mfa-totp-verify',
    data: {
      totp
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
