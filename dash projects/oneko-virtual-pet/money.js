let money = 0;  // Initial money value
const moneyElement = document.getElementById('money-text');  // Reference to the money display element

// Function to update the money display
function updateMoney() {
    moneyElement.textContent = `Money: $${money}`;
}

// Function to add money
function earnMoney(amount) {
    money += amount;
    updateMoney();
}

// Function to subtract money (if needed)
function spendMoney(amount) {
    if (money >= amount) {
        money -= amount;
        updateMoney();
    } else {
        alert("Not enough money!");
    }
}

// Initialize the money display
updateMoney();

function bankrupt() {
    money = 0;
}