import Button from "../../Components/Button";
import Container from "../../Components/Container";
import { useNavigate } from 'react-router-dom';

function InitialPage() {

    const navigate = useNavigate();

    return (
        <>
            <Container>

                <div>
                    <h1>Welcome to the Lawyer System</h1>
                    <p>This is the initial page of the application.</p>
                </div>

                <Button
                    text="Register Lawyer"
                    type="button"
                    Class="PatterButton"
                    onClick={() => navigate('/registerlawyer')}
                />
                <Button
                    text="Register client"
                    type="button"
                    Class="PatterButton"
                    onClick={() => navigate('/registerclient')}
                />
            </Container>

        </>
    );
}

export default InitialPage;