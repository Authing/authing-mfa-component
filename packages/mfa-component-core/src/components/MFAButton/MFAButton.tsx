import { Button, ButtonProps } from 'shim-antd'

import { React } from 'shim-react'

import './style.less'

export interface MFAButtonProps extends ButtonProps {}

export function MFAButton(props: MFAButtonProps) {
  const { useMemo } = React

  const { type, onClick } = props

  const buttonClassName = useMemo(() => {
    let { className } = props

    if (type) {
      className += ' guard-button-link-like'
    }

    return className
  }, [props, type])

  return (
    <Button
      {...props}
      className={buttonClassName}
      onClick={(e: any) => {
        onClick?.(e)
      }}
    />
  )
}
