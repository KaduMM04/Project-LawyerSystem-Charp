import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Button from "../../../../Components/Button.jsx";
import './ClientRegisterPage.css';
import AuthService from "../../../../api/services/auth";
import statusNotification from "../../../../utils/status_notification";
import { getAddressByCep } from "../../../../integrations/viacep/viaCep";

function RegisterClientPage() {

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

            const emptyFields = Object.entries(form).filter(([key, value]) => {
                const isReadOnly = ['street', 'neighborhood', 'city', 'state'].includes(key);
                const optional = ['complement', 'profission', 'representative', 'companyName'].includes(key);
                if (isReadOnly || optional) return false;

                return !value || value.trim() === '';
            });

            if (emptyFields.length > 0) {
                showError("Por favor, preencha todos os campos.");
                return;
            }
            let representativeNull;

            if (form.representative === '') {
                representativeNull = 'N/A';
            }
            else {
                representativeNull = form.representative;
            }

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
                    representative: representativeNull,
                    MaritalStatus: form.maritalStatus,
                    CompanyName: form.companyName
                }
            }
            await AuthService.createFullClient(data);
            statusNotification.showSuccess("Usuário criado com sucesso!");

        } catch (err) {
            statusNotification.showError(err || "Erro ao criar o usuário.");
        }
    }


    const handleZipCodeBlur = async () => {
        let { zipCode } = form;


        zipCode = zipCode.replace(/\D/g, '');

        if (zipCode.length === 0) {
            return
        }

        if (zipCode.length !== 8) {
            statusNotification.showError("CEP invalido.");
            return;
        }



        try {
            const data = await getAddressByCep(zipCode);

            if (!data.erro) {
                setForm(prev => ({
                    ...prev,
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf
                }));


            } else {
                statusNotification.showError("CEP não encontrado.");
            }
        } catch (err) {
            statusNotification.showError(err || "Erro ao buscar o CEP.");
        }
    };

    return (
        <>

            <div className="client-container">
                <form onSubmit={handleSubmit}>
                    <h1>Register Client</h1>

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
                                name="email"
                                placeholder=" "
                                value={form.email}
                                onChange={handleChange} />
                            <label className="floating-label">Email</label>
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
                                name="profission"
                                placeholder=" "
                                value={form.profission}
                                onChange={handleChange} />
                            <label className="floating-label">Profissao (se tiver)</label>
                        </div>
                        <div className="input-group">
                            <input
                                className="floating-input"
                                name="representative"
                                placeholder=" "
                                value={form.representative}
                                onChange={handleChange} />
                            <label className="floating-label">Representante (se tiver)</label>
                        </div>
                        <div className="input-group">
                            <input
                                className="floating-input"
                                name="maritalStatus"
                                placeholder=" "
                                value={form.maritalStatus}
                                onChange={handleChange} />
                            <label className="floating-label">Estado Civil</label>
                        </div>
                        <div className="input-group">
                            <input
                                className="floating-input"
                                name="companyName"
                                placeholder=" "
                                value={form.companyName}
                                onChange={handleChange} />
                            <label className="floating-label">Empresa (se tiver)</label>
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
                                readOnly={true}
                                onChange={handleChange} />
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
                            text={"Cadastrar Advogado"}

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
            </div>
            <ToastContainer />
        </>
    );
}
export default RegisterClientPage;