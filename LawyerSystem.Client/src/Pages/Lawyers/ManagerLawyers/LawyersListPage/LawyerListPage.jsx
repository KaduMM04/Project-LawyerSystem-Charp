import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './LawyerListPage.css';
import LawyerService from '../../../../api/services/lawyer';
import UserService from '../../../../api/services/user';
import statusNotification from '../../../../utils/status_notification';

function LawyerListPage({ onEdit }) { 
    const [lawyers, setLawyers] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    

    const getLawyers = async () => {
        try {

            setLawyers(LawyerService.getAllLawyers(lawyersData));
            setUsers(UserService.getAllUsers(usersData));
        } catch (error) {
            statusNotification.showError(error || 'Erro ao carregar advogados');
            setLawyers([]);
            setUsers([]);
        }
    };

    useEffect(() => {
        getLawyers();
    }, []);

    const filteredLawyers = lawyers.filter((lawyer) => {
        const user = users.find((u) => u.lawyerOAB === lawyer.OAB);
        const searchLower = search.toLowerCase();

        return (
            (user && user.name.toLowerCase().includes(searchLower)) ||
            lawyer.OAB.toLowerCase().includes(searchLower) ||
            (user && user.email.toLowerCase().includes(searchLower))
        );
    });

    return (
        <>
            <h1>Lista de advogados</h1>
            <div className="search-bar-container">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Buscar advogado pelo nome..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="lawyer-list-scroll">
                {filteredLawyers.map((lawyer) => {
                    const user = users.find((u) => u.lawyerOAB === lawyer.OAB);

                    return (
                        <div className="lawyer-item" key={lawyer.OAB}>
                            <div className="lawyer-infos">
                                <div className="lawyer-details">
                                    <div><strong>OAB:</strong> {lawyer.OAB}</div>
                                    <div><strong>Nome:</strong> {user ? user.name : 'Usuário não encontrado'}</div>
                                    <div><strong>Email:</strong> {user ? user.email : 'Usuário não encontrado'}</div>
                                    <div><strong>Área de atuação:</strong> {lawyer.AreaOfExpertise}</div>
                                </div>
                                {user && (
                                    <button
                                        className="action-button"
                                        onClick={() => onEdit(user, lawyer)}    
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
