"use strict";
exports.__esModule = true;
exports.approuter = void 0;
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var dummy_js_1 = require("../datasource/dummy.js");
var produto_js_1 = require("@/operation/controllers/produto.js");
exports.approuter = express_1["default"].Router();
exports.approuter.get("/health", function (req, res) {
    res.status(http_status_codes_1.StatusCodes.OK).send();
});
exports.approuter.get("/produto/:id", function (req, res) {
    var id = req.params.id;
    var datasource = new dummy_js_1.DummyDataSource();
    var produto = produto_js_1.ProdutoController.buscarPorId(id, datasource);
    if (!produto) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send();
    }
    return res.status(http_status_codes_1.StatusCodes.OK).send(produto);
});
