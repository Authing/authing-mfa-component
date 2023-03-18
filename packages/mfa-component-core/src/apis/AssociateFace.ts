interface AssociateFaceContent {
  photoA: string
  photoB: string
  isExternalPhoto?: boolean
  mfaToken?: string
}

export const AssociateFace = async (content: AssociateFaceContent) => {
  return Promise.resolve(content)

  // return await post(
  //   '/api/v2/mfa/face/associate',
  //   {
  //     photoA,
  //     photoB,
  //     isExternalPhoto,
  //   },
  //   {
  //     headers: {
  //       authorization: `Bearer ${mfaToken}`,
  //     },
  //   }
  // )
}
