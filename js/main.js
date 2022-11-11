import { hangman } from "./hangman.js";
import { utility } from "./utility.js";

// Botões
const btnStartGame = document.querySelector("#botao-comeca-jogo");
const btnAddWord = document.querySelector("#botao-adiciona-palavra");

const btnSaveWord = document.querySelector("#botao-salvar");
const btnCancel = document.querySelector("#botao-cancelar");

const btnNewGame = document.querySelector("#botao-novo-jogo");
const btnGiveUp = document.querySelector("#botao-desistir");

const fieldAddWord = document.querySelector("#campo-adiciona-palavra");

// Páginas
const pagMain = document.querySelector(".pagina-principal");
const pagAddWord = document.querySelector(".pagina-adiciona-palavra");
const pagGameScreen = document.querySelector(".pagina-jogo");

// Eventos dos botões
btnStartGame.addEventListener("click", () => {
    utility.switchPage(pagMain, pagGameScreen);
    createNewGame();
});
btnAddWord.addEventListener("click", () => {
    utility.switchPage(pagMain, pagAddWord);
    clearField(fieldAddWord);
});

btnSaveWord.addEventListener("click", () => {
    verifyWordLength(formatText(fieldAddWord.value));
    clearField(fieldAddWord);
});
btnCancel.addEventListener("click", () => utility.switchPage(pagAddWord, pagMain));

btnNewGame.addEventListener("click", createNewGame);
btnGiveUp.addEventListener("click", () => utility.switchPage(pagGameScreen, pagMain));

document.addEventListener("keydown", validaCaractere);

// Tabuleiro
const gameBoard = document.querySelector(".tabuleiro");
const gameScreen = gameBoard.getContext("2d");
let secretWords = ["ALURA", "ORACLE", "JAVA", "PYTHON", "SUN", "CAELUM", "HTML", "CSS", "CONSOLE", "LOG", "GUJ", "RUBY", "REACT", "NODEJS", "LINUX", "WINDOWS", "MAC", "APPLE", "CODE"];

let listaLetrasPosicaoX = [];
let letrasPosicaoY = 0;
let letrasTamanho = 0;
let listaLetrasDigitadas = [];
let palavraSecreta = "";
let distanciaLetra = gameBoard.width / 3;
const maxErros = 6;
const minCaracteres = 2;
const maxCaracteres = 8;
let erros = 0;
let acertos = 0;
let isMatch = false;

// Tabuleiro - Funções
function drawWordLettersLines(canvas, qtdLines) {
    const boardWidth = canvas.width;
    const boardHeight = canvas.height;

    let coordList = [];

    // O espaço entre as linhas corresponde a 20% porcento da linha em si
    const spaceBetweenLines = (boardWidth / qtdLines) * 0.2;

    // Calcula o tamanho da linha, descontando o espaço em branco
    const lineWidth = (boardWidth / qtdLines) - spaceBetweenLines;
    const lineHeight = 5;
    let lineHorizontalPos = spaceBetweenLines / 2;
    const lineVerticalPos = Math.round((boardHeight / 1.2) - (lineHeight / 1.2)); // Coloca o meio da linha no meio do tabuleiro
    letrasTamanho = lineHorizontalPos + (lineWidth / 3);
    letrasPosicaoY = lineVerticalPos - (lineHeight * 2);

    gameScreen.clearRect(0, 0, boardWidth, boardHeight);

    for(let i = 0; i < qtdLines; i++) {
        gameScreen.fillStyle = "#0A3871";
        gameScreen.fillRect(lineHorizontalPos, lineVerticalPos, lineWidth, lineHeight);

        coordList.push(lineHorizontalPos + (lineWidth / 3));
        lineHorizontalPos += lineWidth + spaceBetweenLines;
    }
    return coordList;
}

function createNewGame() {
    listaLetrasDigitadas = [];
    palavraSecreta = chooseRandomWord(secretWords, palavraSecreta);
    distanciaLetra = gameBoard.width / 3;
    erros = 0;
    acertos = 0;
    isMatch = true;
    listaLetrasPosicaoX = drawWordLettersLines(gameBoard, palavraSecreta.length);
    hangman.drawGibbetBase(gameBoard);
}

// Palavra Secreta - Funções
function chooseRandomWord(lista, ultimaPalavraSorteada) {
    const tamanhoLista = lista.length;
    const posicaoAleatoria = Math.floor(Math.random() * tamanhoLista);
    if(lista[posicaoAleatoria] == ultimaPalavraSorteada)
        return posicaoAleatoria != 0 ? lista[posicaoAleatoria - 1] : lista[tamanhoLista - 1];
    return lista[posicaoAleatoria];
}

function formatText(texto) {
    return texto.toUpperCase().trim();
}

function showCorretLetter(letraDigitada, posicao) {
    utility.drawText(gameScreen, letraDigitada, letrasTamanho, "#0A3871", listaLetrasPosicaoX[posicao], letrasPosicaoY);
}

function showIncorretLetter(canvas, letraDigitada) {
    utility.drawText(gameScreen, letraDigitada, 60, "#495057", distanciaLetra, letrasPosicaoY + 100);
    distanciaLetra += (canvas.width / 3) / maxErros;
    hangman.drawHangingMan(gameBoard, erros);
}

function validaCaractere(evento) {
    if(!pagGameScreen.classList.contains("invisivel") && isMatch) {
        const input = formatText(evento.key);
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
            showCorretLetter(letraDigitada, i);
            achouLetra = true;
        }
    }

    if(!achouLetra) {
        erros++;
        showIncorretLetter(gameBoard, letraDigitada);
    }

    checkScoreboard();
}

// Verifica o "placar" do jogo
function checkScoreboard() {
    if(erros === maxErros || acertos === palavraSecreta.length) {
        const resultText = (erros === maxErros ? "Você perdeu!" : "Você ganhou!");
        utility.drawText(gameScreen, resultText, 40, "#FF0000", 900, 250);
        isMatch = false;
    }
}

// Funções do campo de texto
function clearField(campo) {
    campo.value = "";
}

function addWord(lista, novaPalavra) {
    lista.push(formatText(novaPalavra));
}

function verifyWordLength(palavra) {
    if(palavra.length == 0) {
        alert("Por favor, insira uma palavra!");
        return;
    } else if(palavra.length < minCaracteres) {
        alert("Palavra inserida é pequena demais! Precisa haver no mínimo " + minCaracteres + " letras!");
        return;
    } else if (palavra.length > maxCaracteres) {
        alert("Palavra inserida é grande demais! Precisa haver no máximo " + maxCaracteres + " letras!");
        return;
    }
    validateWord(formatText(fieldAddWord.value));
}

function validateWord(palavra) {
    for(let i = 0; i < palavra.length; i++) {
        let letra = palavra[i];
        let codLetra = letra.charCodeAt(0);
        if(!(codLetra >= 65 && codLetra <= 90)) {
            alert("Palavra inserida contém caractere(s) inválido(s)!");
            return;
        }
    }
    checkForRepeatedWord(secretWords, palavra);
}

function checkForRepeatedWord(lista, palavra) {
    if(!lista.includes(palavra)) {
        addWord(lista, palavra);
        return;
    }
    alert("Palavra inserida é repetida!");
}