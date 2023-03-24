import { React } from 'shim-react'

import loading from './loading.svg'

export function AuthingLoading() {
  return (
    <embed
      src={loading}
      width={100}
      height={100}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-50px'
      }}
    />
  )
}
