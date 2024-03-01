import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

import { ProdutoDTO } from '../../common/dtos/produto.dto';
import { IDataSource } from "../../common/interfaces/datasource.js";

const DBSOURCE = './database.sqlite';

export async function BuildSqlDataSource(): Promise<SqliteDataSource> {
  const dbconn = await (open({
    filename: DBSOURCE,
    driver: sqlite3.Database
  })).then((db) => db);
  console.log(dbconn);
  return new SqliteDataSource(dbconn);
}

export class SqliteDataSource implements IDataSource {
  databaseInstance: Database<sqlite3.Database, sqlite3.Statement>;
  tableName: string;

  constructor(databaseInstance: Database<sqlite3.Database, sqlite3.Statement>) {
    this.databaseInstance = databaseInstance;
    this.tableName = 'produto';
  }

  async buscarProdutoPorId(id: string): Promise<ProdutoDTO | null> {
    const row: any = await this.databaseInstance.get(`select * from ${this.tableName} where id = ?`, [id]);
    console.log(row);

    if (!row) {
      return null;
    }

    const dto = {
      id: row.id,
      nome: row.nome,
      dataCadastro: row.data_cadastro,
      valorEsperado: row.valor_esperado,
      valorMinimo: row.valor_minimo
    }

    return dto;
  }

  async incluirProduto(produto: ProdutoDTO): Promise<boolean> {
    const produtoExistente = await this.buscarProdutoPorId(produto.id);
    if (produtoExistente) {
      return false;
    }

    const { id, nome, dataCadastro, valorEsperado, valorMinimo } = produto;
    const valuesSql = [id, nome, dataCadastro, valorEsperado, valorMinimo];
    const sqlCommand = `INSERT INTO ${this.tableName} ( id, nome, data_cadastro, valor_esperado, valor_minimo) VALUES (?, ?, ?, ?, ?);`;
    try {
      const result = await this.databaseInstance.run(sqlCommand, valuesSql);
      return true;
    } catch (_err) {
      return false;
    }
  }

  async incluirProposta(produtoId: string, usuarioId: string, valor: number): Promise<boolean> {
    const valuesSql = [produtoId, usuarioId, valor];
    const sqlCommand = `INSERT INTO proposta VALUES (?, ?, ?);`;
    const result = await this.databaseInstance.run(sqlCommand, valuesSql);
    return true;
  }
}

