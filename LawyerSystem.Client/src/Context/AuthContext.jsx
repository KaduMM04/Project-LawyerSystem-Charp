import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import AuthService from '../api/services/auth';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    function handleUserAndToken(action, user = null, token = null) {
        switch (action) {
            case 'set':
                setUser(user);
                setToken(token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                break;
            case 'remove':
                setUser(null);
                setToken(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                break;
            default:
                console.error("Ação inválida para handleUserAndToken");
                break;
        }
    }

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            if (storedUser && storedToken && storedToken !== "undefined") {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Erro ao fazer parse do usuário salvo:", error);
            localStorage.removeItem('user');
            setUser(null);
            setToken(null);
        }
        setAuthLoading(false);
    }, []);

    const login = async (loginData) => {
        const response = await AuthService.login(loginData);
        handleUserAndToken('set', response.data.user, response.data.token);
    };

    const logout = () => {
        handleUserAndToken('remove');
    };

    const isAuthenticated = !!user && !!token;

    const updateUser = (newUserData) => {
        if (newUserData) {
            setUser(newUserData);
            // Update localStorage with new user data while keeping the token
            localStorage.setItem('user', JSON.stringify(newUserData));
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            logout, 
            isAuthenticated, 
            authLoading,
            updateUser 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}