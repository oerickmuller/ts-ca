import { ProdutoDTO } from "../dtos/produto.dto.js";

export interface IDataSource {
  incluirProduto(produto: ProdutoDTO): Promise<boolean>;
  buscarProdutoPorId(id: string): Promise<ProdutoDTO | null>;
  incluirProposta(produtoId: string, usuarioId: string, valor: number): Promise<boolean>;
}
