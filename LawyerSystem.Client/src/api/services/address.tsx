import { AddressPaths } from "../enums/routes";
import { AddressDtos } from "../models/address";

import apiClient from "../config";

async function getAllAddress(): Promise<any[]> {
    try {
        const response = await apiClient.get(AddressPaths.GET_ALL_ADDRESSES);
        return response.data;
    } catch (error) {
        console.error("Error fetching all addresses:", error);
        throw error;
    }
}

async function createAddress(address: AddressDtos.Address): Promise<any> {
    try {
        const response = await apiClient.post(AddressPaths.CREATE_ADDRESS, address);
        return response.data;
    } catch (error) {
        console.error("Error creating address:", error);
        throw error;
    }
}

const AddressService = {
    getAllAddress,
    createAddress,
};

export type AddressServiceType = typeof AddressService;
export default AddressService;