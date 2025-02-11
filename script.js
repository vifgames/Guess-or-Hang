const API_URL = "https://api.api-ninjas.com/v1/randomword";
const API_KEY = "YOUR_API_KEY"; // Get a free API key from api-ninjas.com

let word = "";
let guessedLetters = [];
let wrongAttempts = 0;
const maxAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const wrongGuesses = document.getElementById("wrong-guesses");
const keyboard = document.getElementById("keyboard");
const restartBtn = document.getElementById("restart");
const hintBtn = document.getElementById("hint-btn");
const themeBtn = document.getElementById("theme-btn");
const parts = document.querySelectorAll(".part");

async function getRandomWord() {
    try {
        const response = await fetch(API_URL, {
            headers: { "X-Api-Key": API_KEY }
        });
        const data = await response.json();
        word = data.word.toUpperCase();
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

function getHint() {
    if (wrongAttempts >= maxAttempts) return;
    let remainingLetters = word.split("").filter(l => !guessedLetters.includes(l));
    if (remainingLetters.length > 0) {
        handleGuess(remainingLetters[0]); // Reveal a letter
    }
}

function updateGameState() {
    displayWord();
    wrongGuesses.innerText = `Wrong Attempts: ${wrongAttempts}/${maxAttempts}`;

    if (word.split("").every(letter => guessedLetters.includes(letter))) {
        alert("🎉 You Win!");
    }

    if (wrongAttempts >= maxAttempts) {
        alert(`💀 You Lose! The word was: ${word}`);
    }
}

hintBtn.addEventListener("click", getHint);
themeBtn.addEventListener("click", () => document.documentElement.classList.toggle("dark"));

createKeyboard();
getRandomWord();
