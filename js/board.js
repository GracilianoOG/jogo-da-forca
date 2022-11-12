import { utility as util } from "./utility.js";

const letterConfig = {
    PosX: [],
    PosY: 0,
    distance: 0,
    size: 0
}

function drawWordLettersLines(canvas, qtdLines) {
    const boardWidth = canvas.width;
    const boardHeight = canvas.height;
    const gameScreen = canvas.getContext("2d");

    let coordList = [];

    // O espaço entre as linhas corresponde a 20% porcento da linha em si
    const spaceBetweenLines = (boardWidth / qtdLines) * 0.2;

    // Calcula o tamanho da linha, descontando o espaço em branco
    const lineWidth = (boardWidth / qtdLines) - spaceBetweenLines;
    const lineHeight = 5;
    let lineHorizontalPos = spaceBetweenLines / 2;
    const lineVerticalPos = Math.round((boardHeight / 1.2) - (lineHeight / 1.2)); // Coloca o meio da linha no meio do tabuleiro
    letterConfig.size = lineHorizontalPos + (lineWidth / 3);
    letterConfig.PosY = lineVerticalPos - (lineHeight * 2);

    gameScreen.clearRect(0, 0, boardWidth, boardHeight);

    for(let i = 0; i < qtdLines; i++) {
        gameScreen.fillStyle = util.colors.primary;
        gameScreen.fillRect(lineHorizontalPos, lineVerticalPos, lineWidth, lineHeight);

        coordList.push(lineHorizontalPos + (lineWidth / 3));
        lineHorizontalPos += lineWidth + spaceBetweenLines;
    }
    return coordList;
}

export const board = {
    letterConfig,
    drawWordLettersLines
}