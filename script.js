// Variaveis Globais
// variavel escolha
var escolha = null;

function escolher(opcao){

    if(escolha != null){
        escolha.classList.remove("escolha");
    }

    opcao.classList.add("escolha");
    escolha = opcao;

}