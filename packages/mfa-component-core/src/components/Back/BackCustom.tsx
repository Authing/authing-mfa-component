import { React } from 'shim-react'
import { IconFont } from '../../IconFont'
import { i18n } from '../../locales'
import { MFAButton } from '../MFAButton'
import './styles.less'

const { useMemo } = React

export interface BackProps {
  isRender?: boolean
}

export interface BackCustomProps extends BackProps {
  onBack: () => void
}

export const BackCustom: React.FC<
  BackCustomProps & {
    children: any
  }
> = (props) => {

  const {
    onBack,
    isRender = true,
    children = i18n.t('common.backLoginPage'),
  } = props

  const renderBack = useMemo(() => {
    if (!isRender) return null

    return (
      <MFAButton
        type="link"
        onClick={onBack}
        className="g2-view-mfa-back-hover"
      >
        <IconFont type="authing-arrow-left-s-line" style={{ fontSize: 24, width: 24, height: 24, marginRight: 0 }} />
        <span>{children}</span>
      </MFAButton>
    )
  }, [children, isRender, onBack])

  return (
    <div className="g2-view-back" style={{ display: 'inherit' }}>
      {renderBack}
    </div>
  )
}
