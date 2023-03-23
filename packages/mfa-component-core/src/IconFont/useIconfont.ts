import { React } from 'shim-react'

import { GenerateSvg } from './iconfont'

import Axios from 'axios'

export const useIconfont = (cdnBase: string, setError?: any) => {
  const { useCallback, useEffect, useState } = React

  const [loaded, setLoaded] = useState<boolean>(false)

  const initIconfont = useCallback(async () => {
    if (!cdnBase) {
      return
    }

    try {
      const res = await Axios(`${cdnBase}/svg-string/guard`)
      GenerateSvg(res.data)
      setLoaded(true)
    } catch (error) {
      setError?.(error)
    }
  }, [cdnBase, setError])

  useEffect(() => {
    initIconfont()
  }, [initIconfont])

  return loaded
}
