function exibirVeiculos(veiculos) {
    var cards = document.getElementById('cards');

    cards.innerHTML = ``;

    veiculos.forEach(veiculo => {
        console.log(veiculo.identifier);
        let pais = veiculo.country;
        paisF = pais.charAt(0).toUpperCase() + pais.slice(1);
        let tipo = veiculo.vehicle_type;
        tipoF = textoFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1).replaceAll('_', ' ');
        let identifier = veiculo.identifier;
        identifierF = identifier.charAt(0).toUpperCase() + identifier.slice(1).replaceAll('_', '-');
        cards.innerHTML += `
            <div class="vehicle-card">
                <div class="card-title">
                    <span class="identifier">${identifierF}</span>
                    <span class="country">${paisF}</span>
                </div>
                <div class="card-img">
                    <img class="vehicle-img" src="../../src/img/vehicles/${veiculo.identifier}.png" alt="">
                </div>
                <div class="card-footer">
                    <span class="type">${tipoF}</span>
                    <span class="br">${veiculo.realistic_br}</span>
                </div>
            </div>
        `
    })
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