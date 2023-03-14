import React, { ReactNode } from 'react'
import { createRoot, Root } from 'react-dom/client'

export interface IRenderer {
  container: Element,
  element: ReactNode
}

interface ICachedRoot {
  container: Element
  root: Root
}

const cachedRoots: ICachedRoot[] = []

const render = (renderer: IRenderer) => {
  const { container, element } = renderer

  if (typeof element === 'string') {
    container.innerHTML = element
    return
  }

  const cache = cachedRoots.find(item => {
    return item.container === container
  })

  if (cache) {
    return cache.root.render(element)
  }

  const root: Root = createRoot(container)
  cachedRoots.push({
    container,
    root
  })
  root.render(element)
}

export {
  React,
  render
}
