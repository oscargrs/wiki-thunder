var express = require("express");
var router = express.Router();

var vehiclesController = require("../controllers/vehiclesController");

router.get("/filter/:classe/:nacao", function (req, res) {
    vehiclesController.buscarVeiculos(req, res);
});

router.get("/search/:nome", function (req, res) {
    vehiclesController.buscarPorNome(req, res);
});

router.get("/search/:nome/:nacao", function (req, res) {
    vehiclesController.buscarPorNomeNacao(req, res);
});

module.exports = router;