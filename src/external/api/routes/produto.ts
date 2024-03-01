
import { ProdutoController } from '../../../operation/controllers/produto.js';
import { StatusCodes } from 'http-status-codes';
import express from 'express';
import { DrizzleSqliteDataSource } from '../../datasource/dbsqlite2.js';
import { NovoProdutoDTO } from '../../../common/dtos/novoProduto.dto.js';

const produtosRouting = express.Router();

produtosRouting.get("/:id", async (req, res) => {

  const datasource = new DrizzleSqliteDataSource();
  const produto = await ProdutoController.buscarPorId(req.params.id, datasource);

  if (!produto) {
    res.status(StatusCodes.NOT_FOUND).send();
  } else {
    res.status(StatusCodes.OK).send(produto);
  }
});

produtosRouting.post('/', async (req, res) => {

  if (!req.body) {
    res.status(StatusCodes.BAD_REQUEST).send();
  }

  const novoProdutoData: NovoProdutoDTO = {
    nome: req.body.nome, 
    valorEsperado: req.body.valor_esperado,
    valorMinimo: req.body.valor_minimo,
  }
  
  const datasource = new DrizzleSqliteDataSource();
  const result = await ProdutoController.cadastrarProduto(novoProdutoData, datasource);

  res.status(201).send("OK");

});

export { produtosRouting };
