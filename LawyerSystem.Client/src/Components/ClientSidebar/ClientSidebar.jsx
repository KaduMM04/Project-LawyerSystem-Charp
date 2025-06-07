import React from 'react';
import './ClientSidebar.css';
import { useAuth } from '../../Context/AuthContext'; 
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import logoImage from '../../assets/logo.png';


const ClientSidebar = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleAuthClick = () => {
        if (isAuthenticated) {
            logout();
        }
        window.location.href = '/login';
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
                    <a href="/client/cases" className="nav-link">
                        <DescriptionIcon style={{ color: 'white' }} />
                        <span>Meus Processos</span>
                    </a>
                    <a href="/client/profile" className="nav-link">
                        <PersonIcon style={{ color: 'white' }} />
                        <span>Perfil</span>
                    </a>
                </div>

                <div id="button-section">
                    <button className={isAuthenticated ? 'logout-button' : 'login-button'} onClick={handleAuthClick}>
                        <span>{isAuthenticated ? 'Logout' : 'Sign in'}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ClientSidebar;
