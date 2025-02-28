document.getElementById('feed').addEventListener('click', function() {
    const feedCost = 10;  // Cost to feed the cat (in money)
    const hungerReplenish = 20;  // Amount to replenish hunger (as a percentage)

    if (money >= feedCost && hunger != 100) {
        scratch();  // Run scratch when FEED is clicked

        // Wait 5 seconds and then run idle()
        setTimeout(function() {
            idle();  // Run idle after 5 seconds
        }, 5000);  // 5000 milliseconds = 5 seconds

        feed(hungerReplenish);  // Feed the cat and replenish hunger by 20%
        spendMoney(feedCost);  // Deduct 10 money for feeding
    }
});

// Global variable to track the current time of day (true for day, false for night)
let isDayTime = true;

// Function to initialize the day-night cycle
function initDayNightCycle() {
    // Switch between day and night every 5 minutes (300,000 ms)
    window.daynightcycle = setInterval(switchDayNight, 300000); // 5 minutes in milliseconds
}

// Function to switch between day and night
function switchDayNight() {
    if (isDayTime) {
        isDayTime = false;
    } else {
        isDayTime = true;
    }
    updateBackground(); // Update background when the time changes
}

// Create and append a <style> element to dynamically update the background
const daynight_css = document.createElement("style");
daynight_css.id = "daynight-css";
document.body.appendChild(daynight_css);

// Function to update the background based on the time of day
function updateBackground() {
    const backgroundStyle = document.getElementById("daynight-css");
    let daycss = `
    body {
        background: linear-gradient(to top, #87CEFA, #FFD700);
        transition: background 2s ease-in-out; /* Fade effect */
    }
    `;
    let nightcss = `
    body {
        background: linear-gradient(to top, #2C3E50, #34495E);
        transition: background 2s ease-in-out; /* Fade effect */
    }`;
    // If it's day time, use a sunny gradient
    if (getIsDayTime()) {
        backgroundStyle.textContent = daycss;
    } else {
        // If it's night time, use a dark gradient
        backgroundStyle.textContent = nightcss;
    }
    try {idle();} catch {}
    try {updateMusic();} catch {}
}

// Initialize the background when the game starts
updateBackground();

// Initialize the day-night cycle when the game starts
initDayNightCycle();

// Function to check if it's day or night
function getIsDayTime() {
    return isDayTime;
}