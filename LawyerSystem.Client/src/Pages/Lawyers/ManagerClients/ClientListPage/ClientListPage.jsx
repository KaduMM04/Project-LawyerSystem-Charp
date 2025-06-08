import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './ClientList.css';

function ClientListPage({ onEdit }) {
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');


    const getClients = async () => {
        try {
            const responseClients = await fetch('http://localhost:5000/api/Client/all',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (!responseClients.ok) {
                throw new Error('Falha ao procurar clientes');
            }

            const responseUser = await fetch('http://localhost:5000/user/all',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (!responseUser.ok) {
                throw new Error('Falha ao procurar usuarios');
            }

            const clientsData = await responseClients.json();
            const userData = await responseUser.json();

            console.log('Clients:', clientsData);
            console.log('Users:', userData);

            setClients(clientsData);
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching lawyers:', error);
            setClients([]);
            setUsers([]);
        }
    };

    useEffect(() => {
        getClients();
    }, []);

    const filteredClients = clients.filter((client) => {
        const user = users.find((u) => u.clientId === client.Id);
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

                    console.log('User:', user);
                    console.log('Client:', client);

                    return (
                        <div className="client-item" key={client.id}>
                            <div className="client-infos">
                                <div className="client-details">
                                    <div><strong>Nome:</strong> {user ? user.name : 'Usuario nao encontrado'}</div>
                                    <div><strong>Email:</strong> {user ? user.email : 'Usuario nao encontrado'}</div>
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

export default ClientListPage;
