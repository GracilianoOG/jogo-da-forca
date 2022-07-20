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

document.addEventListener("keydown", verificaSeEhLetra);

// Tabuleiro
var tela = document.querySelector(".tabuleiro");
var pintura = tela.getContext("2d");
var listaPalavraSecreta = ["ALURA", "ORACLE", "JAVA", "JAVASCRIPT", "PYTHON", "SUN", "CAELUM", "HTML", "CSS"];
var palavrasPosicao = [];
var palavraSecreta = geraPalavraAleatoria(listaPalavraSecreta);

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

        // Em desenvolvimento
        // var tamFonte = linhaLargura + "px";
        // pintura.font = tamFonte + " arial";
        // pintura.fillText("A", linhaPosX, linhaPosY - 40); // + espaco / 1.5
        // Em desenvolvimento

        palavrasPosicao.push(linhaPosX);
        linhaPosX += linhaLargura + espaco;
    }
}

function desenhaTexto(letra, x, y) {
    pintura.font = "50px arial";
    pintura.fillText(letra, x, y);
}

// Palavra Secreta - Funções
function geraPalavraAleatoria(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function desenhaPalavraAleatoria(str) {
    var strTamanho = str.length;
    desenhaLinhas(tela, strTamanho);
    console.log("Palavra: " + str + " Tamanho: " + strTamanho);
}

function formataTexto(texto) {
    return texto.toUpperCase().trim();
}

function verificaLetra(letraDigitada) {
    var letra = formataTexto(letraDigitada);
    var achouLetra = false;

    for(var i = 0; i < palavraSecreta.length; i++) {
        if(letra == palavraSecreta[i]) {
            letraCorreta(letra, i);
            achouLetra = true;
        }
    }

    if(!achouLetra) letraIncorreta(letraDigitada);
}

function letraCorreta(letraDigitada, posicao) {
    desenhaTexto(letraDigitada, palavrasPosicao[posicao], 500);
}

function letraIncorreta(letraDigitada) {
    desenhaTexto(letraDigitada, 300, 750);
}

function verificaSeEhLetra(evento) {
    var codLetra = evento.which;

    if(codLetra >= 65 && codLetra <= 90) {
        verificaLetra(evento.key);
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
    desenhaPalavraAleatoria(palavraSecreta);
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
    desenhaPalavraAleatoria(palavraSecreta);
}

function funcDesistir() {
    trocaDePagina(pagJogo, pagPrincipal);
}