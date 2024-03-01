import { IDataSource } from "../../common/interfaces/datasource";
import { Produto } from "../../core/entities/produto";

export class ProdutoGateway {
  dataSource: IDataSource;
  constructor(ds: IDataSource) {
    this.dataSource = ds;
  }

  async cadastrar(produto: Produto): Promise<boolean> {
    const sucesso = await this.dataSource.incluirProduto(produto);
    return sucesso;
  }

  async buscarPorId(id: string) {
    const produto = await this.dataSource.buscarProdutoPorId(id);
    return produto;
  }
}
