import { AuthPaths } from "../enums/routes";
import { AuthDtos } from "../models/auth";

import apiClient from "../config";

async function login(loginData: AuthDtos.Login): Promise<any> {
    try {
        const response = await apiClient.post(AuthPaths.LOGIN, loginData);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

async function createFullLawyer(lawyerData: AuthDtos.CreateFullLawyer): Promise<any> {
    try {
        const response = await apiClient.post(AuthPaths.CREATE_FULL_LAWYER, lawyerData);
        return response.data;
    } catch (error) {
        console.error("Error creating full lawyer:", error);
        throw error;
    }
}

async function createFullClient(clientData: AuthDtos.CreateFullClient): Promise<any> {
    try {
        const response = await apiClient.post(AuthPaths.CREATE_FULL_CLIENT, clientData);
        return response.data;
    } catch (error) {
        console.error("Error creating full client:", error);
        throw error;
    }
}

async function patchLawyer(lawyerData: AuthDtos.PatchLawyer): Promise<any> {
    try {
        const response = await apiClient.patch(AuthPaths.PATCH_LAWYER, lawyerData);
        return response.data;
    } catch (error) {
        console.error("Error patching lawyer:", error);
        throw error;
    }
}

async function patchClient(clientData: AuthDtos.PatchClient): Promise<any> {
    try {
        const response = await apiClient.patch(AuthPaths.PATCH_CLIENT, clientData);
        return response.data;
    } catch (error) {
        console.error("Error patching client:", error);
        throw error;
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
