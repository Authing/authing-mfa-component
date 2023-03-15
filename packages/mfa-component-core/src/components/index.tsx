import { React } from 'shim-react'

import { useTranslation } from 'react-i18next'

import { Email } from './Email'
import { SMS } from './SMS'
import { Face } from './Face'
import { OTP } from './OTP'

import { MFASelector } from './MFASelector'
import { Back } from './Back'

import { IAuthingMFAComponentProps, MFAType } from '../types'

const ComponentsMapping: Record<MFAType, () => React.ReactNode> = {
  EMAIL: () => <Email />,
  SMS: () => <SMS />,
  OTP: () => <OTP />,
  FACE: () => <Face />
}

export function AuthingMFAComponent(props: IAuthingMFAComponentProps) {
  const { useState } = React

  const { initData } = props

  const { t } = useTranslation()

  const [currentMFAType, setCurrentMFAType] = useState<MFAType>(
    initData.current ||
      initData.applicationMfa?.sort((a, b) => a.sort - b.sort)[0].mfaPolicy ||
      'EMAIL'
  )

  const [MFASelectorVisible, setMFASelectorVisible] = useState<boolean>(true)

  console.log(t, setCurrentMFAType, setMFASelectorVisible)

  return (
    <>
      <Back></Back>
      {ComponentsMapping[currentMFAType]()}
      {MFASelectorVisible && <MFASelector></MFASelector>}
    </>
  )
}

AuthingMFAComponent.name = 'authing-mfa-component'
