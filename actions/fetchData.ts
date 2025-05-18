import { api } from './api';

export const getYards = async () => {
  try {
    const response = await api.get("/patio");

    if (response.status !== 200) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.data.content;
  } catch (error: any) {
    console.error("Erro ao buscar pátios:", error.response.data.message);
    throw error;
  }
};

export const getMotos = async () => {
  try {
    const response = await api.get("/moto")

    if (response.status !== 200) {
      throw new Error(`Erro na API: ${response.status}`)
    }
    return response.data.content;
  } catch (error: any) {
    console.error("Erro ao buscar pátios: ", error.message)
  }
}