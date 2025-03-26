// Set up the canvas
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Function to resize canvas to full viewport size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Set z-index to -1
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';

let col = 0;

// Function to generate rainbow colors
function makeColorHSV(hue, sat, val) {
    const c = val * sat;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = val - c;
    let r = 0, g = 0, b = 0;

    if (hue >= 0 && hue < 60) {
        r = c; g = x; b = 0;
    } else if (hue >= 60 && hue < 120) {
        r = x; g = c; b = 0;
    } else if (hue >= 120 && hue < 180) {
        r = 0; g = c; b = x;
    } else if (hue >= 180 && hue < 240) {
        r = 0; g = x; b = c;
    } else if (hue >= 240 && hue < 300) {
        r = x; g = 0; b = c;
    } else if (hue >= 300 && hue < 360) {
        r = c; g = 0; b = x;
    }

    r += m;
    g += m;
    b += m;

    return `rgb(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(b * 255)})`;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let part = 7;  // Number of rainbow stripes
    let wp = canvas.width / part; // Width of each section

    // Draw rainbow stripes
    for (let i = 0; i < part; i++) {
        let hue = (col + (i * (360 / part))) % 360;  // Ensure hue wraps around smoothly
        ctx.fillStyle = makeColorHSV(hue, 1, 1);  // Smooth color cycling
        ctx.fillRect(wp * i, 0, wp, canvas.height);
    }

    // Cycle hue for rainbow effect
    col += 1;
    if (col > 360) {
        col = 0;
    }

    // Keep animating
    requestAnimationFrame(draw);
}

// Start drawing
draw();

// Resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);
