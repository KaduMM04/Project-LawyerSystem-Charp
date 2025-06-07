import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from "../../../Components/Button";
import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";
import ClientModal from "../../../Components/ClientModal/ClientModal"; 
import "./ClientProfile.css"; 
import "../../../Components/ClientModal/ClientModal.css";

const ClientProfile = () => {
    // O 'id' da URL é o ID DO USUÁRIO
    const { id } = useParams(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [profileData, setProfileData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);     
    const [error, setError] = useState('');              
    const [requestText, setRequestText] = useState('');

    // Lógica para buscar dados em sequência (cascata)
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
                // ETAPA 1: Buscar os dados do usuário primeiro
                const userResponse = await fetch(`http://localhost:5000/user/${id}`);
                if (!userResponse.ok) {
                    if (userResponse.status === 404) throw new Error('Usuário não encontrado.');
                    throw new Error('Falha ao buscar dados do usuário.');
                }
                const userData = await userResponse.json();

                // ETAPA 2: Extrair o ID do cliente da resposta do usuário
                // IMPORTANTE: Altere 'clientId' para o nome exato do campo na sua API!
                // Pode ser 'client_id', 'IdDoCliente', etc.
                const clientId = userData.clientId; 

                if (!clientId) {
                    throw new Error("ID do cliente não foi encontrado nos dados do usuário.");
                }

                // ETAPA 3: Usar o ID do cliente para buscar os dados do cliente
                const clientResponse = await fetch(`http://localhost:5000/api/Client/${clientId}`);
                if (!clientResponse.ok) {
                    if (clientResponse.status === 404) throw new Error('Dados específicos do cliente não encontrados.');
                    throw new Error('Falha ao buscar dados do cliente.');
                }
                const clientData = await clientResponse.json();

                // ETAPA 4: Combinar tudo e salvar no estado
                setProfileData({
                    user: userData,
                    client: clientData
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSequencialData();
    }, [id]); 

    // Função para lidar com o formulário do modal (lógica a ser implementada)
    const handleEditRequest = async (e) => {
        e.preventDefault();
        // Lógica para enviar a solicitação para a API...
        // console.log(`Enviando solicitação para o cliente ${id}: ${requestText}`);
        alert('Solicitação enviada!');
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
                    <h2>Perfil de {profileData.user.name}</h2>
                    <p>Detalhes e informações pessoais do cliente.</p>
                </header>

                <div className="profile-details">
                    {/* --- Dados vindos da rota /user --- */}
                    <div className="info-card"><strong>Nome:</strong> <span>{profileData.user.name}</span></div>
                    <div className="info-card"><strong>Email:</strong> <span>{profileData.user.email}</span></div>
                    <div className="info-card"><strong>Telefone:</strong> <span>{profileData.user.phone}</span></div>
                    
                    {/* --- Dados vindos da rota /Client (com a correção) --- */}
                    <div className="info-card"><strong>Profissão:</strong> <span>{profileData.client.Profission || 'Não informado'}</span></div>
                    <div className="info-card"><strong>Estado Civil:</strong> <span>{profileData.client.MaritalStatus || 'Não informado'}</span></div>
                    <div className="info-card"><strong>Representante:</strong> <span>{profileData.client.Representative || 'Não informado'}</span></div>
                    <div className="info-card"><strong>Empresa:</strong> <span>{profileData.client.CompanyName || 'Não informado'}</span></div>
                </div>

                <footer className="profile-actions">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        text="Request Edit"
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