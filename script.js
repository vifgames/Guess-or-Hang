@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    background: linear-gradient(135deg, #2c3e50, #4ca1af);
    color: white;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

h1 {
    font-size: 28px;
    font-weight: 600;
}

.hangman-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.hangman {
    stroke-linecap: round;
}

.part {
    stroke: white;
    stroke-width: 4;
    display: none;
}

#word-display {
    font-size: 24px;
    letter-spacing: 5px;
    font-weight: 600;
    margin-bottom: 15px;
}

#wrong-guesses {
    font-size: 18px;
    color: #ffcccb;
}

#keyboard {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 8px;
    margin-top: 10px;
}

button {
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    border-radius: 5px;
    transition: 0.3s;
}

#keyboard button {
    background: #ffffff;
    color: #2c3e50;
    font-weight: bold;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}

#keyboard button:hover {
    background: #4ca1af;
    color: white;
}

#restart {
    margin-top: 20px;
    background: #e74c3c;
    color: white;
    font-size: 20px;
    display: none;
}
