const MIN_CHARACTERS = 2;
const MAX_CHARACTERS = 8;

function isWordLengthValid(word) {
    if(word.length === 0) {
        return false;
    } else if(word.length < MIN_CHARACTERS) {
        return false;
    } else if (word.length > MAX_CHARACTERS) {
        return false;
    }
    return true;
}

function isWordValid(word) { return (word.match(/^[A-Z]+$/)) ? true : false; }

function isWordRepeated(list, word) { return (list.includes(word)) ? true : false; }

function isLetterValid(character) {
    return (character.match(/^[A-Z]$/)) ? true : false;
}

function checkLetterOccurrences(letter, word) {
    const occurrences = [];
    for(let i = 0; i < word.length; i++) {
        if(letter === word[i]) {
            occurrences.push(i);
        }
    }
    return occurrences;
}

export const validation = {
    MIN_CHARACTERS,
    MAX_CHARACTERS,
    isWordLengthValid,
    isWordValid,
    isWordRepeated,
    isLetterValid,
    checkLetterOccurrences
}