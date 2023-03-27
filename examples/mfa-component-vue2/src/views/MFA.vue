<template>
  <div class="mfa-container">
    <button @click="showModal">Show Modal</button>
    <button @click="hideModal">Hide Modal</button>
    <div id="authing-mfa-container"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted() {
    this.$authingMFA.start({
      el: document.querySelector('#authing-mfa-container'),
      mfaTriggerData: {
        "mfaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzkiLCJ1c2VySWQiOiI2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJhcm4iOiJhcm46Y246YXV0aGluZzo2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzk6dXNlcjo2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJzdGFnZSI6MX0sImlhdCI6MTY3OTQ3MzA0MywiZXhwIjoxNjc5NDczNDAzfQ.gQe3ZP5jvtHyuRAP_Vf8xLmNwe1Mi-qyUVoaB5gRpj8",
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
  },

  methods: {
    showModal () {
      this.$authingMFA.show()
    },
    hideModal () {
      this.$authingMFA.hide()
    }
  }
}
</script>
