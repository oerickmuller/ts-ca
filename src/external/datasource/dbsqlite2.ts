import { BetterSQLite3Database, drizzle  } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import  { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { IDataSource } from "../../common/interfaces/datasource";
import { ProdutoDTO } from "../../common/dtos/produto.dto";
import { eq } from "drizzle-orm";


export class DrizzleSqliteDataSource implements IDataSource {

    db: BetterSQLite3Database;
    produto; 

    constructor() {
        const sqlite = new Database('database.sqlite');
        this.db = drizzle(sqlite);

        const produtoTable = sqliteTable('produto', {
            ID: text('id').primaryKey(),
            nome: text('nome'), 
            dataCadastro: integer('data_cadastro'),
            valorEsperado: integer('valor_esperado'),
            valorMinimo: integer('valor_minimo'),
        });

        this.produto = produtoTable;
    }


    async incluirProduto(produto: ProdutoDTO): Promise<boolean> {
        
        const val = {
            ID: produto.id, 
            nome: produto.nome,
            dataCadastro: produto.dataCadastro,
            valorEsperado: produto.valorEsperado,
            valorMinimo: produto.valorMinimo
        }
        try {
            const retorno = await this.db.insert(this.produto).values(val).returning();
            console.log(retorno);
            return true;
        }
        catch (_err) {
            console.log(_err);
            return false;
        }
    }

    async buscarProdutoPorId(id: string): Promise<ProdutoDTO | null> {
        
        const rows: any = this.db.select().from(this.produto).where(eq(this.produto.ID, id)).all();
        if (!rows) {
            return null;
        }

        const item = rows[0];
        const produto: ProdutoDTO = {
            id: item.ID,
            nome: item.nome, 
            dataCadastro: item.dataCadastro,
            valorEsperado: item.valorEsperado,
            valorMinimo: item.valorMinimo
        }
        return produto;
    }
    
    async incluirProposta(produtoId: string, usuarioId: string, valor: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}