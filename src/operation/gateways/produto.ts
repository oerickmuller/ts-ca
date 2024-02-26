import { IDataSource } from "@/common/interfaces/datasource.js";
import { Produto } from "@/core/entities/produto.js";

export class ProdutoGateway {
  dataSource: IDataSource;
  constructor(ds: IDataSource) {
    this.dataSource = ds;
  }

  cadastrar(produto: Produto) {
    const sucesso = this.dataSource.incluirProduto(produto);
    return sucesso;
  }

  buscarPorId(id: string) {
    const produto = this.dataSource.buscarProdutoPorId(id);
    return produto;
  }
}
