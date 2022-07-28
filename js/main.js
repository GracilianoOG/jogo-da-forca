// Botões
const btnComecaJogo = document.querySelector("#botao-comeca-jogo");
const btnAdicionaPalavra = document.querySelector("#botao-adiciona-palavra");

const btnSalvar = document.querySelector("#botao-salvar");
const btnCancelar = document.querySelector("#botao-cancelar");

const btnNovoJogo = document.querySelector("#botao-novo-jogo");
const btnDesistir = document.querySelector("#botao-desistir");

// Páginas
const pagPrincipal = document.querySelector(".pagina-principal");
const pagAdicionaPalavra = document.querySelector(".pagina-adiciona-palavra");
const pagJogo = document.querySelector(".pagina-jogo");

// Eventos
btnComecaJogo.addEventListener("click", comecaJogo);
btnAdicionaPalavra.addEventListener("click", adicionaPalavra);

btnSalvar.addEventListener("click", salvar);
btnCancelar.addEventListener("click", cancelar);

btnNovoJogo.addEventListener("click", novoJogo);
btnDesistir.addEventListener("click", desistir);

document.addEventListener("keydown", validaCaractere);

// Tabuleiro
const tela = document.querySelector(".tabuleiro");
const pintura = tela.getContext("2d");
let listaPalavrasSecretas = ["ALURA", "ORACLE", "JAVA", "PYTHON", "SUN", "CAELUM", "HTML", "CSS", "CONSOLE", "LOG", "GUJ"];

let listaLetrasPosicaoX = [];
let letrasPosicaoY = 0;
let letrasTamanho = 0;
let listaLetrasDigitadas = [];
let palavraSecreta = "";
let distanciaLetra = tela.width / 3;
const maxErros = 6;
let erros = 0;
let acertos = 0;
let jogoRolando = false;

// Tabuleiro - Funções
function desenhaLinhas(canvas, quantidadeLinhas) {
    const tabuleiroLargura = canvas.width;
    const tabuleiroAltura = canvas.height;

    let listaPosicoes = [];

    // O espaço entre as linhas corresponde a 20% porcento da linha em si
    const espacoEntreLinhas = (tabuleiroLargura / quantidadeLinhas) * 0.2;

    // Calcula o tamanho da linha, descontando o espaço em branco
    const linhaLargura = (tabuleiroLargura / quantidadeLinhas) - espacoEntreLinhas;
    const linhaAltura = 5;
    let linhaPosX = espacoEntreLinhas / 2;
    const linhaPosY = Math.round((tabuleiroAltura / 1.2) - (linhaAltura / 1.2)); // Coloca o meio da linha no meio do tabuleiro
    letrasTamanho = linhaPosX + (linhaLargura / 3);
    letrasPosicaoY = linhaPosY - (linhaAltura * 2);

    pintura.clearRect(0, 0, tabuleiroLargura, tabuleiroAltura);

    for(let i = 0; i < quantidadeLinhas; i++) {
        pintura.fillStyle = "#0A3871";
        pintura.fillRect(linhaPosX, linhaPosY, linhaLargura, linhaAltura);

        listaPosicoes.push(linhaPosX + (linhaLargura / 3));
        linhaPosX += linhaLargura + espacoEntreLinhas;
    }

    return listaPosicoes;
}

function desenhaBaseDaForca() {
    pintura.strokeStyle = "#0A3871";
    pintura.lineWidth = 5;

    const tabuleiroLargura = tela.width;
    const tabuleiroAltura = tela.height;

    const umTercoTabuleiro = tabuleiroLargura / 3;
    const umQuartoDaBase = umTercoTabuleiro / 4;
    const tresQuartosDaBase = umQuartoDaBase * 3;
    const meioVerticalDaTela = tabuleiroAltura / 2;

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

    const tabuleiroLargura = tela.width;

    const umTercoTabuleiro = tabuleiroLargura / 3;
    const umQuartoDaBase = umTercoTabuleiro / 4;
    const tresQuartosDaBase = umQuartoDaBase * 3;

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
    listaLetrasDigitadas = [];
    palavraSecreta = geraPalavraAleatoria(listaPalavrasSecretas, palavraSecreta);
    distanciaLetra = tela.width / 3;
    erros = 0;
    acertos = 0;
    jogoRolando = true;
    listaLetrasPosicaoX = desenhaLinhas(tela, palavraSecreta.length);
    desenhaBaseDaForca();
    console.log("Palavra: " + palavraSecreta + " Tamanho: " + palavraSecreta.length);
}

function desenhaTexto(texto, tam, cor, x, y) {
    pintura.font = tam + "px Inter";
    pintura.fillStyle = cor;
    pintura.fillText(texto, x, y);
}

// Palavra Secreta - Funções
function geraPalavraAleatoria(lista, ultimaPalavra) {
    const tamanhoLista = lista.length;
    const posicaoAleatoria = Math.floor(Math.random() * tamanhoLista);
    if(lista[posicaoAleatoria] == ultimaPalavra)
        return posicaoAleatoria != 0 ? lista[posicaoAleatoria - 1] : lista[tamanhoLista - 1];
    return lista[posicaoAleatoria];
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

function validaCaractere(evento) {
    if(!pagJogo.classList.contains("invisivel") && jogoRolando) {
        const input = formataTexto(evento.key);

        if(input.length == 1) {
            const codLetra = input.charCodeAt(0);
            if(codLetra >= 65 && codLetra <= 90) {
                verificaLetra(palavraSecreta, input);
            }
        }
    }
}

function verificaLetra(palavra, letraDigitada) {
    
    if(!listaLetrasDigitadas.includes(letraDigitada)) listaLetrasDigitadas.push(letraDigitada); else return;
    
    let achouLetra = false;

    for(let i = 0; i < palavra.length; i++) {
        if(letraDigitada == palavra[i]) {
            acertos++;
            letraCorreta(letraDigitada, i);
            achouLetra = true;
        }
    }

    if(!achouLetra) {
        erros++;
        letraIncorreta(tela, letraDigitada);
    }

    verificaSituacaoDoJogo();
}

// Verifica o "placar" do jogo
function verificaSituacaoDoJogo() {
    if(perdeuJogo()) {perdeuJogoMensagem(); return;}
    if(venceuJogo()) {venceuJogoMensagem(); return;}
}

function perdeuJogo() {
    if(erros == maxErros) {
        return true;
    }
}

function perdeuJogoMensagem() {
    desenhaTexto("Você Perdeu!", 40, "#FF0000", 900, 250);
    jogoRolando = false;
}

function venceuJogo() {
    if(acertos == palavraSecreta.length) {
        return true;
    }
}

function venceuJogoMensagem() {
    desenhaTexto("Você Ganhou!", 40, "#00FF00", 900, 250);
    jogoRolando = false;
}

// Troca de "página" com javascript
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