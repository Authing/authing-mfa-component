interface VerifySmsContent {
  phone: string
  code: string
  mfaToken?: string
  phoneCountryCode?: string
}

export const verifySms = async (content: VerifySmsContent) => {
  return Promise.resolve(content)

  // return await post(
  //   '/api/v2/applications/mfa/sms/verify',
  //   {
  //     phone,
  //     code,
  //     phoneCountryCode,
  //   },
  //   {
  //     headers: {
  //       authorization: `Bearer ${mfaToken}`,
  //     },
  //   }
  // )
}
