import { React } from 'shim-react'

import { IAuthingFunc, IAuthingMFATriggerData } from '../../types'

import { SaveCode } from './core/saveCode'

import { UseCode } from './core/useCode'

import { useAuthingMFAContext } from '../../contexts'

import { loopFunc } from '../../helpers'

import './style.less'

const { useState } = React

interface IRecoveryCodeProps {
  mfaTriggerData: IAuthingMFATriggerData
}

// OTP 恢复码
export function AuthingMFARecoveryCodeView(props: IRecoveryCodeProps) {
  const { mfaTriggerData } = props

  const { mfaToken } = mfaTriggerData

  const [recoveryCode, setRecoveryCode] = useState<string>()

  const authingMFAContext = useAuthingMFAContext()

  return (
    <div className="g2-view-container g2-mfa-recovery-code">
      <div className="g2-mfa-content">
        {recoveryCode ? (
          <SaveCode
            secret={recoveryCode}
            onBind={() => {
              loopFunc(authingMFAContext?.events.onSaveRecoveryCode as IAuthingFunc)
            }}
          />
        ) : (
          <UseCode
            mfaToken={mfaToken}
            onSubmit={(recoveryCode: string) => {
              setRecoveryCode(recoveryCode)
            }}
          />
        )}
      </div>
    </div>
  )
}
