import { NovoProdutoDTO } from "../../common/dtos/novoProduto.dto.js";
import { ProdutosUseCase } from "../../core/usecases/produtos.js";
import { IDataSource } from "../../common/interfaces/datasource.js";

import { ProdutoGateway } from "../gateways/produto.js";
import { ProdutoPresenter } from "../presenters/produto.js";

export class ProdutoController {
  static cadastrarProduto(
    novoProduto: NovoProdutoDTO,
    produtosDataSource: IDataSource,
  ) {
    const produtoGateway = new ProdutoGateway(produtosDataSource);

    const produtoCriado = ProdutosUseCase.cadastrarProduto(
      novoProduto.nome,
      novoProduto.valorEsperado,
      novoProduto.valorMinimo,
      produtoGateway,
    );

    return ProdutoPresenter.toDTO(produtoCriado);
  }

  static async buscarPorId(id: string, produtosDataSource: IDataSource) {
    const produtosGateway = new ProdutoGateway(produtosDataSource);
    const produto = await ProdutosUseCase.buscarPorId(id, produtosGateway);
    if (produto)
      return ProdutoPresenter.toDTO(produto);
    return null;
  }

}
