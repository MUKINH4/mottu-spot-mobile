import { AddMotoDTO } from "@/types/types";
import { api } from "./fetchData";

export async function AddMoto(payload: AddMotoDTO){

    const data = {
        placa: payload.placa,
        status: payload.status,
        patioId: payload.patioId,
        descricao: payload.descricao
    }

    const response = await api.post('/moto', data).catch(e => console.log(e.response.data.message))
    return response;

}