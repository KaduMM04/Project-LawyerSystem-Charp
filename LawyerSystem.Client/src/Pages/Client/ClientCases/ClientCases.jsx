import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";
import AgendaTimeline from "../../../Components/AgendaTimeLine/AgendaTimeLine";
import './ClientCases.css';
import CaseService from '../../../api/services/case';
import CaseEventService from '../../../api/services/case_event';


const StatusBadge = ({ status }) => {  return <span>{status}</span>; };

function ClientCases() {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [allCases, setAllCases] = useState([]); 
    const [clientCases, setClientCases] = useState([]); 
    const [events, setEvents] = useState([]); 
    const [selectedCaseId, setSelectedCaseId] = useState(null);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isTimelineLoading, setIsTimelineLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchAllCases = async () => {

            setIsLoading(true);
            try {
                setAllCases(await CaseService.getAllCases());
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllCases();
    }, []); 

    useEffect(() => {
        if (user?.clientId && allCases.length > 0) {
            const filtered = allCases.filter(c => c.ClientId === user.clientId);
            setClientCases(filtered);
        }
    }, [user, allCases]);

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
            setEvents(await CaseEventService.getCaseEvents(caseId));
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