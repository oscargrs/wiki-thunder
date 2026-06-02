var traducaoPaises = {
    'usa': 'EUA',
    'france': 'França',
    'japan': 'Japão',
    'china': 'China',
    'ussr': 'URSS',
    'israel': 'Israel',
    'germany': 'Alemanha',
    'italy': 'Itália',
    'sweden': 'Suécia',
    'britain': 'Grã-Bretanha'
};

var traducaoTipos = {
    'assault': 'Assalto',
    'bomber': 'Bombardeiro',
    'fighter': 'Caça',
    'medium_tank': 'Tanque Médio',
    'spaa': 'AAAP',
    'light_tank': 'Tanque Leve',
    'tank_destroyer': 'Caça-Tanque',
    'heavy_tank': 'Tanque Pesado'
};

function exibirVeiculos(veiculos) {
    var cards = document.getElementById('cards');
    var veiculosEncontrados = document.getElementById('veiculosEncontrados');

    cards.innerHTML = ``;

    for (var i = 0; i < veiculos.length; i++) {
        var veiculo = veiculos[i];

        var identifier = veiculo.identifier;

        var paisF = traducaoPaises[veiculo.country];
        if (!paisF) {
            paisF = veiculo.country;
        }

        var tipoF = traducaoTipos[veiculo.vehicle_type];
        if (!tipoF) {
            tipoF = veiculo.vehicle_type;
        }

        var identifierSemPrefixo = formatarIdentifier(identifier);
        var identifierF = identifierSemPrefixo.charAt(0).toUpperCase() + identifierSemPrefixo.slice(1).replaceAll('_', ' ');

        cards.innerHTML += `
            <div class="vehicle-card">
                <div class="card-title">
                    <span class="identifier" title="${identifierF}">${identifierF}</span>
                    <span class="country">${paisF}</span>
                </div>
                <div class="card-img">
                    <img class="vehicle-img" src="../../assets/img/vehicles/${identifier}.png" alt="${identifierF}" onclick="expandirImagem('../../assets/img/vehicles/${identifier}.png', '${identifierF}')">
                </div>
                <div class="card-footer">
                    <span class="type">${tipoF}</span>
                    <span class="br">${veiculo.realistic_br}</span>
                </div>
                <button
                    class="card-curtir"
                    id="btn-curtir-${veiculo.idVehicle}"
                    onclick="curtirCard(${veiculo.idVehicle}, this)">
                    ♥ Curtir
                </button>
            </div>
        `;
    }

    if (window.location.pathname != '/hangar/curtidas.html') {
        var botoes = document.querySelectorAll('.card-curtir');

        for (var i = 0; i < botoes.length; i++) {
            botoes[i].style.display = 'none';
        }
    }

    if (veiculosEncontrados) {
        veiculosEncontrados.style.display = 'block';
    }
}

var prefixoNacoes = ['ussr', 'usa', 'germ', 'uk', 'jp', 'cn', 'it', 'fr', 'sw', 'il'];

function formatarIdentifier(identifier) {
    for (var i = 0; i < prefixoNacoes.length; i++) {
        var prefixo = prefixoNacoes[i];
        if (identifier.startsWith(prefixo + '_')) {
            return identifier.slice(prefixo.length + 1);
        }
        if (identifier.endsWith('-' + prefixo)) {
            return identifier.slice(0, identifier.length - prefixo.length - 1);
        }
    }

    return identifier;
}

async function carregarVeiculos(classe, nacao) {
    var resposta = await fetch(
        `/vehicles/filter/${classe}/${nacao}`
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}

async function carregarNome() {
    var nome = ipt_search.value.replaceAll('-', '_').replaceAll(' ', '_').toLowerCase();
    var veiculosEncontrados = document.getElementById('veiculosEncontrados');

    var resposta = await fetch(
        `/vehicles/search/${nome}`
    );

    if (veiculosEncontrados) {
        veiculosEncontrados.style.display = 'block';
    }

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}

async function carregarNomeNacao(nacao) {
    var nome = ipt_search.value.replaceAll('-', '_').replaceAll(' ', '_').toLowerCase();

    var resposta = await fetch(
        `/vehicles/search/${nome}/${nacao}`
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}

function expandirImagem(src, alt) {
    var overlay = document.createElement('div');
    overlay.className = 'img-overlay';
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };

    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}