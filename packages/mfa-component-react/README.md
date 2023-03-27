<div align=center>
  <img width="300" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<br />

## Authing MFA core features

- Authoring ensures business security through various authentication methods (SMS authentication/email authentication/OTP authentication/face recognition authentication).
- Support multi-source behavioral environment data reporting and multi-dimensional analysis of security levels.
- Support visual orchestration of security policies to achieve environmental risk adaptation.
- Advanced continuous adaptive mode is provided to achieve multifactor authentication protection in more scenarios (such as resource access scenarios).
- Provide SDK and open interfaces to help developers quickly invoke relevant capabilities.

## Install

``` shell
npm install --save @authing/mfa-component-react
```

## Initialize

|Key|Type|Default|Requires
|-----|----|----|----|
|appId|String| - |Y|
|host|String| - |N|
|style|CSSProperties| - |N|

``` javascript
// From CDN
const guard = new AuthingMFAFactory.AuthingMFA({
  appId: 'AUTHING_APP_ID'
})

// From npm
import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

function App() {
  return (
    <AuthingMFAProvider
      appId="AUTHING_APP_ID"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
```

``` typescript
// use Authing MFA APIs in Components
import { useEffect } from 'react'
import { useAuthingMFA } from '@authing/mfa-component-react'

export default function MFA() {
  const authingMFA = useAuthingMFA()

  useEffect(() => {
    authingMFA.start({
      el: document.querySelector('#authing-mfa-container'),
      mfaTriggerData: {}
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
  }, [])

  return <div id="authing-mfa-container"></div>
}
```