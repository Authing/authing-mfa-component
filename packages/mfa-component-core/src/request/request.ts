import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'

import { i18n } from '../locales'

const LANG_HEADER_KEY = 'x-authing-lang'
const APP_ID_KEY = 'x-authing-app-id'
const USERPOOL_ID_KEY = 'x-authing-userpool-id'

let _baseUrl = ''
let _appId = ''
let _userpoolId = ''

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
  host?: string
  path: string
  query?: string
  config?: AxiosRequestConfig
}

export async function get<T>(props: IGetProps): Promise<IAuthingResponse<T>> {
  const { host = 'https://core.authing.cn', path, query = '', config } = props

  const headers: Record<string, any> = {
    ...config?.headers,
    'Content-Type': 'application/json',
    [LANG_HEADER_KEY]: i18n.language,
    [APP_ID_KEY]: _appId,
    [USERPOOL_ID_KEY]: _userpoolId
  }

  try {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const res: any = await Promise.race([
      timeoutAction(source.cancel),
      axios(`${host || _baseUrl}${path}${query}`, {
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
  query?: string
  data: any
  config?: {
    headers: any
  }
}

export async function post<T>(props: IPostProps): Promise<IAuthingResponse<T>> {
  const { path, data, config, query = '' } = props

  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
    [LANG_HEADER_KEY]: i18n.language,
    [APP_ID_KEY]: _appId,
    [USERPOOL_ID_KEY]: _userpoolId,
    ...config?.headers
  }

  try {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const res: any = await Promise.race([
      timeoutAction(source.cancel),
      axios(`${_baseUrl}${path}${query}`, {
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
      axios(`${_baseUrl}${path}`, {
        method: 'POST',
        data: formData,
        withCredentials: true,
        cancelToken: source.token,
        headers: {
          ...config?.headers,
          [LANG_HEADER_KEY]: i18n.language,
          [APP_ID_KEY]: _appId,
          [USERPOOL_ID_KEY]: _userpoolId
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
  _baseUrl = url
}

export function setAppId(appId: string) {
  _appId = appId
}

export function setUserpoolId(userPoolId: string) {
  _userpoolId = userPoolId
}
