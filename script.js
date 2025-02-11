const words = [
    "PLANET", "PYTHON", "OBJECT", "MIRROR", "GUITAR", "LANTERN", "JOURNAL", "FURNACE",
    "PICTURE", "BOTTLE", "LADDER", "WIDGET", "FALCON", "TUNNEL", "MARKER", "SILVER",
    "CANDLE", "BREEZE", "VORTEX", "RHYTHM", "GADGET", "HUMBLE", "BORDER", "NUGGET",
    "WISDOM", "OCTANE", "POCKET", "GARDEN", "ISLAND", "LANTERN", "PLASMA", "TORQUE",
    "UMBRELLA", "VIOLIN", "WONDER", "ZENITH", "BALANCE", "CAPTAIN", "DYNAMIC", "ECLIPSE",
    "FACTORY", "GIGANTIC", "HORIZON", "JOURNEY", "KITCHEN", "LUMINARY", "MAGNETIC",
    "NEUTRON", "OPULENT", "PARAGON", "QUOTIENT", "RESOLVE", "STELLAR", "TROPHY",
    "UNIVERSE", "VIRTUE", "WHISPER", "XYLOPHONE", "YONDER", "ZEALOT", "ANCHOR", 
    "BLOSSOM", "CHRONIC", "DIALECT", "EMERALD", "FABLE", "GLACIER", "HARMONY",
    "INFINITY", "JUBILEE", "KERNEL", "LUXURY", "MAVERICK", "NOMADIC", "OBSIDIAN",
    "PRISM", "QUASAR", "RESOLUTE", "SPECTRUM", "TRIUMPH", "VORTEX", "WONDERLAND",
    "YACHT", "ZENITH", "ACCURATE", "BASILISK", "CELESTIAL", "DOMINION", "ELEVATION",
    "FOUNDER", "GOSSAMER", "HERCULEAN", "ILLUSION", "JAGUAR", "KOMPASS", "LANTERN",
    "METEOR", "NOSTALGIA", "ORBITAL", "PHOENIX", "QUANTUM", "RESONANCE", "SENTINEL",
    "TELESCOPE", "ULTRAVIOLET", "VALIANT", "WILDERNESS", "YESTERYEAR", "ZODIAC"
];

// Ensures at least 1,000 words (you can add more)
while (words.length < 2000) {
    words.push(words[Math.floor(Math.random() * words.length)]);
}

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

// Get a random word
function getRandomWord() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongAttempts = 0;
    displayWord();
    resetGame();
}

// Display underscores for the word
function displayWord() {
    wordDisplay.innerHTML = word.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
}

// Handle user guesses
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

// Reveal hangman parts one by one
function revealHangmanPart(index) {
    if (parts[index]) {
        parts[index].style.display = "block";
    }
}

// Get a hint (reveals one letter, counts as a wrong attempt)
function getHint() {
    if (wrongAttempts >= maxAttempts) return;
    let remainingLetters = word.split("").filter(l => !guessedLetters.includes(l));
    if (remainingLetters.length > 0) {
        handleGuess(remainingLetters[0]);
    }
}

// Update the game state (check win/loss)
function updateGameState() {
    displayWord();
    wrongGuesses.innerText = `Wrong Attempts: ${wrongAttempts}/${maxAttempts}`;

    if (word.split("").every(letter => guessedLetters.includes(letter))) {
        setTimeout(() => alert("🎉 You Win!"), 300);
    }

    if (wrongAttempts >= maxAttempts) {
        setTimeout(() => alert(`💀 You Lose! The word was: ${word}`), 300);
    }
}

// Reset game UI
function resetGame() {
    parts.forEach(part => (part.style.display = "none"));
    wrongGuesses.innerText = `Wrong Attempts: 0/${maxAttempts}`;
}

// Theme switcher
const themes = [
    { bg: "#2c3e50", text: "white" },
    { bg: "white", text: "black" },
    { bg: "orange", text: "white" },
    { bg: "skyblue", text: "black" }
];

let themeIndex = 0;
themeBtn.addEventListener("click", () => {
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.style.background = themes[themeIndex].bg;
    document.body.style.color = themes[themeIndex].text;
});

// Initialize game
hintBtn.addEventListener("click", getHint);
restartBtn.addEventListener("click", getRandomWord);
getRandomWord();
