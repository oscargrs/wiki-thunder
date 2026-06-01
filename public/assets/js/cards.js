function exibirVeiculos(veiculos) {
    var cards = document.getElementById('cards');
    var likesList = document.getElementById('likesList');

    cards.innerHTML = ``;

    veiculos.forEach(veiculo => {
        console.log(veiculo.identifier);

        let pais = veiculo.country.toUpperCase();
        let tipo = veiculo.vehicle_type;
        let identifier = veiculo.identifier;

        let paisF = pais.charAt(0) + pais.slice(1);
        let tipoF = tipo.charAt(0).toUpperCase() + tipo.slice(1).replaceAll('_', ' ');
        let identifierSemPrefixo = formatarIdentifier(identifier);
        let identifierF = identifierSemPrefixo.charAt(0).toUpperCase() + identifierSemPrefixo.slice(1).replaceAll('_', ' ');
        
        cards.innerHTML += `
            <div class="vehicle-card">
                <div class="card-title">
                    <span class="identifier">${identifierF}</span>
                    <span class="country">${paisF}</span>
                </div>
                <div class="card-img">
                    <img class="vehicle-img" src="../../assets/img/vehicles/${identifier}.png" alt="">
                </div>
                <div class="card-footer">
                    <span class="type">${tipoF}</span>
                    <span class="br">${veiculo.realistic_br}</span>
                </div>
            </div>
        `;

        if (likesList) {
            likesList.innerHTML += `
                <div class="like-row">
    
                    <div class="like-info">
                        <span>${identifierF}</span>
                        <span>${paisF}</span>
                        <span>${veiculo.realistic_br}</span>
                        <span>${tipoF}</span>
                    </div>
    
                    <button 
                        class="like-btn"
                        onclick="curtir(${veiculo.idVehicle})">
                        Curtir
                    </button>
    
                </div>
            `;
        }
    })
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