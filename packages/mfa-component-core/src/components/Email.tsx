import { React } from 'shim-react'

import { IMFAInitData, IAuthingPublicConfig, IOnMFAVerify } from '../types'

interface IEmailProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
}

export function Email(props: IEmailProps) {
  const { initData } = props
  console.log(initData)
  return <>Email</>
}
