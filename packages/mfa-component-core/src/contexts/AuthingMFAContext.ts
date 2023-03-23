import { React } from 'shim-react'

import { IAuthingMFAContext } from '../types'

const { createContext } = React

export const AuthingMFAContext = createContext<IAuthingMFAContext | null>(null)
