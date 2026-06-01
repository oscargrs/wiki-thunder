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