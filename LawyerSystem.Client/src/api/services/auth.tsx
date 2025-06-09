import { AuthPaths } from "../enums/routes";
import { AuthDtos } from "../models/auth";


import apiClient from "../config";

async function login(loginData: AuthDtos.Login): Promise<any> {
    try {
        const response = await apiClient.post(AuthPaths.LOGIN, loginData);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createFullLawyer(lawyerData: AuthDtos.CreateFullLawyer): Promise<any> {
    try {
        const response = await apiClient.post(AuthPaths.CREATE_FULL_LAWYER, lawyerData);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createFullClient(clientData: AuthDtos.CreateFullClient): Promise<any> {
    try {
        const response = await apiClient.post(AuthPaths.CREATE_FULL_CLIENT, clientData);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function patchLawyer(lawyerData: AuthDtos.PatchLawyer): Promise<any> {
    try {
        const response = await apiClient.patch(AuthPaths.PATCH_LAWYER, lawyerData);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function patchClient(clientData: AuthDtos.PatchClient): Promise<any> {
    try {
        const response = await apiClient.patch(AuthPaths.PATCH_CLIENT, clientData);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


const AuthService = {
    login,
    createFullLawyer,
    createFullClient,
    patchLawyer,
    patchClient,
};

export type AuthServiceType = typeof AuthService;
export default AuthService;
