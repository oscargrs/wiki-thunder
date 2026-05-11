// Buscando no banco de dados todos os veículos através da função de busca e retornando a execução dela

// Importando a conexão com o banco de dados (o arquivo config.js)
var database = require("../database/config");

// Função para buscar todos os veículos do banco
function buscarVeiculos() {
    // Comando a ser executado
    var instrucaoSql = `SELECT * FROM vehicles;`;

    // Console log para controle e retornando a execução do comando
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorNacao(nacao) {
    var instrucaoSql = `SELECT * FROM vehicles WHERE country = '${nacao}';`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorClasse(classe) {
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

    var tipos = classes[classe];

    var tiposSQL = tipos.map(tipo => `'${tipo}'`).join(',');

    var instrucaoSql = `SELECT * FROM vehicles WHERE vehicle_type IN (${tiposSQL});`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarVeiculos,
    buscarPorNacao,
    buscarPorClasse
}