export type YardDTO = {
  nome: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
}

export type Status = "ATIVO" | "INATIVO"

export type MotoDTO = {
    placa: string;
    descricao: string;
    patioId?: number;
    status: Status;
}