var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/stats", function (req, res) {
    dashboardController.getStats(req, res);
});

module.exports = router;