import { post } from '../request'

interface AssociateFaceContent {
  photoA: string
  photoB: string
  isExternalPhoto?: boolean
  mfaToken?: string
}

export const associateFace = async (data: AssociateFaceContent) => {
  const { photoA, photoB, isExternalPhoto, mfaToken } = data
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
