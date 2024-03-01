import { ProdutoDTO } from "../../common/dtos/produto.dto";
import { PropostaDTO } from "../../common/dtos/proposta.dto";
import { IDataSource } from "../../common/interfaces/datasource.js";
export class DummyDataSource implements IDataSource {
  buscarPropostasParaProduto(id: string): Promise<PropostaDTO[] | null> {
    throw new Error("Method not implemented.");
  }
  incluirProposta(proposta: PropostaDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async incluirProduto(produto: ProdutoDTO): Promise<boolean> {
    return true;
  }

  async buscarProdutoPorId(id: string): Promise<ProdutoDTO | null> {
    if (id === "q1w2e3") {
      return {
        id: "q1w2e3",
        nome: "nome",
        dataCadastro: 1,
        valorEsperado: 0,
        valorMinimo: 0,
      };
    }

    return null;
  }
}
