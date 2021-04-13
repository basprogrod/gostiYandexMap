import 'regenerator-runtime/runtime'
import 'core-js/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'

import './styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('yaps')
)

const arr = []
for (let i = 0; i < 9; i++) {
  arr.push([i])
}

console.log(arr)
