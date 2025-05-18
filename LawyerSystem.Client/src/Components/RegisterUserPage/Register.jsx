import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button  from '../Button.jsx'
function RegisterUser() {

    const navigate = useNavigate();

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

    const showSuccess = (message) => {
        toast.success(message, {
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
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '1',

        //Lawyer
        OAB: '',
        AreaOfExpertise: '',
        // Address Data

        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''




    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                UserDto: {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                    role: form.role,

                },
                AddressDto: {
                    street: form.street,
                    number: form.number,
                    complement: form.complement,
                    neighborhood: form.neighborhood,
                    city: form.city,
                    state: form.state,
                    zipCode: form.zipCode
                },
                LawyerCreateDto: {
                    OAB: form.OAB,
                    AreaOfExpertise: form.AreaOfExpertise
                }


            };
            console.log(JSON.stringify(data, null, 2));

            const response = await fetch("http://localhost:5000/api/User/createFull", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showSuccess("User created successfully");
            } else {
                const errorData = await response.text();
                console.error(errorData);
                showError("An error occurred while creating the user");
            }

        } catch (err) {
            console.error(err);
            showError("An error occurred while creating the user");
        }
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>User data</h2>
            <input name="name" placeholder="Nome" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Telefone" onChange={handleChange} />
            <input name="password" placeholder="Senha" onChange={handleChange} />
            

            <h2>Lawyer</h2>
                <input name="OAB" placeholder="OAB" onChange={handleChange} />
                <input name="AreaOfExpertise" placeholder="Area de atuação" onChange={handleChange} />

            <h2>Address</h2>

            <input name="street" placeholder="Rua" onChange={handleChange} />
            <input name="number" placeholder="Numero" onChange={handleChange} />
            <input name="complement" placeholder="Complemento" onChange={handleChange} />
            <input name="neighborhood" placeholder="Bairro" onChange={handleChange} />
            <input name="city" placeholder="Cidade" onChange={handleChange} />
            <input name="state" placeholder="Estado" onChange={handleChange} />
            <input name="zipCode" placeholder="CEP" onChange={handleChange} />

            <br />

                <button type="submit"> Create Account</button>
                <Button type={"button"} text={"navegar teste"} onClick={() => navigate("/app")} />

        </form>
        <ToastContainer />
        </>
    );
}

export default RegisterUser;