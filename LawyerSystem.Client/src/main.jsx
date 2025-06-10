import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AuthProvider } from './Context/AuthContext.jsx';
import ManagerCases from './Pages/Cases/ManagerCases/ManagerCases';
import ManagerClient from './Pages/Lawyers/ManagerClients/ManagerClients.jsx';
import InitialPage from './Pages/Lawyers/InitialPage/InitialPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ManagerLawyer from './Pages/Lawyers/ManagerLawyers/ManagerLawyer.jsx';

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
                        <Route path="/initialpage" element={<InitialPage />} />
                        <Route path="/managerClient" element={<ManagerClient />} />
                    </Routes>
                    <ToastContainer />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);