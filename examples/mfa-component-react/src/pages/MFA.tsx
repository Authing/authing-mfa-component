import React, { useEffect } from 'react'

import { useAuthingMFA } from '@authing/mfa-component-react'

export default function MFA() {
  const authingMFA = useAuthingMFA()

  useEffect(() => {
    authingMFA.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      mfaTriggerData: {
        "mfaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzkiLCJ1c2VySWQiOiI2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJhcm4iOiJhcm46Y246YXV0aGluZzo2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzk6dXNlcjo2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJzdGFnZSI6MX0sImlhdCI6MTY3OTQ3MzA0MywiZXhwIjoxNjc5NDczNDAzfQ.gQe3ZP5jvtHyuRAP_Vf8xLmNwe1Mi-qyUVoaB5gRpj8",
        "nickname": '',
        "email": '',
        "phone": '',
        "phoneCountryCode": '',
        "mfaPhone": "17610800803",
        "mfaEmail": "1047832475@qq.com",
        "mfaPhoneCountryCode": "+86",
        "username": "test6",
        "avatar": "https://files.authing.co/authing-console/default-user-avatar.png",
        "faceMfaEnabled": true,
        "totpMfaEnabled": true,
        "applicationMfa": [{
          "mfaPolicy": "EMAIL",
          "status": 1,
          "sort": 0
        }, {
          "mfaPolicy": "FACE",
          "status": 1,
          "sort": 0
        }, {
          "mfaPolicy": "OTP",
          "status": 1,
          "sort": 0
        }, {
          "mfaPolicy": "SMS",
          "status": 1,
          "sort": 0
        }],
        "passwordStrength": 0
      }
    })
  }, [])

  return (
    <div id="authing-mfa-container">123</div>
  )
}
