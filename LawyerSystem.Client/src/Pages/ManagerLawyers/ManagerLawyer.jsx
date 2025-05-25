import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterClientPage from "../RegisterLawyerPage/RegisterLawyer.jsx";
import LawyerListPage from "../LawyersListPage/LawyerListPage.jsx";
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
function ManagerLawyer() {
    const [activePage, setActivePage] = useState('lista');

    return (
        <>
        <Sidebar />
        <div style={{
            width: '100%',
            maxWidth: '1000px',
            minHeight: '200px',
            maxHeight: '800px',
            margin: '0 auto',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            background: '#fff',
            display: 'flex', // se tiver sidebar e conteúdo
        }}>
            <aside style={{ width: '250px', background: '#264653', color: '#fff', padding: '20px' }}>
                <input placeholder="Pesquisar..." style={{ width: '100%', marginBottom: '20px' }} />
                <button onClick={() => setActivePage('lista')}>Lista de Advogados</button>
                <button onClick={() => setActivePage('cadastrar')}>Cadastrar Advogado</button>
            </aside>

            <main style={{ flex: 1, padding: '40px' }}>
                <AnimatePresence mode="wait">
                    {activePage === 'lista' && (
                        <motion.div
                            key="lista"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LawyerListPage />
                            
                        </motion.div>
                    )}
                    {activePage === 'cadastrar' && (
                        <motion.div
                            key="cadastrar"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <RegisterClientPage />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            </div>
        </>
    )
}

export default ManagerLawyer;