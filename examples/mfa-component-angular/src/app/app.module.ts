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
      appId: 'AUTHING_APP_ID',
      mode: 'modal'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
