import { ClientDtos } from '../models/client';
import { ClientPaths } from '../enums/routes';
import apiClient from '../config';


async function getAllClients(): Promise<any[]> {
    try {
        const response = await apiClient.get(ClientPaths.GET_ALL_CLIENTS);
        return response.data;
    } catch (error) {
        console.error('Error fetching all clients:', error);
        throw error;
    }
}

async function getClientById(id: string): Promise<any> {
    try {
        const response = await apiClient.get(ClientPaths.GET_CLIENT_BY_ID.replace('{id}', id));
        return response.data;
    } catch (error) {
        console.error('Error fetching client by ID:', error);
        throw error;
    }
}

async function createClient(clientData: ClientDtos.ClientCreate): Promise<any> {
    try {
        const response = await apiClient.post(ClientPaths.CREATE_CLIENT, clientData);
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}


const ClientService = {
    getAllClients,
    getClientById,
    createClient,
};

export type ClientServiceType = typeof ClientService;
export default ClientService;
