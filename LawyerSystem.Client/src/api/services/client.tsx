import { ClientDtos } from '../models/client';
import { ClientPaths } from '../enums/routes';
import apiClient from '../config';


async function getAllClients(): Promise<any[]> {
    try {
        const response = await apiClient.get(ClientPaths.GET_ALL_CLIENTS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function getClientById(id: string): Promise<any> {
    try {
        const response = await apiClient.get(ClientPaths.GET_CLIENT_BY_ID.replace('{id}', id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createClient(clientData: ClientDtos.ClientCreate): Promise<any> {
    try {
        const response = await apiClient.post(ClientPaths.CREATE_CLIENT, clientData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


const ClientService = {
    getAllClients,
    getClientById,
    createClient,
};

export type ClientServiceType = typeof ClientService;
export default ClientService;
