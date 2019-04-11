# Hyper on Change

[![npm](https://img.shields.io/npm/v/hyper-on-change.svg)](https://www.npmjs.org/package/hyper-on-change)

Hyper-on-change is a `hoa` for [**Hyperapp 1**](https://github.com/jorgebucaran/hyperapp)

## Install
Just `npm install --save hyper-on-change` (or however the coolkids install modules) in your project folder.

## Example
![example gif](https://github.com/dynn/hyper-on-change/raw/master/example.gif "Example gif")
```js
import { h, app } from 'hyperapp'
import hyperOnChange from 'hyper-on-change'

const state = { zoom: 0, color: 'red' }

const actions = {
  zoomOut: value => state => ({ ...state, zoom: state.zoom - value }),
  zoomIn: value => state => ({ ...state, zoom: state.zoom + value }),
  resetZoom: _value => state => ({ ...state, zoom: 0 }),
  toggleColor: () => state => ({ ...state, color: state.color === 'red' ? 'blue' : 'red' })
}

const view = (state, actions) => {
  return h('svg', { width: 200, height: 200 }, [
    h('rect', {
      x: 50 - state.zoom / 2,
      y: 50 - state.zoom / 2,
      width: 100 + state.zoom,
      height: 100 + state.zoom,
      fill: state.color,
      stroke: 'black',
      onclick: () => actions.toggleColor()
    })
  ])
}


const appEl = document.getElementById('app')
const zoomInEl = document.getElementById('zoom-in')
const zoomOutEl = document.getElementById('zoom-out')
const zoomResetEl = document.getElementById('zoom-reset')

// Enable hyper on change
const ourApp = hyperOnChange(app)(state, actions, view, appEl)

zoomInEl.addEventListener('click', (event) => ourApp.zoomIn(1))
zoomOutEl.addEventListener('click', (event) => ourApp.zoomOut(1))
zoomResetEl.addEventListener('click', (event) => ourApp.resetZoom())

// here is where the magic happens
ourApp.onChange(state => {
  zoomResetEl.innerText = state.zoom 
})

// you can add more than one listener
ourApp.onChange(state => {
  console.log('state has changed!', state)
})

```

## License

Hyperapp is MIT licensed. See [LICENSE](LICENSE.md).
