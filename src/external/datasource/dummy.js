"use strict";
exports.__esModule = true;
exports.DummyDataSource = void 0;
var DummyDataSource = /** @class */ (function () {
    function DummyDataSource() {
    }
    DummyDataSource.prototype.incluirProduto = function (produto) {
        return true;
    };
    DummyDataSource.prototype.buscarProdutoPorId = function (id) {
        return {
            id: "q1w2e3",
            nome: "nome",
            dataCadastro: 1,
            valorEsperado: 0,
            valorMinimo: 0
        };
    };
    return DummyDataSource;
}());
exports.DummyDataSource = DummyDataSource;
