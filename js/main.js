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
var listaPalavrasSecretas = ["ALURA", "ORACLE", "JAVA", "PYTHON", "SUN", "CAELUM", "HTML", "CSS", "CONSOLE", "LOG", "GUJ"];

var listaLetrasPosicaoX = [];
var letrasPosicaoY = "";
var letrasTamanho = "";
var listaLetrasDigitadas = [];
var palavraSecreta = "";
var distanciaLetra = tela.width / 3;
const maxErros = 9;

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
    palavraSecreta = geraPalavraAleatoria(listaPalavrasSecretas, palavraSecreta);
    distanciaLetra = tela.width / 3;
    desenhaPalavra(palavraSecreta);
}

function desenhaTexto(letra, tam, cor, x, y) {
    pintura.font = tam + "px arial";
    pintura.fillStyle = cor;
    pintura.fillText(letra, x, y);
}

// Palavra Secreta - Funções
function geraPalavraAleatoria(lista, ultimaPalavra) {
    var posicaoAleatoria = Math.floor(Math.random() * lista.length);
    if(lista[posicaoAleatoria] == ultimaPalavra)
        return posicaoAleatoria != 0 ? lista[posicaoAleatoria - 1] : lista.slice(-1);
    return lista[posicaoAleatoria];
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

function letraIncorreta(canvas, letraDigitada) {
    desenhaTexto(letraDigitada, 60, "#495057", distanciaLetra, letrasPosicaoY + 100);
    distanciaLetra += (canvas.width / 3) / maxErros;
}

function verificaSeEhLetra(evento) {
    var input = formataTexto(evento.key);
    var codLetra = 0;

    if(input.length == 1) {
        codLetra = input.charCodeAt(0);
        if(codLetra >= 65 && codLetra <= 90) {
            verificaLetraDigitada(palavraSecreta, input);
        }
    }
}

function verificaLetraDigitada(palavra, letraDigitada) {
    var achouLetra = false;

    if(!listaLetrasDigitadas.includes(letraDigitada)) listaLetrasDigitadas.push(letraDigitada); else return;

    for(var i = 0; i < palavra.length; i++) {
        if(letraDigitada == palavra[i]) {
            letraCorreta(letraDigitada, i);
            achouLetra = true;
        }
    }

    if(!achouLetra) letraIncorreta(tela, letraDigitada);
}

//Funções
function trocaDePagina(pagAntiga, pagNova) {
    pagAntiga.classList.add("invisivel");
    pagNova.classList.remove("invisivel");
}

// Botões - Funções
function comecaJogo() {
    trocaDePagina(pagPrincipal, pagJogo);
    criaNovoJogo();
}

function adicionaPalavra() {
    trocaDePagina(pagPrincipal, pagAdicionaPalavra);
}

function salvar() {
    trocaDePagina(pagAdicionaPalavra, pagJogo);
    criaNovoJogo();
    // Salva a nova palavra num array()
}

function cancelar() {
    trocaDePagina(pagAdicionaPalavra, pagPrincipal);
    // Limpa o campo de texto()
}

function novoJogo() {
    criaNovoJogo();
}

function desistir() {
    trocaDePagina(pagJogo, pagPrincipal);
}