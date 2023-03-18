interface VerifyEmailContent {
  email: string
  code: string
  mfaToken?: string
}

export const VerifyEmail = async (content: VerifyEmailContent) => {
  return Promise.resolve(content)

  // return await post(
  //   '/api/v2/applications/mfa/email/verify',
  //   {
  //     email,
  //     code,
  //   },
  //   {
  //     headers: {
  //       authorization: `Bearer ${mfaToken}`,
  //     },
  //   }
  // )
}
