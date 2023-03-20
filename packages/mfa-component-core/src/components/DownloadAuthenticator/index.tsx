import { React } from 'shim-react'

import { Tabs } from 'shim-antd'

import { ImagePro } from '../ImagePro'

import { IAuthingPublicConfig } from 'src/types'

import { i18n } from '../../locales'

import './styles.less'

const { useMemo } = React

type DownloadType = 'ios' | 'Android'

interface AuthingMFADownloadATViewProps {
  publicConfig: IAuthingPublicConfig
}

export const AuthingMFADownloadATView: React.FC<AuthingMFADownloadATViewProps> = ({
  publicConfig
}) => {
  const cdnBase = publicConfig.cdnBase

  const downloadConfig: Record<DownloadType, any> = useMemo(() => {
    return {
      ios: {
        title: i18n.t('mfa.downloadTotpAppIOS'),
        google: `${cdnBase}/GoogleAuthenticator-Apple.png`,
        microsoft: `${cdnBase}/MicrosoftAuthenticator-Apple.png`
      },
      Android: {
        title: i18n.t('mfa.downloadTotpAppAndroid'),
        google: `${cdnBase}/GoogleAuthenticator-Authing.png`,
        microsoft: `${cdnBase}/MicrosoftAuthenticator-Baidu.png`
      }
    }
  }, [publicConfig.cdnBase])

  const renderTab = useMemo(() => {
    return (Object.keys(downloadConfig) as DownloadType[]).map<React.ReactNode>(
      (value: DownloadType, index: number) => (
        <Tabs.TabPane
          tab={downloadConfig[value].title}
          key={index}
          className="g2-mfa-download-at-tab"
        >
          <span className="g2-mfa-totp-download-subtitle">{i18n.t('mfa.downloadTotpAppDocs')}</span>
          <div className="g2-mfa-totp-download-qrcode">
            <div className="g2-mfa-totp-download-qrcode-item">
              <ImagePro
                width={120}
                height={120}
                className="g2-mfa-totp-download-image"
                src={downloadConfig[value].google}
                alt="Google Authenticator"
              />
              <span className="g2-mfa-totp-download-qrcode-text">Google Authenticator</span>
            </div>
            <div className="g2-mfa-totp-download-qrcode-item">
              <ImagePro
                width={120}
                height={120}
                className="g2-mfa-totp-download-image"
                src={downloadConfig[value].microsoft}
                alt="Microsoft Authenticator"
              />
              <span className="g2-mfa-totp-download-qrcode-text">Microsoft Authenticator</span>
            </div>
          </div>
        </Tabs.TabPane>
      )
    )
  }, [downloadConfig])

  return (
    <div className="g2-view-tabs g2-mfa-totp-download-tabs">
      <Tabs defaultActiveKey="ios">{renderTab}</Tabs>
    </div>
  )
}
