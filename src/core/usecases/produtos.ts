import { generateRandomString } from "../../common/helpers/generators";
import { Produto } from "../../core/entities/produto.js";
import { ProdutoGateway } from "../../operation/gateways/produto.js";

export class ProdutosUseCase {
  static cadastrarProduto(
    nome: string,
    valorEsperado: number,
    valorMinimo: number,
    gateway: ProdutoGateway,
  ) {
    const novoId = generateRandomString();
    const now = new Date();
    const nowSeconds = now.getTime();

    const novoProduto = new Produto(
      novoId,
      nome,
      nowSeconds,
      valorEsperado,
      valorMinimo,
    );
    gateway.cadastrar(novoProduto);
    return novoProduto;
  }

  static buscarPorId(id: string, gateway: ProdutoGateway) {
    const produto = gateway.buscarPorId(id);
    return produto;
  }
}
