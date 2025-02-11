const API_URL = "https://random-word-api.herokuapp.com/word?length=5";
let word = "";
let guessedLetters = [];
let wrongAttempts = 0;
const maxAttempts = 6;

// Select elements
const wordDisplay = document.getElementById("word-display");
const wrongGuesses = document.getElementById("wrong-guesses");
const keyboard = document.getElementById("keyboard");
const restartBtn = document.getElementById("restart");
const parts = document.querySelectorAll(".part");

// Fetch a random word
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

// Display the hidden word
function displayWord() {
    wordDisplay.innerHTML = word.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
}

// Handle letter guesses
function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongAttempts >= maxAttempts) return;

    if (word.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        wrongAttempts++;
        parts[wrongAttempts - 1].style.display = "block";
    }

    updateGameState();
}

// Update UI
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

// Create on-screen keyboard
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

// Restart game
restartBtn.addEventListener("click", () => {
    guessedLetters = [];
    wrongAttempts = 0;
    parts.forEach(part => (part.style.display = "none"));
    restartBtn.style.display = "none";
    getRandomWord();
});

// Initialize game
createKeyboard();
getRandomWord();
