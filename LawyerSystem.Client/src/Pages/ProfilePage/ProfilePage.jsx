import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Button from "../../Components/Button";
import { useAuth } from '../../Context/AuthContext';
import { AuthPages } from "../../web_routes";
import "../../Style/ProfilePage.css";

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import EventIcon from '@mui/icons-material/Event';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

function ProfilePage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, authLoading, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('info');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        oab: '',
        specialization: '',
        bio: ''
    });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate(AuthPages.LOGIN);
            return;
        }
        
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                oab: user.oab || '',
                specialization: user.specialization || '',
                bio: user.bio || ''
            });
        }
    }, [isAuthenticated, authLoading, navigate, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                oab: user.oab || '',
                specialization: user.specialization || '',
                bio: user.bio || ''
            });
        }
        setEditMode(false);
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setEditMode(false);
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleChangePassword = () => {
        console.log("Change password clicked");
    };

    if (authLoading || loading) {
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
                    className="primary-button"
                />
            </div>
        );
    }

    // Mock statistics data
    const stats = [
        { icon: <GavelIcon />, value: 15, label: "Casos Ativos" },
        { icon: <EventIcon />, value: 8, label: "Eventos Pendentes" },
        { icon: <PersonIcon />, value: 24, label: "Clientes" }
    ];

    return (
        <div className="profile-page-container">
            <Sidebar />
            <main className="profile-content">
                <div className="profile-header">
                    <h1 className="profile-title">Meu Perfil</h1>
                    {!editMode ? (
                        <div className="profile-actions">
                            <Button 
                                text="Editar Perfil" 
                                onClick={handleEditClick} 
                                className="profile-button"
                            />
                        </div>
                    ) : (
                        <div className="profile-actions">
                            <Button 
                                text="Cancelar" 
                                onClick={handleCancelEdit} 
                                className="profile-button-secondary"
                            />
                            <Button 
                                text="Salvar" 
                                onClick={handleSaveProfile} 
                                className="profile-button"
                            />
                        </div>
                    )}
                </div>

                <div className="profile-stats">
                    {stats.map((stat, index) => (
                        <div key={index} className="profile-stat-card">
                            <div className="profile-stat-icon">
                                {stat.icon}
                            </div>
                            <div className="profile-stat-value">{stat.value}</div>
                            <div className="profile-stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="profile-tabs">
                    <div 
                        className={`profile-tab ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        Informações Pessoais
                    </div>
                    <div 
                        className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Segurança
                    </div>
                    <div 
                        className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Preferências
                    </div>
                </div>

                {activeTab === 'info' && (
                    <div className="profile-card">
                        <div className="profile-info-container">
                            <div className="profile-avatar-section">
                                {user?.profileImage ? (
                                    <img 
                                        src={user.profileImage} 
                                        alt="Profile" 
                                        className="profile-avatar"
                                    />
                                ) : (
                                    <div className="profile-avatar-placeholder">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                )}
                                {editMode && (
                                    <div className="profile-avatar-actions">
                                        <Button 
                                            text="Alterar Foto" 
                                            onClick={() => console.log("Change photo")} 
                                            className="profile-button-secondary"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="profile-details">
                                {!editMode ? (
                                    <>
                                        <div>
                                            <h2 className="profile-name">{user?.name || "Usuário"}</h2>
                                            <p className="profile-role">Advogado</p>
                                        </div>
                                        
                                        <div className="profile-info-grid">
                                            <div className="profile-info-item">
                                                <span className="profile-info-label">Email</span>
                                                <span className="profile-info-value">{user?.email || "email@exemplo.com"}</span>
                                            </div>
                                            <div className="profile-info-item">
                                                <span className="profile-info-label">Telefone</span>
                                                <span className="profile-info-value">{user?.phone || "(00) 00000-0000"}</span>
                                            </div>
                                            <div className="profile-info-item">
                                                <span className="profile-info-label">Registro OAB</span>
                                                <span className="profile-info-value">{user?.oab || "OAB/XX 000000"}</span>
                                            </div>
                                            <div className="profile-info-item">
                                                <span className="profile-info-label">Especialização</span>
                                                <span className="profile-info-value">{user?.specialization || "Direito Civil"}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="profile-info-item">
                                            <span className="profile-info-label">Sobre</span>
                                            <span className="profile-info-value">{user?.bio || "Nenhuma informação adicional disponível."}</span>
                                        </div>
                                    </>
                                ) : (
                                    <form>
                                        <div className="profile-form-group">
                                            <label className="profile-form-label">Nome Completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="profile-form-input"
                                            />
                                        </div>
                                        
                                        <div className="profile-form-group">
                                            <label className="profile-form-label">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="profile-form-input"
                                            />
                                        </div>
                                        
                                        <div className="profile-form-group">
                                            <label className="profile-form-label">Telefone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="profile-form-input"
                                            />
                                        </div>
                                        
                                        <div className="profile-form-group">
                                            <label className="profile-form-label">Registro OAB</label>
                                            <input
                                                type="text"
                                                name="oab"
                                                value={formData.oab}
                                                onChange={handleInputChange}
                                                className="profile-form-input"
                                            />
                                        </div>
                                        
                                        <div className="profile-form-group">
                                            <label className="profile-form-label">Especialização</label>
                                            <input
                                                type="text"
                                                name="specialization"
                                                value={formData.specialization}
                                                onChange={handleInputChange}
                                                className="profile-form-input"
                                            />
                                        </div>
                                        
                                        <div className="profile-form-group">
                                            <label className="profile-form-label">Sobre</label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                className="profile-form-input"
                                                rows="4"
                                            ></textarea>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="profile-card">
                        <h3 className="profile-section-title">Segurança da Conta</h3>
                        
                        <div className="profile-form-group">
                            <Button 
                                text="Alterar Senha" 
                                onClick={handleChangePassword} 
                                className="profile-button"
                            />
                        </div>
                        
                        <div className="profile-form-group">
                            <h4>Último acesso</h4>
                            <p>Data: {new Date().toLocaleDateString()}</p>
                            <p>IP: 192.168.1.1</p>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="profile-card">
                        <h3 className="profile-section-title">Preferências</h3>
                        
                        <div className="profile-form-group">
                            <label className="profile-form-label">
                                <input type="checkbox" /> Receber notificações por email
                            </label>
                        </div>
                        
                        <div className="profile-form-group">
                            <label className="profile-form-label">
                                <input type="checkbox" /> Receber alertas de prazos processuais
                            </label>
                        </div>
                        
                        <div className="profile-form-group">
                            <label className="profile-form-label">
                                <input type="checkbox" /> Ativar modo escuro
                            </label>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ProfilePage; 