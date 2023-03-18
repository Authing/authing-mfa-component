interface VerifyTotpContent {
  totp: string
  mfaToken?: string
}

export const VerifyTotp = async (content: VerifyTotpContent) => {
  return Promise.resolve(content)
  // return await post(
  //   '/api/v2/applications/mfa/totp/verify',
  //   {
  //     totp,
  //   },
  //   {
  //     headers: {
  //       authorization: `Bearer ${mfaToken}`,
  //     },
  //   }
  // )
}
