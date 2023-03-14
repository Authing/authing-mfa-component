import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'

export interface IRenderer {
  container: Element,
  element: ReactElement | string
}

const render = (renderer: IRenderer) => {
  const { container, element } = renderer
  
  if (typeof element === 'string') {
    container.innerHTML = element
    return
  }
  
  return ReactDOM.render(element, container)
}

export {
  React,
  render
}
