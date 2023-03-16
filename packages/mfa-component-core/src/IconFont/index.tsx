import { React } from 'shim-react'

import './style.less'

interface IconFontProps {
  type: string
  style?: React.CSSProperties
  className?: string
}

const getClassnames = (classnames: (string | boolean | undefined)[]) =>
  classnames.filter(Boolean).join(' ')

export function IconFont(props: IconFontProps) {
  const { type, style, className } = props
  return (
    <svg style={{ ...style }} className={getClassnames(['authing-mfa-icon', className])}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export * from './useIconfont'
