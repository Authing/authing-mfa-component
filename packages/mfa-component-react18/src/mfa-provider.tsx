import React, { ComponentProps, JSXElementConstructor } from 'react'

import { AuthingMFAContext } from './mfa-context'

import { AuthingMFA, IAuthingMFAOptions } from '@authing/mfa-component-shim-react18'

type Options = IAuthingMFAOptions & ComponentProps<JSXElementConstructor<any>>

export function AuthingMFAProvider(options: Options) {
  const { children, ...authingMFAOptions } = options

  const mfa = new AuthingMFA(authingMFAOptions)

  return <AuthingMFAContext.Provider value={mfa}>{children}</AuthingMFAContext.Provider>
}
