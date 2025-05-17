import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RegisterUser from './RegisterUserPage/Register.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RegisterUser />
  </StrictMode>,
)
