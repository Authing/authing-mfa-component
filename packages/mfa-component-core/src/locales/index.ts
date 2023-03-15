import { React } from 'shim-react'

import i18n, { InitOptions, Resource } from 'i18next'

import { initReactI18next } from 'react-i18next'

import LanguageDetector from 'i18next-browser-languagedetector'

import * as zhCnTrans from './zh-cn'
import * as zhTwTrans from './zh-tw'
import * as enUsTrans from './en-us'
import * as jaJpTrans from './ja-jp'

export type Lang = 'zh-CN' | 'en-US' | 'zh-TW' | 'ja-JP'

export type LangIdentity = 'zh' | 'en' | 'ja'

export interface AuthingMFAI18nOptions {
  defaultLanguage?: Lang | 'browser'
}

const LanguageResources: Resource = {
  'en-US': { translation: enUsTrans },
  'zh-CN': { translation: zhCnTrans },
  'zh-TW': { translation: zhTwTrans },
  'ja-JP': { translation: jaJpTrans }
}

export function fallbackLng(code = 'en'): string[] {
  const codeLngMap: Record<LangIdentity, [Lang]> = {
    zh: ['zh-CN'],
    en: ['en-US'],
    ja: ['ja-JP']
  }

  if (code === 'zh' || code === 'en' || code === 'ja') {
    return codeLngMap[code]
  }

  const fallbacks: Lang[] = []

  if (code.startsWith('en-')) {
    fallbacks.push('en-US')
    return fallbacks
  }

  if (code.startsWith('ja-')) {
    fallbacks.push('ja-JP')
    return fallbacks
  }

  if (code.startsWith('zh-')) {
    if (
      ['zh-tw', 'zh-hk', 'zh-mo', 'zh-hant'].includes(code.toLocaleLowerCase())
    ) {
      fallbacks.push('zh-TW')
    } else if (['zh-cn', 'zh-sg', 'zh-my'].includes(code.toLocaleLowerCase())) {
      fallbacks.push('zh-CN')
    } else {
      fallbacks.push('zh-CN')
    }

    return fallbacks
  }

  return ['en-US']
}

export async function initAuthingMFAI18n(
  options: AuthingMFAI18nOptions,
  callback: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { defaultLanguage } = options
  const detectionOrder: string[] = []
  let lng: Lang | undefined = undefined

  // 如果需要跟随浏览器语言, 则添加到监测顺序
  if (defaultLanguage === 'browser') {
    const browserLngSource = [
      'querystring',
      'cookie',
      'navigator',
      'localStorage', //不保存用户所选语言 刷新重新走浏览器语言检测
      'htmlTag',
      'path',
      'subdomain'
    ]
    detectionOrder.push(...browserLngSource)
  } else {
    // 此处 defaultLanguage 可能为 Lng 也可能是 undefined
    lng = defaultLanguage
  }

  // 统一拼装一下 i18n 的 options
  const i18nOptions: InitOptions = {
    // 默认语言
    lng,
    detection: {
      order: detectionOrder,
      lookupLocalStorage: '__authing_mfa_i18nextLng'
    },
    resources: LanguageResources,
    // 兜底语言
    fallbackLng,
    debug: false,
    interpolation: {
      escapeValue: false
    }
  }

  await i18n.use(LanguageDetector).use(initReactI18next).init(i18nOptions)

  callback(true)
}

export { i18n }
