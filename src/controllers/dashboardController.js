var dashboardModel = require("../models/dashboardModel");

function getStats(req, res) {
  console.log("ACESSEI O DASHBOARD CONTROLLER\nfunction getStats()");

  dashboardModel
    .getStats()
    .then(function (resultadoStats) {
      console.log(
        `\nResultados encontrados: ${JSON.stringify(resultadoStats)}`,
      );

      dashboardModel
        .getTopVehicles()
        .then(function (resultadoTopVehicles) {
          console.log(
            `\nTop veículos: ${JSON.stringify(resultadoTopVehicles)}`,
          );

          dashboardModel
            .getFavoritesByNation()
            .then(function (resultadoByNation) {
              console.log(
                `\nFavoritos por nação: ${JSON.stringify(resultadoByNation)}`,
              );

              dashboardModel
                .getFavoritesByType()
                .then(function (resultadoByType) {
                  console.log(
                    `\nFavoritos por tipo: ${JSON.stringify(resultadoByType)}`,
                  );

                  dashboardModel
                    .getNationPreference()
                    .then(function (resultadoNationPref) {
                      console.log(
                        `\nPreferência de nação: ${JSON.stringify(resultadoNationPref)}`,
                      );

                      res.json({
                        stats: resultadoStats[0],
                        topVehicles: resultadoTopVehicles,
                        favoritesByNation: resultadoByNation,
                        favoritesByType: resultadoByType,
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
                  console.log("\nErro em getFavoritesByType:", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
                });
            })
            .catch(function (erro) {
              console.log("\nErro em getFavoritesByNation:", erro.sqlMessage);
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
