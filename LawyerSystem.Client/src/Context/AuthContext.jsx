import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const showError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };

    // Este useEffect agora apenas carrega os dados do localStorage sem redirecionar
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            if (storedUser && storedToken && storedToken !== "undefined") {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
            localStorage.clear();
        }
    }, []);

    const login = async (loginData) => {
        try {
            const response = await fetch('http://localhost:5000/api/User/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                showError(errorData.message || "Erro ao fazer login");
                return null; // Retorna null em caso de falha
            }

            const responseData = await response.json();

            setUser(responseData.user);
            setToken(responseData.token);

            localStorage.setItem('user', JSON.stringify(responseData.user));
            localStorage.setItem('token', responseData.token);

            // A MUDANÇA ESSENCIAL: Retorna os dados do usuário para a LoginPage
            return responseData.user;

        } catch (error) {
            console.error("Erro de conexão:", error);
            showError("Não foi possível conectar ao servidor.");
            return null; // Retorna null em caso de erro de rede
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // O redirecionamento será feito na sidebar ou onde o logout for chamado
    };

    const isAuthenticated = !!user && !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}