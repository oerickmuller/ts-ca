import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DummyDataSource } from "../datasource/dummy.js";
import { ProdutoController } from "@/operation/controllers/produto.js";

export const approuter = express.Router();

approuter.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send();
});

approuter.get("/produto/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const datasource = new DummyDataSource();
  const produto = ProdutoController.buscarPorId(id, datasource);

  if (!produto) {
    return res.status(StatusCodes.NOT_FOUND).send();
  }
  return res.status(StatusCodes.OK).send(produto);
});
