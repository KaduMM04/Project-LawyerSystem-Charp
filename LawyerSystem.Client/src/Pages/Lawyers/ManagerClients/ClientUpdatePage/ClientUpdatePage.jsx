import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import Button from "../../../../Components/Button"
import './ClientUpdatePage.css'
import { getAddressByCep } from "../../../../integrations/viacep/viaCep";
import AuthService from "../../../../api/services/auth";
import statusNotification from "../../../../utils/status_notification";


function ClientUpdatePage({ user }) {

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: '2',

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
            statusNotification.showError("CEP inválido.");
            return;
        }

        try {
            const data = await getAddressByCep(zipCode);
        
            if (data.erro) {
                statusNotification.showError("CEP não encontrado.");
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
            statusNotification.showError(error || "Erro ao buscar CEP");
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
            await AuthService.patchClient(data);
            statusNotification.showSuccess("Usuário atualizado com sucesso");

        } catch (err) {
            statusNotification.showError(err || "Erro ao atualizar usuário");
        }
    }

    return (

        <div id="client-container">
            <div className="client-details">
                {console.log("teasda", user) }
                {<div><strong>Nome: {user ? user.name : ' '}</strong></div>}
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
                        className={"RegisterButton"}
                    />
                    <Button
                        type={"button"}
                        text={"Cancelar"}
                        onClick={handleReset}
                        className={"CancelButton"}
                    />
                </div>
            </form>
            <ToastContainer />

        </div>
    );
}

export default ClientUpdatePage;