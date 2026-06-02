var hangarModel = require("../models/hangarModel");

function getStats(req, res) {
  console.log("ACESSEI O HANGAR CONTROLLER\nfunction getStats()");

  hangarModel
    .getStats()
    .then(function (resultadoStats) {
      console.log(
        `\nResultados encontrados: ${JSON.stringify(resultadoStats)}`,
      );

      hangarModel
        .getTopVehicles()
        .then(function (resultadoTopVehicles) {
          console.log(
            `\nTop veículos: ${JSON.stringify(resultadoTopVehicles)}`,
          );

          hangarModel
            .getLikesByNation()
            .then(function (resultadoByNation) {
              console.log(
                `\nLikes por nação: ${JSON.stringify(resultadoByNation)}`,
              );

              hangarModel
                .getLikesByType()
                .then(function (resultadoByType) {
                  console.log(
                    `\nLikes por tipo: ${JSON.stringify(resultadoByType)}`,
                  );

                  hangarModel
                    .getNationPreference()
                    .then(function (resultadoNationPref) {
                      console.log(
                        `\nPreferência de nação: ${JSON.stringify(resultadoNationPref)}`,
                      );

                      res.json({
                        stats: resultadoStats[0],
                        topVehicles: resultadoTopVehicles,
                        likesByNation: resultadoByNation,
                        likesByType: resultadoByType,
                        nationPreference: resultadoNationPref,
                      });
                    })
                    .catch(function (erro) {
                      console.log(
                        "\nErro em getNationPreference:",
                        erro.sqlMessage,
                      );
                      res.status(500).json(erro.sqlMessage);
                    });
                })
                .catch(function (erro) {
                  console.log("\nErro em getLikesByType:", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
                });
            })
            .catch(function (erro) {
              console.log("\nErro em getLikesByNation:", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
            });
        })
        .catch(function (erro) {
          console.log("\nErro em getTopVehicles:", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    })
    .catch(function (erro) {
      console.log("\nErro em getStats:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  getStats,
};
