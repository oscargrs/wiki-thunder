function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var alistarSpan = document.getElementById("alistarSpan");
    var alistarRedirect = document.getElementById("alistarRedirect");

    if (email != null && nome != null) {
        alistarSpan.innerHTML = "DASHBOARD";
        alistarRedirect.href = "../../dashboard/dash-visao-geral.html"
    } else {

    }
}