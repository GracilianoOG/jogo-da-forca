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

function chooseRandomWord(lista, ultimaPalavraSorteada) {
    const tamanhoLista = lista.length;
    const posicaoAleatoria = Math.floor(Math.random() * tamanhoLista);
    if(lista[posicaoAleatoria] == ultimaPalavraSorteada)
        return posicaoAleatoria != 0 ? lista[posicaoAleatoria - 1] : lista[tamanhoLista - 1];
    return lista[posicaoAleatoria];
}

function clearTextField(field) { field.value = ""; }

function formatText(text) { return text.toUpperCase().trim(); }

function addWord(list, word) { list.push(formatText(word)); }

export const utility = {
    switchPage,
    drawText,
    chooseRandomWord,
    clearTextField,
    formatText,
    addWord
}