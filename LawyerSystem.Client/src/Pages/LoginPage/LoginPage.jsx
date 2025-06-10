import { useState } from "react";
import Container from "../../Components/Container.jsx"
import { toast } from 'react-toastify';
import Button from "../../Components/Button.jsx"
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'
import statusNotification from "../../utils/status_notification";


function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        Login: '',
        Senha: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const UserLogin = {
            Email: form.Login,
            Password: form.Senha
        };

        try {
            const loggedInUser = await login(UserLogin);

            if (loggedInUser && loggedInUser.role !== undefined) {
                
                // --- LÓGICA FINAL E CORRETA ---
                // Ajustado para os valores do seu enum C#
                switch (loggedInUser.role) {
                    case 1: // Advogado
                        navigate('/initialpage');
                        break;
                    case 2: // Cliente
                        navigate('/client/cases');
                        break;
                    default:
                        console.warn("Role numérica não reconhecida:", loggedInUser.role);
                        navigate('/'); 
                        break;
                }
            }
        } catch (err) {
            statusNotification.showError('Erro ao fazer login');
        }
    };

    return (
        <Container>
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            className="login-input"
                            type="text"
                            name="Login"
                            value={form.Login}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            disabled={isLoading}
                        />
                        <label className="login-label">Login</label>
                    </div>

                    <div className="input-group">
                        <input
                            className="login-input"
                            type="password"
                            name="Senha"
                            value={form.Senha}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            disabled={isLoading}
                        />
                        <label className="login-label">Senha</label>
                    </div>

                     <Button
                        type="submit"
                        text="Login"
                        className="login-button"
                    />

                    <Button
                        type="reset"
                        text="Cancelar"
                        className="cancel-button-login"
                    />
                </form>
            </div>
        </Container>
    );

}


export default LoginPage;