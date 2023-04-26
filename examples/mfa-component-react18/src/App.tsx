import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react18'

import '@authing/mfa-component-react18/dist/index.min.css'

import RouterComponent from './router'

import './App.css'

export default function App() {
  return (
    <AuthingMFAProvider
      appId="AUTHING_APP_ID"
      mode="modal"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
