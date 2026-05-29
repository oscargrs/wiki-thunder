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