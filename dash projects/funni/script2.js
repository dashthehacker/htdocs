// JavaScript to make the "start" button take up the entire screen and adjust text size
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");

    // Set the button to fill the entire screen
    startButton.style.position = "absolute";
    startButton.style.top = "0";
    startButton.style.left = "0";
    startButton.style.width = "100%";
    startButton.style.height = "100%";
    startButton.style.border = "none";
    startButton.style.cursor = "pointer";

    // Dynamically scale the font size to fit the button
    startButton.style.display = "flex";
    startButton.style.justifyContent = "center";
    startButton.style.alignItems = "center";
    startButton.style.fontSize = "calc(10vw)"; // Adjusts based on viewport width

    // Add the rainbow animation class
    startButton.classList.add("rainbow-background");
});
