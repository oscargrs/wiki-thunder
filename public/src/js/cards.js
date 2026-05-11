function exibirVeiculos(veiculos) {
    var cards = document.getElementById('cards');

    cards.innerHTML = ``;

    veiculos.forEach(veiculo => {
        console.log(veiculo.image_url);
        cards.innerHTML += `
            <div class="vehicle-card">
                <div class="card-title">
                    <span>${veiculo.identifier}</span>
                    <span>${veiculo.country}</span>
                </div>
                <div class="card-img">
                    <img class="vehicle-img" src="${veiculo.image_url}" alt="">
                </div>
                <div class="card-footer">
                    <span>${veiculo.vehicle_type}</span>
                    <span>${veiculo.realistic_br}</span>
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

    exibirVeiculos(veiculos);
}

async function carregarClasse(classe) {
    var resposta = await fetch(
        `/vehicles/class/${classe}`
    );

    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}