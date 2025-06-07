import Button from "../../../Components/Button";
import { useNavigate } from 'react-router-dom';


import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";


function ClientCases() {

    const navigate = useNavigate();

    return (
        <>
            <ClientSidebar />
            <div id="initial">
                <div id="buttons-group">
                    <Button
                        text="Processos Ativos"
                        type="button"
                        Class="initial-button"
                        onClick={() => navigate('/client/cases')}
                    />
                    <Button
                        text="Perfil"
                        type="button"
                        Class="initial-button"
                        onClick={() => navigate('/client/profile')}
                    />
                </div>
            </div>
        </>
    );
}

export default ClientCases;