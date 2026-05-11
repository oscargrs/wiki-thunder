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
    ],
    helicopteros: [
        "utility_helicopter",
        "attack_helicopter"
    ],
    marinha: [
        "boat",
        "heavy_boat",
        "battleship",
        "destroyer",
        "light_cruiser",
        "heavy_cruiser",
        "frigate",
        "barge",
        "battlecruiser"
    ]
}

var database = require("../database/config");

function buscarVeiculos() {
    var instrucaoSql = `SELECT * FROM vehicles;`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorNacao(nacao) {
    let blindadosSQL = classes.blindados.map(tipo => `'${tipo}'`).join(',');
    let aviacaoSQL = classes.aviacao.map(tipo => `'${tipo}'`).join(',');
    let helicopterosSQL = classes.helicopteros.map(tipo => `'${tipo}'`).join(',');
    let marinhaSQL = classes.marinha.map(tipo => `'${tipo}'`).join(',');

    var instrucaoSql = `SELECT * FROM vehicles WHERE country = '${nacao}' AND vehicle_type IN (${blindadosSQL}) ORDER BY realistic_br;
                        SELECT * FROM vehicles WHERE country = '${nacao}' AND vehicle_type IN (${aviacaoSQL}) ORDER BY realistic_br;
                        SELECT * FROM vehicles WHERE country = '${nacao}' AND vehicle_type IN (${helicopterosSQL}) ORDER BY realistic_br;
                        SELECT * FROM vehicles WHERE country = '${nacao}' AND vehicle_type IN (${marinhaSQL}) ORDER BY realistic_br;`
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorClasse(classe) {
    var tipos = classes[classe];
    var tiposSQL = tipos.map(tipo => `'${tipo}'`).join(',');
    
    var instrucaoSql = `SELECT * FROM vehicles WHERE vehicle_type IN (${tiposSQL}) ORDER BY realistic_br;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarVeiculos,
    buscarPorNacao,
    buscarPorClasse
}