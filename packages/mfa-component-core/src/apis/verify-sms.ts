import { post } from '../request'

interface VerifySmsData {
  phone: string
  code: string
  mfaToken?: string
  phoneCountryCode?: string
}

export const verifySms = async (data: VerifySmsData) => {
  const { phone, code, mfaToken, phoneCountryCode } = data
  return await post({
    path: '/api/v2/applications/mfa/sms/verify',
    data: {
      phone,
      code,
      phoneCountryCode
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
