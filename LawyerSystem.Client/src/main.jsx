import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './Context/AuthContext.jsx';
import ManagerCases from './Pages/Cases/ManagerCases/ManagerCases';
import ManagerClient from './Pages/Lawyers/ManagerClients/ManagerClients.jsx';
import InitialPage from './Pages/Lawyers/InitialPage/InitialPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ManagerLawyer from './Pages/Lawyers/ManagerLawyers/ManagerLawyer.jsx';
import ClientCases from './Pages/Client/ClientCases/ClientCases.jsx';
import ClientProfile from './Pages/Client/ClientProfile/ClientProfile.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ToastContainer />
                <Routes>
                    {/* Rota de Login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rotas do Advogado / Gerente */}
                    <Route path="/initialpage" element={<InitialPage />} />
                    <Route path="/managerCases" element={<ManagerCases />} />
                    <Route path="/managerClient" element={<ManagerClient />} />
                    <Route path="/managerLawyer" element={<ManagerLawyer />} />
                    {/* Adicione uma rota para o perfil do advogado quando tiver a página */}
                    {/* <Route path="/manager/profile/:id" element={<ManagerProfile />} /> */}

                    {/* Rotas do Cliente */}
                    <Route path="/client/cases" element={<ClientCases />} />
                    <Route path="/client/profile/:id" element={<ClientProfile />} />

                    {/* Rota Inicial */}
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)