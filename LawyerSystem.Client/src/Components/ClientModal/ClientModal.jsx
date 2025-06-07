// src/Components/Modal/Modal.jsx

import React from 'react';
import './ClientModal.css'; // Certifique-se de que o CSS está no caminho correto

const ClientModal = ({ isOpen, onClose, children }) => {
    // Se não estiver aberto, não renderiza nada
    if (!isOpen) {
        return null;
    }

    return (
        // O 'modal-overlay' é o fundo escuro que cobre a página
        <div className="modal-overlay" onClick={onClose}>
            {/* O 'modal-content' é a caixa branca do modal. 
                O e.stopPropagation() impede que o clique dentro do modal feche ele. */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* Botão para fechar no canto superior direito */}
                <button className="close-button" onClick={onClose}>
                    &times; 
                </button>
                
                {children}
            </div>
        </div>
    );
};

export default ClientModal;