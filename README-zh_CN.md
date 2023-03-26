# Authing 持续性自适应 MFA 组件

<div align=center>
  <img width="250" src="https://files.authing.co/authing-console/authing-logo-new-20210924.svg" />
</div>

<div align="center">
  <a href="javascript:;"><img src="https://img.shields.io/badge/test-passing-brightgreen" /></a>
  <a href="https://forum.authing.cn/" target="_blank"><img src="https://img.shields.io/badge/chat-forum-blue" /></a>
  <a href="javascript:;"><img src="https://img.shields.io/badge/License-MIT-success" alt="License"></a>
  <a href="javascript:;" target="_blank"><img src="https://img.shields.io/badge/node-%3E=12-green.svg" alt="Node"></a>
</div>

[English](./README.md) | 简体中文

## 什么是 MFA？

MFA，全称为多因素认证（Multi-Factor Authentication），也被称为强制性身份验证（Strong Authentication），是一种安全措施，通过结合两个或更多不同的身份验证因素来保护用户的身份和信息安全。

在 MFA 中，用户需要提供两个或多个不同的身份验证因素才能通过身份验证。例如，用户需要提供密码和生物识别才能登录到系统中，或者用户需要提供硬件令牌和手机验证码才能完成某个重要操作。

MFA 是一种安全措施，可以提高身份验证的安全性，保护用户的身份和信息安全。

## 什么是 Adaptive MFA？

Adaptive MFA（Adaptive Multi-Factor Authentication）是一种安全认证技术，它使用多个身份验证因素来确保用户的身份。与传统的 MFA 不同，Adaptive MFA 可以根据用户登录的上下文环境，自适应地选择使用哪些身份验证因素。

Adaptive MFA 可以分析用户的登录环境和行为模式，选择合适的身份验证因素来进行验证，从而提高了安全性和用户体验。例如，如果用户从常用的设备和网络登录，并且没有异常的行为模式，则可以仅使用密码进行验证；而如果用户从不常用的设备或网络登录，则可能需要使用更多的身份验证因素进行验证。

## Authing MFA 核心功能

- Authing 通过多种认证方式(短信验证/电子邮箱验证/OTP 验证/人脸识别验证)保障业务安全。
- 支持多源行为环境数据上报，多维度分析安全级别。
- 支持可视化编排安全策略，实现环境风险自适应。
- 提供进阶的持续自适应模式，能够在更多场景（如资源访问场景）实现多因素认证防护。
- 提供 SDK 与开放接口，助力开发者快速调用相关能力。

## 生态系统

|项目|状态|描述
|-----|----|----|
|@authing/mfa-component-react|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-react.svg)](https://www.npmjs.com/package/@authing/mfa-component-react)|MFA 组件适用于 React|
|@authing/mfa-component-react18|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-react18.svg)](https://www.npmjs.com/package/@authing/mfa-component-react18)|MFA 组件适用于 React 18|
|@authing/mfa-component-vue2|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-vue2.svg)](https://www.npmjs.com/package/@authing/mfa-component-vue2)|MFA 组件适用于 Vue 2|
|@authing/mfa-component-vue3|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-vue3.svg)](https://www.npmjs.com/package/@authing/mfa-component-vue3)|MFA 组件适用于 Vue 3|
|@authing/mfa-component-angular|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-angular.svg)](https://www.npmjs.com/package/@authing/mfa-component-angular)|MFA 组件适用于 Angular|
|@authing/mfa-component-native|[![npm version](https://badge.fury.io/js/@authing%2Fmfa-component-native.svg)](https://www.npmjs.com/package/@authing/mfa-component-native)|MFA 组件适用于原生 JavaScript|


## 🖥 环境支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 问题反馈

如果需要在线技术支持，可访问[官方论坛](https://forum.authing.cn/). 此仓库的 issue 仅用于上报 Bug 和提交新功能特性。

## 更新日志

详细发布记录可参考[更新日志](https://github.com/Authing/authing-mfa-component/releases).

## 开源共建

- Fork 此仓库
- 创建自己的 git 分支 (git checkout -b my-new-feature)
- 提交你的修改 (git commit -am 'Add some feature')
- 将修改内容推送到远程分支 (git push -u origin my-new-feature)
- 创建一个 Pull Request

## 开源许可

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023 Authing

## 友情链接

- [Guard](https://github.com/authing/Guard)
- [authing-js-sdk](https://github.com/Authing/authing-js-sdk)
- [AuthingMove](https://github.com/authing/authingmove)
- [authingmove-template](https://github.com/Authing/authingmove-template)