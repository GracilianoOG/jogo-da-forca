function drawCircle(canvas, xCoord, yCoord, radius) {
    const gameScreen = canvas.getContext("2d");
    gameScreen.beginPath();
    gameScreen.arc(xCoord, yCoord, radius, 0, 2 * Math.PI);
    gameScreen.stroke();
}

function drawLine(canvas, moveToCoords, lineToCoords) {
    const gameScreen = canvas.getContext("2d");
    gameScreen.beginPath();
    gameScreen.moveTo(moveToCoords[0], moveToCoords[1]);
    gameScreen.lineTo(lineToCoords[0], lineToCoords[1]);
    gameScreen.stroke();
}

function drawGibbetBase(canvas) {
    const canvasContext = canvas.getContext("2d");
    canvasContext.strokeStyle = "#0A3871";
    canvasContext.lineWidth = 5;

    const umTercoTabuleiro = canvas.width / 3;
    const umQuartoDaBase = umTercoTabuleiro / 4;
    const tresQuartosDaBase = umQuartoDaBase * 3;
    const meioVerticalDaTela = canvas.height / 2;

    drawLine(canvas, [umTercoTabuleiro, meioVerticalDaTela], [umTercoTabuleiro * 2, meioVerticalDaTela]); // Base
    drawLine(canvas, [umTercoTabuleiro + umQuartoDaBase, 0], [umTercoTabuleiro + umQuartoDaBase, meioVerticalDaTela]); // Apoio
    drawLine(canvas, [umTercoTabuleiro + umQuartoDaBase, 3], [umTercoTabuleiro + tresQuartosDaBase, 3]); // Apoio Corda
    drawLine(canvas, [umTercoTabuleiro + tresQuartosDaBase, 0], [umTercoTabuleiro + tresQuartosDaBase, 60]); // Corda
}

function drawHangingMan(canvas, erros) {
    const canvasContext = canvas.getContext("2d");
    canvasContext.strokeStyle = "#609ED4";
    canvasContext.lineWidth = 5;

    const umTercoTabuleiro = canvas.width / 3;
    const umQuartoDaBase = umTercoTabuleiro / 4;
    const tresQuartosDaBase = umQuartoDaBase * 3;

    const coords = {
        0: () => { drawCircle(canvas, umTercoTabuleiro + tresQuartosDaBase, 100, 40) }, // Cabeça
        1: () => { drawLine(canvas, [umTercoTabuleiro + tresQuartosDaBase, 140], [umTercoTabuleiro + tresQuartosDaBase, 290]) }, // Tronco
        2: () => { drawLine(canvas, [umTercoTabuleiro + tresQuartosDaBase, 290], [(umTercoTabuleiro - 45) + tresQuartosDaBase, 360]) }, // Perna E.
        3: () => { drawLine(canvas, [umTercoTabuleiro + tresQuartosDaBase, 290], [(umTercoTabuleiro + 45) + tresQuartosDaBase, 360]) }, // Perna D.
        4: () => { drawLine(canvas, [umTercoTabuleiro + tresQuartosDaBase, 150], [(umTercoTabuleiro - 45) + tresQuartosDaBase, 250]) }, // Braço E.
        5: () => { drawLine(canvas, [umTercoTabuleiro + tresQuartosDaBase, 150], [(umTercoTabuleiro + 45) + tresQuartosDaBase, 250]) } // Braço D.
    };
    coords[erros - 1]();
}

export const hangman = {
    drawGibbetBase,
    drawHangingMan
}