// Variaveis Globais
// variavel escolha
var escolha = null;
// variavel da escolha correta
var escolha_correta = "";

// variavel de estado
var carregando = false;

// Array de objetos questoes
var questoes = [];

// Numero da pergunta
var numero = 0;


// Função que escolhe a opção
function escolher(opcao){
    
    if(!carregando){

        if(escolha != null){
            escolha.classList.remove("escolha");
        }

        opcao.classList.add("escolha");
        escolha = opcao;
    }
}

// Função que confirma a opção
function confirmar(){

    var opcao = escolha_correta;

    if(escolha != null){
        if(escolha.textContent == opcao){

            escolha.classList.remove("escolha");
            escolha.classList.add("acertou");
            carregando = true;
            proximaPergunta(true);

        }else{

            escolha.classList.remove("escolha");
            escolha.classList.add("errou");
            carregando = true;
            proximaPergunta(false);

        }
    }else{
        alert("Escolha uma das opções");
        
    }

}

// Carregar todas as perguntas
async function  carregarTodas(){

    const res = await fetch("questoes/sistema-operacional.json");

    questoes = await res.json();

    carregarUma();

}

// Carregar uma pergunta
function carregarUma(){

    // Carregando a primeira pergunta
    questao.textContent = questoes[numero].questao;

    questao_a.textContent = questoes[numero].opcao_a;
    questao_b.textContent = questoes[numero].opcao_b;
    questao_c.textContent = questoes[numero].opcao_c;

    escolha_correta = questoes[numero].resposta;

}

// Proxima pergunta
function proximaPergunta(acertou){

    // Remover uma das classes: acertou ou errou
    if(acertou){
        escolha.classList.remove("acertou");
    }else{
        escolha.classList.remove("errou");
    }

    // Aqui o questionario desaparece
    animar(false);
    

    // Verificando se é a ultima pergunta
    // Se for muda o numero para 0
    var n = numero + 1;
    if(n === questoes.length)
        numero = 0;
    // Aumentando o numero
    numero++;
    // Carregando uma pergunta
    carregarUma();
    
    // Aqui o questionario aparece
    setTimeout(animar(true), 1000);

    // Remove as classes de animação
    setTimeout(removerClasses(), 1000);

}

// Função para animar as questões
// Utilizando classes do css

// A função recebe um valor logico  
// se for verdadeiro ele aparece se 
// falso a pergunta desaparece
function animar(aparecer){

    if(aparecer){
        pergunta.classList.add("aparecer");
    }else{
        pergunta.classList.add("sumir");
    }

}

// Remover as classes de animações
function removerClasses(){

    // Remove as 2 classes de animação
    pergunta.classList.remove("sumir");
    pergunta.classList.remove("aparecer");

    // Mudar o estado de carregando para carregado
    carregando = false;

}