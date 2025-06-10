import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";
import AgendaTimeline from "../../../Components/AgendaTimeLine/AgendaTimeLine";
import './ClientCases.css';

const StatusBadge = ({ status }) => { /* ... sua lógica de status ... */ return <span>{status}</span>; };

function ClientCases() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Estados da página
    const [allCases, setAllCases] = useState([]); // Guarda TODOS os casos da API
    const [clientCases, setClientCases] = useState([]); // Guarda só os casos DO CLIENTE
    const [events, setEvents] = useState([]); // Guarda os eventos do PROCESSO SELECIONADO
    const [selectedCaseId, setSelectedCaseId] = useState(null);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isTimelineLoading, setIsTimelineLoading] = useState(false);
    const [error, setError] = useState('');

    // Efeito para buscar a LISTA COMPLETA DE PROCESSOS
    useEffect(() => {
        const fetchAllCases = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/Cases');
                if (!response.ok) throw new Error('Falha ao buscar a lista de processos.');
                
                const allCasesData = await response.json();
                setAllCases(allCasesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllCases();
    }, []); // Roda apenas uma vez ao carregar

    // Efeito para FILTRAR os casos quando o usuário ou a lista de casos mudar
    useEffect(() => {
        if (user?.clientId && allCases.length > 0) {
            const filtered = allCases.filter(c => c.ClientId === user.clientId);
            setClientCases(filtered);
        }
    }, [user, allCases]);


    // Função que BUSCA os eventos no clique
    const handleSelectCase = async (caseData) => {
        const caseId = caseData.id;
        
        if (selectedCaseId === caseId) {
            setSelectedCaseId(null);
            setEvents([]);
            return;
        }

        setIsTimelineLoading(true);
        setSelectedCaseId(caseId);
        setEvents([]);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/caseEvent/${caseId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    setEvents([]); // Nenhum evento encontrado, o que é ok.
                } else {
                    throw new Error('Falha ao buscar os eventos do processo.');
                }
            } else {
                const eventsData = await response.json();
                setEvents(eventsData);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsTimelineLoading(false);
        }
    };

    if (isLoading) return <div className="cases-page"><h1>Carregando...</h1></div>;

    return (
        <>
            <ClientSidebar />
            <div className="cases-page">
                <header className="cases-header">
                    <h1>Painel do Cliente</h1>
                    <p>Selecione um processo na lista à esquerda para ver seus eventos.</p>
                </header>
                {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                <div className="cases-container">
                    <div className="cases-list-column">
                        <h2>Lista de Processos ({clientCases.length})</h2>
                        <div className="cases-list">
                            {clientCases.map(caseItem => (
                                <div 
                                    key={caseItem.id}
                                    className={`case-card ${caseItem.id === selectedCaseId ? 'selected' : ''}`}
                                    onClick={() => handleSelectCase(caseItem)}
                                >
                                    <h3>{caseItem.Type}</h3>
                                    <p>{caseItem.Description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="timeline-column">
                        {isTimelineLoading ? (
                            <p>Carregando eventos...</p>
                        ) : (
                            <AgendaTimeline
                                eventos={events}
                                selectedCase={clientCases.find(c => c.id === selectedCaseId)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientCases;