export type AddYardDTO = {
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

export type AddMotoDTO = {
    placa: string;
    descricao: string;
    patioId: number;
    status: Status;
}