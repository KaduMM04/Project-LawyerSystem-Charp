import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Button from "../../Components/Button.jsx";

function RegisterClientPage() {
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
        role: '2',
        // Address Data

        profission: '',
        representative: '',
        maritalStatus: '',
        companyName: '',

        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',

        

    });

    const handleChange = async (e) => {
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
                ClientDto: {
                    profission: form.profission,
                    representative: form.representative,
                    MaritalStatus: form.maritalStatus,
                    CompanyName: form.companyName
                }
            }

            console.log(JSON.stringify(data, null, 2));
            console.log(data);

            const response = await fetch('http://localhost:5000/api/User/createFullClient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            if (response.ok) {
                const responseText = await response.text();
                showSuccess(responseText);
            } else {
                const errorData = await response.text();
                showError(errorData);
            }


        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                showError(err.response.data.message);
            } else {
                showError("An unexpected error occurred while creating the user");
            }
        }
    }
    return (
        <>
            <div>
                
                <h1>Register Client</h1>
                <form onSubmit={handleSubmit}>
                    <h1>User</h1>
                    <input name="name" placeholder="Nome" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="phone" placeholder="Telefone" onChange={handleChange} />
                    <input name="password" placeholder="Senha" onChange={handleChange} />
                    
                    <h1>Client</h1>
                    <input name="profission" placeholder="profission" onChange={handleChange } />
                    <input name="representative" placeholder="representative" onChange={handleChange} />
                    <input name="maritalStatus" placeholder="maritalStatus" onChange={handleChange} />
                    <input name="companyName" placeholder="companyName" onChange={handleChange} />

                    <h2>Address</h2>

                    <input name="street" placeholder="Rua" onChange={handleChange} />
                    <input name="number" placeholder="Numero" onChange={handleChange} />
                    <input name="complement" placeholder="Complemento" onChange={handleChange} />
                    <input name="neighborhood" placeholder="Bairro" onChange={handleChange} />
                    <input name="city" placeholder="Cidade" onChange={handleChange} />
                    <input name="state" placeholder="Estado" onChange={handleChange} />
                    <input name="zipCode" placeholder="CEP" onChange={handleChange} />

                    <Button
                        type={"submit"}
                        text={"Cadastrar Advogado"}

                        Class={"RegisterButton"}
                    />
                    <Button
                        type={"reset"}
                        text={"Cancelar"}

                        Class={"CancelButton"}
                    />
                </form>
            </div>
            <ToastContainer />
            </>
        );
    }
export default RegisterClientPage;