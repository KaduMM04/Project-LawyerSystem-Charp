import React from 'react';
import './AgendaTimeLine.css';
import GavelIcon from '@mui/icons-material/Gavel'; // Exemplo de ícone

const AgendaTimeline = ({ eventos, selectedCase }) => {
    const title = selectedCase ? `Eventos para: ${selectedCase.Type}` : 'Linha do Tempo';

    if (!selectedCase) {
        return (
            <div className="timeline-container">
                <h2>Linha do Tempo</h2>
                <p>Selecione um processo na lista à esquerda para ver os eventos aqui.</p>
            </div>
        );
    }
    
    return (
        <div className="timeline-container">
            <h2>{title}</h2>
            {eventos.length === 0 ? (
                <p>Nenhum evento agendado para este processo.</p>
            ) : (
                <div className="timeline-list">
                    {eventos.map(evento => (
                        <div key={evento.id} className="timeline-item">
                            <div className="timeline-marker"><GavelIcon fontSize="small" /></div>
                            <div className="timeline-content">
                                <span className="timeline-date">{evento.eventDate}</span>
                                <h4 className="evento-title">{evento.description}</h4>
                                {evento.notes && <p className="evento-processo">Notas: {evento.notes}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AgendaTimeline;