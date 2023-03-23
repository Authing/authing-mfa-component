import { Injectable, Inject } from '@angular/core'

import { AuthingMFAClientService } from './mfa.client'

import { AuthingMFA } from '@authing/mfa-component-native'

@Injectable({
  providedIn: 'root'
})
export class AuthingMFAService {
  constructor(@Inject(AuthingMFAClientService) public client: AuthingMFA) {}
}
