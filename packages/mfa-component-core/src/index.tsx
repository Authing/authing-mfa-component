import { React, render, unmount } from 'shim-react'

import { AuthingMFAComponent } from './components'

import {
  IAuthingMFAOptions,
  IAuthingMFAEvent,
  IAuthingMFAEventHandler,
  IAuthingMFATriggerData,
  IStartProps,
  IAuthingMFAComponentProps
} from './types'

import { delay } from './helpers'

export * from './types'

export class AuthingMFA {
  private _options: IAuthingMFAOptions
  private _el: Element | null = null
  private _mfaTriggerData: IAuthingMFATriggerData | null = null
  private _events: IAuthingMFAEvent = {}

  public static Component = AuthingMFAComponent

  constructor(options: IAuthingMFAOptions) {
    this._options = options
  }

  start(props: IStartProps) {
    const { el, mfaTriggerData } = props
    this._el = el
    this._mfaTriggerData = mfaTriggerData

    this._render()
  }

  unmount() {
    if (this._el) {
      unmount(this._el)
    }
  }

  on(eventName: string, eventHandler: IAuthingMFAEventHandler) {
    if (!Array.isArray(this._events[eventName])) {
      this._events[eventName] = []
    }
    this._events[eventName].push(eventHandler)
  }

  emit(...args: any[]) {
    const eventName = args.shift()

    if (!Array.isArray(this._events[eventName])) {
      return
    }

    this._events[eventName].forEach(handler => {
      handler.apply(this, args)
    })
  }

  private async _render() {
    if (!this._el || !this._mfaTriggerData) {
      return
    }

    await delay(0)

    const events: IAuthingMFAEvent = {}

    Object.keys(this._events).forEach(eventName => {
      const _eventName = 'on' + eventName.slice(0, 1).toUpperCase() + eventName.slice(1)
      events[_eventName] = this._events[eventName]
    })

    const componentProps: IAuthingMFAComponentProps = {
      appId: this._options.appId,
      host: this._options.host || '',
      mfaTriggerData: this._mfaTriggerData,
      mode: this._options.mode || 'normal',
      ...events
    }

    if (this._options.lang) {
      componentProps.lang = this._options.lang
    }

    const style = this._options.style || {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    return render({
      container: this._el,
      element: (
        <div style={style}>
          <AuthingMFAComponent {...componentProps}></AuthingMFAComponent>
        </div>
      )
    })
  }

  show() {
    this.unmount()
    this._render()
  }

  hide() {
    this.unmount()
  }
}
