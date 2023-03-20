import { React } from 'shim-react'

import { IMFATriggerData } from '../../types'

import { SaveCode } from './core/saveCode'

import { UseCode } from './core/useCode'

import './style.less'

const { useState } = React

interface IRecoveryCodeProps {
  mfaTriggerData: IMFATriggerData
}

// OTP 恢复码
export function AuthingMFARecoveryCodeView(props: IRecoveryCodeProps) {
  const { mfaTriggerData } = props
  const { mfaToken } = mfaTriggerData
  const [recoveryCode, setRecoveryCode] = useState<string>()

  return (
    <div className="g2-view-container g2-mfa-recovery-code">
      <div className="g2-mfa-content">
        {recoveryCode ? (
          <SaveCode
            secret={recoveryCode}
            onBind={() => {
              console.log('bind')
            }}
          />
        ) : (
          <UseCode
            mfaToken={mfaToken}
            onSubmit={(code: string) => {
              setRecoveryCode(code)
            }}
          />
        )}
      </div>
    </div>
  )
}
