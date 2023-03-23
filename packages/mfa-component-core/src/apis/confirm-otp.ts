import { post } from '../request'

interface ConfirmOTPData {
  mfaToken: string
  authenticator_type: string
  totp: string
  source: string
}

export async function confirmOtp(data: ConfirmOTPData) {
  const { mfaToken, authenticator_type, totp, source } = data

  return await post({
    path: '/api/v2/mfa/totp/associate/confirm',
    data: {
      authenticator_type,
      totp,
      source
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
