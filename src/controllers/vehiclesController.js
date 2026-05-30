var vehiclesModel = require("../models/vehiclesModel");

function buscarVeiculos(req, res) {
    var classe = req.params.classe;
    var nacao = req.params.nacao;

    vehiclesModel.buscarVeiculos(classe, nacao)
        .then(resultado => {
            res.status(200).json(resultado);
        })

        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        })
}

function buscarPorNome(req, res) {
    var nome = req.params.nome;

    vehiclesModel.buscarPorNome(nome)
        .then(resultado => {
            res.status(200).json(resultado);
        })

        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        })
}

function buscarPorNomeNacao(req, res) {
    var nome = req.params.nome;
    var nacao = req.params.nacao;

    vehiclesModel.buscarPorNomeNacao(nome, nacao)
        .then(resultado => {
            res.status(200).json(resultado);
        })

        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        })
}

module.exports = {
    buscarVeiculos,
    buscarPorNome,
    buscarPorNomeNacao
}