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
btnComecaJogo.addEventListener("click", funcComecaJogo);
btnAdicionaPalavra.addEventListener("click", funcAdicionaPalavra);

btnSalvar.addEventListener("click", funcSalvar);
btnCancelar.addEventListener("click", funcCancelar);

btnNovoJogo.addEventListener("click", funcNovoJogo);
btnDesistir.addEventListener("click", funcDesistir);

document.addEventListener("keydown", verificaLetra);

// Tabuleiro
var tela = document.querySelector(".tabuleiro");
var pintura = tela.getContext("2d");
var palavraSecreta = ["ALURA", "ORACLE", "JAVA", "JAVASCRIPT", "PYTHON", "SUN", "CAELUM", "HTML", "CSS"];

// Tabuleiro - Funções
function desenhaLinhas(canvas, quantidadeLinhas) {
    var tabuleiroLargura = canvas.width;
    var tabuleiroAltura = canvas.height;
    var espaco = (tabuleiroLargura / quantidadeLinhas) * 0.2; // O espaço entre as linhas corresponde a x porcento da linha em si

    var linhaLargura = (tabuleiroLargura / quantidadeLinhas) - espaco; // Calcula o tamanho da linha, descontando o espaço em branco
    var linhaAltura = 5;
    var linhaPosX = espaco / 2;
    var linhaPosY = Math.round((tabuleiroAltura / 1.2) - (linhaAltura / 1.2)); // Coloca o meio da linha no meio do tabuleiro

    pintura.clearRect(0, 0, tabuleiroLargura, tabuleiroAltura);

    for(var i = 0; i < quantidadeLinhas; i++) {
        pintura.fillStyle = "#0A3871";
        pintura.fillRect(linhaPosX, linhaPosY, linhaLargura, linhaAltura);

        linhaPosX += linhaLargura + espaco;
    }
}

function geraItemAleatorio(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function geraPalavraAleatoria(arr) {
    var palavraAleatoria = geraItemAleatorio(arr);
    var palavraAleatoriaTamanho = palavraAleatoria.length;
    desenhaLinhas(tela, palavraAleatoriaTamanho);
    console.log("Palavra: " + palavraAleatoria + " Tamanho: " + palavraAleatoriaTamanho);
}

function verificaLetra(evento) {
    var codLetra = evento.which;

    if(codLetra >= 65 && codLetra <= 90) {
        console.log("Letra: " + evento.key + " Código: " + evento.which);
    }
}

//Funções
function trocaDePagina(pagAntiga, pagNova) {
    pagAntiga.classList.add("invisivel");
    pagNova.classList.remove("invisivel");
}

// Botões - Funções
function funcComecaJogo() {
    trocaDePagina(pagPrincipal, pagJogo);
    // Gera palavra aleatória no tabuleiro()
    geraPalavraAleatoria(palavraSecreta);
}

function funcAdicionaPalavra() {
    trocaDePagina(pagPrincipal, pagAdicionaPalavra);
}

function funcSalvar() {
    trocaDePagina(pagAdicionaPalavra, pagJogo);
    // Salva a nova palavra num array()
}

function funcCancelar() {
    trocaDePagina(pagAdicionaPalavra, pagPrincipal);
    // Limpa o campo de texto()
}

function funcNovoJogo() {
    // Gera palavra aleatória no tabuleiro()
    geraPalavraAleatoria(palavraSecreta);
}

function funcDesistir() {
    trocaDePagina(pagJogo, pagPrincipal);
}