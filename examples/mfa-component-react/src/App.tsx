import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

import RouterComponent from './router'

import './App.css'

export default function App() {
  return (
    <AuthingMFAProvider
      appId="630ed3137dd6f2fd7001da24"
      lang="zh-TW"
      mode="modal"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
