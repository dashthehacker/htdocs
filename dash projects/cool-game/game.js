// Initialize Kaboom.js
kaboom({
    fullscreen: true,
    background: [64, 239, 245], // Set the river background color to RGB (64, 239, 245)
});

// Load the player sprite
loadSprite("player", "/cool-game/player.png");

// Add the player to the game, scaled up
const player = add([
  sprite("player"), // Use the loaded sprite
  pos(width() / 2, height() / 2), // Center of the screen
  scale(5), // Scale the player to 5x its original size
  area(), // Collision area
]);

// Player movement with WASD keys
onKeyDown("w", () => player.move(0, -200));
onKeyDown("a", () => player.move(-200, 0));
onKeyDown("s", () => player.move(0, 200));
onKeyDown("d", () => player.move(200, 0));

// Function to generate a random sand color
function randomSandColor() {
  return rgb(rand(200, 255), rand(200, 240), rand(100, 150)); // Random shades of sand colors
}

// Function to generate a water color (river)
function randomWaterColor() {
  return rgb(rand(0, 100), rand(100, 200), rand(255, 255)); // Random shades of water colors
}

// Create a grid of 50x50 blocks for the island and surrounding water
const gridSize = 50;
const blockSize = 32; // Size of each block, adjust as needed

// This will create an island surrounded by water (using a simple distance check)
for (let x = 0; x < gridSize; x++) {
  for (let y = 0; y < gridSize; y++) {
    const distanceFromCenter = Math.sqrt(Math.pow(x - gridSize / 2, 2) + Math.pow(y - gridSize / 2, 2));
    
    // If the distance from the center of the grid is small, it's sand (island)
    if (distanceFromCenter < gridSize / 2) {
      add([
        rect(blockSize, blockSize), // Create a rectangular block
        pos(x * blockSize, y * blockSize), // Position the block in the grid
        color(randomSandColor()), // Apply a random sand color
        area(), // Make it interactable (e.g., for collisions)
        solid(), // Set the block as solid
      ]);
    } else {
      // If the distance from the center is large, it's water (river)
      add([
        rect(blockSize, blockSize), // Create a rectangular block
        pos(x * blockSize, y * blockSize), // Position the block in the grid
        color(randomWaterColor()), // Apply a random water color
        area(), // Make it interactable (e.g., for collisions)
        solid(), // Set the block as solid
      ]);
    }
  }
}

// Make the camera follow the player and center on them
camera.follow(player, {
  offset: vec2(0, 0), // Center the camera on the player
});
