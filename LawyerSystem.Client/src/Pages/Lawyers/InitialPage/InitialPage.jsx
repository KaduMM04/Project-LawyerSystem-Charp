import Button from "../../../Components/Button";
import { useNavigate } from 'react-router-dom';
import "./InitialPage.css"

import Sidebar from "../../../Components/Sidebar/Sidebar";
function InitialPage() {

    const navigate = useNavigate();

    return (
        <>
            <Sidebar />
            <div id="initial">

                <div id="buttons-group">
                    <Button
                        text="Processos Ativos"
                        type="button"
                        className="initial-button"
                        onClick={() => navigate('/registerlawyer')}
                    />
                    <Button
                        text="Agenda"
                        type="button"
                        className="initial-button"
                        onClick={() => navigate('/registerclient')}
                    />
                </div>

                <div id="next-audience">
                    <h2>Proximas Audiencias</h2>
                    <hr />
                    <div id="audience-info">
                        <h5>11/08/2025</h5>
                        <h5>Tony Vs Steven</h5>
                        <h5>30/02/2029</h5>
                        <h5>Caso Souza</h5>
                        <h5>25/12/1784</h5>
                        <h5>sei lá</h5>
                    </div>
                </div>

                <div id="recent-process">
                    <h2>Processos Recentes:</h2>
                    <div id="recent-cases">

                    </div>
                </div>

            </div>

        </>
    );
}

export default InitialPage;