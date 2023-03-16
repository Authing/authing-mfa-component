import { React } from 'shim-react'

import { IMFAInitData, IAuthingPublicConfig, IOnMFAVerify } from '../types'

interface IOTPProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
}

export function OTP(props: IOTPProps) {
  const { initData } = props
  console.log(initData)
  return <>OTP</>
}
