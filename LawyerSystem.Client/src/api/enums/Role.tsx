import { ClientCasesPages, InitialPages } from "../../web_routes";

export enum Role {
    advogado = 1,
    cliente = 2,
}

export function returnPageByRole(role: Role): string {
    
    switch (role) {
        case Role.advogado:
            return InitialPages.INITIAL_PAGE;
        case Role.cliente:
            return ClientCasesPages.CLIENT_CASES_PAGE;
        default:
            return InitialPages.INITIAL_PAGE;
    }
}