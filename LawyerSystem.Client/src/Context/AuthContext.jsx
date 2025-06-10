import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import AuthService from '../api/services/auth';


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

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

    
    const navigate = useNavigate();
    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        try {

            if (storedUser && storedToken && storedToken !== "undefined") {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } else {
                navigate('/login');
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

        if (response.status !== 200) {
            console.error("Erro ao fazer login:", response);
            showError(response.response.data.message || "Erro ao fazer login");
            return;
        }

        setUser(response.data.user);
        setToken(response.data.token);

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const isAuthenticated = !!user && !!token;
    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, authLoading }}>
            {children}
        </AuthContext.Provider>
    );

}
export function useAuth() {
    return useContext(AuthContext);
}




