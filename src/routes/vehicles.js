var express = require("express");
var router = express.Router();

var vehiclesController = require("../controllers/vehiclesController");

router.get("/listar", function (req, res) {
    vehiclesController.buscarVeiculos(req, res);
});

router.get("/nation/:nacao", function (req, res) {
    vehiclesController.buscarPorNacao(req, res);
})

router.get("/class/:classe", function (req, res) {
    vehiclesController.buscarPorClasse(req, res);
})

module.exports = router;