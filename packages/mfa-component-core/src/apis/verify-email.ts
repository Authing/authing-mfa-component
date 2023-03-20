import { post } from '../request'

interface VerifyEmailData {
  email: string
  code: string
  mfaToken: string
}

export const verifyEmail = async (data: VerifyEmailData) => {
  const { email, code, mfaToken } = data
  return await post({
    path: '/api/v2/applications/mfa/email/verify',
    data: {
      email,
      code
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
