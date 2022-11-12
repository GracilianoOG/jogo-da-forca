import { hangman as hm } from "./hangman.js";
import { utility as util } from "./utility.js";
import { validation as val } from "./validation.js";
import { board as b } from "./board.js";

const pagMain = document.querySelector(".pagina-principal");
const btnStartGame = document.querySelector("#botao-comeca-jogo");
const btnAddWord = document.querySelector("#botao-adiciona-palavra");

btnStartGame.addEventListener("click", () => {
    util.switchPage(pagMain, pagGameScreen);
    createNewGame();
});
btnAddWord.addEventListener("click", () => {
    util.switchPage(pagMain, pagAddWord);
    util.clearTextField(fieldAddWord);
});

const pagAddWord = document.querySelector(".pagina-adiciona-palavra");
const fieldAddWord = document.querySelector("#campo-adiciona-palavra");
const btnSaveWord = document.querySelector("#botao-salvar");
const btnCancel = document.querySelector("#botao-cancelar");

btnSaveWord.addEventListener("click", () => {
    validateWord(secretWords, util.formatText(fieldAddWord.value));
    util.clearTextField(fieldAddWord);
});
btnCancel.addEventListener("click", () => util.switchPage(pagAddWord, pagMain));

const pagGameScreen = document.querySelector(".pagina-jogo");
const btnNewGame = document.querySelector("#botao-novo-jogo");
const btnGiveUp = document.querySelector("#botao-desistir");

btnNewGame.addEventListener("click", createNewGame);
btnGiveUp.addEventListener("click", () => util.switchPage(pagGameScreen, pagMain));

document.addEventListener("keydown", validateCharacter);

const gameBoard = document.querySelector(".tabuleiro");
const gameScreen = gameBoard.getContext("2d");

let secretWords = [
    "ALURA", "ORACLE", "JAVA", "PYTHON", "SUN", 
    "CAELUM", "HTML", "CSS", "CONSOLE", "LOG", "GUJ", 
    "RUBY", "REACT", "NODEJS", "LINUX", "WINDOWS", 
    "MAC", "APPLE", "CODE", "NPM"
];

const player = {
    misses: 0,
    guesses: 0,
    MAX_MISSES: 6,
    isLoser() { return this.misses === this.MAX_MISSES; },
    isWinner(score) { return this.guesses === score; }
}

let typedLettersList = [];
let secretWord = "";
let isGameRunning = false;

function createNewGame() {
    typedLettersList = [];
    secretWord = util.chooseRandomWord(secretWords, secretWord);
    b.letterConfig.distance = gameBoard.width / 3;
    player.misses = 0;
    player.guesses = 0;
    isGameRunning = true;
    b.letterDistance = gameBoard.width / 3;
    b.letterConfig.PosX = b.drawWordLettersLines(gameBoard, secretWord.length);
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
        player.guesses += occurencesLength;
        showCorrectLetters(letter, listOccurrences);
    } else {
        player.misses++;
        showIncorrectLetter(letter);
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
    if(player.isLoser() || player.isWinner(secretWord.length)) {
        const resultText = (player.isLoser() ? "Você perdeu!" : "Você ganhou!");
        const resultColor = resultText === "Você perdeu!" ? util.colors.error : util.colors.correct;
        util.drawText(gameScreen, resultText, 40, resultColor, 900, 250);
        isGameRunning = false;
    }
}

function showCorrectLetter(letter, position) {
    util.drawText(gameScreen, letter, b.letterConfig.size, util.colors.primary, b.letterConfig.PosX[position], b.letterConfig.PosY);
}

function showCorrectLetters(letter, positions) {
    for(let position of positions) { showCorrectLetter(letter, position); }
}

function showIncorrectLetter(letter) {
    util.drawText(gameScreen, letter, 60, util.colors.secondary, b.letterConfig.distance, b.letterConfig.PosY + 100);
    b.letterConfig.distance += (gameBoard.width / 3) / player.MAX_MISSES;
    hm.drawHangingMan(gameBoard, player.misses);
}