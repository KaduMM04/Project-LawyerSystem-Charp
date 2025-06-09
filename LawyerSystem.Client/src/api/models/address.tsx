export namespace AddressDtos {
    export interface Address {
        Street: string;
        Number: string;
        Complement?: string;
        Neighborhood: string;
        City: string;
        State: string;
        ZipCode: string;
    }
}