export function delay(timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })
}
