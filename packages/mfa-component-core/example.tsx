import { React, render } from 'shim-react'

import { AuthingMFAComponent } from './src/components'

import { IMFATriggerData } from './src/types'

function Example() {
  const mfaTriggerData: IMFATriggerData = {
		"mfaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzkiLCJ1c2VySWQiOiI2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJhcm4iOiJhcm46Y246YXV0aGluZzo2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzk6dXNlcjo2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJzdGFnZSI6MX0sImlhdCI6MTY3OTM4NTA2OCwiZXhwIjoxNjc5Mzg1NDI4fQ.tymKOZxwYpT31WW2cK-F01juHIPuaaBBL63b4PF-Jfc",
		"nickname": '',
		"email": '',
		"phone": '',
		"phoneCountryCode": '',
		"mfaPhone": "17610800803",
		"mfaEmail": '',
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
		"customPasswordStrength": {
			"enabled": false,
			"zhMessageOpen": false,
			"enMessageOpen": false,
			"twMessageOpen": false,
			"jpMessageOpen": false
		},
		"passwordStrength": 0
	}

  return <>
    <AuthingMFAComponent appId="630ed3137dd6f2fd7001da24" mfaTriggerData={mfaTriggerData}></AuthingMFAComponent>
  </>
}


render({
  container: document.querySelector('#root') as Element,
  element: <Example></Example>
})
