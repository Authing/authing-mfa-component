import { Button, ButtonProps } from 'shim-antd'

import { React } from 'shim-react'

import './style.less'

export interface MFAButtonProps extends ButtonProps {}

export function MFAButton(props: MFAButtonProps) {
  const { useMemo } = React

  const { onClick } = props

  const buttonClassName = useMemo(() => {
    const { className } = props

    return className
  }, [props])

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
