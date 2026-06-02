function cadastrar() {
  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var confirmacaoSenhaVar = confirmacao_senha_input.value;
  var nacaoVar = nacao_input.value;
  var gameplayVar = gameplay_input.value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "" ||
    nacaoVar == "" ||
    gameplayVar == ""
  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "Preencha todos os campos corretamente.";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  if (senhaVar.length < 8) {
    cardErro.style.display = 'block';
    mensagem_erro.innerHTML =
      "A senha deve ter no mínimo 8 caracteres.";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  if (!emailVar.includes('@') || !emailVar.includes('.')) {
      cardErro.style.display = 'block';
      mensagem_erro.innerHTML = "Digite um e-mail válido.";
      finalizarAguardar();
      return false;
  } else {
      setInterval(sumirMensagem, 5000);
  }

  let numero = false;
  for (let i = 0; i < senhaVar.length; i++) {
    if (
        senhaVar[i] == 0 ||
        senhaVar[i] == 1 ||
        senhaVar[i] == 2 ||
        senhaVar[i] == 3 ||
        senhaVar[i] == 4 ||
        senhaVar[i] == 5 ||
        senhaVar[i] == 6 ||
        senhaVar[i] == 7 ||
        senhaVar[i] == 8 ||
        senhaVar[i] == 9
    ) {
        numero = true;
    }
  }

  if (!numero) {
      cardErro.style.display = 'block';
      mensagem_erro.innerHTML = "A senha deve conter ao menos um número.";
      finalizarAguardar();
      return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      nacaoServer: nacaoVar,
      gameplayServer: gameplayVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      if (resposta.ok) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
        setTimeout(() => {
          window.location = "login.html";
        }, "2000");
        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });
  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
}