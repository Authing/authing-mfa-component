import { React } from 'shim-react'

import { AuthingMFAContext } from './AuthingMFAContext'

const { useContext } = React

export const useAuthingMFAContext = () => useContext(AuthingMFAContext)
