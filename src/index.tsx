import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './index.scss'

async function setup() {
  if (process.env.NODE_ENV === 'development') {
    const worker = await import('./mock/browser')
    worker.default.start()
  }

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

setup()
