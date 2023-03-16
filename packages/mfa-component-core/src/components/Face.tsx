import { React } from 'shim-react'

import { IAuthingPublicConfig, IMFAInitData, IOnMFAVerify } from '../types'

interface IFaceProps {
  initData: IMFAInitData
  authingPublicConfig: IAuthingPublicConfig
  onVerify: IOnMFAVerify
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export function Face(props: IFaceProps) {
  const { initData } = props
  console.log(initData)
  return <>Face</>
}
