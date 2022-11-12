import { utility as util } from "./utility.js";

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
    canvasContext.strokeStyle = util.colors.primary;
    canvasContext.lineWidth = 5;

    const oneThirdBoard = canvas.width / 3;
    const aQuarterOfBase = oneThirdBoard / 4;
    const threeQuartersOfBase = aQuarterOfBase * 3;
    const verticalMiddleScreen = canvas.height / 2;

    drawLine(canvas, [oneThirdBoard, verticalMiddleScreen], [oneThirdBoard * 2, verticalMiddleScreen]); // Base
    drawLine(canvas, [oneThirdBoard + aQuarterOfBase, 0], [oneThirdBoard + aQuarterOfBase, verticalMiddleScreen]); // Apoio
    drawLine(canvas, [oneThirdBoard + aQuarterOfBase, 3], [oneThirdBoard + threeQuartersOfBase, 3]); // Apoio Corda
    drawLine(canvas, [oneThirdBoard + threeQuartersOfBase, 0], [oneThirdBoard + threeQuartersOfBase, 60]); // Corda
}

function drawHangingMan(canvas, errors) {
    const canvasContext = canvas.getContext("2d");
    canvasContext.strokeStyle = util.colors.highlight;
    canvasContext.lineWidth = 5;

    const oneThirdBoard = canvas.width / 3;
    const aQuarterOfBase = oneThirdBoard / 4;
    const threeQuartersOfBase = aQuarterOfBase * 3;

    const coords = {
        0: () => { drawCircle(canvas, oneThirdBoard + threeQuartersOfBase, 100, 40) }, // Cabeça
        1: () => { drawLine(canvas, [oneThirdBoard + threeQuartersOfBase, 140], [oneThirdBoard + threeQuartersOfBase, 290]) }, // Tronco
        2: () => { drawLine(canvas, [oneThirdBoard + threeQuartersOfBase, 290], [(oneThirdBoard - 45) + threeQuartersOfBase, 360]) }, // Perna E.
        3: () => { drawLine(canvas, [oneThirdBoard + threeQuartersOfBase, 290], [(oneThirdBoard + 45) + threeQuartersOfBase, 360]) }, // Perna D.
        4: () => { drawLine(canvas, [oneThirdBoard + threeQuartersOfBase, 150], [(oneThirdBoard - 45) + threeQuartersOfBase, 250]) }, // Braço E.
        5: () => { drawLine(canvas, [oneThirdBoard + threeQuartersOfBase, 150], [(oneThirdBoard + 45) + threeQuartersOfBase, 250]) } // Braço D.
    };
    coords[errors - 1]();
}

export const hangman = {
    drawGibbetBase,
    drawHangingMan
}