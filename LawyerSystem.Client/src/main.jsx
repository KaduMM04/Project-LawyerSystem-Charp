import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import { AuthProvider } from './Context/AuthContext.jsx';
import ManagerCases from './Pages/Cases/ManagerCases/ManagerCases';
import ManagerClient from './Pages/Lawyers/ManagerClients/ManagerClients/ManagerClientPage.jsx'; 
import InitialPage from './Pages/LoginPage/LoginPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ManagerLawyer from './Pages/Lawyers/ManagerLawyers/ManagerLawyer.jsx';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <AuthProvider>
            <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/managerCases" element={<ManagerCases />} />
                    <Route path="/managerLawyer" element={<ManagerLawyer />} />
                    <Route path="/initialpage" element={<InitialPage />} />
                    <Route path="/managerClient" element={<ManagerClient />} />"
                </Routes>
                <ToastContainer />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
