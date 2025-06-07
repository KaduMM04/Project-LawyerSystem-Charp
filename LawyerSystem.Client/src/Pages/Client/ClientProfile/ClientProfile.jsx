import Button from "../../../Components/Button";
import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";
import "./ClientProfile.css"; 
import React, { useState } from 'react';
import ClientModal from "../../../Components/ClientModal/ClientModal"; 
import "../../../Components/ClientModal/ClientModal.css";

const ClientProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Client data, now without icons
    const clientInfo = [
        { label: 'Name', value: 'Ben Tennison' },
        { label: 'Email', value: 'ben10@gmail.com' },
        { label: 'Marital Status', value: 'Married' },
        { label: 'Profession', value: 'Hero' },
        { label: 'Representative', value: 'Kevin Levin' }
    ];

    return (
        <div className="client-profile-page">
            <ClientSidebar />
            <main className="client-profile-content">
                <header className="profile-header">
                    <h2>Client Profile</h2>
                    <p>Personal details and information of the client.</p>
                </header>

                <div className="profile-details">
                    {clientInfo.map((info, index) => (
                        <div className="info-card" key={index}>
                            <div className="info-text">
                                <strong>{info.label}:</strong>
                                <span>{info.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="profile-actions">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        text="Request Edit"
                    />
                </footer>
            </main>

            <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Request Profile Edit</h2>
                <form>
                    <div className="form-group">
                        <textarea id="text" rows="4" placeholder="Describe what needs to be changed in your profile..."></textarea>
                    </div>
                    <Button Class="EnviarSolicitacaoButton" text="Send Request" onClick={(e) => { e.preventDefault(); alert('Sent! (not really)'); setIsModalOpen(false); }} />
                </form>
            </ClientModal>   
        </div>
    );
};

export default ClientProfile;
