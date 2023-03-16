export const GenerateSvg = (svgString: string) => {
  const svgDOM = () => {
    const tempDiv = document.createElement('div')

    tempDiv.innerHTML = svgString

    const tempSVG = tempDiv.getElementsByTagName('svg')[0]

    tempSVG.setAttribute('aria-hidden', 'true')
    tempSVG.setAttribute('crossorigin', 'true')
    tempSVG.id = 'guard-svg-string'
    tempSVG.style.position = 'absolute'
    tempSVG.style.width = '0'
    tempSVG.style.height = '0'
    tempSVG.style.overflow = 'hidden'

    const body = document.body

    body.firstChild ? body.insertBefore(tempSVG, body.firstChild) : body.appendChild(tempSVG)
  }

  const readyState = document.readyState

  if (['complete', 'loaded', 'interactive'].includes(readyState)) {
    setTimeout(() => {
      svgDOM()
    }, 0)
  } else {
    const loadedFn = function () {
      document.removeEventListener('DOMContentLoaded', loadedFn)

      svgDOM()
    }

    document.addEventListener('DOMContentLoaded', loadedFn)
  }
}
