import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

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

    const navigate = useNavigate();
    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        try {

            if (storedUser && storedToken !== "undefined") {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
            else {
                // Não tem usuário ou token válido, redireciona para login
                navigate('/login');
            }

        } catch (error) {
            console.error("Erro ao fazer parse do usuário salvo:", error);
            localStorage.removeItem('user');
            setUser(null);
            setToken(null);
        }
    }, []);

    const login = async (loginData) => {
        const response = await fetch('http://localhost:5000/api/User/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            showError(errorData.message || "Erro ao fazer login");
            return;
        }

        const responseData = await response.json();

        setUser(responseData.user);
        setToken(responseData.token);

        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('token', responseData.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
export function useAuth() {
    return useContext(AuthContext);
}




