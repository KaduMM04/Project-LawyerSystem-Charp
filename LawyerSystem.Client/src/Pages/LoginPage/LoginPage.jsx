import { useState } from "react";
import Container from "../../Components/Container.jsx" 
import { ToastContainer, toast } from 'react-toastify';
import Button from "../../Components/Button.jsx" 

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


    const [form, setForm] = useState({
        Login: '',
        Senha: '',
    })


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            

            const UserLogin = {
                    Email: form.Login,
                    Password: form.Senha
            }
            console.log(UserLogin);
            const response = await fetch('http://localhost:5000/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(UserLogin),
            });

            console.log(response);

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('user', JSON.stringify(responseData.user));
                window.location.href = '/initialpage';
            }
            else {
                const errorData = await response.json();
                console.error(errorData);
                showError('Erro ao fazer login');
            }
            console.log("chegou2");
        } catch (err) {
            console.log(err);
            showError('Erro ao fazer login');
        }

    }

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
                <ToastContainer />

                
            </Container>

        </>
    );

}

export default LoginPage;