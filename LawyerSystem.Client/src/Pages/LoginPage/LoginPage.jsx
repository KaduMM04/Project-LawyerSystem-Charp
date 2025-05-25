import { useState } from "react";
import Container from "../../Components/Container.jsx" 
import { toast } from 'react-toastify';
import Button from "../../Components/Button.jsx" 
import { useAuth } from "../../Context/AuthContext.jsx";
import './LoginPage.css'
function LoginPage() {

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

    const { login } = useAuth();




    const [form, setForm] = useState({
        Login: '',
        Senha: '',
    })


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

            await login(UserLogin);
            window.location.href = '/initialpage';

        } catch (err) {
            console.log(err);
            showError('Erro ao fazer login');
        }

    };

    return (
        <Container>
            <div className="login-container">
                <h1 className="login-title">LoginPage</h1>

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
                        />
                        <label className="floating-label">Login</label>
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
                        />
                        <label className="floating-label">Senha</label>
                    </div>

                    <Button
                        type="submit"
                        text="Login"
                        Class="login-button"
                    />

                    <Button
                        type="reset"
                        text="Cancelar"
                        Class="cancel-button"
                    />
                </form>
            </div>
        </Container>
    );

}

export default LoginPage;