import { React } from 'shim-react'
import { IMFAInitData } from '../../types'
import { SaveCode } from './core/saveCode'
import { UseCode } from './core/useCode'
import './style.less'

const { useState } = React

interface IRecoveryCodeProps {
  initData: IMFAInitData
}
// OTP 恢复码
export const GuardRecoveryCodeView: React.FC<IRecoveryCodeProps> = ({ initData }) => {
  const { mfaToken } = initData
  const [recoveryCode, setRecoveryCode] = useState<string>()

  return (
    <div className="g2-view-container g2-mfa-recovery-code">
      {/* {renderBack} */}
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
