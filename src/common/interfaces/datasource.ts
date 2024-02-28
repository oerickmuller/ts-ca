import { ProdutoDTO } from "../dtos/produto.js";

export interface IDataSource {
  incluirProduto(produto: ProdutoDTO): boolean;
  buscarProdutoPorId(id: string): ProdutoDTO|null;
}
