import { React } from 'shim-react'

import { MFAButton } from '../MFAButton'

import { ButtonProps } from 'shim-antd/lib/button'

const { forwardRef, useState, useImperativeHandle } = React

interface SubmitButtonProps extends ButtonProps {
  text?: string
  className?: string
  onClick?: any
  disabled?: boolean
}

function SubmitButtonComponent(props: SubmitButtonProps, ref: any) {
  const [spin, setSpin] = useState(false)

  useImperativeHandle(ref, () => ({
    onError: () => {
      setSpin(false)
    },
    onSpin: (sp: boolean) => {
      setSpin(sp)
    }
  }))

  const propsCls = props.className ? props.className : ''

  const shakingCls = ''

  return (
    <MFAButton
      {...props}
      size={props?.size ?? 'large'}
      type={props?.type ?? 'primary'}
      htmlType={props?.htmlType ?? 'submit'}
      loading={spin}
      className={`authing-g2-submit-button ${propsCls} ${shakingCls}`}
    >
      {props.text}
    </MFAButton>
  )
}

const SubmitButton = forwardRef(SubmitButtonComponent)

export { SubmitButton }
