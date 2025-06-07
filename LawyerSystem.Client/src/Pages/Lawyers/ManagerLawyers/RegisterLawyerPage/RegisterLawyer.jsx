import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from "../../../../Components/Button.jsx" 
import './RegisterLawyer.css'

function RegisterLawyer() {

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
    
    const handleZipCodeBlur = async () => {
        let { zipCode } = form;

        
        zipCode = zipCode.replace(/\D/g, '');
        if (zipCode.length === 0) {
            return
        }
        if (zipCode.length !== 8) {
            showError("CEP invalido.");
            return;
        }

        

        try {
            const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
            const data = await response.json();

            console.log(data);  // veja no console se vem correto

            if (!data.erro) {
                setForm(prev => ({
                    ...prev,
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf
                }));
                

            } else {
                showError("CEP não encontrado.");
            }
        } catch (err) {
            showError("Erro ao buscar o CEP.");
        }
    };

    const handleReset = () => {
        setForm({
            name: '',
            email: '',
            phone: '',
            password: '',
            role: '1',
            OAB: '',
            AreaOfExpertise: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        try {

            const emptyFields = Object.entries(form).filter(([key, value]) => {
                const isReadOnly = ['street', 'neighborhood', 'city', 'state', 'complement'].includes(key);
                return !isReadOnly && (!value || value.trim() === '');
            });
            
            if (emptyFields.length > 0) {
                showError("Por favor, preencha todos os campos.");
                return;
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
                LawyerCreateDto: {
                    OAB: form.OAB,
                    AreaOfExpertise: form.AreaOfExpertise
                }


            };
            console.log(JSON.stringify(data, null, 2));

            const response = await fetch("http://localhost:5000/api/User/createFullLawyer", {
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
            if (err.response && err.response.data && err.response.data.message) {
                showError(err.response.data.message);
            } else {
                showError("An unexpected error occurred while creating the user");
            }
        }
    }


    return (
       
        <div className="lawyer-container">
        <form onSubmit={handleSubmit}>
                <h1>Registrar Advogado</h1>
                
                <div className="lawyer-inputs">
                    <div className="input-group">
                    <input
                        className="floating-input"
                        name="name"
                            placeholder=" "
                            value={form.name }
                        onChange={handleChange} />
                        <label className="floating-label">Nome</label>
                    </div>
                    <div className="input-group">
                    <input
                        className="floating-input"
                        name="email"
                            placeholder=" "
                            value={form.email }
                        onChange={handleChange} />
                        <label className="floating-label">Email</label>
                    </div>
                    <div className="input-group">
                    <input
                        className="floating-input"
                        name="phone"
                            placeholder=" "
                            value={form.phone }
                        onChange={handleChange} />
                        <label className="floating-label">Telefone</label>
                    </div>
                    <div className="input-group">
                    <input
                        className="floating-input"
                        name="password"
                            placeholder=" "
                            value={form.password }
                        onChange={handleChange} />
                        <label className="floating-label">Senha</label>
                    </div>
                    <div className="input-group">
                    <input
                        className="floating-input"
                        name="OAB"
                            placeholder=" "
                            value={form.OAB}
                        onChange={handleChange} />
                        <label className="floating-label">OAB</label>
                    </div>
                    <div className="input-group">
                    <input
                        className="floating-input"
                        name="AreaOfExpertise"
                            placeholder=" "
                            value={form.AreaOfExpertise}
                        onChange={handleChange} />
                    <label className="floating-label">Area de atuacao</label>
                    </div>
                </div>
                <h2>Endereco</h2>
                <div className="lawyer-inputs">


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
                            readOnly={true}/>
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
                            readOnly={true}/>
                        <label className="floating-label">Cidade</label>
                    </div>
                    <div className="input-group">
                    <input
                        className="floating-input"    
                        name="state"
                            placeholder=" "
                            value={form.state}
                            onChange={handleChange}
                            readOnly={true}/>
                        <label className="floating-label">Estado</label>
                    </div>
                   
            </div>
            <br />
            <div className="button-container">
                <Button
                       type={"submit"}
                    text={"Cadastrar Advogado"}
                    onClick={ handleReset }
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

export default RegisterLawyer;