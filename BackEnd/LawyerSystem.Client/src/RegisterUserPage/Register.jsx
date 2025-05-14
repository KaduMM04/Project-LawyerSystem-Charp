import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
function RegisterUser() {

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

        stree: '',
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
            const addressData = {
                street: form.street,
                number: form.number,
                complement: form.complement,
                neighborhood: form.neighborhood,
                city: form.city,
                state: form.state,
                zipCode: form.zipCode,
            };

            const addressRes = await fetch("http://localhost:5000/api/Address", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addressData),
            });

            if (!addressRes.ok) showError("Failed to create address");

            const lawyerData = {
                OAB: form.OAB,
                AreaOfExpertise: form.AreaOfExpertise,
            };

            const lawyerRes = await fetch("http://localhost:5000/api/Lawyer", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lawyerData),
            });

            if (!lawyerRes.ok) showError("Failed to create lawyer");

            const addressResult = await addressRes.json();
            const lawyerResult = await lawyerRes.json();
            
            console.log(addressResult);
            console.log(lawyerResult);
            const addressId = addressResult.id;
            const OAB = lawyerResult.oab;

            console.log(addressId);
            console.log(OAB)
            const userData = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: form.role,
                lawyerOAB: OAB,
                addressId: addressId
            };

            const useRes = await fetch("http://localhost:5000/api/User/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (useRes.ok) showSuccess("User created successfully!");

            
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

        </form>
        <ToastContainer />
        </>
    );
}

export default RegisterUser;