import React from 'react';
import './Sidebar.css';
import { useAuth } from '../../Context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; // 1. Importações corretas
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => { // Este é o Sidebar do Advogado/Gerente

    const { user, isAuthenticated, logout } = useAuth(); // 2. Pega o usuário do contexto
    const navigate = useNavigate();
    
    const handleLogoutClick = () => {
        logout();
        navigate('/login'); // 3. Usa navigate para redirecionar
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
                    <h1>LOGO</h1>
                </div>
                
                <div id="nav-links">
                    {/* 4. Links atualizados para usar o componente <Link> */}
                    <Link to="/initialpage" className="nav-link">
                        <HomeIcon style={{ color: 'white' }} />
                        <span>Início</span>
                    </Link>
                    <Link to="/managerCases" className="nav-link">
                        <DescriptionIcon style={{ color: 'white' }} />
                        <span>Processos</span>
                    </Link>
                    <Link to="/managerClient" className="nav-link">
                        <PeopleIcon style={{ color: 'white' }} />
                        <span>Clientes</span>
                    </Link>
                    <Link to="/managerLawyer" className="nav-link">
                        <GavelIcon style={{ color: 'white' }} />
                        <span>Advogados</span>
                    </Link>
                    {/* Este link de perfil agora está preparado para ser dinâmico */}
                    {user && (
                        <Link to={`/manager/profile/${user.id}`} className="nav-link">
                            <PersonIcon style={{ color: 'white' }} />
                            <span>Perfil</span>
                        </Link>
                    )}
                </div>

                <div id="button-section">
                    <button className={isAuthenticated ? 'logout-button' : 'login-button'} onClick={handleLogoutClick}>
                        <span>{isAuthenticated ? 'Logout' : 'Sign in'}</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;