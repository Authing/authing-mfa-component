interface VerifyFaceContent {
  photo: string
  mfaToken?: string
}

export const VerifyFace = async (content: VerifyFaceContent) => {
  return Promise.resolve(content)

  // return await post(
  //   '/api/v2/applications/mfa/face/verify',
  //   {
  //     photo,
  //   },
  //   {
  //     headers: {
  //       authorization: `Bearer ${mfaToken}`,
  //     },
  //   }
  // )
}
