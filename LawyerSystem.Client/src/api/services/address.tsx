import { AddressPaths } from "../enums/routes";
import { AddressDtos } from "../models/address";

import apiClient from "../config";

async function getAllAddress(): Promise<any[]> {
    try {
        const response = await apiClient.get(AddressPaths.GET_ALL_ADDRESSES);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

async function createAddress(address: AddressDtos.Address): Promise<any> {
    try {
        const response = await apiClient.post(AddressPaths.CREATE_ADDRESS, address);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const AddressService = {
    getAllAddress,
    createAddress,
};

export type AddressServiceType = typeof AddressService;
export default AddressService;