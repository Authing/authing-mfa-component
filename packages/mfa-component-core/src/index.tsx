// import { React, render, unmount } from 'shim-react'

// import { AuthingMFAComponent } from './components'

// import { IAuthingMFAOptions, IAuthingMFAEvent, IAuthingMFAEventHandler } from './types'

// export * from './types'

// export class AuthingMFA {
//   private _options: IAuthingMFAOptions
//   private _el: Element | null = null
//   private _events: IAuthingMFAEvent = {}

//   public static Component = AuthingMFAComponent

//   constructor(options: IAuthingMFAOptions) {
//     this._options = options
//   }

//   start(el: Element) {
//     this._el = el
//     this.emit('load')
//     this._render()
//     this.emit('ready')
//   }

//   unmount() {
//     if (this._el) {
//       unmount(this._el)
//     }
//   }

//   on(eventName: string, eventHandler: IAuthingMFAEventHandler) {
//     if (!Array.isArray(this._events[eventName])) {
//       this._events[eventName] = []
//     }
//     this._events[eventName].push(eventHandler)
//   }

//   emit(...args: any[]) {
//     const eventName = args.shift()

//     if (!Array.isArray(this._events[eventName])) {
//       return
//     }

//     this._events[eventName].forEach(handler => {
//       handler.apply(this, args)
//     })
//   }

//   private _render() {
//     if (!this._el) {
//       return
//     }
//     return render({
//       container: this._el,
//       element: <AuthingMFAComponent></AuthingMFAComponent>
//     })
//   }
// }
