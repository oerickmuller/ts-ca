import { ProdutoDTO } from "@/common/dtos/produto.js";
import { IDataSource } from "@/common/interfaces/datasource.js";
export class DummyDataSource implements IDataSource {
  incluirProduto(produto: ProdutoDTO): boolean {
    return true;
  }
  buscarProdutoPorId(id: string): ProdutoDTO {
    return {
      id: "q1w2e3",
      nome: "nome",
      dataCadastro: 1,
      valorEsperado: 0,
      valorMinimo: 0,
    };
  }
}
