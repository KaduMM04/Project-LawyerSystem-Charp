import { viaCepHost, viaCepRoutes } from "./routes";

export function getAddressByCep(cep: string): Promise<any> {
    const url = `${viaCepHost}${viaCepRoutes.GET_VIACEP.replace("{cep}", cep)}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching address: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            throw new Error(`Failed to fetch address: ${error.message}`);
        });
}