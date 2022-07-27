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
const maxErros = 6;
var erros = 0;

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

function desenhaBaseDaForca() {
    pintura.strokeStyle = "#0A3871";
    pintura.lineWidth = 5;

    var tabuleiroLargura = tela.width;
    var tabuleiroAltura = tela.height;

    var umTercoTabuleiro = tabuleiroLargura / 3;
    var umQuartoDaBase = umTercoTabuleiro / 4;
    var tresQuartosDaBase = umQuartoDaBase * 3;
    var meioVerticalDaTela = tabuleiroAltura / 2;

    // Base Principal
    pintura.beginPath();
    pintura.moveTo(umTercoTabuleiro, meioVerticalDaTela);
    pintura.lineTo(umTercoTabuleiro * 2, meioVerticalDaTela);
    pintura.stroke();

    // Apoio
    pintura.beginPath();
    pintura.moveTo(umTercoTabuleiro + umQuartoDaBase, 0);
    pintura.lineTo(umTercoTabuleiro + umQuartoDaBase, meioVerticalDaTela);
    pintura.stroke();

    // Apoio Corda
    pintura.beginPath();
    pintura.moveTo(umTercoTabuleiro + umQuartoDaBase, 3);
    pintura.lineTo(umTercoTabuleiro + tresQuartosDaBase, 3);
    pintura.stroke();

    // Corda
    pintura.beginPath();
    pintura.moveTo(umTercoTabuleiro + tresQuartosDaBase, 0);
    pintura.lineTo(umTercoTabuleiro + tresQuartosDaBase, 60);
    pintura.stroke();
}

function desenhaForca() {
    pintura.strokeStyle = "#609ED4";
    pintura.lineWidth = 5;

    var tabuleiroLargura = tela.width;

    var umTercoTabuleiro = tabuleiroLargura / 3;
    var umQuartoDaBase = umTercoTabuleiro / 4;
    var tresQuartosDaBase = umQuartoDaBase * 3;

    switch(erros) {
        // Cabeça
        case 1:
        pintura.beginPath();
        pintura.arc(umTercoTabuleiro + tresQuartosDaBase, 100, 40, 0, 2 * Math.PI);
        pintura.stroke();
        break;

        // Tronco
        case 2:
        pintura.beginPath();
        pintura.moveTo(umTercoTabuleiro + tresQuartosDaBase, 140);
        pintura.lineTo(umTercoTabuleiro + tresQuartosDaBase, 290);
        pintura.stroke();
        break;

        // Perna esquerda
        case 3:
        pintura.beginPath();
        pintura.moveTo(umTercoTabuleiro + tresQuartosDaBase, 290);
        pintura.lineTo((umTercoTabuleiro - 45) + tresQuartosDaBase, 360);
        pintura.stroke();
        break;

        // Perna direita
        case 4:
        pintura.beginPath();
        pintura.moveTo(umTercoTabuleiro + tresQuartosDaBase, 290);
        pintura.lineTo((umTercoTabuleiro + 45) + tresQuartosDaBase, 360);
        pintura.stroke();
        break;

        // Braço esquerdo
        case 5:
        pintura.beginPath();
        pintura.moveTo(umTercoTabuleiro + tresQuartosDaBase, 150);
        pintura.lineTo((umTercoTabuleiro - 45) + tresQuartosDaBase, 250);
        pintura.stroke();
        break;

        // Braço direito
        case 6:
        pintura.beginPath();
        pintura.moveTo(umTercoTabuleiro + tresQuartosDaBase, 150);
        pintura.lineTo((umTercoTabuleiro + 45) + tresQuartosDaBase, 250);
        pintura.stroke();
        break;
    }
}

function criaNovoJogo() {
    listaLetrasPosicaoX = [];
    listaLetrasDigitadas = [];
    palavraSecreta = geraPalavraAleatoria(listaPalavrasSecretas, palavraSecreta);
    distanciaLetra = tela.width / 3;
    erros = 0;
    desenhaPalavra(palavraSecreta);
    desenhaBaseDaForca();
}

function desenhaTexto(letra, tam, cor, x, y) {
    pintura.font = tam + "px Inter";
    pintura.fillStyle = cor;
    pintura.fillText(letra, x, y);
}

// Palavra Secreta - Funções
function geraPalavraAleatoria(lista, ultimaPalavra) {
    var tamanhoLista = lista.length;
    var posicaoAleatoria = Math.floor(Math.random() * tamanhoLista);
    if(lista[posicaoAleatoria] == ultimaPalavra)
        return posicaoAleatoria != 0 ? lista[posicaoAleatoria - 1] : lista[tamanhoLista - 1];
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
    desenhaForca();
}

function verificaSeEhLetra(evento) {
    if(!pagJogo.classList.contains("invisivel") && !(erros == maxErros)) {
        var input = formataTexto(evento.key);
        var codLetra = 0;

        if(input.length == 1) {
            codLetra = input.charCodeAt(0);
            if(codLetra >= 65 && codLetra <= 90) {
                verificaLetraDigitada(palavraSecreta, input);
            }
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

    if(!achouLetra) {
        erros++;
        letraIncorreta(tela, letraDigitada);
    }
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