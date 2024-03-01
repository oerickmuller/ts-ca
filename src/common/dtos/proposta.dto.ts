import { ProdutoDTO } from "./produto.dto"

export type NovaPropostaDTO = { 
    documento: string,
    produto_id: string, 
    valor: number
}

export type PropostaDTO = { 
    produto: ProdutoDTO,
    documento: string,    
    valor: number,
    dataProposta: number    
}