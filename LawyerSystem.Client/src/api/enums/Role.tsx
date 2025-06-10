import ClientCases from "../../Pages/Client/ClientCases/ClientCases";
import InitialPage from "../../Pages/Lawyers/InitialPage/InitialPage";

export enum Role {
    advogado = 1,
    cliente = 2,
}

export function loadPageByRole(role: Role): any {
    
    switch (role) {
        case Role.advogado:
            return InitialPage;
        case Role.cliente:
            return ClientCases;
        default:
            return InitialPage;
    }
}