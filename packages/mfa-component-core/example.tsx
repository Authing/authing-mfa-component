import { React, render } from 'shim-react'

import { AuthingMFAComponent } from './src/components'

import { AuthingMFA } from './src/index'

import { IAuthingMFATriggerData } from './src/types'

const mfaTriggerData: IAuthingMFATriggerData = {
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
	"customPasswordStrength": {
		"enabled": false,
		"zhMessageOpen": false,
		"enMessageOpen": false,
		"twMessageOpen": false,
		"jpMessageOpen": false
	},
	"passwordStrength": 0
}

function Example() {
  return <>
    <AuthingMFAComponent
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
		</AuthingMFAComponent>
  </>
}


// render({
//   container: document.querySelector('#root') as Element,
//   element: <Example></Example>
// })

const authingMFA = new AuthingMFA({
	appId: '630ed3137dd6f2fd7001da24'
})

authingMFA.start({
	el: document.querySelector('#root') as Element,
	mfaTriggerData
})

authingMFA.on('load', function () {
	console.log('Authing MFA load')
})

authingMFA.on('mount', function () {
	console.log('Authing MFA mount')
})

authingMFA.on('unmount', function () {
	console.log('Authing MFA unmount')
})

authingMFA.on('success', function () {
	console.log('Authing MFA success')
})

authingMFA.on('fail', function () {
	console.log('Authing MFA fail')
})

