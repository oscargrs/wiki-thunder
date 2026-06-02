let classes = {
    blindados: [
        "light_tank",
        "medium_tank",
        "heavy_tank",
        "spaa",
        "tank_destroyer"
    ],
    aviacao: [
        "assault",
        "bomber",
        "fighter"
    ]
}

var database = require("../database/config");

function buscarVeiculos(classe, nacao) {
    var tipos = classes[classe];
    var tiposSQL = tipos.map(tipo => `'${tipo}'`).join(',');
    
    var instrucaoSql = `SELECT * FROM vehicles WHERE country = '${nacao}' AND vehicle_type IN (${tiposSQL}) ORDER BY realistic_br;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorNome(nome) {
    var instrucaoSql = `SELECT * FROM vehicles WHERE identifier LIKE '%${nome}%' ORDER BY realistic_br;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorNomeNacao(nome, nacao) {
    var instrucaoSql = `SELECT * FROM vehicles WHERE identifier LIKE '%${nome}%' AND country = '${nacao}' ORDER BY realistic_br;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarVeiculos,
    buscarPorNome,
    buscarPorNomeNacao
}