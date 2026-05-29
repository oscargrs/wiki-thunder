// Faz a conexão com a Model
var vehiclesModel = require("../models/vehiclesModel");

// Função 
function buscarVeiculos(req, res) {
    vehiclesModel.buscarVeiculos()
        .then(resultado => {
            res.status(200).json(resultado);
        })

        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        })
}

function buscarPorNacao(req, res) {
    var nacao = req.params.nacao;

    vehiclesModel.buscarPorNacao(nacao)
        .then(resultado => {
            res.status(200).json(resultado);
        })

        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        })
}

function buscarPorClasse(req, res) {
    var classe = req.params.classe;

    vehiclesModel.buscarPorClasse(classe)
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

module.exports = {
    buscarVeiculos,
    buscarPorNacao,
    buscarPorClasse,
    buscarPorNome
}