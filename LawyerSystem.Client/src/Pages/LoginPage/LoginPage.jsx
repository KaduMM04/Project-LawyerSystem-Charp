import { useState } from "react";
import Container from "../../Components/Container.jsx" 
import { toast } from 'react-toastify';
import Button from "../../Components/Button.jsx" 
import { useAuth } from "../../Context/AuthContext.jsx";

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
        <>
            <Container>

                <h1> LoginPage</h1>

                <form onSubmit={handleSubmit}>
                    <input name="Login" placeholder="Login" onChange={handleChange} />
                    <input name="Senha" placeholder="Senha" onChange={handleChange} />


                    <Button
                        type={"submit"}
                        text={"Login"}
                        Class={"RegisterButton"}

                    />

                    <Button
                        type={"reset"}
                        text={"Cancelar"}

                        Class={"CancelButton"}
                    />
                </form>
            
            </Container>

        </>
    );

}

export default LoginPage;