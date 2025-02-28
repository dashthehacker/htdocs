document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false; // Ensures pixel art stays crisp

    const img = new Image();
    img.src = "/assets/evil_smile/bg-thingy.png";

    let tiles = [];
    const tileSize = 120;
    let cols, rows;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.ceil(canvas.width / tileSize);
        rows = Math.ceil(canvas.height / tileSize);
        initializeTiles();
    }

    function initializeTiles() {
        tiles = [];
        const numTiles = Math.floor(cols * rows * 0.5); // Adjust the number of tiles based on the screen size
        for (let i = 0; i < numTiles; i++) {
            const randomHue = Math.random() * 360;
            const randomOpacity = Math.random() * 0.5 + 0.5;
            const randomX = Math.random() * canvas.width;
            const randomVx = Math.random() < 0.5 ? 2 : -2;

            tiles.push({
                x: randomX,
                y: Math.random() * canvas.height,
                vx: randomVx,
                hue: randomHue,
                opacity: randomOpacity,
            });
        }
    }

    function updateTiles() {
        for (let tile of tiles) {
            tile.x += tile.vx;

            if (tile.x < -tileSize || tile.x > canvas.width) {
                tile.x = Math.random() * canvas.width; // Random x spawn point when teleporting
            }

            // Speed up the hue shift to make the effect faster
            tile.hue = (tile.hue + 5) % 360; // Faster hue shift (0-360)
        }
    }

    function drawTiles() {
        // We no longer clear the entire canvas each frame; this avoids unnecessary operations
        ctx.save();

        // Loop through tiles to draw each one
        for (let tile of tiles) {
            // Only draw tiles within the visible area of the canvas
            if (tile.x >= 0 && tile.x <= canvas.width && tile.y >= 0 && tile.y <= canvas.height) {
                // Apply the filter and opacity for the tile
                ctx.filter = `grayscale(100%) sepia(1) hue-rotate(${tile.hue}deg) saturate(100)`; 
                ctx.globalAlpha = tile.opacity;

                // Draw the image tile on the main canvas
                ctx.drawImage(img, 0, 0, tileSize, tileSize, tile.x, tile.y, tileSize, tileSize);
            }
        }

        ctx.restore();
    }

    function animate() {
        updateTiles();
        drawTiles();
        requestAnimationFrame(animate);
    }

    img.onload = () => {
        resizeCanvas();
        animate();
    };

    window.addEventListener("resize", resizeCanvas);
});
