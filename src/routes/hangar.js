var express = require("express");
var router = express.Router();

var hangarController = require("../controllers/hangarController");

router.get("/stats", function (req, res) {
    hangarController.getStats(req, res);
});

module.exports = router;