import { PropostaDTO } from "./proposta.dto";

export type ProdutoDTO = {
  id: string;
  nome: string;
  dataCadastro: number;
  valorEsperado: number;
  valorMinimo: number;
  propostas?: PropostaDTO[];
};
