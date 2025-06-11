import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext.jsx';

import InitialPageRedirect from './Pages/InitialPageRedirect'; 
import ManagerCases from './Pages/Cases/ManagerCases/ManagerCases';
import ManagerClient from './Pages/Lawyers/ManagerClients/ManagerClients.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ManagerLawyer from './Pages/Lawyers/ManagerLawyers/ManagerLawyer.jsx';
import ClientProfile from './Pages/Client/ClientProfile/ClientProfile.jsx';
import ProfilePage from './Pages/ProfilePage/ProfilePage.jsx';

const theme = createTheme();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/managerCases" element={<ManagerCases />} />
                        <Route path="/managerLawyer" element={<ManagerLawyer />} />
                        <Route path="/initialpage" element={<InitialPageRedirect />} />
                        <Route path="/managerClient" element={<ManagerClient />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<Navigate to="/initialpage" replace />} />
                    </Routes>
                    <ToastContainer />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
