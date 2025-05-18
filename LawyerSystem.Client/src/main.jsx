import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import RegisterUser from './Components/RegisterUserPage/Register.jsx';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterUser />} />
                <Route path="/app" element={<App />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
