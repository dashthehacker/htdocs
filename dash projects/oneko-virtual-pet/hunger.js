let hunger = 100;  // Initial hunger value
const hungerElement = document.getElementById('hunger');  // Reference to the hunger meter element
let hungerInterval;  // Variable to control the hunger interval

// Function to update the hunger meter display
function updateHunger() {
    hungerElement.textContent = `Hunger: ${hunger}%`;
}

// Function to decrease hunger every 5 seconds
function decreaseHunger() {
    if (hunger > 0) {
        hunger -= 5;
        if (hunger <= 0) {
            hunger = 0;
            //alert("Hunger has reached zero! Game over!");
        }
        updateHunger();
    }
}

// Function to replenish hunger
function feed(amount) {
    hunger += amount;
    if (hunger > 100) {
        hunger = 100;  // Ensure hunger doesn't go over 100
    }
    if (hunger < 0) {
        hunger = 0;
    }
    updateHunger();
}

// Start the hunger decrease every 5 seconds
function startHungerDecrease() {
    hungerInterval = setInterval(decreaseHunger, 60000);
}

// Stop the hunger decrease (for example, when the game is paused)
function stopHungerDecrease() {
    clearInterval(hungerInterval);
}

// Function to handle playing with the cat (decreases hunger, increases happiness)
function play() {
    if (hunger > 0) {
        hunger -= 2;  // Playing reduces hunger slightly
        if (hunger < 0) hunger = 0;
        updateHunger();
    }
}

// Function to stop the cat’s hunger decrease while it’s asleep, etc.
function sleep() {
    stopHungerDecrease();
    // Start the sleep animation here
}

// Function to restart hunger decrease when the cat is active
function wakeUp() {
    startHungerDecrease();
}

// Initialize the hunger meter display and start hunger decrease
updateHunger();
startHungerDecrease();
