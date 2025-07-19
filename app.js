//let titulo = document.querySelector ("h1");
//titulo.innerHTML = "Bem vindos ao Jogo do Número Secreto";

//let paragrafo = document.querySelector ("p");
//paragrafo.innerHTML = `Escolha um número de 1 a ${numeroMaximo}.`;

let listaDeNumerosSorteados = [];
let limiteNumero = 20;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1
exibirMensagemInicial ();


function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.0});
}
exibirTextoNaTela ("h1", "Bem vinda Isabela!");
exibirTextoNaTela ("p", "Escolha um número de 1 a 20.");


function exibirMensagemInicial () {
    exibirTextoNaTela ("h1", "Bem vinda Isabela!");
    exibirTextoNaTela ("p", "Escolha um número de 1 a 20.");
}


function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt (Math.random() * limiteNumero + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == limiteNumero) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push (numeroEscolhido);
        console.log (listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector ("input");
    chute.value = "";
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById ("reiniciar").setAttribute ('disabled', true);
}

function verificarChute() {
    let chute = document.querySelector ("input").value;
    console.log (typeof chute);
        if (isNaN (chute) || chute.trim() === "") {
            exibirTextoNaTela ("p", "Não pode usar letras Isa! Digite apenas números.");
            return;
        }

        chute = parseInt(chute); 
        
        if (chute == numeroSecreto) {
        exibirTextoNaTela ("h1", "Você acertou o Número Secreto!");
        let palavraTentativa = tentativas > 1 ? "Tentativas" : "Tentativa";
        let mensagemTentativas = `Você descobriu o Número Secreto em ${tentativas} ${palavraTentativa}! Parabéns Isa!`;
        exibirTextoNaTela ("p", mensagemTentativas);
        document.getElementById ("reiniciar").removeAttribute ("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ("p", `O Número Secreto é menor que o número ${chute}.`);
    } else {
        exibirTextoNaTela ("p", `O Número Secreto é maior que o número ${chute}.`);
    }
    tentativas++
    limparCampo ()
    console.log (chute == numeroSecreto);
}
}
