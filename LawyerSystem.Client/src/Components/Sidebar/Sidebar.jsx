import React,{useState } from 'react'
import './Sidebar.css';
import { useAuth } from '../../Context/AuthContext'; 
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import GavelIcon from '@mui/icons-material/Gavel';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
const Sidebar = () => {

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
                        <h1>LOGO</h1>
                    </div>
               
                <div id="nav-links">
                    <a href="/" className="nav-link">
                        <DescriptionIcon style={{ color: 'white' }} />
                        <span>Processos</span></a>
                    <a href="/" className="nav-link">
                        <PeopleIcon style={{ color: 'white' }} />
                        <span>Clientes</span></a>
                    <a href="/" className="nav-link">
                        <GavelIcon style={{ color: 'white' }} />
                        <span>Advogados</span></a>
                    <a href="/" className="nav-link">
                        <PersonIcon style={{ color: 'white' }} />
                        <span>Perfil</span></a>
                </div>
                <div id="button-section">
                    <button className={isAuthenticated ? 'logout-button' : 'login-button'} onClick={handleAuthClick}>
                        <span>{isAuthenticated ? 'Logout' : 'Sign in'}</span>
                    </button>
                </div>
            </div>
        </>
    
    );

}

export default Sidebar;