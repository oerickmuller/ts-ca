import { ProdutoDTO } from "@core/common/dtos/produto.dto";
import { PropostaDTO } from "@core/common/dtos/proposta.dto";
import { IDataSource } from "@core/common/interfaces/datasource";
import { ProdutoEntity } from '@core/entities/produto';
import { PropostaEntity } from "@core/entities/proposta";

export class ProdutoGateway {
  dataSource: IDataSource;
  constructor(ds: IDataSource) {
    this.dataSource = ds;
  }

  async cadastrar(produto: ProdutoEntity): Promise<boolean> {
    const produtoDto: ProdutoDTO = {
      id: produto.id,
      nome: produto.nome,
      dataCadastro: produto.dataCadastro,
      valorEsperado: produto.valorEsperado,
      valorMinimo: produto.valorMinimo,
    };

    const sucesso = await this.dataSource.incluirProduto(produtoDto);
    return sucesso;
  }

  async buscarPorId(id: string): Promise<ProdutoEntity | null> {
    const produto_ds: ProdutoDTO | null =
      await this.dataSource.buscarProdutoPorId(id);

    if (produto_ds) {
      const produto = new ProdutoEntity(
        (id = produto_ds.id),
        produto_ds.nome,
        produto_ds.dataCadastro,
        produto_ds.valorEsperado,
        produto_ds.valorMinimo
      );
      return produto;
    }

    return null;
  }

  async cadastrarProposta(novaProposta: PropostaEntity): Promise<boolean> {
    const propostaDto: PropostaDTO = {
      produto: novaProposta.produto,
      documento: novaProposta.documento,
      valor: novaProposta.valor,
      dataProposta: novaProposta.dataProposta,
    };
    const sucesso = this.dataSource.incluirProposta(propostaDto);
    return sucesso;
  }

  async buscarPropostas(
    produto: ProdutoEntity
  ): Promise<PropostaEntity[] | null> {
    const propostas_ds = await this.dataSource.buscarPropostasParaProduto(
      produto.id
    );

    if (!propostas_ds) return null;

    const propostas = propostas_ds.map((x) => {
      return new PropostaEntity(produto, x.documento, x.valor, x.dataProposta);
    });

    return propostas;
  }
}
