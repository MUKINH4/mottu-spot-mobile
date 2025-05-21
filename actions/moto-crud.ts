import { MotoDTO } from "@/types/types";
import { api } from "./api";

export const addMoto = async (payload: MotoDTO) => {
  const data = {
    placa: payload.placa,
    status: payload.status,
    patioId: payload.patioId,
    descricao: payload.descricao,
  };

  try {
    const response = await api.post("/moto", data);
    return response;
  } catch (error: any) {

    if (error.response) {
      // Erros retornados pela API
      throw new Error(
        error.response.data?.message ||
          "Erro ao adicionar moto. Verifique os dados e tente novamente."
      );
    } else if (error.request) {
      // Erros relacionados à conexão
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
      );
    } else {
      // Outros erros
      throw new Error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
  }
};
export const deleteMoto = async (id: number) => {
  try {
    const response = await api.delete(`moto/${id}`);
    return response.status;
  } catch (e: any) {
    console.error("Erro ao deletar moto:", e);
    throw new Error(
      e.response?.data?.message || "Erro ao deletar moto. Tente novamente mais tarde."
    );
  }
};
export const getMotoById = async (id: number) => {
  try {
    const response = await api.get(`/moto/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar moto:", error);
    throw new Error(error.response?.data?.message || "Erro ao buscar moto.");
  }
};

export const updateMoto = async (id: number, payload: MotoDTO) => {
  try {
    const response = await api.put(`/moto/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar moto:", error);
    throw new Error(error.response?.data?.message || "Erro ao atualizar moto.");
  }
};