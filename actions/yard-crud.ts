import { YardDTO } from "@/types/types";
import { Alert } from "react-native";
import { api } from "./api";

export const addYard = async (payload: YardDTO) => {
  try {
    const data = {
      nome: payload.nome,
      cep: payload.cep,
      logradouro: payload.logradouro,
      numero: payload.numero,
      bairro: payload.bairro,
      cidade: payload.cidade,
      estado: payload.estado,
      pais: payload.pais,
    };

    const response = await api.post("/patio", data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao adicionar pátio:", error);

    // Tratamento de erros mais amigável
    if (error.response) {
      // Erros retornados pela API
      throw new Error(
        error.response.data.message ||
          "Erro ao adicionar pátio. Verifique os dados e tente novamente."
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

export const deleteYard = async (id: number) => {
  const response = await api.delete(`patio/${id}`);
  return response;
};

export const getYardById = async (id: number) => {
  try {
    const response = await api.get(`/patio/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar pátio:", error);
    throw new Error(error.response?.data?.message || "Erro ao buscar pátio.");
  }
};

export const updateYard = async (id: number, payload: YardDTO) => {
  try {
    const response = await api.put(`/patio/${id}`, payload);
    return response.data;
  } catch (error: any) {
    Alert.alert("Erro", error.response?.data?.message)
    throw new Error(error.response?.data?.message || "Erro ao atualizar pátio.");
  }
};