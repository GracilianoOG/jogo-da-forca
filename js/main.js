// Botões
var btnComecaJogo = document.querySelector("#botao-comeca-jogo");
var btnAdicionaPalavra = document.querySelector("#botao-adiciona-palavra");

var btnSalvar = document.querySelector("#botao-salvar");
var btnCancelar = document.querySelector("#botao-cancelar");

var btnNovoJogo = document.querySelector("#botao-novo-jogo");
var btnDesistir = document.querySelector("#botao-desistir");

// Páginas
var pagPrincipal = document.querySelector(".pagina-principal");
var pagAdicionaPalavra = document.querySelector(".pagina-adiciona-palavra");
var pagJogo = document.querySelector(".pagina-jogo");

// Eventos
btnComecaJogo.addEventListener("click", comecaJogo);
btnAdicionaPalavra.addEventListener("click", adicionaPalavra);

btnSalvar.addEventListener("click", salvar);
btnCancelar.addEventListener("click", cancelar);

btnNovoJogo.addEventListener("click", novoJogo);
btnDesistir.addEventListener("click", desistir);

document.addEventListener("keydown", verificaSeEhLetra);

// Tabuleiro
var tela = document.querySelector(".tabuleiro");
var pintura = tela.getContext("2d");
var listaPalavrasSecretas = ["ALURA", "ORACLE", "JAVA", "PYTHON", "SUN", "CAELUM", "HTML", "CSS"];

var listaLetrasPosicaoX = [];
var letrasPosicaoY = "";
var letrasTamanho = "";
var listaLetrasDigitadas = [];
var palavraSecreta = "";
var distanciaLetra = 0;

// Tabuleiro - Funções
function desenhaLinhas(canvas, quantidadeLinhas) {
    var tabuleiroLargura = canvas.width;
    var tabuleiroAltura = canvas.height;
    var espacoEntreLinhas = (tabuleiroLargura / quantidadeLinhas) * 0.2; // O espaço entre as linhas corresponde a x porcento da linha em si

    var linhaLargura = (tabuleiroLargura / quantidadeLinhas) - espacoEntreLinhas; // Calcula o tamanho da linha, descontando o espaço em branco
    var linhaAltura = 5;
    var linhaPosX = espacoEntreLinhas / 2;
    var linhaPosY = Math.round((tabuleiroAltura / 1.2) - (linhaAltura / 1.2)); // Coloca o meio da linha no meio do tabuleiro
    letrasTamanho = linhaPosX + (linhaLargura / 3);
    letrasPosicaoY = linhaPosY - (linhaAltura * 2);

    pintura.clearRect(0, 0, tabuleiroLargura, tabuleiroAltura);

    for(var i = 0; i < quantidadeLinhas; i++) {
        pintura.fillStyle = "#0A3871";
        pintura.fillRect(linhaPosX, linhaPosY, linhaLargura, linhaAltura);

        listaLetrasPosicaoX.push(linhaPosX + (linhaLargura / 3));
        linhaPosX += linhaLargura + espacoEntreLinhas;
    }
}

function criaNovoJogo() {
    listaLetrasPosicaoX = [];
    listaLetrasDigitadas = [];
    palavraSecreta = geraPalavraAleatoria(listaPalavrasSecretas);
    desenhaPalavra(palavraSecreta);
}

function desenhaTexto(letra, tam, cor, x, y) {
    pintura.font = tam + "px arial";
    pintura.fillStyle = cor;
    pintura.fillText(letra, x, y);
}

// Palavra Secreta - Funções
function geraPalavraAleatoria(lista) {
    return lista[Math.floor(Math.random() * lista.length)]
}

function desenhaPalavra(palavra) {
    desenhaLinhas(tela, palavra.length);
    console.log("Palavra: " + palavra + " Tamanho: " + palavra.length);
}

function formataTexto(texto) {
    return texto.toUpperCase().trim();
}

function letraCorreta(letraDigitada, posicao) {
    desenhaTexto(letraDigitada, letrasTamanho, "#0A3871", listaLetrasPosicaoX[posicao], letrasPosicaoY);
}

function letraIncorreta(letraDigitada) {
    desenhaTexto(letraDigitada, 80, "#495057", distanciaLetra, 750);
    distanciaLetra += 60;
}

function verificaSeEhLetra(evento) {
    var codLetra = evento.which;
    
    if(codLetra >= 65 && codLetra <= 90) {
        verificaLetraDigitada(palavraSecreta, evento.key);
    }
}

function verificaLetraDigitada(palavra, letraDigitada) {
    var letra = formataTexto(letraDigitada);
    var achouLetra = false;

    if(!listaLetrasDigitadas.includes(letra)) listaLetrasDigitadas.push(letra); else return;

    for(var i = 0; i < palavra.length; i++) {
        if(letra == palavra[i]) {
            letraCorreta(letra, i);
            achouLetra = true;
        }
    }

    if(!achouLetra) letraIncorreta(letra);
}

//Funções
function trocaDePagina(pagAntiga, pagNova) {
    pagAntiga.classList.add("invisivel");
    pagNova.classList.remove("invisivel");
}

// Botões - Funções
function comecaJogo() {
    trocaDePagina(pagPrincipal, pagJogo);
    // Gera palavra aleatória no tabuleiro()
    criaNovoJogo();
}

function adicionaPalavra() {
    trocaDePagina(pagPrincipal, pagAdicionaPalavra);
}

function salvar() {
    trocaDePagina(pagAdicionaPalavra, pagJogo);
    // Salva a nova palavra num array()
}

function cancelar() {
    trocaDePagina(pagAdicionaPalavra, pagPrincipal);
    // Limpa o campo de texto()
}

function novoJogo() {
    // Gera palavra aleatória no tabuleiro()
    criaNovoJogo();
}

function desistir() {
    trocaDePagina(pagJogo, pagPrincipal);
}