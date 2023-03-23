import { Injectable, Optional, Inject, InjectionToken } from '@angular/core'

import { IAuthingMFAOptions } from '@authing/mfa-component-native'

export const AuthingMFAConfigService = new InjectionToken<IAuthingMFAOptions>('authingMFA.client')

@Injectable({ providedIn: 'root' })
export class AuthingMFAClientConfig {
  private options?: IAuthingMFAOptions

  constructor(@Optional() @Inject(AuthingMFAConfigService) options?: IAuthingMFAOptions) {
    if (options) {
      this.set(options)
    }
  }

  set(options: IAuthingMFAOptions): void {
    this.options = options
  }

  get(): IAuthingMFAOptions {
    return this.options as IAuthingMFAOptions
  }
}
