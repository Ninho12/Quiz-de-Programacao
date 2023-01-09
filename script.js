// Objeto do sistema
const { app } = require('electron');

// Variaveis Globais
// variavel escolha
var escolha = null;
// variavel da escolha correta
var escolha_correta = "";

// variavel se acertou
var acertou = false;

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
            acertou = true;
            pontuarPositivo();

        }else{

            escolha.classList.remove("escolha");
            escolha.classList.add("errou");
            carregando = true;
            acertou = false;
            pontuarNegativo();

        }
    }else{
        alert("Escolha uma das opções");
        return;

        // o return é para não executar o proximo comando
    }
    // Habilitando o botao proximo
    proximo.disabled = false;
}

// Carregar todas as perguntas
async function  carregarTodas(){

    const res = await fetch("questoes/sistema-operacional.json");

    questoes = await res.json();

    // Carrega uma pergunta
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

    // Atualiza o Placar
    //atualizarPontuacao();
}

// Proxima pergunta
function proximaPergunta(){

    // Dar os parabens!
    if((numero+1) === questoes.length){
        confirm("Muito Obrigado por ter Jogado o Quiz!");
    
    }

    // Remover uma das classes: acertou ou errou
    // acertou é uma variavel global
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
    setTimeout(carregarUma(), 1000);
    
    // Aqui o questionario aparece
    animar(true);

    // Remove as classes de animação
    setTimeout(removerClasses(), 2000);

    // Desabilita o botão proximo
    proximo.disabled = true;

    // Deixando a escolha nula
    escolha = null;
    /*
        Isso é para o usario escolher sempre 
        uma das opçoes.
    */

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

/*
    Nos proximos codigos serão
    para implementar um sistema de 
    pontos.
*/
// Variaveis Globais:
var pontos = 0;
var pontuacao_seguida = 0;

var quantidade_acertou = 0;
var quantidade_errou = 0;


// Funçoes:
function pontuarPositivo(){
    // Somando os pontos
    // Cada acerto é 100 pontos
    pontos+= 100;

    // Contando a pontuação seguida;
    pontuacao_seguida++;

    // Contar a quantidade que acertou;
    quantidade_acertou++;

    // Atualizando o Placar
    atualizarPontuacao();
}

function pontuarNegativo(){
    // Subtraindo os pontos;
    // Cada erro é menos 100 pontos;
    pontos-= 100;

    // Zerando a pontuação seguida;
    pontuacao_seguida = 0;

    // Contar a quantidade que errou;
    quantidade_errou++;

    // Atualizando o Placar
    atualizarPontuacao();
}

function atualizarPontuacao(){

    // Atualizando os pontos
    xp.textContent = pontos+" XP"

    // Atualizando os pontos seguidos
    pontuacaoSeguida.textContent = pontuacao_seguida;

    // Atualiza a quantidade que acertou
    quantAcertou.textContent = quantidade_acertou;

    // Atualiza a quantidade que errou
    quantErrou.textContent = quantidade_errou;

    // Numero da pergunta
    aPergunta.textContent = (numero+1)

    // Quantidade total
    totalQuestoes.textContent = questoes.length;


}