import { hangman as hm } from "./hangman.js";
import { utility as util } from "./utility.js";
import { validation as val } from "./validation.js";

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
    util.switchPage(pagMain, pagGameScreen);
    createNewGame();
});
btnAddWord.addEventListener("click", () => {
    util.switchPage(pagMain, pagAddWord);
    util.clearTextField(fieldAddWord);
});

btnSaveWord.addEventListener("click", () => {
    validateWord(secretWords, util.formatText(fieldAddWord.value));
    util.clearTextField(fieldAddWord);
});
btnCancel.addEventListener("click", () => util.switchPage(pagAddWord, pagMain));

btnNewGame.addEventListener("click", createNewGame);
btnGiveUp.addEventListener("click", () => util.switchPage(pagGameScreen, pagMain));

document.addEventListener("keydown", validateCharacter);

// Tabuleiro
const gameBoard = document.querySelector(".tabuleiro");
const gameScreen = gameBoard.getContext("2d");
let secretWords = ["ALURA", "ORACLE", "JAVA", "PYTHON", "SUN", "CAELUM", "HTML", "CSS", "CONSOLE", "LOG", "GUJ", "RUBY", "REACT", "NODEJS", "LINUX", "WINDOWS", "MAC", "APPLE", "CODE", "NPM"];

let listaLetrasPosicaoX = [];
let letrasPosicaoY = 0;
let letrasTamanho = 0;
let typedLettersList = [];
let secretWord = "";
let distanciaLetra = gameBoard.width / 3;
const maxErros = 6;
let misses = 0;
let guesses = 0;
let isGameRunning = false;

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
    typedLettersList = [];
    secretWord = util.chooseRandomWord(secretWords, secretWord);
    distanciaLetra = gameBoard.width / 3;
    misses = 0;
    guesses = 0;
    isGameRunning = true;
    listaLetrasPosicaoX = drawWordLettersLines(gameBoard, secretWord.length);
    hm.drawGibbetBase(gameBoard);
}

function validateCharacter(event) {
    const letter = util.formatText(event.key);
    const isLetterValidated = !val.isLetterValid(letter) || typedLettersList.includes(letter);
    const isGameValidated = pagGameScreen.classList.contains("invisivel") || !isGameRunning;
    
    if(isLetterValidated || isGameValidated) { return; }

    const listOccurrences = val.checkLetterOccurrences(letter, secretWord);
    const occurencesLength = listOccurrences.length;
    typedLettersList.push(letter);

    if(occurencesLength != 0) {
        guesses += occurencesLength;
        showCorrectLetters(letter, listOccurrences);
    } else {
        misses++;
        showIncorrectLetter(gameBoard, letter);
    }
    checkScoreboard();
}

function validateWord(list, word) {
    if(val.isWordLengthValid(word) && val.isWordValid(word) && !val.isWordRepeated(list, word)) {
        util.addWord(list, word);
    } else {
        alert("Palavra inválida!");
    }
}

function checkScoreboard() {
    if((misses === maxErros) || (guesses === secretWord.length)) {
        const resultText = (misses === maxErros ? "Você perdeu!" : "Você ganhou!");
        const resultColor = resultText === "Você perdeu!" ? "#FF0000" : "#00FF00";
        util.drawText(gameScreen, resultText, 40, resultColor, 900, 250);
        isGameRunning = false;
    }
}

function showCorrectLetter(letraDigitada, posicao) {
    util.drawText(gameScreen, letraDigitada, letrasTamanho, "#0A3871", listaLetrasPosicaoX[posicao], letrasPosicaoY);
}

function showCorrectLetters(letter, positions) {
    for(let position of positions) { showCorrectLetter(letter, position); }
}

function showIncorrectLetter(canvas, letraDigitada) {
    util.drawText(gameScreen, letraDigitada, 60, "#495057", distanciaLetra, letrasPosicaoY + 100);
    distanciaLetra += (canvas.width / 3) / maxErros;
    hm.drawHangingMan(gameBoard, misses);
}