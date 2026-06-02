async function curtir(idVeiculo) {

    var idUsuario = sessionStorage.ID_USUARIO;

    console.log(idVeiculo);
    console.log(idUsuario);

    var resposta = await fetch('/curtidas/curtir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idVeiculoServer: idVeiculo,
            idUsuarioServer: idUsuario
        })
    });

    var resultado = await resposta.json();

    console.log(resultado);
}

async function curtirCard(idVeiculo, botao) {
    botao.style.pointerEvents = 'none';
    botao.textContent = '...';

    var idUsuario = sessionStorage.ID_USUARIO;

    var resposta = await fetch('/curtidas/curtir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idVeiculoServer: idVeiculo,
            idUsuarioServer: idUsuario
        })
    });

    var resultado = await resposta.json();
    console.log(resultado);

    botao.className = 'card-curtir curtido';
    botao.textContent = '✓ Curtido';

    setTimeout(function() {
        botao.className = 'card-curtir';
        botao.textContent = '♥ Curtir';
        botao.style.pointerEvents = 'auto';
    }, 200);
}

async function carregarFiltro() {
    var nacao = document.getElementById('sel_nacao').value;
    var classe = document.getElementById('sel_classe').value;

    var resposta = await fetch(`/vehicles/filter/${classe}/${nacao}`);
    var veiculos = await resposta.json();

    console.log(veiculos);

    exibirVeiculos(veiculos);
}