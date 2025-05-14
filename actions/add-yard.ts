import { AddYardDTO } from "@/types/types";
import { api } from "./fetchData";

export async function addYard(payload: AddYardDTO) {
  try {
    // monta o corpo da requisição conforme o DTO
    const data = {
        nome: payload.nome,
        cep: payload.cep,
        logradouro: payload.logradouro,
        numero: payload.numero,
        bairro: payload.bairro,
        cidade: payload.cidade,
        estado: payload.estado,
        pais: payload.pais
    };

    // faz POST para o endpoint /patio
    const response = await api.post("/patio", data);
    return response.data; // retorna o objeto criado
  } catch (error) {
    console.error("Erro ao adicionar pátio:", error);
    throw error;
  }
}