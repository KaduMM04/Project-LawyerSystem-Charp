import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import { AuthProvider } from './Context/AuthContext.jsx';

import InitialPage from './Pages/InitialPage/InitialPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import RegisterClientPage from './Pages/RegisterClientPage/RegisterClientPage.jsx';
import App from './App.jsx';
import ManagerLawyer from './Pages/ManagerLawyers/ManagerLawyer.jsx';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <AuthProvider>
            <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/managerLawyer" element={<ManagerLawyer />} />
                    <Route path="/initialpage" element={<InitialPage />} />
                <Route path="/" element={<RegisterClientPage />} />"
                <Route path="/app" element={<App />} />
                </Routes>
                <ToastContainer />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
