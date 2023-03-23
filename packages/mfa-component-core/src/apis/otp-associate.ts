import { post } from '../request'

interface OTPAssociateData {
  mfaToken: string
}

export async function otpAssociate(data: OTPAssociateData) {
  const { mfaToken } = data

  return await post<{
    authenticator_type: string
    qrcode_data_url: string
    qrcode_uri: string
    recovery_code: string
    secret: string
  }>({
    path: '/api/v2/mfa/totp/associate',
    data: {
      source: 'APPLICATION'
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
