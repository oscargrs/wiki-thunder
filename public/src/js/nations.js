function index() {
    let nacoes = ["EUA", "Alemanha", "URSS", "Grã-Bretanha", "Japão", "China", "Itália", "França", "Suécia", "Israel"];
    let bandeiras = ["eua-flag.png", "germany-flag.png", "urss-flag.png", "united_kingdom-flag.png", "japan-flag.png", "china-flag.png", "italy-flag.png", "france-flag.png", "sweden-flag.png", "israel-flag.png"];
    let links = ["eua.html", "germany.html", "united-kingdom.html", "japan.html", "china.html", "italy.html", "france.html", "sweden.html", "israel.html"];
    
    for (let i = 0; i < nacoes.length; i++) {
        side_menu.innerHTML += `
            <a class="nation-button" href="./pages/nations/${links[i]}">
                <img src="./src/img/flags/${bandeiras[i]}" height="28px" width="42px">
                <span class="nation-title">${nacoes[i]}</span>
            </a>
        `;
    }
}

function pages() {
    let nacoes = ["EUA", "Alemanha", "URSS", "Grã-Bretanha", "Japão", "China", "Itália", "França", "Suécia", "Israel"];
    let bandeiras = ["eua-flag.png", "germany-flag.png", "urss-flag.png", "united_kingdom-flag.png", "japan-flag.png", "china-flag.png", "italy-flag.png", "france-flag.png", "sweden-flag.png", "israel-flag.png"];
    let links = ["eua.html", "germany.html", "urss.html", "united-kingdom.html", "japan.html", "china.html", "italy.html", "france.html", "sweden.html", "israel.html"];
    
    for (let i = 0; i < nacoes.length; i++) {
        side_menu.innerHTML += `
            <a class="nation-button" href="../../pages/nations/${links[i]}">
                <img src="../../src/img/flags/${bandeiras[i]}" height="28px" width="42px">
                <span class="nation-title">${nacoes[i]}</span>
            </a>
        `;
    }
}