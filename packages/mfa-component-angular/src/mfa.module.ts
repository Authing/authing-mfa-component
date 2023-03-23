import { NgModule, ModuleWithProviders } from '@angular/core'

import { AuthingMFAService } from './mfa.service'
import { AuthingMFAClientService, AuthingMFAClientFactory } from './mfa.client'
import { AuthingMFAConfigService, AuthingMFAClientConfig } from './mfa.config'

import { IAuthingMFAOptions } from '@authing/mfa-component-native'

@NgModule()
export class AuthingMFAModule {
  static forRoot(config: IAuthingMFAOptions): ModuleWithProviders<AuthingMFAModule> {
    return {
      ngModule: AuthingMFAModule,
      providers: [
        AuthingMFAService,
        {
          provide: AuthingMFAConfigService,
          useValue: config
        },
        {
          provide: AuthingMFAClientService,
          useFactory: AuthingMFAClientFactory.createClient,
          deps: [AuthingMFAClientConfig]
        }
      ]
    }
  }
}
