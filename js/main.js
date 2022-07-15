console.log("Script do jogo da forca carregado.");

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

//Funções
function trocaDePagina(pagAntiga, pagNova) {
    pagAntiga.classList.add("invisivel");
    pagNova.classList.remove("invisivel");
}

// Funções dos botões
function funcComecaJogo() {
    trocaDePagina(pagPrincipal, pagJogo);
    // Gera palavra aleatória no tabuleiro()
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
}

function funcDesistir() {
    trocaDePagina(pagJogo, pagPrincipal);
}