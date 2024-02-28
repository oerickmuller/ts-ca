import { DummyDataSource } from '@/external/datasource/dummy';
import { ProdutoController } from '@/operation/controllers/produto';
import { StatusCodes } from 'http-status-codes';
import express from 'express';

const produtosRouting = express.Router();

produtosRouting.get("/:id", (req, res) => {
    
    const datasource = new DummyDataSource();
    const produto = ProdutoController.buscarPorId(req.params.id, datasource);

    if (!produto) {
        res.status(StatusCodes.NOT_FOUND).send();
    } else {
        res.status(StatusCodes.OK).send(produto);
    }

});

export { produtosRouting  };