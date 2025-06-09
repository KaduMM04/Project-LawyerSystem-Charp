import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../Components/Button';
import RegisterLawyerPage from "./RegisterLawyerPage/RegisterLawyer.jsx";
import LawyerListPage from "./LawyersListPage/LawyerListPage";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import LawyerUpdatePage from './LawyersUpdatePage/LawyerUpdatePage'
function ManagerLawyer() {
    const [activePage, setActivePage] = useState('list');
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);


    return (
        <>
        <Sidebar />
        <div style={{
            width: '100%',
            maxWidth: '1300px',
            height: '800px',
            
            margin: '0 auto',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            background: '#fff',
                display: 'flex',
                overflow: 'hidden',
        }}>
                <aside style={{ width: '100%',maxWidth: '290px', background: '#264653', color: '#fff', padding: '20px' }}>

                    <Button text={"Lista de Advogados"}
                        className={'PatternButton'}
                        onClick={() => setActivePage('list')} />
                    <Button text={"Cadastrar Advogado"}
                        className={'PatternButton'}
                        onClick={() => setActivePage('register')} />
                    <Button text={"Atualizar advogado"}
                        className={'PatternButton'}
                        onClick={() => setActivePage('update')} />
            </aside>

                <main style={{
                    flex: 1,
                    padding: '40px',
                    overflowY: 'auto',
                    maxHeight: '800px',
                    boxSizing: 'border-box'
                }}>
                <AnimatePresence mode="wait">
                        {activePage === 'list' && (
                        <motion.div
                                key="list"
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
                    {activePage === 'register' && (
                        <motion.div
                                key="register"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                                <RegisterLawyerPage />
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