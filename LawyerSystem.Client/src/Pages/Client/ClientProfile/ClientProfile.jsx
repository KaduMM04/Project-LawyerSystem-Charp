import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';

import Button from "../../../Components/Button";
import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";
import ClientModal from "../../../Components/ClientModal/ClientModal"; 
import "./ClientProfile.css"; 
import "../../../Components/ClientModal/ClientModal.css";
import ClientService from '../../../api/services/client';
import statusNotification from '../../../utils/status_notification';



const ClientProfile = () => {
    const { user } = useAuth();

    const { id } = useParams(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [profileData, setProfileData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);     
    const [error, setError] = useState('');              
    const [requestText, setRequestText] = useState('');

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            setError("ID do usuário não foi fornecido na URL.");
            return;
        }

        const fetchSequencialData = async () => {
            setIsLoading(true);
            setError('');
            try {
                setProfileData({
                    user: user,
                    client: await ClientService.getClientById(user.clientId)
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSequencialData();
    }, user); 

    const handleEditRequest = async (e) => {
        e.preventDefault();
        
        statusNotification.showSuccess("Solicitação de edição enviada com sucesso!");
        setIsModalOpen(false);
        setRequestText('');
    };

    if (isLoading) {
        return <div className="profile-page"><h1>Carregando perfil...</h1></div>;
    }

    if (error) {
        return <div className="profile-page"><h1>Erro: {error}</h1></div>;
    }

    return (
        <div className="client-profile-page">
            <ClientSidebar />
            <main className="client-profile-content">
                <header className="profile-header">
                    <h2 style={{ textAlign: 'center' }}>Perfil</h2>
                    <p>Detalhes e informações pessoais do cliente.</p>
                </header>

                <div className="profile-details">
              
                    <div className="info-card"><strong>Nome:</strong> <span>{profileData.user.name}</span></div>
                    <div className="info-card"><strong>Email:</strong> <span>{profileData.user.email}</span></div>
                    <div className="info-card"><strong>Telefone:</strong> <span>{profileData.user.phone}</span></div>
                    <div className="info-card"><strong>Profissão:</strong> <span>{profileData.client.Profission || 'Não informado'}</span></div>
                    <div className="info-card"><strong>Estado Civil:</strong> <span>{profileData.client.MaritalStatus || 'Não informado'}</span></div>
                    <div className="info-card"><strong>Representante:</strong> <span>{profileData.client.Representative || 'Não informado'}</span></div>
                    <div className="info-card"><strong>Empresa:</strong> <span>{profileData.client.CompanyName || 'Não informado'}</span></div>
                </div>

                <footer className="profile-actions">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        text="Solicitar Edição"
                    />
                </footer>
            </main>
            
            <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Solicitar Edição do Perfil</h2>
                <form onSubmit={handleEditRequest}>
                    <div className="form-group">
                        <textarea 
                            id="text" 
                            rows="4" 
                            placeholder="Descreva o que precisa ser alterado no seu perfil..."
                            value={requestText}
                            onChange={(e) => setRequestText(e.target.value)}
                        ></textarea>
                    </div>
                    <Button Class="EnviarSolicitacaoButton" text="Enviar Solicitação" type="submit" />
                </form>
            </ClientModal>
        </div>
    );
};

export default ClientProfile;