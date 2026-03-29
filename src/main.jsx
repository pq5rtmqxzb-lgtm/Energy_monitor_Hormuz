import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

// Polyfill window.storage for non-Claude environments
if (!window.storage) {
  window.storage = {
    async get(k) { try { const v = localStorage.getItem(k); return v ? {key:k, value:v} : null; } catch { return null; } },
    async set(k, v) { try { localStorage.setItem(k, v); return {key:k, value:v}; } catch { return null; } },
    async delete(k) { try { localStorage.removeItem(k); return {key:k, deleted:true}; } catch { return null; } },
    async list(p) { try { const keys = Object.keys(localStorage).filter(k => !p || k.startsWith(p)); return {keys}; } catch { return null; } },
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
