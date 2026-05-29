function exibirVeiculos(veiculos) {
    var cards = document.getElementById('cards');

    cards.innerHTML = ``;

    veiculos.forEach(veiculo => {
        console.log(veiculo.identifier);

        let pais = veiculo.country;
        let tipo = veiculo.vehicle_type;
        let identifier = veiculo.identifier;

        let paisF = pais.charAt(0).toUpperCase() + pais.slice(1);
        let tipoF = tipo.charAt(0).toUpperCase() + tipo.slice(1).replaceAll('_', ' ');
        let identifierF = formatarIdentifier(identifier).charAt(0).toUpperCase() + identifier.slice(1);;
        
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
        `
    })
}

var prefixoNacoes = ['ussr', 'usa', 'germ', 'uk', 'jp', 'cn', 'it', 'fr', 'sw', 'il'];

function formatarIdentifier(identifier) {
    for (var i = 0; i < prefixoNacoes.length; i++) {
        var prefixo = prefixoNacoes[i];
        if (identifier.startsWith(prefixo + '-')) {
            return identifier.slice(prefixo.length + 1);
        }
        if (identifier.endsWith('-' + prefixo)) {
            return identifier.slice(0, identifier.length - prefixo.length - 1);
        }
    }

    return identifier;
}

async function carregarVeiculos() {
    var resposta = await fetch(
        '/vehicles/listar'
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}

async function carregarNacao(nacao) {
    var resposta = await fetch(
        `/vehicles/nation/${nacao}`
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    var todosVeiculos = veiculos.flat();

    exibirVeiculos(todosVeiculos);
}

async function carregarClasse(classe) {
    var resposta = await fetch(
        `/vehicles/class/${classe}`
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}

async function carregarNome() {
    var nome = ipt_search.value;

    var resposta = await fetch(
        `/vehicles/name/${nome}`
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}