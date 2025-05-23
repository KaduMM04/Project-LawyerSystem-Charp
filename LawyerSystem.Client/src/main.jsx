import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import RegisterLawyer from './Pages/RegisterLawyerPage/RegisterLawyer.jsx';
import InitialPage from './Pages/InitialPage/InitialPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import RegisterClientPage from './Pages/RegisterClientPage/RegisterClientPage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={ <LoginPage />} />
                <Route path="/initialpage" element={<InitialPage />} />
                <Route path="/registerlawyer" element={<RegisterLawyer />} />
                <Route path="/" element={<RegisterClientPage />} />"
                <Route path="/app" element={<App />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
