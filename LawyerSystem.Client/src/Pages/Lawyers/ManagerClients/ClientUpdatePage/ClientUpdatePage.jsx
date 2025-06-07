import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import Button from "../../../../Components/Button"
import './ClientUpdatePage.css'

function ClientUpdatePage({ user }) {


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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleZipCodeBlur = async () => {
        let { zipCode } = form;
        zipCode = zipCode.replace(/\D/g, '');

        if (zipCode.length !== 8) {
            showError("CEP inv�lido.");
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
            const data = await response.json();

            if (data.erro) {
                showError("CEP n�o encontrado.");
                return;
            }

            setForm((prevForm) => ({
                ...prevForm,
                street: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }));
        } catch (error) {
            showError("Erro ao buscar o CEP." + error.message);
        }
    }





    const handleReset = () => {
        setForm({
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("user", user);

        try {
            const data = {
                userUpdate: {
                    name: form.name || null,
                    email: user.email,
                    phone: form.phone || null,
                    password: form.password || null,

                },
                addressDto: {
                    street: form.street || null,
                    number: form.number || null,
                    complement: form.complement || null,
                    neighborhood: form.neighborhood || null,
                    city: form.city || null,
                    state: form.state || null,
                    zipCode: form.zipCode || null
                },
                clientDto: {
                    profission: form.profission || null,
                    representative: form.representative || null,
                    maritalStatus: form.maritalStatus || null,
                    companyName: form.companyName || null
                }

            };
            console.log(JSON.stringify(data, null, 2));

            const response = await fetch("http://localhost:5000/api/User/patch/client", {
                method: "PATCH",
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
            if (err.response && err.response.data && err.response.data.message) {
                showError(err.response.data.message);
            } else {
                showError("An unexpected error occurred while creating the user");
            }
        }
    }

    return (

        <div id="client-container">
            <div className="client-details">
                {<div><strong>Nome: {user ? user.nome : ' '}</strong></div>}
                <div><strong>Email:</strong> {user ? user.email : ' '}</div>
            </div>

            <form onSubmit={handleSubmit}>
                <h1>Atualizar dados do cliente selecionado</h1>

                <div className="client-inputs">
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="name"
                            placeholder=" "
                            value={form.name}
                            onChange={handleChange} />
                        <label className="floating-label">Nome</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="phone"
                            placeholder=" "
                            value={form.phone}
                            onChange={handleChange} />
                        <label className="floating-label">Telefone</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="password"
                            placeholder=" "
                            value={form.password}
                            onChange={handleChange} />
                        <label className="floating-label">Senha</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="representative"
                            placeholder=" "
                            value={form.AreaOfExpertise}
                            onChange={handleChange} />
                        <label className="floating-label">Representante</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="profission"
                            placeholder=" "
                            value={form.AreaOfExpertise}
                            onChange={handleChange} />
                        <label className="floating-label">Profissao</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="maritalStatus"
                            placeholder=" "
                            value={form.AreaOfExpertise}
                            onChange={handleChange} />
                        <label className="floating-label">Estado Civil</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="companyName"
                            placeholder=" "
                            value={form.AreaOfExpertise}
                            onChange={handleChange} />
                        <label className="floating-label">Empresa</label>
                    </div>
                </div>
                <h2>Endereco</h2>
                <div className="client-inputs">
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="zipCode"
                            placeholder=" "
                            value={form.zipCode}
                            onChange={handleChange}
                            onBlur={handleZipCodeBlur} />
                        <label className="floating-label">CEP</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="street"
                            placeholder=" "
                            value={form.street}
                            onChange={handleChange}
                            readOnly={true} />
                        <label className="floating-label">Rua</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="number"
                            placeholder=" "
                            value={form.number}
                            onChange={handleChange} />
                        <label className="floating-label">Numero</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="complement"
                            placeholder=" "
                            value={form.complement}
                            onChange={handleChange} />
                        <label className="floating-label">Complemento</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="neighborhood"
                            placeholder=" "
                            value={form.neighborhood}
                            readOnly={true}
                            onChange={handleChange} />
                        <label className="floating-label">Bairro</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="city"
                            placeholder=" "
                            value={form.city}
                            onChange={handleChange}
                            readOnly={true} />
                        <label className="floating-label">Cidade</label>
                    </div>
                    <div className="input-group">
                        <input
                            className="floating-input"
                            name="state"
                            placeholder=" "
                            value={form.state}
                            onChange={handleChange}
                            readOnly={true} />
                        <label className="floating-label">Estado</label>
                    </div>

                </div>
                <br />
                <div className="button-container">
                    <Button
                        type={"submit"}
                        text={"Editar"}
                        onClick={handleReset}
                        Class={"RegisterButton"}
                    />
                    <Button
                        type={"button"}
                        text={"Cancelar"}
                        onClick={handleReset}
                        Class={"CancelButton"}
                    />
                </div>
            </form>
            <ToastContainer />

        </div>
    );
}

export default ClientUpdatePage;