function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome  = sessionStorage.NOME_USUARIO;
    var b_usuario = document.getElementById("b_usuario");
    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        b_usuario.innerHTML = "DEMO";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../../login.html";
}

function carregarMenu() {
    var nacoes    = ["EUA","Alemanha","URSS","Grã-Bretanha","Japão","China","Itália","França","Suécia","Israel"];
    var bandeiras = ["eua-flag.png","germany-flag.png","urss-flag.png","united_kingdom-flag.png","japan-flag.png","china-flag.png","italy-flag.png","france-flag.png","sweden-flag.png","israel-flag.png"];
    var links     = ["eua.html","germany.html","urss.html","united-kingdom.html","japan.html","china.html","italy.html","france.html","sweden.html","israel.html"];
    var menu = document.getElementById("side_menu");
    menu.innerHTML = '<div class="side-section-label">Nações</div>';
    for (var i = 0; i < nacoes.length; i++) {
        menu.innerHTML += '<a class="nation-button" href="../../pages/nations/' + links[i] + '">' +
            '<img src="../../assets/img/flags/' + bandeiras[i] + '" height="28px" width="42px">' +
            '<span>' + nacoes[i] + '</span>' +
        '</a>';
    }
}

function switchTab(id, btn) {
    document.querySelectorAll(".tab-panel").forEach(function(p) { p.classList.remove("active"); });
    document.querySelectorAll(".tab-btn").forEach(function(b)   { b.classList.remove("active"); });
    document.getElementById("tab-" + id).classList.add("active");
    btn.classList.add("active");
}

// ─── DADOS MOCKADOS ───────────────────────────────────────

// TODO: GET /api/users/count  → { total: N }
var mockTotalUsers = 87;

// TODO: GET /api/vehicles/listar  → array de veículos
var mockVeiculos = [
    { identifier: "T-34-85",        country: "USSR",          vehicle_type: "Exército",    realistic_br: 5.3 },
    { identifier: "M4A1 Sherman",   country: "EUA",           vehicle_type: "Exército",    realistic_br: 4.7 },
    { identifier: "Tiger I",        country: "Alemanha",      vehicle_type: "Exército",    realistic_br: 5.7 },
    { identifier: "Spitfire Mk IX", country: "Grã-Bretanha",  vehicle_type: "Aviação",     realistic_br: 5.3 },
    { identifier: "Bf 109 G-6",     country: "Alemanha",      vehicle_type: "Aviação",     realistic_br: 5.3 },
    { identifier: "Ki-84",          country: "Japão",         vehicle_type: "Aviação",     realistic_br: 5.7 },
    { identifier: "IS-2",           country: "USSR",          vehicle_type: "Exército",    realistic_br: 6.3 },
    { identifier: "Panther D",      country: "Alemanha",      vehicle_type: "Exército",    realistic_br: 5.7 },
    { identifier: "F6F Hellcat",    country: "EUA",           vehicle_type: "Aviação",     realistic_br: 4.7 },
    { identifier: "Yak-3",          country: "USSR",          vehicle_type: "Aviação",     realistic_br: 5.0 },
    { identifier: "Centurion Mk.1", country: "Grã-Bretanha",  vehicle_type: "Exército",    realistic_br: 6.3 },
    { identifier: "Zero A6M2",      country: "Japão",         vehicle_type: "Aviação",     realistic_br: 2.7 },
    { identifier: "Churchill VII",  country: "Grã-Bretanha",  vehicle_type: "Exército",    realistic_br: 5.0 },
    { identifier: "StuG III G",     country: "Alemanha",      vehicle_type: "Exército",    realistic_br: 4.3 },
    { identifier: "Il-2 (1942)",    country: "USSR",          vehicle_type: "Aviação",     realistic_br: 4.0 },
];

// TODO: GET /api/favorites/top  → [{ identifier, count }]
var mockTopVeiculos = [
    { identifier: "Tiger I",        count: 34 },
    { identifier: "T-34-85",        count: 29 },
    { identifier: "Bf 109 G-6",     count: 27 },
    { identifier: "Spitfire Mk IX", count: 24 },
    { identifier: "IS-2",           count: 22 },
    { identifier: "Panther D",      count: 19 },
    { identifier: "Yak-3",          count: 17 },
    { identifier: "Ki-84",          count: 15 },
    { identifier: "F6F Hellcat",    count: 13 },
    { identifier: "M4A1 Sherman",   count: 11 },
];

// TODO: GET /api/favorites/by-nation  → [{ country, count }]
var mockFavsPorNacao = [
    { country: "Alemanha",     count: 85 },
    { country: "USSR",         count: 72 },
    { country: "EUA",          count: 61 },
    { country: "Grã-Bretanha", count: 48 },
    { country: "Japão",        count: 37 },
];

// TODO: GET /api/favorites/by-class  → [{ vehicle_type, count }]
var mockFavsPorClasse = [
    { vehicle_type: "Exército",     count: 148 },
    { vehicle_type: "Aviação",      count: 112 },
    { vehicle_type: "Helicópteros", count: 34  },
    { vehicle_type: "Marinha",      count: 29  },
];

// TODO: GET /api/users/by-nation  → [{ main_nation, count }]
var mockDistNacao = [
    { main_nation: "germany", count: 22 },
    { main_nation: "ussr",    count: 19 },
    { main_nation: "usa",     count: 18 },
    { main_nation: "japan",   count: 15 },
    { main_nation: "britain", count: 13 },
];

// TODO: GET /api/users/by-playstyle  → [{ playstyle_pref, count }]
var mockDistPlaystyle = [
    { playstyle_pref: "army",        count: 35 },
    { playstyle_pref: "airplanes",   count: 28 },
    { playstyle_pref: "helicopters", count: 14 },
    { playstyle_pref: "navy",        count: 10 },
];

// TODO: GET /api/users/me?email=EMAIL_USUARIO  → { main_nation, playstyle_pref }
var mockMyUser = {
    main_nation:    "ussr",
    playstyle_pref: "army",
};

// TODO: GET /api/favorites/mine?email=EMAIL_USUARIO  → array de veículos favoritados
var mockMyFavorites = [
    { identifier: "T-34-85",    country: "USSR",     vehicle_type: "Exército", realistic_br: 5.3 },
    { identifier: "IS-2",       country: "USSR",     vehicle_type: "Exército", realistic_br: 6.3 },
    { identifier: "Yak-3",      country: "USSR",     vehicle_type: "Aviação",  realistic_br: 5.0 },
    { identifier: "Tiger I",    country: "Alemanha", vehicle_type: "Exército", realistic_br: 5.7 },
    { identifier: "Bf 109 G-6", country: "Alemanha", vehicle_type: "Aviação",  realistic_br: 5.3 },
];

// ─── CHART.JS CONFIG ──────────────────────────────────────
var C_OLIVE_L = "#a0b860";
var C_TEXT    = "#a0a890";
var C_MUTED   = "#5a6050";
var C_BORDER  = "#2e3424";

var PALETTE = [
    "#7d9048","#d04030","#5da8c4","#c9a84c",
    "#9b7fd4","#4ecf9b","#cf7e4e","#5e8ad4",
    "#cf4e8a","#8acf5e"
];

Chart.defaults.color = C_TEXT;
Chart.defaults.borderColor = C_BORDER;
Chart.defaults.font.family = "'Barlow', sans-serif";

function tooltipCfg() {
    return {
        backgroundColor: "#141710",
        borderColor: C_BORDER,
        borderWidth: 1,
        titleColor: C_OLIVE_L,
        bodyColor: C_TEXT,
        padding: 10,
        titleFont: { family: "'Barlow Condensed', sans-serif", size: 13, weight: "700" }
    };
}

function cartesianOpts(indexAxis, hideLegend) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: indexAxis || "x",
        plugins: {
            legend: { display: !hideLegend, labels: { color: C_TEXT, boxWidth: 12, padding: 12 } },
            tooltip: tooltipCfg()
        },
        scales: {
            x: { grid: { color: C_BORDER }, ticks: { color: C_TEXT, font: { size: 11 } } },
            y: { grid: { color: C_BORDER }, ticks: { color: C_TEXT, font: { size: 11 } } }
        }
    };
}

function donutOpts() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
            legend: { position: "right", labels: { color: C_TEXT, boxWidth: 10, padding: 10, font: { size: 11 } } },
            tooltip: tooltipCfg()
        }
    };
}

function makeBarDataset(labels, data) {
    return {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: labels.map(function(_, i) { return PALETTE[i % PALETTE.length] + "bb"; }),
            borderColor:     labels.map(function(_, i) { return PALETTE[i % PALETTE.length]; }),
            borderWidth: 1,
            borderRadius: 3,
        }]
    };
}

function makeDonutDataset(labels, data) {
    return {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: labels.map(function(_, i) { return PALETTE[i % PALETTE.length] + "cc"; }),
            borderColor:     labels.map(function(_, i) { return PALETTE[i % PALETTE.length]; }),
            borderWidth: 1
        }]
    };
}

// ─── RENDER ───────────────────────────────────────────────
function renderDash() {

    // STAT CARDS
    document.getElementById("stat-total-users").innerHTML    = mockTotalUsers;
    document.getElementById("stat-total-veiculos").innerHTML = mockVeiculos.length;

    var topNacao = mockDistNacao[0];
    document.getElementById("stat-nacao-top").innerHTML     = topNacao.main_nation.toUpperCase();
    document.getElementById("stat-nacao-top-sub").innerHTML = topNacao.count + " pilotos";

    var topClasse = mockDistPlaystyle[0];
    document.getElementById("stat-classe-top").innerHTML     = topClasse.playstyle_pref.toUpperCase();
    document.getElementById("stat-classe-top-sub").innerHTML = topClasse.count + " pilotos";

    // TOP VEÍCULOS
    new Chart(document.getElementById("chart-top-veiculos"), {
        type: "bar",
        data: makeBarDataset(
            mockTopVeiculos.map(function(v) { return v.identifier; }),
            mockTopVeiculos.map(function(v) { return v.count; })
        ),
        options: cartesianOpts("y", true)
    });

    // NAÇÃO GERAL
    new Chart(document.getElementById("chart-nacao-geral"), {
        type: "doughnut",
        data: makeDonutDataset(
            mockDistNacao.map(function(n) { return n.main_nation; }),
            mockDistNacao.map(function(n) { return n.count; })
        ),
        options: donutOpts()
    });

    // FAVS POR NAÇÃO
    new Chart(document.getElementById("chart-favs-nacao"), {
        type: "bar",
        data: makeBarDataset(
            mockFavsPorNacao.map(function(n) { return n.country; }),
            mockFavsPorNacao.map(function(n) { return n.count; })
        ),
        options: cartesianOpts("x", true)
    });

    // FAVS POR CLASSE (Este é o que estava cortado no seu prompt)
    new Chart(document.getElementById("chart-favs-classe"), {
        type: "bar",
        data: makeBarDataset(
            mockFavsPorClasse.map(function(c) { return c.vehicle_type; }),
            mockFavsPorClasse.map(function(c) { return c.count; })
        ),
        options: cartesianOpts("x", true)
    });

}

// Inicializando o dashboard ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    validarSessao();
    carregarMenu();
    renderDash();
});