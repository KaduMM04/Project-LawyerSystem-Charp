import { AddressDtos } from './address';
import { ClientDtos } from './client';
import { LawyerDtos } from './lawyer';

export namespace AuthDtos {
    
    export interface Login {
        email: string;
        password: string;
    }
    
    interface User {
        name: string;
        email: string;
        Phone: string;
        Password: string;
        Role: number; 
    }

    export interface CreateFullLawyer {
        userDto: User;
        addressDto: AddressDtos.Address;
        lawyerCreateDto: LawyerDtos.LawyerCreate;
    }
    
    interface LawyerPatch {
        AreaOfExpertise?: string;
    }

    export interface PatchLawyer {
        userDto: User;
        addressDto: AddressDtos.Address;
        lawyerPatchDto: LawyerPatch;
    }

    export interface CreateFullClient {
        userDto: User;
        addressDto: AddressDtos.Address;
        clientCreateDto: ClientDtos.ClientCreate;
    }
    
    interface ClientPatch extends ClientDtos.ClientCreate {}

    export interface PatchClient {
        userDto: User;
        addressDto: AddressDtos.Address;
        clientPatchDto: ClientPatch;
    }

}