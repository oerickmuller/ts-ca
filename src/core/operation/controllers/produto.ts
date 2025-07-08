import { NovoProdutoDTO } from "@core/common/dtos/novoProduto.dto.js";
import { ProdutosUseCase } from "@core/usecases/produtos";
import { IDataSource } from "@core/common/interfaces/datasource.js";

import { ProdutoGateway } from "@core/operation/gateways/produto.js";
import { ProdutoPresenter } from "@core/operation/presenters/produto.js";
import {
  NovaPropostaDTO,
  PropostaDTO,
} from "@core/common/dtos/proposta.dto.js";

import { PropostaPresenter } from "@core/operation/presenters/proposta.js";
import { ProdutoDTO } from "@core/common/dtos/produto.dto.js";

import { ProdutoControllerError } from "./produto.errors.js";

export class ProdutoController {
  static async buscarPropostas(produtoid: string, datasource: IDataSource) {
    const produtoGateway = new ProdutoGateway(datasource);
    const produto = await ProdutosUseCase.buscarPorId(
      produtoid,
      produtoGateway
    );
    if (!produto) {
      return null;
    }
    const propostas = await ProdutosUseCase.buscarPropostas(
      produto,
      produtoGateway
    );
    if (!propostas) {
      return;
    }
    return ProdutoPresenter.toDTO(produto, propostas);
  }

  static async cadastrarProposta(
    propostaDto: NovaPropostaDTO,
    datasource: IDataSource
  ): Promise<PropostaDTO | null> {
    const produtoGateway = new ProdutoGateway(datasource);
    const produto = await ProdutosUseCase.buscarPorId(
      propostaDto.produto_id,
      produtoGateway
    );

    if (!produto) {
      return null;
    }

    try {
      const propostaCriada = ProdutosUseCase.cadastrarProposta(
        produto,
        propostaDto.documento,
        propostaDto.valor,
        produtoGateway
      );
      return PropostaPresenter.toDTO(propostaCriada);
    } catch (_err) {
      throw new ProdutoControllerError("A proposta foi rejeitada");
    }
  }
  static async cadastrarProduto(
    novoProduto: NovoProdutoDTO,
    produtosDataSource: IDataSource
  ): Promise<ProdutoDTO> {
    const produtoGateway = new ProdutoGateway(produtosDataSource);

    const produtoCriado = ProdutosUseCase.cadastrarProduto(
      novoProduto.nome,
      novoProduto.valorEsperado,
      novoProduto.valorMinimo,
      produtoGateway
    );

    return ProdutoPresenter.toDTO(produtoCriado);
  }

  static async buscarPorId(
    id: string,
    produtosDataSource: IDataSource
  ): Promise<ProdutoDTO | null> {
    const produtosGateway = new ProdutoGateway(produtosDataSource);
    if (!produtosGateway) {
      throw new Error("Gateway inválido");
    }

    const produto = await ProdutosUseCase.buscarPorId(id, produtosGateway);
    if (!produto) {
      return null;
    }

    return ProdutoPresenter.toDTO(produto);
  }
}
