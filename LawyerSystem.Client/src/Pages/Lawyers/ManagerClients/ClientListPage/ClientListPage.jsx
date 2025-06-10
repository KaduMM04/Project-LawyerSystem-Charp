import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './ClientList.css';
import ClientService from '../../../../api/services/client';
import UserService from '../../../../api/services/user';
import statusNotification from '../../../../utils/status_notification';

function LawyerListPage({ onEdit }) {
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');


    const getClients = async () => {
        try {
            
            setClients(await ClientService.getAllClients());
            setUsers(await UserService.getAllUsers());
        } catch (error) {
            statusNotification.showError(error || 'Erro ao buscar clientes');
            setClients([]);
            setUsers([]);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    const filteredClients = clients.filter((client) => {
        const user = users.find((u) => u.clientId === client.id);
        const searchLower = search.toLowerCase();

        return (
            (user && user.name.toLowerCase().includes(searchLower)) ||
            client.representative.toLowerCase().includes(searchLower) ||
            (user && user.email.toLowerCase().includes(searchLower))
        );
    });

    return (
        <>
            <h1>Lista de clientes</h1>
            <div className="search-bar-container">

                <input
                    className="search-bar"
                    type="text"
                    placeholder="Buscar ..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="client-list-scroll">
                {filteredClients.map((client) => {
                    const user = users.find((u) => u.clientId === client.id);

                    return (
                        <div className="client-item" key={client.id}>
                            <div className="client-infos">
                                <div className="client-details">
                                    <div><strong>Nome:</strong> {user ? user.name : 'Usu�rio n�o encontrado'}</div>
                                    <div><strong>Email:</strong> {user ? user.email : 'Usu�rio n�o encontrado'}</div>
                                    <div><strong>Estado Civil:</strong>
                                        {client.maritalStatus}</div>
                                    <div><strong>Profissao:</strong>
                                        {client.profission ? client.profission
                                            : 'Usuario nao possui profissao'}</div>
                                    <div><strong>Representante:</strong>
                                        {client.representative ? client.representative
                                            : 'N/A'}</div>
                                </div>
                                {user && (
                                    <button
                                        className="action-button"
                                        onClick={() => onEdit(user, client)}
                                    >
                                        <EditIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default LawyerListPage;