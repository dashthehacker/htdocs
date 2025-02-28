let happiness = 100;  // Initial happiness value
const happinessElement = document.getElementById('happy-text');  // Reference to the happiness meter element
let happinessInterval = null;  // Variable to control the happiness interval

// Function to update the happiness meter display
function updateHappiness() {
    happinessElement.textContent = `Happiness: ${happiness}%`;
}

// Function to decrease happiness every 7 seconds
function decreaseHappiness() {
    if (happiness > 0) {
        happiness -= 5;
        if (happiness <= 0) {
            happiness = 0;
            //alert("Happiness has reached zero! Your pet is sad!");
        }
        updateHappiness();
    }
}

// Function to increase happiness
function play(amount) {
    if (money >= 10 && hunger >= 10) {happiness += amount;feed(-10);}
    if (happiness > 100) {
        happiness = 100;  // Ensure happiness doesn't exceed 100
    }
    if (happiness < 0) {
        happiness = 0;
    }
    updateHappiness();
}

// Start the happiness decrease every 7 seconds
function startHappinessDecrease() {
    if (!happinessInterval) {  // Only start if there's no active interval
        happinessInterval = setInterval(decreaseHappiness, 300000);
    }
}

// Stop the happiness decrease (for example, when the game is paused)
function stopHappinessDecrease() {
    if (happinessInterval) {  // Only stop if the interval is active
        clearInterval(happinessInterval);
        happinessInterval = null;  // Reset the interval reference
    }
}

// Initialize the happiness meter display and start happiness decrease
updateHappiness();
startHappinessDecrease();
