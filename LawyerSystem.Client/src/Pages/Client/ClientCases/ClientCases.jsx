import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";
import AgendaTimeline from "../../../Components/AgendaTimeLine/AgendaTimeLine";
import './ClientCases.css';

// DADOS DE EXEMPLO (simulando o retorno da sua API)
const mockCases = [
    { id: '1', number: '0012345-67.2024.8.26.0001', name: 'Ação de Alimentos', status: 'Ativo', lastUpdate: '05/06/2025' },
    { id: '2', number: '0098765-43.2023.8.26.0002', name: 'Defesa do Consumidor', status: 'Arquivado', lastUpdate: '15/03/2025' },
    { id: '3', number: '0055566-77.2024.8.26.0003', name: 'Divórcio Consensual', status: 'Ativo', lastUpdate: '01/06/2025' },
];

const mockEvents = [
    { id: 1, caseId: '1', title: 'Audiência de Conciliação', data: '18 de Junho de 2025, 14:30', processo: { name: 'Ação de Alimentos' }, eventType: 0 },
    { id: 2, caseId: '3', title: 'Prazo Final para Entrega de Documentos', data: '25 de Junho de 2025', processo: { name: 'Divórcio Consensual' }, eventType: 1 },
    { id: 3, caseId: '1', title: 'Perícia Médica', data: '02 de Julho de 2025, 09:00', processo: { name: 'Ação de Alimentos' }, eventType: 2 },
];

const StatusBadge = ({ status }) => {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
};

function ClientCases() {
    const navigate = useNavigate(); 
    
    const [cases, setCases] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCaseId, setSelectedCaseId] = useState(null);

    useEffect(() => {
        // Na vida real, aqui você faria a chamada para a sua API
        setCases(mockCases);
        setEvents(mockEvents);
        setLoading(false);
    }, []);

    const handleSelectCase = (caseId) => {
        if (selectedCaseId === caseId) {
            setSelectedCaseId(null);
        } else {
            setSelectedCaseId(caseId);
        }
    };

    const filteredEvents = selectedCaseId
        ? events.filter(event => event.caseId === selectedCaseId)
        : events;

    if (loading) {
        return (
            <>
                <ClientSidebar />
                <div className="cases-page"><h1>Carregando dados do cliente...</h1></div>
            </>
        );
    }

    return (
        <>
            <ClientSidebar />
            <div className="cases-page">
                <header className="cases-header">
                    <h1>Painel do Cliente</h1>
                    {/* Texto do cabeçalho atualizado */}
                    <p>Selecione um processo na lista à esquerda para ver os eventos relacionados.</p>
                </header>

                <div className="cases-container">
                    
                    {/* COLUNA DA ESQUERDA: Lista de Processos */}
                    <div className="cases-list-column">
                        <h2>Lista de Processos</h2>
                        <div className="cases-list">
                            {cases.map(caseItem => (
                                <div 
                                    key={caseItem.id}
                                    className={`case-card ${caseItem.id === selectedCaseId ? 'selected' : ''}`}
                                    onClick={() => handleSelectCase(caseItem.id)}
                                >
                                    <div className="case-card-header">
                                        <h3 className="case-name">{caseItem.name}</h3>
                                        <StatusBadge status={caseItem.status} />
                                    </div>
                                    <p className="case-number">Nº: {caseItem.number}</p>
                                    <p className="case-update">Última atualização: {caseItem.lastUpdate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* COLUNA DA DIREITA: Linha do Tempo */}
                    <div className="timeline-column">
                        <AgendaTimeline 
                            eventos={filteredEvents} 
                            casos={cases}
                            selectedCaseId={selectedCaseId}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

export default ClientCases;