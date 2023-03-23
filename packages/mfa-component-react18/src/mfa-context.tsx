import { createContext } from 'react'

import { AuthingMFA } from '@authing/mfa-component-shim-react18'

const initialContext = {} as AuthingMFA

export const AuthingMFAContext = createContext(initialContext)
