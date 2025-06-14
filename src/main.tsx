import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for development
if (import.meta.env.DEV) {
  console.log('🍁 Veteran Family Support - Development Mode')
  console.log('Supporting Canadian military families')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)