import Button from "../../../Components/Button";
import { useNavigate } from 'react-router-dom';

import ClientSidebar from "../../../Components/ClientSidebar/ClientSidebar";


const ClientProfile = () => {
    // Placeholder for client profile data
    const client = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8901',
        address: '123 Main St, City, Country'
    };

    return (
        <div className="client-profile-page">
            <ClientSidebar />
            <div className="client-profile-content">
                <h2>Client Profile</h2>
                <div>
                    <strong>Name:</strong> {client.name}
                </div>
                <div>
                    <strong>Email:</strong> {client.email}
                </div>
                <div>
                    <strong>Phone:</strong> {client.phone}
                </div>
                <div>
                    <strong>Address:</strong> {client.address}
                </div>
                <Button onClick={() => alert('Edit Profile clicked')}>Edit Profile</Button>
            </div>
        </div>
    );
};

export default ClientProfile;