// Troca de "página" com javascript
function switchPage(pagAntiga, pagNova) {
    pagAntiga.classList.add("invisivel");
    pagNova.classList.remove("invisivel");
}

function drawText(canvasContext, text, size, color, x, y) {
    canvasContext.font = size + "px Inter";
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
}

export const utility = {
    switchPage,
    drawText
}