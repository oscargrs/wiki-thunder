var database = require("../database/config");

function getStats() {
    console.log("ACESSEI O DASHBOARD MODEL\nfunction getStats()");
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(*) FROM users) AS total_users,
            (SELECT COUNT(*) FROM vehicles) AS total_vehicles,
            (SELECT main_nation FROM users
                WHERE main_nation IS NOT NULL
                GROUP BY main_nation
                ORDER BY COUNT(*) DESC
                LIMIT 1) AS top_nation,
            (SELECT COUNT(*) FROM users
                WHERE main_nation = (
                    SELECT main_nation FROM users
                    WHERE main_nation IS NOT NULL
                    GROUP BY main_nation
                    ORDER BY COUNT(*) DESC
                    LIMIT 1
                )) AS top_nation_count,
            (SELECT playstyle_pref FROM users
                WHERE playstyle_pref IS NOT NULL
                GROUP BY playstyle_pref
                ORDER BY COUNT(*) DESC
                LIMIT 1) AS top_playstyle,
            (SELECT COUNT(*) FROM users
                WHERE playstyle_pref = (
                    SELECT playstyle_pref FROM users
                    WHERE playstyle_pref IS NOT NULL
                    GROUP BY playstyle_pref
                    ORDER BY COUNT(*) DESC
                    LIMIT 1
                )) AS top_playstyle_count;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getTopVehicles() {
    console.log("ACESSEI O DASHBOARD MODEL\nfunction getTopVehicles()");
    var instrucaoSql = `
        SELECT v.identifier, COUNT(f.idLike) AS total
        FROM vehicles v
        INNER JOIN likes f ON f.idVehicle = v.idVehicle
        GROUP BY v.idVehicle, v.identifier
        ORDER BY total DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getLikesByNation() {
    console.log("ACESSEI O DASHBOARD MODEL\nfunction getLikesByNation()");
    var instrucaoSql = `
        SELECT v.country, COUNT(f.idLike) AS total
        FROM vehicles v
        INNER JOIN likes f ON f.idVehicle = v.idVehicle
        GROUP BY v.country
        ORDER BY total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getLikesByType() {
    console.log("ACESSEI O DASHBOARD MODEL\nfunction getLikesByType()");
    var instrucaoSql = `
        SELECT v.vehicle_type, COUNT(f.idLike) AS total
        FROM vehicles v
        INNER JOIN likes f ON f.idVehicle = v.idVehicle
        GROUP BY v.vehicle_type
        ORDER BY total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getNationPreference() {
    console.log("ACESSEI O DASHBOARD MODEL\nfunction getNationPreference()");
    var instrucaoSql = `
        SELECT main_nation AS nation, COUNT(*) AS total
        FROM users
        WHERE main_nation IS NOT NULL
        GROUP BY main_nation
        ORDER BY total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getStats,
    getTopVehicles,
    getLikesByNation,
    getLikesByType,
    getNationPreference
};