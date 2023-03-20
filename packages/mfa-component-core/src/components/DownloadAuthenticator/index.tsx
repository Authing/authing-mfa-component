import { React } from 'shim-react'
import { Tabs } from 'shim-antd'
// import { useTranslation } from 'react-i18next'
import { ImagePro } from '../ImagePro'
import './styles.less'
import { IAuthingPublicConfig } from 'src/types'
import { i18n } from '../../locales'
// import { useGuardModule, useGuardPublicConfig } from '../_utils/context'
// import { BackCustom } from '../Back'

// import { useGuardView } from '../Guard/core/hooks/useGuardView'
const { useMemo } = React

type DownloadType = 'ios' | 'Android'

interface GuardDownloadATViewProps {
  authingPublicConfig: IAuthingPublicConfig
}

export const GuardDownloadATView: React.FC<GuardDownloadATViewProps> = ({
  authingPublicConfig
}) => {
  // useGuardView()

  // const { t } = useTranslation()

  // const publicConfig = useGuardPublicConfig()

  // const { backModule } = useGuardModule()

  const cdnBase = authingPublicConfig?.cdnBase

  const downloadConfig: Record<DownloadType, any> = useMemo(
    () => ({
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
    }),
    [cdnBase]
  )

  const renderTab = useMemo(
    () =>
      (Object.keys(downloadConfig) as DownloadType[]).map<React.ReactNode>(
        (value: DownloadType, index: number) => (
          <Tabs.TabPane
            tab={downloadConfig[value].title}
            key={index}
            className="g2-mfa-download-at-tab"
          >
            <span className="g2-mfa-totp-download-subtitle">
              {i18n.t('mfa.downloadTotpAppDocs')}
            </span>
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
      ),
    [downloadConfig]
  )

  // const renderBack = useMemo(() => {
  //   const onBack = () => backModule?.()

  //   return <BackCustom onBack={onBack}>{t('common.backToMFA')}</BackCustom>
  // }, [backModule, t])

  return (
    <div className="g2-view-tabs g2-mfa-totp-download-tabs">
      <Tabs defaultActiveKey="ios">{renderTab}</Tabs>
    </div>
  )
}
