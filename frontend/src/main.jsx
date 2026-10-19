import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Yahan apni saari CSS files import karo
import './styles/common.css' 
import './styles/home.css'
import './styles/explore.css'
import './styles/details.css'
import './styles/booking.css';
import './styles/dashboard.css'
import './styles/about.css'
import './styles/contact.css'
// ... jo bhi files hain

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)