import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../../Components/Button";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import CaseService from "../../../api/services/case";
import CaseEventService from "../../../api/services/case_event";
import { useAuth } from '../../../Context/AuthContext';
import { CasesPages, AuthPages } from "../../../web_routes";
import "./InitialPage.css";

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const eventStatusMap = {
    0: "Agendado",
    1: "Realizado",
    2: "Cancelado",
    3: "Adiado"
};

function getEventStatusLabel(status) {
    return eventStatusMap[status] ?? status;
}

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
    if (diffHrs > 0) return `${diffHrs} hora${diffHrs > 1 ? 's' : ''} atrás`;
    return 'Agora mesmo';
}

const mockStatusData = [
    { label: 'Pendente', value: 4, color: '#fbbf24' },
    { label: 'Em andamento', value: 6, color: '#3b82f6' },
    { label: 'Finalizado', value: 2, color: '#22c55e' },
];

const usefulLinks = [
    { label: 'Consulta Pública TJ', url: 'https://www.tjsp.jus.br/' },
    { label: 'Modelos de Petição', url: '#' },
    { label: 'Agenda OAB', url: '#' },
];

const quote = '“A justiça atrasada não é justiça, senão injustiça qualificada e manifesta.” — Rui Barbosa';

function InitialPage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, authLoading } = useAuth();
    const [cases, setCases] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate(AuthPages.LOGIN);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const [casesData, eventsData] = await Promise.all([
                    CaseService.getAllCases(),
                    CaseEventService.getAllCaseEvents()
                ]);
                setCases(casesData);
                setEvents(eventsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (!authLoading && isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, authLoading, navigate]);

    const recentCases = cases.slice(0, 5).map(c => ({
        type: 'Caso',
        title: c.typeCases,
        description: c.description,
        status: c.status,
        date: c.createAt,
    }));
   
    const recentEvents = events
        .sort((a, b) => new Date(b.EventDate) - new Date(a.EventDate))
        .slice(0, 5)
        .map(e => ({
            type: 'Evento',
            title: e.title,
            description: e.description,
            status: e.eventStatus,
            date: e.eventDate,
        }));
    const recentActivities = [...recentEvents, ...recentCases];
  

    const nextEvent = events
        .filter(e => new Date(e.EventDate) > new Date())
        .sort((a, b) => new Date(a.EventDate) - new Date(b.EventDate))[0];

    const pendingCases = cases.filter(c => c.Status === 'Pending').length;

    if (authLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>Erro ao carregar dados: {error}</p>
                <Button 
                    text="Tentar novamente" 
                    onClick={() => window.location.reload()} 
                />
            </div>
        );
    }

    return (
        <div className="initial-page-container">
            <Sidebar />
            <main className="initial-page-content">
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Olá, {user?.name || 'Usuário'}!</h1>
                        <p className="dashboard-subtitle">Bem-vindo(a) ao seu painel de controle.</p>
                    </div>
                    <Button text="Novo Caso" className="primary-button" onClick={() => navigate(CasesPages.MANAGER_CASES)} />
                </div>

                <div className="dashboard-summary">
                    <div className="card dashboard-card">
                        <div className="dashboard-icon"><i className="fa fa-briefcase"></i></div>
                        <div className="dashboard-label">Casos Ativos</div>
                        <div className="dashboard-value">{cases.length}</div>
                        <div className="dashboard-info">{pendingCases} pendente(s) para hoje</div>
                    </div>
                    <div className="card dashboard-card">
                        <div className="dashboard-icon"><i className="fa fa-calendar"></i></div>
                        <div className="dashboard-label">Eventos</div>
                        <div className="dashboard-value">{events.length}</div>
                        {nextEvent && (
                            <div className="dashboard-next-event">
                                Próxima audiência: <b>{nextEvent.Title}</b> em {formatDate(nextEvent.EventDate)}
                            </div>
                        )}
                    </div>
                    {/* Gráfico de status dos casos (mock) */}
                    <div className="card dashboard-card">
                        <div className="dashboard-label" style={{marginBottom:8}}>Status dos Casos</div>
                        <div className="dashboard-status-graph">
                            {mockStatusData.map((s, idx) => (
                                <div key={s.label} className="dashboard-status-bar" style={{background:s.color, height:10 + s.value*8}} title={s.label+': '+s.value}>
                                    <span className="dashboard-status-value">{s.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="dashboard-status-legend">
                            {mockStatusData.map(s => (
                                <span key={s.label} className="dashboard-status-legend-item"><span className="dashboard-status-dot" style={{background:s.color}}></span>{s.label}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Atividades Recentes */}
                <div className="card" style={{marginTop:'2rem'}}>
                    <div className="card-header">
                        <h2>Atividades Recentes</h2>
                    </div>
                    <div className="card-content">
                        {recentActivities.length > 0 ? (
                            <table className="recent-activities-table">
                                <thead>
                                    <tr style={{textAlign:'left', color:'#64748b'}}>
                                        <th style={{padding:'0.5rem'}}>Tipo</th>
                                        <th style={{padding:'0.5rem'}}>Título</th>
                                        <th style={{padding:'0.5rem'}}>Status</th>
                                        <th style={{padding:'0.5rem'}}>Quando</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivities.map((item, idx) => (
                                        <tr key={idx} style={{borderBottom:'1px solid #f1f5f9'}}>
                                            <td style={{padding:'0.5rem', fontWeight:600, color:item.type==='Caso'?'#3b82f6':'#22c55e'}}>{item.type}</td>
                                            <td style={{padding:'0.5rem'}}>{item.title}</td>
                                            <td style={{ padding: '0.5rem' }}>{getEventStatusLabel(item.status)}</td>
                                            <td style={{padding:'0.5rem'}}>{item.date ? timeAgo(item.date) : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-data">Nenhuma atividade recente</p>
                        )}
                    </div>
                </div>

                {/* Links úteis e frase motivacional */}
                <div className="dashboard-footer">
                    <div className="card dashboard-links">
                        <div className="dashboard-label">Links Úteis</div>
                        <ul className="dashboard-links-list">
                            {usefulLinks.map(link => (
                                <li key={link.label} className="dashboard-link-item">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="dashboard-link">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card dashboard-quote">
                        {quote}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default InitialPage;