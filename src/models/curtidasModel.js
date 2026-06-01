var database = require("../database/config")

function curtir(idVeiculo, idUsuario) {
    console.log("ACESSEI O CURTIDAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function curtir():", idVeiculo, idUsuario);
    
    var instrucaoSql = `
        INSERT INTO likes (idVehicle, idUser) VALUES ('${idVeiculo}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    curtir
};