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
npm install --save @authing/mfa-component-vue2
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
import { AuthingMFAPlugin } from '@authing/mfa-component-vue2'

import '@authing/mfa-component-vue2/dist/index.min.css'

Vue.use(AuthingMFAPlugin, {
  appId: 'AUTHING_APP_ID'
})
```

``` html
// use Authing MFA APIs in Components
<script>
export default {
  data () {
    return {}
  },
  mounted() {
    this.$authingMFA.start({
      el: document.querySelector('#authing-mfa-container'),
      mfaTriggerData: {}
    })

    this.$authingMFA.on('load', function () {
      console.log('Authing MFA load')
    })
    
    this.$authingMFA.on('mount', function () {
      console.log('Authing MFA mount: ', document.querySelector('.authing-mfa-content'))
    })
    
    this.$authingMFA.on('unmount', function () {
      console.log('Authing MFA unmount')
    })
    
    this.$authingMFA.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
    })
    
    this.$authingMFA.on('fail', function (message) {
      console.log('Authing MFA fail: ', message)
    })
  }
}
</script>
```