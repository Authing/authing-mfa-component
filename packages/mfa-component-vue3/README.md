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
npm install --save @authing/mfa-component-vue3
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
import { createAuthingMFA } from '@authing/mfa-component-vue3'

import '@authing/mfa-component-vue3/dist/index.min.css'

const app = createApp(App)

app.use(
  createAuthingMFA({
    appId: 'AUTHING_APP_ID'
  })
)
```

``` html
// use Authing MFA APIs in Components
<script lang="ts" setup>
import { onMounted } from 'vue'

import { useAuthingMFA } from '@authing/mfa-component-vue3'

const authingMFA = useAuthingMFA()

onMounted(() => {
  authingMFA.start({
    el: document.querySelector('#authing-mfa-container') as Element,
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
})
</script>
```