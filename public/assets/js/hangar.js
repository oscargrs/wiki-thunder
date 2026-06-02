window.onload = carregarHangar;

var coresNacoes = {
    germany: "#c8a84b",
    ussr: "#c0392b",
    usa: "#4a90d9",
    britain: "#7f8c4a",
    japan: "#9b59b6",
    italy: "#27ae60",
    france: "#e67e22",
    sweden: "#2980b9",
    china: "#e74c3c",
    israel: "#1abc9c",
};

var coresEspecializacao = {
    assault: "#c0392b",
    bomber: "#4a90d9",
    fighter: "#9b59b6",
    medium_tank: "#c8a84b",
    spaa: "#27ae60",
    light_tank: "#e67e22",
    tank_destroyer: "#d04030",
    heavy_tank: "#2980b9"
};

function carregarHangar() {
    fetch("/hangar/stats", { cache: "no-store" })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    preencherKPIs(resposta.stats);
                    plotarTopVeiculos(resposta.topVehicles);
                    carregarNomeDireto(resposta.topVehicles[0].identifier);
                    plotarNacaoPreferida(resposta.nationPreference);
                    plotarCurtidasPorNacao(resposta.likesByNation);
                    plotarCurtidasPorEspecializacao(resposta.likesByType);
                });
            } else {
                console.error("Erro ao buscar dados do hangar");
            }
        })
        .catch(function (error) {
            console.error("Erro na requisição: " + error.message);
        });
}

function preencherKPIs(stats) {
    document.getElementById("val-usuarios").innerHTML = stats.total_users;
    document.getElementById("val-veiculos").innerHTML = stats.total_vehicles;
    document.getElementById("val-nacao").innerHTML = stats.top_nation
        ? stats.top_nation.toUpperCase()
        : "—";
    document.getElementById("val-nacao-count").innerHTML =
        stats.top_nation_count + " pilotos";
    document.getElementById("val-playstyle").innerHTML = stats.top_playstyle
        ? stats.top_playstyle.toUpperCase()
        : "—";
    document.getElementById("val-playstyle-count").innerHTML =
        stats.top_playstyle_count + " pilotos";
}

var chartTopVeiculos = null;

function plotarTopVeiculos(topVehicles) {
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < topVehicles.length; i++) {
        labels.push(topVehicles[i].identifier.toUpperCase().replaceAll("_", " "));
        dados.push(topVehicles[i].total);
        cores.push(
            Object.values(coresNacoes)[i % Object.values(coresNacoes).length],
        );
    }

    if (chartTopVeiculos) {
        chartTopVeiculos.destroy();
    }

    chartTopVeiculos = new Chart(document.getElementById("canvasTopVeiculos"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Curtidas",
                    data: dados,
                    backgroundColor: cores,
                    borderWidth: 0,
                },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: "#aaa" }, grid: { color: "#333" } },
                y: { ticks: { color: "#ccc" }, grid: { color: "#333" } },
            },
        },
    });
}

function plotarNacaoPreferida(nationPreference) {
    var labels = [];
    var dados = [];
    var cores = [];
    for (var i = 0; i < nationPreference.length; i++) {
        var nacao = nationPreference[i].nation.toLowerCase();
        labels.push(nacao.toUpperCase());
        dados.push(nationPreference[i].total);
        cores.push(coresNacoes[nacao] || "#888");
    }
    new Chart(document.getElementById("canvasNacaoPreferida"), {
        type: "radar",
        data: {
            labels: labels,
            datasets: [{
                label: "Pilotos",
                data: dados,
                backgroundColor: "rgba(125, 144, 72, 0.2)",
                borderColor: "#7d9048",
                pointBackgroundColor: cores,
                pointRadius: 4,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    ticks: { color: "#aaa", backdropColor: "transparent" },
                    grid: { color: "#333" },
                    pointLabels: { color: "#ccc" }
                }
            }
        }
    });
}

function plotarCurtidasPorNacao(likesByNation) {
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < likesByNation.length; i++) {
        var nacao = likesByNation[i].country;
        labels.push(nacao.toUpperCase());
        dados.push(likesByNation[i].total);
        cores.push(coresNacoes[nacao ? nacao.toLowerCase() : ""] || "#888");
    }
    new Chart(document.getElementById("canvasCurtidasPorNacao"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Curtidas",
                    data: dados,
                    backgroundColor: cores,
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var total = 0;
                            for (var i = 0; i < context.dataset.data.length; i++) {
                                total += context.dataset.data[i];
                            }
                            var porcentagem = ((context.parsed.y / total) * 100).toFixed(1);
                            return `${context.parsed.y} curtidas (${porcentagem}%)`;
                        }
                    }
                }
            },
            scales: {
                x: { ticks: { color: "#ccc" }, grid: { color: "#333" } },
                y: { ticks: { color: "#aaa" }, grid: { color: "#333" } }
            }
        },
    });
}

function plotarCurtidasPorEspecializacao(likesByType) {
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < likesByType.length; i++) {
        var tipo = likesByType[i].vehicle_type;
        labels.push(tipo.toUpperCase().replaceAll("_", " "));
        dados.push(likesByType[i].total);
        cores.push(coresEspecializacao[tipo] || "#888");
    }
    new Chart(document.getElementById("canvasCurtidasPorEspecializacao"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Curtidas",
                    data: dados,
                    backgroundColor: cores,
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: "#ccc" }, grid: { color: "#333" } },
                y: { ticks: { color: "#aaa" }, grid: { color: "#333" } },
            },
        },
    });
}

async function carregarNomeDireto(nome) {
    var resposta = await fetch(`/vehicles/search/${nome}`);
    var veiculos = await resposta.json();
    exibirVeiculos(veiculos);
}