import React from 'react';
import './ClientSidebar.css';
import { useAuth } from '../../Context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; // 1. Importações necessárias do react-router-dom
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import logoImage from '../../assets/logo.png';

const ClientSidebar = () => {
    // 2. Agora pegamos o objeto 'user' completo do contexto
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // Função de logout atualizada
    const handleLogoutClick = () => {
        logout();
        navigate('/login'); // 3. Usa o navigate para redirecionar
    };

    return (
        <>
            <div className="sidebar">
                <div className="menu-icon">
                    <div className="bar top-bar"></div>
                    <div className="bar middle-bar"></div>
                    <div className="bar bottom-bar"></div>
                </div>

                <div className="logo-section">
                    <img src={logoImage} alt="Logo" className="logo" />
                </div>

                <div id="nav-links">
                    {/* 4. Usando o componente <Link> para navegação sem reload */}
                    <Link to="/client/cases" className="nav-link">
                        <DescriptionIcon style={{ color: 'white' }} />
                        <span>Meus Processos</span>
                    </Link>
                    
                    {/* 5. Link dinâmico que só aparece se o usuário estiver logado */}
                    {user && (
                        <Link to={`/client/profile/${user.id}`} className="nav-link">
                            <PersonIcon style={{ color: 'white' }} />
                            <span>Perfil</span>
                        </Link>
                    )}
                </div>

                <div id="button-section">
                    <button className={isAuthenticated ? 'logout-button' : 'login-button'} onClick={handleLogoutClick}>
                        <span>{isAuthenticated ? 'Logout' : 'Login'}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ClientSidebar;