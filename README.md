# Authing Continuous Adaptive MFA Component

<div align=center>
  <img width="250" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<div align="center">
  <a href="javascript:;"><img src="https://img.shields.io/badge/test-passing-brightgreen" /></a>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/License-MIT-success" alt="License"></a>
  <a href="javascript:;" target="_blank"><img src="https://img.shields.io/badge/node-%3E=12-green.svg" alt="Node"></a>
</div>

English | [简体中文](./README-zh_CN.md)

## What is MFA？

MFA, fully known as Multifactor Authentication, also known as mandatory authentication, is a security measure that combines two or more different authentication factors to protect the identity and information security of users

In MFA, users need to provide two or more different authentication factors to pass authentication. For example, a user needs to provide a password and biometric identification to log in to the system, or a user needs to provide a hardware token and phone verification code to complete an important operation.

MFA is a security measure that can improve the security of authentication and protect the identity and information of users.

## What is Adaptive MFA？

Adaptive MFA (Adaptive Multi Factor Authentication) is a security authentication technology that uses multiple authentication factors to ensure the identity of users. Unlike traditional MFA, Adaptive MFA can adaptively choose which authentication factors to use based on the context in which the user logs in

Adaptive MFA can analyze the user's login environment and behavior patterns, and select appropriate authentication factors for authentication, thereby improving security and user experience. For example, if a user logs in from a commonly used device and network, and there are no abnormal behavior patterns, they can only use a password for authentication; If a user logs in from an infrequent device or network, they may need to use more authentication factors for authentication.

## Authing MFA core features

- Authoring ensures business security through various authentication methods (SMS authentication/email authentication/OTP authentication/face recognition authentication).
- Support multi-source behavioral environment data reporting and multi-dimensional analysis of security levels.
- Support visual orchestration of security policies to achieve environmental risk adaptation.
- Advanced continuous adaptive mode is provided to achieve multifactor authentication protection in more scenarios (such as resource access scenarios).
- Provide SDK and open interfaces to help developers quickly invoke relevant capabilities.

## Ecosystem

|Project|Status|Description
|-----|----|----|
|@authing/mfa-component-react|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-react.svg)](https://www.npmjs.com/package/@authing/mfa-component-react)|MFA component for React|
|@authing/mfa-component-react18|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-react18.svg)](https://www.npmjs.com/package/@authing/mfa-component-react18)|MFA component for React 18|
|@authing/mfa-component-vue2|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-vue2.svg)](https://www.npmjs.com/package/@authing/mfa-component-vue2)|MFA component for Vue 2|
|@authing/mfa-component-vue3|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-vue3.svg)](https://www.npmjs.com/package/@authing/mfa-component-vue3)|MFA component for Vue 3|
|@authing/mfa-component-angular|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-angular.svg)](https://www.npmjs.com/package/@authing/mfa-component-angular)|MFA component for Angular|
|@authing/mfa-component-native|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-native.svg)](https://www.npmjs.com/package/@authing/mfa-component-native)|MFA component for JavaScript|


## Environment Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Questions

For questions and support please use the [official forum](https://forum.authing.cn/). The issue list of this repo is exclusively for bug reports and feature requests.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/Authing/authing-mfa-component/releases).

## Contribution

- Fork it
- Create your feature branch (git checkout -b my-new-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push -u origin my-new-feature)
- Create new Pull Request

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023 Authing

## Links

- [Guard](https://github.com/authing/Guard)
- [authing-js-sdk](https://github.com/Authing/authing-js-sdk)
- [AuthingMove](https://github.com/authing/authingmove)
- [authingmove-template](https://github.com/Authing/authingmove-template)
