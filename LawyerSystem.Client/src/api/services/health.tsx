import { HealthPaths } from "../enums/routes";
import apiClient from "../config";

async function getHealthStatus(): Promise<any> {
    try {
        const response = await apiClient.get(HealthPaths.GET_HEALTH);
        return response.data;
    } catch (error) {
        console.error("Error fetching health status:", error);
        throw error;
    }
}

const HealthService = {
    getHealthStatus,
};

export type HealthServiceType = typeof HealthService;
export default HealthService;
