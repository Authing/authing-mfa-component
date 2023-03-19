import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'

import { i18n } from '../locales'

const LANG_HEADER_KEY = 'x-authing-lang'

let baseUrl = ''

export interface IAuthingResponse<T = any> {
  code?: number
  statusCode?: number
  apiCode?: number
  data?: T
  messages?: string
  message?: string
  flowHandle?: string
}

export interface IGetProps {
  path: string
  query: string
  config?: AxiosRequestConfig
}

export async function get<T>(props: IGetProps): Promise<IAuthingResponse<T>> {
  const { path, query, config } = props

  const headers: Record<string, any> = {
    ...config?.headers,
    'Content-Type': 'application/json',
    [LANG_HEADER_KEY]: i18n.language
  }

  try {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const res: any = await Promise.race([
      timeoutAction(source.cancel),
      axios(`${baseUrl}${path}${query}`, {
        method: 'GET',
        ...config,
        withCredentials: true,
        headers,
        cancelToken: source.token
      })
    ])

    return res?.data
  } catch (e) {
    return Promise.resolve({
      code: -2
    })
  }
}

export interface IPostProps {
  path: string
  data: any
  config?: {
    headers: any
  }
}

export async function post<T>(props: IPostProps): Promise<IAuthingResponse<T>> {
  const { path, data, config } = props

  const headers: Record<string, any> = {
    ...config?.headers,
    'Content-Type': 'application/json',
    [LANG_HEADER_KEY]: i18n.language
  }

  try {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const res: any = await Promise.race([
      timeoutAction(source.cancel),
      axios(`${baseUrl}${path}`, {
        data,
        method: 'POST',
        withCredentials: true,
        cancelToken: source.token,
        headers
      })
    ])

    return res?.data
  } catch (e) {
    return Promise.resolve({
      code: -2
    })
  }
}

export interface IPostFormProps {
  path: string
  formData: any
  config?: {
    headers: any
  }
}

export async function postForm<T>(props: IPostFormProps): Promise<IAuthingResponse<T>> {
  const { path, formData, config } = props
  try {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    const res: any = await Promise.race([
      timeoutAction(source.cancel),
      axios(`${baseUrl}${path}`, {
        method: 'POST',
        data: formData,
        withCredentials: true,
        cancelToken: source.token,
        headers: {
          ...config?.headers,
          [LANG_HEADER_KEY]: i18n.language
        }
      })
    ])
    return res?.data
  } catch (e) {
    return Promise.resolve({
      code: -2
    })
  }
}

function timeoutAction(cancel: CancelTokenSource['cancel']) {
  const timer = 10
  return new Promise(resolve => {
    setTimeout(() => {
      const response = {
        data: {
          code: -1
        }
      }
      resolve(response)
      cancel()
    }, timer * 1000)
  })
}

export function setRequestBaseUrl(url: string) {
  baseUrl = url
}