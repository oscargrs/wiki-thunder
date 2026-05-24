window.onload = carregarDashboard();

var coresNacoes = {
    germany:  "#c8a84b",
    ussr:     "#c0392b",
    usa:      "#4a90d9",
    britain:  "#7f8c4a",
    japan:    "#9b59b6",
    italy:    "#27ae60",
    france:   "#e67e22",
    sweden:   "#2980b9",
    china:    "#e74c3c",
    israel:   "#1abc9c"
};

var coresEspecializacao = {
    "Army":        "#c8a84b",
    "Aviation":    "#4a90d9",
    "Helicopters": "#27ae60",
    "Navy":        "#2980b9"
};

function carregarDashboard() {
    console.log("Iniciando carregamento do dashboard...");

    fetch("/dashboard/stats", { cache: "no-store" })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log("Dados recebidos do servidor:");
                    console.log(resposta);

                    preencherKPIs(resposta.stats);
                    plotarTopVeiculos(resposta.topVehicles);
                    plotarNacaoPreferida(resposta.nationPreference);
                    plotarFavoritosPorNacao(resposta.favoritesByNation);
                    plotarFavoritosPorEspecializacao(resposta.favoritesByType);
                });
            } else {
                console.error("Erro ao buscar dados do dashboard");
            }
        })
        .catch(function (error) {
            console.error("Erro na requisição do dashboard: " + error.message);
        });
}

function preencherKPIs(stats) {
    console.log("Preenchendo KPIs com:", stats);

    document.getElementById("usuariosCadastrados").innerHTML = `
        <span class="kpi-label">USUÁRIOS CADASTRADOS</span>
        <span class="kpi-valor">${stats.total_users}</span>
        <span class="kpi-sublabel">pilotos registrados</span>
    `;

    document.getElementById("totalVeiculos").innerHTML = `
        <span class="kpi-label">VEÍCULOS NO BANCO</span>
        <span class="kpi-valor">${stats.total_vehicles}</span>
        <span class="kpi-sublabel">entradas no catálogo</span>
    `;

    document.getElementById("nacaoMaisPreferida").innerHTML = `
        <span class="kpi-label">NAÇÃO MAIS PREFERIDA</span>
        <span class="kpi-valor">${stats.top_nation ? stats.top_nation.toUpperCase() : "—"}</span>
        <span class="kpi-sublabel">${stats.top_nation_count} pilotos</span>
    `;

    document.getElementById("especializacaoMaisPopular").innerHTML = `
        <span class="kpi-label">ESPECIALIZAÇÃO MAIS POPULAR</span>
        <span class="kpi-valor">${stats.top_playstyle ? stats.top_playstyle.toUpperCase() : "—"}</span>
        <span class="kpi-sublabel">${stats.top_playstyle_count} pilotos</span>
    `;
}

function plotarTopVeiculos(topVehicles) {
    console.log("Plotando top veículos:", topVehicles);

    document.getElementById("topFavoritos").innerHTML = `
        <h3 class="grafico-titulo">TOP VEÍCULOS MAIS FAVORITADOS</h3>
        <div class="grafico-wrapper">
            <canvas id="canvasTopVeiculos"></canvas>
        </div>
    `;

    var labels = [];
    var dados = [];
    var cores = [];

    for (var i = 0; i < topVehicles.length; i++) {
        labels.push(topVehicles[i].identifier);
        dados.push(topVehicles[i].total);
        cores.push(Object.values(coresNacoes)[i % Object.values(coresNacoes).length]);
    }

    var config = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Favoritos",
                data: dados,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: "#aaa" },
                    grid:  { color: "#333" }
                },
                y: {
                    ticks: { color: "#ccc" },
                    grid:  { color: "#333" }
                }
            }
        }
    };

    new Chart(document.getElementById("canvasTopVeiculos"), config);
}

function plotarNacaoPreferida(nationPreference) {
    console.log("Plotando preferência de nação:", nationPreference);

    document.getElementById("nacoesMaisPreferidas").innerHTML = `
        <h3 class="grafico-titulo">NAÇÃO MAIS PREFERIDA</h3>
        <div class="grafico-wrapper">
            <canvas id="canvasNacaoPreferida"></canvas>
        </div>
    `;

    var labels = [];
    var dados = [];
    var cores = [];

    for (var i = 0; i < nationPreference.length; i++) {
        var nacao = nationPreference[i].nation.toLowerCase();
        labels.push(nacao);
        dados.push(nationPreference[i].total);
        cores.push(coresNacoes[nacao] || "#888");
    }

    var config = {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: dados,
                backgroundColor: cores,
                borderWidth: 2,
                borderColor: "#1a1a1a"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "right",
                    labels: { color: "#ccc", padding: 12 }
                }
            }
        }
    };

    new Chart(document.getElementById("canvasNacaoPreferida"), config);
}

function plotarFavoritosPorNacao(favoritesByNation) {
    console.log("Plotando favoritos por nação:", favoritesByNation);

    document.getElementById("favoritosPorNacao").innerHTML = `
        <h3 class="grafico-titulo">FAVORITOS POR NAÇÃO</h3>
        <div class="grafico-wrapper">
            <canvas id="canvasFavoritosPorNacao"></canvas>
        </div>
    `;

    var labels = [];
    var dados = [];
    var cores = [];

    for (var i = 0; i < favoritesByNation.length; i++) {
        var nacao = favoritesByNation[i].country;
        labels.push(nacao);
        dados.push(favoritesByNation[i].total);
        cores.push(coresNacoes[nacao ? nacao.toLowerCase() : ""] || "#888");
    }

    var config = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Favoritos",
                data: dados,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: "#ccc" },
                    grid:  { color: "#333" }
                },
                y: {
                    ticks: { color: "#aaa" },
                    grid:  { color: "#333" }
                }
            }
        }
    };

    new Chart(document.getElementById("canvasFavoritosPorNacao"), config);
}

function plotarFavoritosPorEspecializacao(favoritesByType) {
    console.log("Plotando favoritos por especialização:", favoritesByType);

    document.getElementById("favoritosPorEspecializacao").innerHTML = `
        <h3 class="grafico-titulo">FAVORITOS POR ESPECIALIZAÇÃO</h3>
        <div class="grafico-wrapper">
            <canvas id="canvasFavoritosPorEspecializacao"></canvas>
        </div>
    `;

    var labels = [];
    var dados = [];
    var cores = [];

    for (var i = 0; i < favoritesByType.length; i++) {
        var tipo = favoritesByType[i].vehicle_type;
        labels.push(tipo);
        dados.push(favoritesByType[i].total);
        cores.push(coresEspecializacao[tipo] || "#888");
    }

    var config = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Favoritos",
                data: dados,
                backgroundColor: cores,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: "#ccc" },
                    grid:  { color: "#333" }
                },
                y: {
                    ticks: { color: "#aaa" },
                    grid:  { color: "#333" }
                }
            }
        }
    };

    new Chart(document.getElementById("canvasFavoritosPorEspecializacao"), config);
}