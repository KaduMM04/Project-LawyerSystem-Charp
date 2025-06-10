import { UserPaths } from "../enums/routes";

import apiClient from "../config";


async function getUserById(id: string): Promise<any> {
    try {
        const response = await apiClient.get(UserPaths.GET_USER_BY_ID.replace("{id}", id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
    }

async function getAllUsers(): Promise<any[]> {
    try {
        const response = await apiClient.get(UserPaths.GET_ALL_USERS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function getClientUser(id: string): Promise<any> {
    try {
        const response = await apiClient.get(UserPaths.GET_CLIENT_USER.replace("{id}", id));
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const UserService = {
    getUserById,
    getAllUsers,
    getClientUser,
};

export type UserServiceType = typeof UserService;
export default UserService;