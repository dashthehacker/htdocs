var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

function start() {
    // Remove the button
    const funni_button = document.getElementById("funni-button");
    funni_button.remove();
    openFullscreen();

    // Create the canvas
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // Create and set the background GIF
    const backgroundImage = document.createElement("img");
    backgroundImage.src = "/dash projects/hacker/cool.gif"; // Path to your matrix GIF
    backgroundImage.alt = "Background";
    backgroundImage.style.position = "fixed";
    backgroundImage.style.top = "0";
    backgroundImage.style.left = "0";
    backgroundImage.style.width = "100%";
    backgroundImage.style.height = "100%";
    backgroundImage.style.zIndex = "-1"; // Ensures it stays behind everything
    backgroundImage.style.objectFit = "cover"; // Makes sure it covers the entire screen
    document.body.appendChild(backgroundImage);

    // Set up canvas size to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeMatrix();
    }

    // Initialize matrix effect variables
    let columns, drops;

    function initializeMatrix() {
        columns = Math.floor(canvas.width / 20); // 20px per column
        drops = Array(columns).fill(0); // Each column starts at the top
    }

    // Draw the matrix rain animation
    function drawMatrix() {
        // Clear only the characters, leaving the background untouched
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set text color and style
        ctx.fillStyle = "#0F0"; // Green text
        ctx.font = "20px monospace";

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96); // Random Katakana
            ctx.fillText(text, i * 20, drops[i] * 20);

            // Reset to the top with a chance
            if (drops[i] * 20 > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }

            // Move drop down
            drops[i]++;
        }
    }

    // Set up resize listener and start animation
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Initialize canvas size and matrix

    // Animation loop
    setInterval(drawMatrix, 50);

    // Play audio
    const funni_audio = document.createElement("audio");
    funni_audio.autoplay = true;
    funni_audio.loop = true;
    funni_audio.src = "01 Wii Menu.mp3";
    document.body.appendChild(funni_audio);
}
