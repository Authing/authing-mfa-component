import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

import RouterComponent from './router'

import './App.css'

export default function App() {
  return (
    <AuthingMFAProvider
      appId="AUTHING_APP_ID"
      lang="zh-TW"
      mode="modal"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
