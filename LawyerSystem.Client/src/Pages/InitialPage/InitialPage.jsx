import Button from "../../Components/Button";
import Container from "../../Components/Container";
import { useNavigate } from 'react-router-dom';
import "./InitialPage.css"
function InitialPage() {

    const navigate = useNavigate();

    return (
        <>
            
                
                <Button
                    text="Processos Ativos"
                    type="button"
                    Class="initial-button"
                    onClick={() => navigate('/registerlawyer')}
                />
                <Button
                    text="Agenda"
                    type="button"
                    Class="initial-button"
                    onClick={() => navigate('/registerclient')}
                />

                <div id="next-audience">
                    <h2>Proximas Audiencias</h2>
                    <hr></hr>
                    <div id="audience-info">
                        <h5>11/08/2025</h5>
                        <h5>Tony Vs Steven</h5>
                    
                   
                        <h5>30/02/2029</h5>
                        <h5>Caso Souza</h5>
                    
                    
                        <h5>25/12/1784</h5>
                        <h5>sei la </h5>
                    </div>
                    
                </div>
          
        
        </>
    );
}

export default InitialPage;