// Variaveis Globais
// variavel escolha
var escolha = null;


// Função que escolhe a opção
function escolher(opcao){

    if(escolha != null){
        escolha.classList.remove("escolha");
    }

    opcao.classList.add("escolha");
    escolha = opcao;
}

// Função que confirma a opção
function confirmar(){

    var opcao = "Windows";

    if(escolha != null){
        if(escolha.textContent == opcao){
            alert("Você Acertou!");
            escolha.classList.remove("escolha");
            escolha.classList.add("acertou");
        }else{
            alert("Você Errou!");
            escolha.classList.remove("escolha");
            escolha.classList.add("errou");
        }
    }else{
        alert("Escolha uma das opções");
        
    }

}