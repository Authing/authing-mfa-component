import { React, render } from 'shim-react'

import { AuthingMFAComponent } from './src/components'

import { IMFAInitData, IAuthingPublicConfig } from './src/types'

function Example () {
  const initData: IMFAInitData = {
    "mfaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzkiLCJ1c2VySWQiOiI2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJhcm4iOiJhcm46Y246YXV0aGluZzo2MmUyMjFmODVmNWFjNWNjNDcwMzdhMzk6dXNlcjo2NDEwMmZlYWJiZWQ1MTNiZjAzNjk5OTAiLCJzdGFnZSI6MX0sImlhdCI6MTY3ODk0NTc5MSwiZXhwIjoxNjc4OTQ2MTUxfQ.vmFQ6Vb2Ykmm4M4F70LjKqp1R8yxA8o15g_YLJkTJYY",
		"nickname": '',
		"email": '',
		"phone": '',
		"phoneCountryCode": '',
		"mfaPhone": "17610800803",
		"mfaEmail": '',
		"mfaPhoneCountryCode": "+86",
		"username": "test6",
		"avatar": "https://files.authing.co/authing-console/default-user-avatar.png",
		"faceMfaEnabled": false,
		"totpMfaEnabled": false,
		"applicationMfa": [{
			"mfaPolicy": "EMAIL",
			"status": 1,
			"sort": 0
		}, {
			"mfaPolicy": "FACE",
			"status": 1,
			"sort": 0
		}, {
			"mfaPolicy": "OTP",
			"status": 1,
			"sort": 0
		}, {
			"mfaPolicy": "SMS",
			"status": 1,
			"sort": 0
		}],
		"customPasswordStrength": {
			"enabled": false,
			"zhMessageOpen": false,
			"enMessageOpen": false,
			"twMessageOpen": false,
			"jpMessageOpen": false
		},
		"passwordStrength": 0
  }

  const authingPublicConfig: IAuthingPublicConfig = {
		// @ts-ignore
    "allowedOrigins": [],
		"corsWhitelist": ["https://core.authing.cn", "https://*.authing.cn", "https://*.authing.co"],
		"userPoolInWhitelist": true,
		"skipComplateFileds": false,
		"complateFiledsPlace": ["login"],
		"extendsFields": [{
			"key": "name",
			"label": "姓名",
			"labelEn": "Name",
			"description": "OIDC 标准字段",
			"dataType": "STRING",
			"options": null,
			"userPoolId": "620e163a0de8b8d78fb85c14",
			"targetType": "USER",
			"userVisible": true,
			"adminVisible": true,
			"accessControl": true,
			"validateRules": [{
				"type": "None",
				"content": "",
				"error": ""
			}],
			"isBase": true,
			"i18n": {
				"label": {
					"en-US": {
						"enabled": true,
						"value": "Name"
					},
					"zh-CN": {
						"enabled": true,
						"value": "姓名"
					},
					"zh-TW": {
						"enabled": true,
						"value": "姓名"
					},
					"ja-JP": {
						"enabled": true,
						"value": "名前"
					}
				}
			},
			"type": "internal",
			"inputType": "text",
			"name": "name",
			"required": true,
			"index": 0
		}, {
			"key": "gender",
			"labelEn": "Gender",
			"description": "性别",
			"dataType": "STRING",
			"options": null,
			"userPoolId": "62da9e11813e559d59f3fc21",
			"targetType": "USER",
			"userVisible": true,
			"adminVisible": true,
			"accessControl": true,
			"validateRules": [],
			"isBase": true,
			"i18n": {
				"label": {
					"en-US": {
						"enabled": true,
						"value": "Gender"
					},
					"zh-CN": {
						"enabled": true,
						"value": "性别"
					},
					"zh-TW": {
						"enabled": true,
						"value": "性別"
					},
					"ja-JP": {
						"enabled": true,
						"value": "性別"
					}
				}
			},
			"type": "internal",
			"inputType": "select",
			"name": "gender",
			"required": true,
			"index": 1
		}, {
			"type": "internal",
			"inputType": "text",
			"name": "city",
			"required": true,
			"validateRules": [{
				"type": "None",
				"content": "",
				"error": ""
			}]
		}, {
			"type": "internal",
			"inputType": "text",
			"name": "province",
			"required": true,
			"validateRules": [{
				"type": "None",
				"content": "",
				"error": ""
			}]
		}],
		"extendsFieldsEnabled": false,
		"extendsFieldsI18n": {
			"name": {
				"zh-CN": {
					"enabled": true,
					"value": "姓名"
				},
				"en-US": {
					"enabled": true,
					"value": "Name"
				},
				"zh-TW": {
					"enabled": true,
					"value": "姓名"
				},
				"ja-JP": {
					"enabled": true,
					"value": "名前"
				}
			},
			"gender": {
				"en-US": {
					"enabled": true,
					"value": "Gender"
				},
				"zh-CN": {
					"enabled": true,
					"value": "性别"
				},
				"zh-TW": {
					"enabled": true,
					"value": "性別"
				},
				"ja-JP": {
					"enabled": true,
					"value": "性別"
				}
			},
			"city": {
				"en-US": {
					"enabled": true,
					"value": "City"
				},
				"zh-CN": {
					"enabled": true,
					"value": "城市"
				},
				"zh-TW": {
					"enabled": true,
					"value": "城市"
				},
				"ja-JP": {
					"enabled": true,
					"value": "市"
				}
			},
			"province": {
				"en-US": {
					"enabled": true,
					"value": "Province"
				},
				"zh-CN": {
					"enabled": true,
					"value": "省份"
				},
				"zh-TW": {
					"enabled": true,
					"value": "省份"
				},
				"ja-JP": {
					"enabled": true,
					"value": "省"
				}
			}
		},
		"cdnBase": "https://files.authing.co/authing-user-portal",
		"id": "630ed3137dd6f2fd7001da24",
		"template": null,
		"userPoolId": "62e221f85f5ac5cc47037a39",
		"description": null,
		"identifier": "test-auth-zhaoyiming",
		"showAuthorizationPage": false,
		"publicKey": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb\n5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae\n+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM\nGKl64GDcIq3au+aqJQIDAQAB\n-----END PUBLIC KEY-----\n",
		"name": "test-auth-zhaoyiming",
		"css": "#authing-guard-container {\n         display: flex;\n         align-items: center;\n         justify-content: center;\n       }\n/*\n[class*=authing-].authing-ant-tabs-tab.authing-ant-tabs-tab-active .authing-ant-tabs-tab-btn {\n\tcolor: red;\n}\n\n[class*=authing-][class*=authing-].authing-ant-btn-link.guard-button-link-like {\n\tcolor: red;\n}\n\n.g2-tips-line .link-like {\n\tcolor: red;\n}\n\n.g2-tips-line .link-like:hover {\n\tcolor: orange;\n}\n\n[class*=authing-].authing-ant-btn-primary {\n\tbackground-color: red;\n  \tborder-color: red;\n}\n\n[class*=authing-].authing-ant-btn-primary:hover {\n\tbackground-color: orange;\n  \tborder-color: orange;\n}\n\n[class*=authing-].authing-ant-btn-primary:focus, [class*=authing-].authing-ant-btn-primary:hover {\n\tbackground-color: orange;\n}\n*/",
		"logo": "https://files.authing.co/user-contents/photos/1273ed68-949b-448b-b552-ce807704f384.png",
		"userpoolLogo": "https://files.authing.co/authing-console/default-userpool-logo.ico",
		"userpoolName": "user-pool-zhaoyiming",
		"selfUnlockStrategy": "password-captcha",
		"ssoPageComponentDisplay": {
			"loginMethodNav": true,
			"loginByPhoneCodeTab": true,
			"loginByUserPasswordTab": true,
			"wxMpScanTab": true,
			"userPasswordInput": true,
			"phoneCodeInput": true,
			"forgetPasswordBtn": true,
			"loginBtn": true,
			"registerBtn": true,
			"socialLoginBtns": true,
			"idpBtns": true,
			"registerMethodNav": true,
			"registerByPhoneTab": true,
			"registerByEmailTab": true,
			"autoRegisterThenLoginHintInfo": false,
			"loginMethodsI18nDisplaySettings": {
				"password": {
					"tab": {
						"default": "密码登录",
						"i18n": {
							"zh-CN": "密码登录",
							"en-US": "Password",
							"zh-TW": "帳號",
							"ja-JP": "既にアカウントをお持ち"
						}
					}
				},
				"verifyCode": {
					"tab": {
						"default": "验证码登录",
						"i18n": {
							"zh-CN": "验证码登录",
							"en-US": "Verify Code",
							"zh-TW": "驗證碼登入",
							"ja-JP": "認証コード登録"
						}
					}
				}
			}
		},
		"registerDisabled": false,
		"loginTabs": {
			"list": ["phone-code", "password", "app-qrcode", "wechatmp-qrcode", "wechat-miniprogram-qrcode"],
			"default": "phone-code",
			"title": {
				"password": "密码登录",
				"phone-code": "验证码登录",
				"wechat-miniprogram-qrcode": "扫码登录",
				"app-qrcode": "扫码登录",
				"ldap": "LDAP 登录",
				"ad": "AD 登录",
				"wechatmp-qrcode": "公众号关注登录",
				"authing-otp-push": "推送登录"
			}
		},
		"qrcodeTabsSettings": {
			"wechatmp-qrcode": [{
				"id": "633d0c7b3668875de21796fa",
				"title": "微信公众号关注",
				"isDefault": false
			}],
			"wechat-miniprogram-qrcode": [{
				"id": "63bbb5cfa0ca107fed14bf15",
				"title": "PC 小程序扫码1",
				"isDefault": false
			}]
		},
		"registerTabs": {
			"list": ["emailCode", "phone", "phone-password", "email", "username-password"],
			"default": "emailCode",
			"title": {
				"email": "邮箱注册",
				"emailCode": "邮箱验证码注册",
				"phone": "手机号注册"
			}
		},
		"socialConnections": [{
			"id": "630db7e681fdc33c8befea00",
			"provider": "wechat:webpage-authorization",
			"identifier": "authing-official-account",
			"name": "微信网页授权",
			"name_en": "WeChat Web Page",
			"authorizationUrl": "https://core.authing.cn/connection/social/authing-official-account/62e221f85f5ac5cc47037a39",
			"tooltip": {
				"zh-CN": "微信网页授权",
				"en-US": "WeChat Browser"
			},
			"displayName": "微信网页授权"
		}, {
			"id": "6320232f9ed3bf8e740e9330",
			"provider": "github",
			"identifier": "github-login-zhaoyiming",
			"name": "GitHub",
			"name_en": "GitHub",
			"authorizationUrl": "https://core.authing.cn/connection/social/github-login-zhaoyiming/62e221f85f5ac5cc47037a39",
			"tooltip": {
				"zh-CN": "GitHub",
				"en-US": "GitHub"
			},
			"displayName": "GitHub"
		}, {
			"id": "634d108506b6fcfd2f2d489f",
			"provider": "wechat:pc",
			"identifier": "pc-scan-20221017",
			"name": "PC 微信扫码",
			"name_en": "WeChat QR Code on PC",
			"authorizationUrl": "https://core.authing.cn/connection/social/pc-scan-20221017/62e221f85f5ac5cc47037a39",
			"tooltip": {
				"zh-CN": "PC 微信扫码",
				"en-US": "WeChat"
			},
			"displayName": "PC 微信扫码"
		}],
		"ecConnections": [],
		"identityProviders": [],
		"redirectUris": ["https://localhost:8000", "http://localhost:3000/callback", "https://www.baidu.com", "http://localhost:3000", "http://127.0.0.1:5500/index.html"],
		"logoutRedirectUris": ["https://www.baidu.com"],
		"protocol": "oidc",
		"oidcConfig": {
			"grant_types": ["authorization_code", "refresh_token"],
			"response_types": ["code"],
			"id_token_signed_response_alg": "HS256",
			"token_endpoint_auth_method": "none",
			"introspection_endpoint_auth_method": "none",
			"revocation_endpoint_auth_method": "none",
			"authorization_code_expire": 600,
			"id_token_expire": 50000,
			"access_token_expire": 1000000,
			"refresh_token_expire": 10000,
			"cas_expire": 10,
			"skip_consent": true,
			"redirect_uris": ["https://localhost:8000", "http://localhost:3000/callback", "https://www.baidu.com", "http://localhost:3000", "http://127.0.0.1:5500/index.html"],
			"post_logout_redirect_uris": ["https://www.baidu.com"],
			"client_id": "630ed3137dd6f2fd7001da24",
			"skip_implicit_flow_rules": true,
			"scope": "openid profile email phone offline_access"
		},
		"oauthConfig": {
			"id": "630ed3137dd6f2fd7001da24",
			"redirect_uris": ["https://localhost:8000", "http://localhost:3000/callback", "https://www.baidu.com", "http://localhost:3000", "http://127.0.0.1:5500/index.html"],
			"grants": ["authorization_code"],
			"access_token_lifetime": 1209600,
			"refresh_token_lifetime": 2592000,
			"introspection_endpoint_auth_method": "client_secret_post",
			"revocation_endpoint_auth_method": "client_secret_post"
		},
		"samlConfig": null,
		"casConfig": null,
		"rootUserPoolId": "59f86b4832eb28071bdd9214",
		"enableSubAccount": false,
		"packageType": -1,
		"customBrandingEnabled": true,
		"userPortal": {
			"title": "登录",
			"favicon": "",
			"cdnBase": "https://files.authing.co/authing-user-portal",
			"assetsBase": "//cdn.authing.co/authing-fe-user-portal",
			"assetsVersion": "2.29.152",
			"icpRecord": "京ICP备19051205号-7",
			"isTsinghuaUniversity": false,
			"isBetaLaunchpad": true,
			"psbRecord": "京公网安备 11040102700068号",
			"poweredBy": {
				"logo": "//files.authing.co/authing-console/authing-logo-new.svg",
				"name": "Authing",
				"link": "https://authing.cn"
			},
			"guard": {
				"default": "v1",
				"newApp": "v2"
			},
			"projectName": "authing-user-portal",
			"personalCenterMenu": [],
			"enableAuthentication": true,
			"defaultLang": "browser",
			"ga": {
				"enabled": true,
				"gTrackingId": "G-5XE1T3D4BC"
			},
			"gaGuardV1": {
				"enabled": true,
				"gTrackingId": "G-KZ169Z0S2B"
			},
			"volcengine": {
				"enabled": true,
				"id": 350504
			},
			"insertStylesWhiteList": ["61834a5e0188959e6dd04d09"],
			"insertStylesWhiteListByUserPool": [],
			"posthog": {
				"enabled": false,
				"api": "https://insight.authing-inc.co",
				"id": "phc_pXgF6WRyABkbyOL1DoAh8PKzMMLNg6ewzsNwnlqcEQ0"
			},
			"mfa": {
				"faceScore": 0.65
			}
		},
		"websocket": "https://core.authing.cn",
		"verifyCodeLength": 6,
		"agreementEnabled": true,
		"agreements": [{
			"id": 1683,
			"userPoolId": "62e221f85f5ac5cc47037a39",
			"appId": "630ed3137dd6f2fd7001da24",
			"title": "我已阅读并同意隐私协议与服务条款",
			"lang": "zh-CN",
			"required": true,
			"order": 0,
			"availableAt": 2
		}],
		"passwordStrength": 0,
		"customPasswordStrength": {
			"enabled": false,
			"regex": null,
			"message": null,
			"zhMessage": null,
			"enMessage": null,
			"zhMessageOpen": false,
			"enMessageOpen": false,
			"twMessage": null,
			"jpMessage": null,
			"twMessageOpen": false,
			"jpMessageOpen": false
		},
		"api": {
			"headers": {
				"keys": {
					"userpool-id": "x-authing-userpool-id",
					"tenant-id": "x-authing-app-tenant-id",
					"app-id": "x-authing-app-id",
					"sdk-version": "x-authing-sdk-version",
					"request-from": "x-authing-request-from",
					"lang": "x-authing-lang",
					"oauth-accesstoken": "x-authing-oauth-accesstoken",
					"oauth-code": "x-authing-oauth-code",
					"oidc-accesstoken": "x-authing-oidc-accesstoken",
					"oidc-code": "x-authing-oidc-code",
					"webhook-secret": "x-authing-webhook-secret",
					"token": "x-authing-token"
				}
			}
		},
		"loginFailCheckEnabled": false,
		"passwordTabConfig": {
			"enabledLoginMethods": ["phone-password", "email-password", "username-password"],
			"validLoginMethods": ["phone-password", "email-password", "username-password"],
			"validRegisterMethods": ["phone-password", "email-password", "username-password"]
		},
		"verifyCodeTabConfig": {
			"enabledLoginMethods": ["email-code", "phone-code"],
			"validLoginMethods": ["email-code", "phone-code"],
			"validRegisterMethods": ["email-code", "phone-code"]
		},
		"authingOtpPushTabConfig": {
			"enabledLoginMethods": [],
			"validLoginMethods": ["email", "phone", "phone", "email", "username"],
			"validRegisterMethods": []
		},
		"changeEmailStrategy": {
			"verifyOldEmail": true
		},
		"changePhoneStrategy": {
			"verifyOldPhone": true
		},
		"userPoolType": "B2B",
		"sceneCode": "B2C",
		"welcomeMessage": null,
		"docs": {
			"host": "https://docs.authing.cn/v2"
		},
		"requestHostname": "mlbkhepjgjiihaap.authing.cn",
		"customLoading": null,
		"internationalSmsConfig": null,
		"loadingBackground": "rgba(42,58,154,1)",
		"asa": {
			"plugin": {
				"version": "0.0.11",
				"cdnBase": "//cdn.authing.co/packages/asa"
			},
			"windowsServiceUrl": "http://localhost:54321/"
		},
		"enableCompletePassword": false,
		"enableLoginAccountSwitch": true,
		"appType": "web",
		"enableAppLogin": false,
		"enableFaceLogin": false,
		"enableFingerprintLogin": false,
		"livingAuthSortConfig": null,
		"enableUnionDomain": false,
		"ssoEnabled": true,
		"isTenantConsole": false,
		"isTenantDefault": false,
		"custom": {
			"isBetaLaunchpad": true
		},
		"qrCodeSortConfig": {
			"loginMethodsSort": ["app-qrcode", "633d0c7b3668875de21796fa", "63bbb5cfa0ca107fed14bf15"]
		},
		"tabMethodsFields": [{
			"key": "username",
			"label": "用户名",
			"labelEn": "Username",
			"i18n": {
				"en-US": "Username",
				"zh-CN": "用户名",
				"zh-TW": "使用者名",
				"ja-JP": "ユーザー名"
			}
		}, {
			"key": "phone",
			"label": "手机号",
			"labelEn": "Phone",
			"i18n": {
				"en-US": "Phone",
				"zh-CN": "手机号",
				"zh-TW": "手機號碼",
				"ja-JP": "携帯電話番号"
			}
		}, {
			"key": "email",
			"label": "邮箱",
			"labelEn": "Email",
			"i18n": {
				"en-US": "Email",
				"zh-CN": "邮箱",
				"zh-TW": "電子郵件",
				"ja-JP": "メール"
			}
		}],
		"regexRules": [{
			"key": "phone",
			"appLevel": "",
			"userpoolLevel": ""
		}],
		"customScope": [],
		"defaultAppId": "62e221f8e5b2308bf5dcb14a",
		"posthog": {
			"enabled": false,
			"api": "https://insight.authing-inc.co",
			"id": "phc_pXgF6WRyABkbyOL1DoAh8PKzMMLNg6ewzsNwnlqcEQ0"
		},
		"mfa": {
			"faceScore": 0.65
		},
		"customSecurityEnabled": true,
		"appRobotVerify": "condition_set",
		"userpoolRobotVerify": "condition_set"
	}
  
  return <>
    <AuthingMFAComponent initData={initData} authingPublicConfig={authingPublicConfig}></AuthingMFAComponent>
  </>
}


render({
  container: document.querySelector('#root') as Element,
  element: <Example></Example>
})
