import { post } from '../request'

interface AssociateFaceContent {
  photoA: string
  photoB: string
  isExternalPhoto?: boolean
  mfaToken?: string
}

export const associateFace = async (content: AssociateFaceContent) => {
  const { photoA, photoB, isExternalPhoto, mfaToken } = content
  return await post({
    path: '/api/v2/mfa/face/associate',
    data: {
      photoA,
      photoB,
      isExternalPhoto
    },
    config: {
      headers: {
        authorization: `Bearer ${mfaToken}`
      }
    }
  })
}
