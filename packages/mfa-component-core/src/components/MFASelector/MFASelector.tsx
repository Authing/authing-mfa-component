import { React } from 'shim-react'

import { i18n } from '../../locales'

import { IconFont } from '../../IconFont'

import { IMFATriggerData, MFAType } from '../../types'

import { MFAButton } from '../MFAButton'

import './style.less'

interface MFASelectorProps {
  mfaTriggerData: IMFATriggerData
  current: MFAType
  onChange: (type: MFAType) => void
}

interface MFAButtonMaterial {
  title: () => string
  icon: string
}

const mfaTypeTitleMapping: Record<MFAType, MFAButtonMaterial> = {
  EMAIL: {
    title: () => i18n.t('mfa.EmailVerification'),
    icon: 'authing-mail'
  },
  SMS: {
    title: () => i18n.t('mfa.SMSVerification'),
    icon: 'authing-phone'
  },
  OTP: {
    title: () => i18n.t('mfa.OTPVerification'),
    icon: 'authing-totp'
  },
  FACE: {
    title: () => i18n.t('mfa.faceVerification'),
    icon: 'authing-face'
  }
}

export function MFASelector(props: MFASelectorProps) {
  const { useMemo } = React

  const { current, onChange, mfaTriggerData } = props

  const { applicationMfa } = mfaTriggerData

  const mfaSelectors = useMemo(() => {
    return applicationMfa
      .filter(item => Object.keys(mfaTypeTitleMapping).includes(item.mfaPolicy))
      .filter(item => item.mfaPolicy !== current)
      .filter(item => {
        if (item.mfaPolicy === 'FACE') {
          // const facePlugin = getFacePlugin()
          // return Boolean(facePlugin)
        }

        return true
      })
      .sort((a, b) => a.sort - b.sort)
      .map(item => (
        <MFAButton
          className="authing-mfa-selector-btn"
          onClick={() => {
            onChange(item.mfaPolicy)
          }}
          key={item.mfaPolicy}
        >
          <IconFont type={mfaTypeTitleMapping[item.mfaPolicy].icon} />
          {`${mfaTypeTitleMapping[item.mfaPolicy].title()}`}
        </MFAButton>
      ))
  }, [applicationMfa, current, onChange])

  return (
    <>
      {mfaSelectors.length !== 0 && (
        <>
          <div
            style={{
              minHeight: 32
            }}
          />
          <div className="authing-mfa-selector">
            <div className="authing-mfa-selector-title">{i18n.t('mfa.otherVerifyWay')}</div>
            {mfaSelectors}
          </div>
        </>
      )}
    </>
  )
}
