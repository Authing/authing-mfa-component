import { IAuthingPublicConfig } from '../types'

import { get } from '../request'

export async function getPublicConfig(appId: string) {
  const { code, data } = await get<IAuthingPublicConfig>({
    host: 'https://core.authing.cn',
    path: `/api/v2/applications/${appId}/public-config`
  })
  if (code === 200 && data) {
    return data
  }
  return null
}
