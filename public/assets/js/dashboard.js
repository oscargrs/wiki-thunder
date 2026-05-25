window.onload = carregarDashboard;

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
    Army: "#c8a84b",
    Aviation: "#4a90d9",
    Helicopters: "#27ae60",
    Navy: "#2980b9",
};

function carregarDashboard() {
    fetch("/dashboard/stats", { cache: "no-store" })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
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

function plotarTopVeiculos(topVehicles) {
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < topVehicles.length; i++) {
        labels.push(topVehicles[i].identifier);
        dados.push(topVehicles[i].total);
        cores.push(
            Object.values(coresNacoes)[i % Object.values(coresNacoes).length],
        );
    }
    new Chart(document.getElementById("canvasTopVeiculos"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Favoritos",
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
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < nationPreference.length; i++) {
        var nacao = nationPreference[i].nation.toLowerCase();
        labels.push(nacao);
        dados.push(nationPreference[i].total);
        cores.push(coresNacoes[nacao] || "#888");
    }
    new Chart(document.getElementById("canvasNacaoPreferida"), {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    data: dados,
                    backgroundColor: cores,
                    borderWidth: 2,
                    borderColor: "#1a1a1a",
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "right", labels: { color: "#ccc", padding: 12 } },
            },
        },
    });
}

function plotarFavoritosPorNacao(favoritesByNation) {
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < favoritesByNation.length; i++) {
        var nacao = favoritesByNation[i].country;
        labels.push(nacao);
        dados.push(favoritesByNation[i].total);
        cores.push(coresNacoes[nacao ? nacao.toLowerCase() : ""] || "#888");
    }
    new Chart(document.getElementById("canvasFavoritosPorNacao"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Favoritos",
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

function plotarFavoritosPorEspecializacao(favoritesByType) {
    var labels = [],
        dados = [],
        cores = [];
    for (var i = 0; i < favoritesByType.length; i++) {
        var tipo = favoritesByType[i].vehicle_type;
        labels.push(tipo);
        dados.push(favoritesByType[i].total);
        cores.push(coresEspecializacao[tipo] || "#888");
    }
    new Chart(document.getElementById("canvasFavoritosPorEspecializacao"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Favoritos",
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
