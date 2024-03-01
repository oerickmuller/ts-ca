import { ProdutoDTO } from "../../common/dtos/produto.dto";
import { Produto } from "../../core/entities/produto";

export class ProdutoPresenter {
  static toDTO(produto: Produto): ProdutoDTO {
    return {
      id: produto.id,
      nome: produto.nome,
      dataCadastro: produto.dataCadastro,
      valorEsperado: produto.valorEsperado,
      valorMinimo: produto.valorMinimo,
    };
  }
}
