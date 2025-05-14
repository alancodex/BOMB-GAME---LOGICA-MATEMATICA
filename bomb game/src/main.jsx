import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Estilos globais inline
const globalStyles = {
  body: {
    margin: '0',
    padding: '0',
    backgroundColor: '#1a1a1a',
    fontFamily: 'Arial, sans-serif'
  },
  html: {
    overflowX: 'hidden'
  }
};

// Aplicando estilos globais dinamicamente
document.body.style.margin = globalStyles.body.margin;
document.body.style.padding = globalStyles.body.padding;
document.body.style.backgroundColor = globalStyles.body.backgroundColor;
document.body.style.fontFamily = globalStyles.body.fontFamily;
document.documentElement.style.overflowX = globalStyles.html.overflowX;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)