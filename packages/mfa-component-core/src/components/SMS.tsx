import { React } from 'shim-react'

import { IMFAInitData, IAuthingPublicConfig, IOnMFAVerify } from '../types'

interface ISMSProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
}

export function SMS(props: ISMSProps) {
  const { initData } = props
  console.log(initData)
  return <>SMS</>
}
