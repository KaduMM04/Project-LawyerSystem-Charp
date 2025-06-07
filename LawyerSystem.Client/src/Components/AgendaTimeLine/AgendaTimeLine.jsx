import React from 'react';
import './AgendaTimeline.css';

const AgendaTimeline = ({ eventos, casos, selectedCaseId }) => {
    const getTitle = () => {
        if (selectedCaseId) {
            const selectedCase = casos.find(c => c.id === selectedCaseId);
            return `Eventos para: ${selectedCase?.name || 'Processo Selecionado'}`;
        }
        return 'Todos os Próximos Eventos';
    };

    if (!eventos || eventos.length === 0) {
        return (
            <div className="timeline-container">
                <h2>{getTitle()}</h2>
                <p>Nenhum evento encontrado para a seleção atual.</p>
            </div>
        );
    }

    return (
        <div className="timeline-container">
            <h2>{getTitle()}</h2>
            <div className="timeline-list">
                {eventos.map(evento => (
                    <div key={evento.id} className="timeline-item">
                        <div className="timeline-marker">✓</div> {/* Ícone padrão simples */}
                        <div className="timeline-content">
                            <span className="timeline-date">{evento.data}</span>
                            <h4 className="evento-title">{evento.title}</h4>
                            <p className="evento-processo">
                                Referente ao processo: <strong>{evento.processo.name}</strong>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgendaTimeline;
