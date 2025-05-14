import { AddMotoDTO } from "@/types/types";
import { api } from "./fetchData";

export async function AddMoto(payload: AddMotoDTO){

    const data = {
        placa: payload.placa,
        status: payload.status,
        patioId: payload.patioId,
        descricao: payload.descricao
    }

    try {
        const response = await api.post('/moto', data)
        console.log(response);
        return response;
    } catch (error){
        console.error(error);
    }
}