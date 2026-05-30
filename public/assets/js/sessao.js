function validarSessaoDash() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../../login.html";
    }
}

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var alistarSpan = document.getElementById("alistarSpan");
    var alistarRedirect = document.getElementById("alistarRedirect");
    var b_usuario = document.getElementById("b_usuario");
    var userInfo = document.getElementById("userInfo");

    if (email != null && nome != null) {
        alistarSpan.innerHTML = "DASHBOARD";
        alistarRedirect.href = "../../dashboard/dash-visao-geral.html";
        b_usuario.innerHTML = nome;
    } else {
        userInfo.style.display = "none";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

