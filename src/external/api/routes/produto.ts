import { StatusCodes } from "http-status-codes";
import express from "express";
import { DrizzleSqliteDataSource } from "../../datasource/drizzle-sqlite.js";

import { ProdutoController } from "@core/operation/controllers/produto.js";
import { NovoProdutoDTO } from "@core/common/dtos/novoProduto.dto.js";
import { NovaPropostaDTO } from "@core/common/dtos/proposta.dto.js";
import { ProdutoControllerError } from "@core/operation/controllers/produto.errors.js";

const produtosRouting = express.Router();

produtosRouting.get("/:id", async (req, res) => {
  const datasource = new DrizzleSqliteDataSource();
  const produto = await ProdutoController.buscarPorId(
    req.params.id,
    datasource
  );

  if (!produto) {
    res.status(StatusCodes.NOT_FOUND).send("Produto não encontrado");
  } else {
    res.status(StatusCodes.OK).send(produto);
  }
});

produtosRouting.post("/", async (req, res) => {
  if (!req.body) {
    res.status(StatusCodes.BAD_REQUEST).send();
  }

  const novoProdutoData: NovoProdutoDTO = {
    nome: req.body.nome,
    valorEsperado: req.body.valor_esperado,
    valorMinimo: req.body.valor_minimo,
  };

  const datasource = new DrizzleSqliteDataSource();
  const _ = await ProdutoController.cadastrarProduto(
    novoProdutoData,
    datasource
  );

  res.status(201).send("OK");
});

produtosRouting.post("/:id/propostas", async (req, res) => {
  if (!req.body) {
    res.status(StatusCodes.BAD_REQUEST).send();
  }

  const propostaDto: NovaPropostaDTO = {
    documento: req.body.documento,
    produto_id: req.params.id,
    valor: req.body.valor,
  };

  const datasource = new DrizzleSqliteDataSource();
  try {
    const _ = await ProdutoController.cadastrarProposta(
      propostaDto,
      datasource
    );
  } catch (_err: any) {
    if (_err instanceof ProdutoControllerError)
      res.status(StatusCodes.BAD_REQUEST).send(_err.message);
    else res.status(StatusCodes.BAD_REQUEST).send(String(_err));
    return;
  }

  res.status(StatusCodes.OK).send("OK");
});

produtosRouting.get("/:id/propostas", async (req, res) => {
  const datasource = new DrizzleSqliteDataSource();
  try {
    const propostasProduto = await ProdutoController.buscarPropostas(
      req.params.id,
      datasource
    );
    res.status(StatusCodes.OK).send(propostasProduto);
  } catch (_err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(String(_err));
  }
});

export { produtosRouting };
