const API_URL = "https://random-word-api.herokuapp.com/word?length=5";
let word = "";
let guessedLetters = [];
let wrongAttempts = 0;
const maxAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const wrongGuesses = document.getElementById("wrong-guesses");
const keyboard = document.getElementById("keyboard");
const restartBtn = document.getElementById("restart");
const parts = document.querySelectorAll(".part");

async function getRandomWord() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        word = data[0].toUpperCase();
        displayWord();
    } catch (error) {
        word = "ERROR";
        displayWord();
    }
}

function displayWord() {
    wordDisplay.innerHTML = word.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongAttempts >= maxAttempts) return;

    if (word.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        wrongAttempts++;
        revealHangmanPart(wrongAttempts - 1);
    }

    updateGameState();
}

function revealHangmanPart(index) {
    if (parts[index]) {
        parts[index].style.display = "block";
    }
}

function updateGameState() {
    displayWord();
    wrongGuesses.innerText = `Wrong Attempts: ${wrongAttempts}/${maxAttempts}`;

    if (word.split("").every(letter => guessedLetters.includes(letter))) {
        alert("🎉 You Win!");
        restartBtn.style.display = "block";
    }

    if (wrongAttempts >= maxAttempts) {
        alert(`💀 You Lose! The word was: ${word}`);
        restartBtn.style.display = "block";
    }
}

function createKeyboard() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    keyboard.innerHTML = "";
    letters.forEach(letter => {
        const btn = document.createElement("button");
        btn.innerText = letter;
        btn.onclick = () => handleGuess(letter);
        keyboard.appendChild(btn);
    });
}

restartBtn.addEventListener("click", () => {
    guessedLetters = [];
    wrongAttempts = 0;
    parts.forEach(part => (part.style.display = "none"));
    restartBtn.style.display = "none";
    getRandomWord();
});

createKeyboard();
getRandomWord();
