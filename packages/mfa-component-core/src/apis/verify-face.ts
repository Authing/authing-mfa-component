import { post } from '../request'
interface VerifyFaceContent {
  photo: string
  mfaToken?: string
}

export const verifyFace = async (content: VerifyFaceContent) => {
  const { photo, mfaToken } = content
  return await post({
    path: '/api/v2/applications/mfa/face/verify',
    data: {
      photo
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
