import { useContext } from 'react'

import { AuthingMFAContext } from './mfa-context'

export const useAuthingMFA = () => useContext(AuthingMFAContext)
