import { ProdutoDTO } from "@core/common/dtos/produto.dto.js";
import { PropostaDTO } from "@core/common/dtos/proposta.dto.js";

export interface IDataSource {
  buscarPropostasParaProduto(id: string): Promise<PropostaDTO[] | null>;
  incluirProduto(produto: ProdutoDTO): Promise<boolean>;
  buscarProdutoPorId(id: string): Promise<ProdutoDTO | null>;
  incluirProposta(proposta: PropostaDTO): Promise<boolean>;
}
