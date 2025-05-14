import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getYards = async () => {
  try {
    const response = await api.get("/patio");

    if (response.status !== 200) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.data.content;
  } catch (error: any) {
    console.error("Erro ao buscar pátios:", error.message);
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