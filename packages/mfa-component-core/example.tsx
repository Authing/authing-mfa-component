import { React, render } from 'shim-react'

import { AuthingMFA } from './src/index'

import { IAuthingMFATriggerData } from './src/types'

const mfaTriggerData: IAuthingMFATriggerData = {
	"mfaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzkiLCJ1c2VySWQiOiI2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJhcm4iOiJhcm46Y246YXV0aGluZzo2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzk6dXNlcjo2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJzdGFnZSI6MX0sImlhdCI6MTY3OTg1OTI2OCwiZXhwIjoxNjc5ODU5NjI4fQ.9GSwcmP7ykaiALZUHLpFH6LvLOBYdRfpLzJHoCCgVUY",
	"nickname": '',
	"email": '',
	"phone": '',
	"phoneCountryCode": '',
	"mfaPhone": "",
	"mfaEmail": "",
	"mfaPhoneCountryCode": "+86",
	"username": "test6",
	"avatar": "https://files.authing.co/authing-console/default-user-avatar.png",
	"faceMfaEnabled": true,
	"totpMfaEnabled": false,
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

function Example() {
  return <>
    <AuthingMFA.Component
			appId="630ed3137dd6f2fd7001da24"
			mfaTriggerData={mfaTriggerData}
			onLoad={() => {
				console.log('Authing MFA onLoad')
			}}
			onMount={() => {
				console.log('Authing MFA onMount')
			}}
			onSuccess={(code, data) => {
				console.log('Authing MFA onSuccess: ', code, data)
			}}
			onFail={(message) => {
				console.log('Authing MFA onFail: ', message)
			}}
			onUnmount={() => {
				console.log('Authing MFA onUnmount')
			}}>
		</AuthingMFA.Component>
  </>
}


// render({
//   container: document.querySelector('#root') as Element,
//   element: <Example></Example>
// })

const authingMFA = new AuthingMFA({
	appId: '630ed3137dd6f2fd7001da24',
	mode: 'modal'
})

// @ts-ignore
window.authingMFA = authingMFA

authingMFA.start({
	el: document.querySelector('#root') as Element,
	mfaTriggerData
})

authingMFA.on('load', function () {
	console.log('Authing MFA load')
})

authingMFA.on('mount', function () {
	console.log('Authing MFA mount: ', document.querySelector('.authing-mfa-content'))
})

authingMFA.on('unmount', function () {
	console.log('Authing MFA unmount')
})

authingMFA.on('success', function (code, data) {
	console.log('Authing MFA success: ', code, data)
})

authingMFA.on('fail', function (message) {
	console.log('Authing MFA fail: ', message)
})

authingMFA.on('saveRecoveryCode', function () {
	console.log('Authing MFA saveRecoveryCode')
})


