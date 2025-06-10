import { HealthPaths } from "../enums/routes";
import apiClient from "../config";

async function getHealthStatus(): Promise<any> {
    try {
        const response = await apiClient.get(HealthPaths.GET_HEALTH);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const HealthService = {
    getHealthStatus,
};

export type HealthServiceType = typeof HealthService;
export default HealthService;
