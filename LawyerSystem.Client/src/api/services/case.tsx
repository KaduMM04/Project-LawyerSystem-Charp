import { CaseDtos } from "../models/Case";
import { CasePaths } from "../enums/routes";
import apiClient from "../config";

async function getAllCases(): Promise<any[]> {
    try {
        const response = await apiClient.get(CasePaths.GET_ALL_CASES);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createCase(caseData: CaseDtos.Case): Promise<any> {
    try {
        const response = await apiClient.post(CasePaths.CREATE_CASE, caseData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const CaseService = {
    getAllCases,
    createCase,
};

export type CaseServiceType = typeof CaseService;
export default CaseService;
