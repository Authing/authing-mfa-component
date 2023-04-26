import { React } from 'shim-react'

import { Input, InputProps } from 'shim-antd'

import { VirtualDropdown } from './VirtualDropdown'

import { i18n } from '../../locales'

const { useEffect, useState } = React

export interface InputInternationPhoneProps extends InputProps {
  areaCode: string
  onAreaCodeChange: (areaCode: string) => void
}

export function InputInternationPhone(props: InputInternationPhoneProps) {
  const { areaCode, onAreaCodeChange, onChange, value: formValue, ...inputProps } = props

  const { t } = i18n

  const [value, setValue] = useState(/^[^a-zA-Z]*$/.test(String(formValue)) ? formValue : '')

  // 当formValue变化时候
  useEffect(() => {
    setValue(/^[^a-zA-Z]*$/.test(String(formValue)) ? formValue : '')
  }, [formValue])

  const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  return (
    <>
      <Input
        autoComplete="off"
        pattern="[^a-zA-Z]*"
        value={value}
        placeholder={t('mfa.inputPhone') as string}
        {...inputProps}
        onChange={(e: any) => {
          const v = e.target.value
          if (!/^[^a-zA-Z]*$/.test(v)) {
            return
          }
          valueChange(e)
        }}
        prefix={<VirtualDropdown value={areaCode} onChange={onAreaCodeChange} />}
        maxLength={20}
      />
    </>
  )
}
