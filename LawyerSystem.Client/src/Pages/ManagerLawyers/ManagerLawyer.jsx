import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../Components/Button';
import RegisterClientPage from "../RegisterLawyerPage/RegisterLawyer.jsx";
import LawyerListPage from "../LawyersListPage/LawyerListPage.jsx";
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import LawyerUpdatePage from '../LawyersUpdatePage/LawyerUpdatePage'
function ManagerLawyer() {
    const [activePage, setActivePage] = useState('lista');
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Adicione este useEffect:
    useEffect(() => {
        // Ao montar, desabilita o scroll do body
        document.body.style.overflow = 'hidden';
        return () => {
            // Ao desmontar, restaura o scroll do body
            document.body.style.overflow = '';
        };
    }, []);


    return (
        <>
        <Sidebar />
        <div style={{
            width: '100%',
            maxWidth: '1300px',
            minHeight: '800px',
            maxHeight: '800px',
            margin: '0 auto',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            background: '#fff',
            display: 'flex', // se tiver sidebar e conteúdo
        }}>
            <aside style={{ width: '290px', background: '#264653', color: '#fff', padding: '20px' }}>
                
              
                    <Button text={"Cadastrar Advogado"}
                        Class={'PatternButton'}
                        onClick={() => setActivePage('cadastrar')} />
                    <Button text={"Lista de Advogados"}
                        Class={'PatternButton'}
                        onClick={() => setActivePage('lista')} />
                    <Button text={"Update Lawyer"}
                        Class={'PatternButton'}
                        onClick={() => setActivePage('update')} />
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
                            
                                <LawyerListPage
                                    onEdit={(user, lawyer) => {
                                        setSelectedLawyer(lawyer);
                                        setSelectedUser(user);
                                        setActivePage('update');
                                    }}
                                />
                            
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
                        {activePage === 'update' && (
                            <motion.div
                                key="update"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >

                                <LawyerUpdatePage user={selectedUser} lawyer={selectedLawyer} />  

                            </motion.div>
                        )}
                </AnimatePresence>
            </main>
            </div>
        </>
    )
}

export default ManagerLawyer;