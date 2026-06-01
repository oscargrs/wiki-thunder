var curtidasModel = require("../models/curtidasModel");

function curtir(req, res) {
    var idVeiculo = req.body.idVeiculoServer;
    var idUsuario = req.body.idUsuarioServer;

    curtidasModel.curtir(idVeiculo, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao curtir! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    curtir
}