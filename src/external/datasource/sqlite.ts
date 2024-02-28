import sqlite3 from "sqlite3";

import { ProdutoDTO } from "@/common/dtos/produto";
import { IDataSource } from "@/common/interfaces/datasource";

const DBSOURCE = './database.sqlite';

// const create_table = `
// CREATE TABLE IF NOT EXISTS produto (
//     id TEXT PRIMARY KEY,
//     nome TEXT NOT NULL,
//     data_cadastro INTEGER NOT NULL,
//     valor_esperado INTEGER NOT NULL,
//     valor_minimo INTEGER NOT NULL
// );
// `;

// const database = new sqlite3.Database(DBSOURCE, (err) => {
//   if (err) {
//     console.error(err.message);
//     throw err
//   } else {
//     database.run(create_table, (err) => {
//       if (err) {
//         console.error(err.message);
//         throw err
//       }
//     });
//   }
// });



export class SqliteDataSource implements IDataSource {

  database: sqlite3.Database;

  constructor() {
    this.database = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {
        console.error(err.message);
        throw err
      } else {
        this.database.run("CREATE TABLE IF NOT EXISTS produtos (id TEXT PRIMARY KEY, nome TEXT NOT NULL, data_cadastro INTEGER NOT NULL, valor_esperado INTEGER NOT NULL, valor_minimo INTEGER NOT NULL)");
      }
    });
  }
  incluirProduto(produto: ProdutoDTO): boolean {
    throw new Error("Method not implemented.");
  }

  buscarProdutoPorId(id: string): ProdutoDTO | null {
    const sql = `SELECT * FROM produto where id = ?`;
    const parameters = [id];
    this.database.get(sql, parameters, (_err, row) => {
      if (_err) {
        console.log(_err.message)
      }

      if (row) {

        let retorno: ProdutoDTO;
        retorno = {
          id: row.id,
          nome: row.nome,
          dataCadastro: row.data_cadastro,
          valorEsperado: row.valor_esperado,
          valorMinimo: row.valor_minimo
        }
        return retorno;
      }

      return null;
    });
  }


}

const s = new SqliteDataSource();
const x = s.buscarProdutoPorId("1");
console.log(x);
