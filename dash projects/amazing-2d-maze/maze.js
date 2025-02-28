// Select the canvas element
const canvas = document.getElementById("themaze");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 600;
canvas.height = 600;

// Maze parameters
const cols = 15; // Number of columns in the maze
const rows = 15; // Number of rows in the maze
const cellSize = canvas.width / cols;

// Player image
const playerImg = new Image();
playerImg.src = "143828372.png";
const playerSize = cellSize * 0.7; // Scale player to fit in the maze

// Maze grid and player position
let maze = [];
let player = { x: 0, y: 0 }; // Start at top-left corner

// Generate maze using depth-first search
function generateMaze() {
  const stack = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // Initialize maze with walls
  maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  function isValid(x, y) {
    return x >= 0 && y >= 0 && x < cols && y < rows && !visited[y][x];
  }

  function carvePath(x, y) {
    visited[y][x] = true;
    maze[y][x] = 0;

    // Randomized directions
    const directions = [
      [0, -1], // Up
      [1, 0],  // Right
      [0, 1],  // Down
      [-1, 0], // Left
    ].sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const nx2 = x + dx * 2;
      const ny2 = y + dy * 2;

      if (isValid(nx2, ny2)) {
        maze[ny][nx] = 0; // Remove wall
        carvePath(nx2, ny2);
      }
    }
  }

  carvePath(0, 0); // Start carving from the top-left corner
  maze[rows - 1][cols - 1] = 0; // Ensure the bottom-right is the endpoint
}

// Draw the maze
function drawMaze() {
  ctx.fillStyle = "#000"; // Black background for walls
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Clear cells for the maze path
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 0) {
        ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Draw the player
function drawPlayer() {
  ctx.drawImage(
    playerImg,
    player.x * cellSize + cellSize * 0.15,
    player.y * cellSize + cellSize * 0.15,
    playerSize,
    playerSize
  );
}

// Check for collision with walls
function canMove(x, y) {
  return x >= 0 && y >= 0 && x < cols && y < rows && maze[y] && maze[y][x] === 0;
}

// Handle keyboard input
window.addEventListener("keydown", (e) => {
  let newX = player.x;
  let newY = player.y;

  switch (e.key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
  }

  if (canMove(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }

  if (player.x === cols - 1 && player.y === rows - 1) {
    alert("Congratulations! You've reached the end of the maze!");
    generateMaze();
    player = { x: 0, y: 0 };
    render();
  } else {
    render();
  }
});

// Render the game
function render() {
  drawMaze();
  drawPlayer();
}

// Initialize game
playerImg.onload = () => {
  generateMaze();
  render();
};
