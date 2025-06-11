import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import '../../../Style/ClientCases.css';
import CaseService from '../../../api/services/case';
import UserService from '../../../api/services/user';
import ClientService from '../../../api/services/client';
import CaseEventService from '../../../api/services/case_event';

import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import GavelIcon from '@mui/icons-material/Gavel';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Sidebar from '../../../Components/Sidebar/Sidebar';

import { InitialPages } from '../../../web_routes';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const StatusBadge = ({ status }) => {
    let statusClass = '';
    
    switch (status?.toLowerCase()) {
        case 'active':
        case 'ativo':
            statusClass = 'active';
            break;
        case 'pending':
        case 'pendente':
            statusClass = 'pending';
            break;
        case 'archived':
        case 'arquivado':
            statusClass = 'archived';
            break;
        default:
            statusClass = 'pending';
    }
    
    return <span className={`client-case-status ${statusClass}`}>{status || 'Pendente'}</span>;
};

function ClientCases() {
    const navigate = useNavigate(InitialPages.INITIAL_PAGE);
    const { user, isAuthenticated, authLoading } = useAuth();
    
    const [allCases, setAllCases] = useState([]); 
    const [clientCases, setClientCases] = useState([]); 
    const [events, setEvents] = useState([]); 
    const [selectedCaseId, setSelectedCaseId] = useState(null);
    const [selectedCase, setSelectedCase] = useState(null);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isTimelineLoading, setIsTimelineLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchAllCases = async () => {
            setIsLoading(true);
            try {
                const casesData = await CaseService.getAllCases();
                setAllCases(casesData);
                if (user?.id) {
                    // TODO: Fix this after implementing ClientService properly
                    // const client = await ClientService.getClientByUserId(user.id);    
                    // const filtered = casesData.filter(c => c.clientId === client.id);
                    setClientCases(filtered);
                }
            } catch (err) {
                setError(err.message || 'Erro ao carregar processos');
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchAllCases();
        }
    }, [isAuthenticated, authLoading, navigate, user?.id]); 

    const handleSelectCase = async (caseData) => {
        console.log('Caso selecionado:', caseData);
        const caseId = caseData.id;
        
        if (selectedCaseId === caseId) {
            setSelectedCaseId(null);
            setSelectedCase(null);
            setEvents([]);
            return;
        }

        setIsTimelineLoading(true);
        setSelectedCaseId(caseId);
        setSelectedCase(caseData);
        setEvents([]);
        setError('');

        try {
            const eventsData = await CaseEventService.getCaseEventsByCaseId(caseId);
            console.log('Eventos carregados:', eventsData);
            setEvents(eventsData);
        } catch (err) {
            console.error('Erro ao carregar eventos:', err);
            setError(err.message || 'Erro ao carregar eventos');
        } finally {
            setIsTimelineLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="client-cases-container">
                <Sidebar />
                <main className="client-cases-content">
                    <div className="client-loading-spinner"></div>
                </main>
            </div>
        );
    }

    const filteredCases = searchQuery 
        ? clientCases.filter(caseItem => 
            caseItem.type?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            caseItem.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : clientCases;

    console.log('Casos sendo renderizados:', filteredCases);

    return (
        <div className="client-cases-container">
            <Sidebar />
            <main className="client-cases-content">
                <div className="client-cases-header">
                    <div>
                        <h1 className="client-cases-title">Meus Processos</h1>
                        <p className="client-cases-subtitle">
                            Acompanhe todos os seus processos e eventos relacionados
                        </p>
                    </div>
                    <div className="client-cases-actions">
                        <div className="client-cases-search">
                            <SearchIcon className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar processos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="client-cases-filter-btn" title="Filtrar">
                            <FilterListIcon style={{ fontSize: '1.25rem' }} />
                            Filtros
                        </button>
                        <button className="client-cases-filter-btn" title="Ordenar">
                            <SortIcon style={{ fontSize: '1.25rem' }} />
                            Ordenar
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-alert">
                        <p>{error}</p>
                    </div>
                )}

                <div className="client-cases-grid">
                    <div className="client-cases-list-section">
                        <div className="client-cases-list-header">
                            <h2 className="client-cases-list-title">
                                Lista de Processos
                                <span className="client-cases-count">{filteredCases.length}</span>
                            </h2>
                        </div>
                        
                        <div className="client-cases-list">
                            {filteredCases.length > 0 ? (
                                filteredCases.map(caseItem => (
                                    <div 
                                        key={caseItem.id}
                                        className={`client-case-card ${caseItem.id === selectedCaseId ? 'selected' : ''}`}
                                        onClick={() => handleSelectCase(caseItem)}
                                    >
                                        <h3 className="client-case-title">{caseItem.type || 'Sem título'}</h3>
                                        <p className="client-case-description">
                                            {caseItem.description || 'Sem descrição disponível'}
                                        </p>
                                        <div className="client-case-meta">
                                            <StatusBadge status={caseItem.status} />
                                            <span className="client-case-date">
                                                {formatDate(caseItem.createAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="client-case-empty-state">
                                    <div className="client-case-empty-icon">
                                        <FolderIcon style={{ fontSize: '3rem' }} />
                                    </div>
                                    <h3 className="client-case-empty-title">Nenhum processo encontrado</h3>
                                    <p className="client-case-empty-description">
                                        {searchQuery 
                                            ? 'Nenhum processo corresponde à sua busca. Tente outros termos.'
                                            : 'Você ainda não possui processos registrados.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="client-case-timeline">
                        <div className="client-case-timeline-header">
                            <h2 className="client-case-timeline-title">
                                {selectedCase ? `Eventos: ${selectedCase.type}` : 'Linha do Tempo'}
                            </h2>
                            <p className="client-case-timeline-subtitle">
                                {selectedCase 
                                    ? 'Acompanhe o histórico e próximos eventos deste processo'
                                    : 'Selecione um processo para visualizar seus eventos'}
                            </p>
                        </div>
                        
                        {isTimelineLoading ? (
                            <div className="client-loading-spinner"></div>
                        ) : selectedCase ? (
                            events.length > 0 ? (
                                <div className="client-timeline-list">
                                    {events.map(event => (
                                        <div key={event.id} className="client-timeline-item">
                                            <div className="client-timeline-dot"></div>
                                            <div className="client-timeline-content">
                                                <div className="client-timeline-date">
                                                    {formatDate(event.eventDate)}
                                                </div>
                                                <h4 className="client-timeline-title">
                                                    {event.title || event.description}
                                                </h4>
                                                <p className="client-timeline-description">
                                                    {event.notes || event.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="client-case-empty-state">
                                    <div className="client-case-empty-icon">
                                        <EventNoteIcon style={{ fontSize: '3rem' }} />
                                    </div>
                                    <h3 className="client-case-empty-title">Nenhum evento encontrado</h3>
                                    <p className="client-case-empty-description">
                                        Este processo ainda não possui eventos registrados.
                                    </p>
                                </div>
                            )
                        ) : (
                            <div className="client-case-empty-state">
                                <div className="client-case-empty-icon">
                                    <GavelIcon style={{ fontSize: '3rem' }} />
                                </div>
                                <h3 className="client-case-empty-title">Selecione um processo</h3>
                                <p className="client-case-empty-description">
                                    Clique em um processo na lista à esquerda para visualizar seus eventos.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ClientCases;