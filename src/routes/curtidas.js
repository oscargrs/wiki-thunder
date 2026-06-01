var express = require("express");
var router = express.Router();

var curtidasController = require("../controllers/curtidasController");

router.post("/curtir", function (req, res) {
    curtidasController.curtir(req, res);
})

module.exports = router;