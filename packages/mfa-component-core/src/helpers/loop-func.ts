import { IAuthingFunc } from '../types'

export function loopFunc(func: IAuthingFunc[] | IAuthingFunc, ...args: any[]) {
  if (Array.isArray(func)) {
    func.forEach(item => item(...args))
  } else {
    func()
  }
}
