import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../Components/Button';
import RegisterClientPage from "./ClientRegisterPage/ClientRegisterPage";
import ClientListPage from "./ClientListPage/ClientListPage";
import Sidebar from '../../../Components/Sidebar/Sidebar.jsx';
import ClientUpdatePage from './ClientUpdatePage/ClientUpdatePage'
function ManagerClient() {
    const [activePage, setActivePage] = useState('list');
    const [selectedClient, setSelectedClient] = useState(null);
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
                height: '800px',

                margin: '0 auto',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                background: '#fff',
                display: 'flex', // se tiver sidebar e conte�do
                overflow: 'hidden',
            }}>
                <aside style={{ width: '100%', maxWidth: '290px', background: '#264653', color: '#fff', padding: '20px' }}>


                    <Button text={"Lista de Clientes"}
                        className={'PatternButton'}
                        onClick={() => setActivePage('list')} />
                    <Button text={"Cadastrar Cliente"}
                        className={'PatternButton'}
                        onClick={() => setActivePage('register')} />
                    <Button text={"Atualizar Cliente"}
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

                                <ClientListPage
                                    onEdit={(user, client) => {
                                        setSelectedClient(client);
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

                                <ClientUpdatePage user={selectedUser} client={selectedClient} />

                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </>
    )
}

export default ManagerClient;