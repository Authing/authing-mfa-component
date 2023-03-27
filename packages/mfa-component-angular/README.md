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
npm install --save @authing/mfa-component-angular
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
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { AuthingMFAModule } from '@authing/mfa-component-angular'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthingMFAModule.forRoot({
      appId: '630ed3137dd6f2fd7001da24'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

``` typescript
// use Authing MFA APIs in Components
import { Component } from '@angular/core'

import { AuthingMFAService } from '@authing/mfa-component-angular'

@Component({
  selector: 'mfa-container',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MFAComponent {
  constructor (
    private authingMFA: AuthingMFAService,
  ) {}

  ngOnInit () {
    this.authingMFA.client.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      mfaTriggerData: {}
    })

    this.authingMFA.client.on('load', function () {
      console.log('Authing MFA load')
    })
    
    this.authingMFA.client.on('mount', function () {
      console.log('Authing MFA mount: ', document.querySelector('.authing-mfa-content'))
    })
    
    this.authingMFA.client.on('unmount', function () {
      console.log('Authing MFA unmount')
    })

    this.authingMFA.client.on('success', function (code, data) {
      console.log('Authing MFA success: ', code, data)
    })

    this.authingMFA.client.on('fail', function (message) {
      console.log('Authing MFA fail: ', message)
    })
  }
}
```