let lives = 3;
let score = 0;
let level = 1;
let powerUpAvailable = false;
let healthDoorClicked = false;
let badDoor = null;
let healingDoor = null;

const doors = document.getElementById('doors');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const messageDisplay = document.getElementById('message');

function randomizeDoors() {
    badDoor = Math.floor(Math.random() * 3);
    healingDoor = Math.random() < 0.25 ? Math.floor(Math.random() * 3) : null;
}

function updateUI() {
    livesDisplay.textContent = `Lives: ${lives}`;
    scoreDisplay.textContent = `Score: ${score}`;
    levelDisplay.textContent = `Level: ${level}`;
}

function updateMessage(message) {
    messageDisplay.textContent = message;
}

function doorClicked(doorIndex) {
    if (lives <= 0) return;

    if (doorIndex === badDoor) {
        lives--;
        score -= 500;
        updateMessage('You chose the wrong door! You lost a life.');
    } else if (doorIndex === healingDoor && !healthDoorClicked) {
        healthDoorClicked = true;
        score += 250;
        if (Math.random() < 0.25) {
            powerUpAvailable = true;
            updateMessage('You found a health door and got a power-up! Press "C" to reveal the bad doors once.');
        } else {
            updateMessage('You found a health door and gained a life!');
        }
        lives++;
    } else {
        score += 1000;
        level++;
        updateMessage('You moved to the next level!');
    }

    if (lives <= 0) {
        updateMessage('Game Over! You lost all your lives.');
        resetGame();
    } else {
        randomizeDoors();
        updateUI();
    }
}

function resetGame() {
    lives = 3;
    score = 0;
    level = 1;
    powerUpAvailable = false;
    healthDoorClicked = false;
    randomizeDoors();
    updateUI();
    updateMessage('New game started! Choose a door to continue.');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'c' && powerUpAvailable) {
        updateMessage(`Bad door is at position ${badDoor + 1}.`);
        powerUpAvailable = false;
    }
});

randomizeDoors();
updateUI();
updateMessage('New game started! Choose a door to continue.');
