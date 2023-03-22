import React, { useState, ComponentProps, JSXElementConstructor } from 'react'

import { AuthingMFAContext } from './mfa-context'

import { AuthingMFA, IAuthingMFAOptions } from '@authing/mfa-component-shim-react'

type Options = IAuthingMFAOptions & ComponentProps<JSXElementConstructor<any>>

export function AuthingMFAProvider(options: Options) {
  const { children, ...authingMFAOptions } = options

  const _mfa = new AuthingMFA(authingMFAOptions)

  const [mfa] = useState(_mfa)

  return <AuthingMFAContext.Provider value={mfa}>{children}</AuthingMFAContext.Provider>
}
