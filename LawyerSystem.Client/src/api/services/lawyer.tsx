import { LawyerDtos } from "../models/lawyer";  
import { LawyerPaths } from "../enums/routes";
import apiClient from "../config";


async function getAllLawyers(): Promise<any[]> {
    try {
        const response = await apiClient.get(LawyerPaths.GET_ALL_LAWYERS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function getLawyerById(id: string): Promise<any> {
    try {
        const response = await apiClient.get(LawyerPaths.GET_LAWYER_BY_ID.replace("{id}", id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createLawyer(lawyerData: LawyerDtos.LawyerCreate): Promise<any> {
    try {
        const response = await apiClient.post(LawyerPaths.CREATE_LAWYER, lawyerData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const LawyerService = {
    getAllLawyers,
    getLawyerById,
    createLawyer,
};

export type LawyerServiceType = typeof LawyerService;
export default LawyerService;