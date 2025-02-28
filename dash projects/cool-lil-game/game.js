const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Resize canvas function
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Make sure the canvas initially fills the window
resizeCanvas();

// Define player properties
let player = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  speed: 5,
  jumping: false,
  yVelocity: 0, // Added to store vertical velocity
};

// Define movement keys
let rightPressed = false;
let leftPressed = false;
let jumpPressed = false;

// Draw the player on the canvas
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Move the player
function movePlayer() {
  if (rightPressed && player.x < canvas.width - player.width) {
    player.x += player.speed;
  } else if (leftPressed && player.x > 0) {
    player.x -= player.speed;
  }

  if (jumpPressed && !player.jumping && player.yVelocity === 0) {
    player.jumping = true;
    player.yVelocity = -player.speed * 2;
  }  

  if (player.jumping) {
    player.yVelocity += 0.2; // Gravity effect
    player.y += player.yVelocity;

    if (player.y > canvas.height - player.height) {
      player.jumping = false;
      player.y = canvas.height - player.height;
      player.yVelocity = 0;
    }
  }
}

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  drawPlayer();

  // Move the player
  movePlayer();

  // Draw platforms on the canvas
  drawPlatforms();

  // Handle collisions between the player and platforms
  handleCollision();

  // Draw enemies on the canvas
  drawEnemies();

  // Handle collisions between the player and enemies
  handleEnemyCollision();

  // Handle the score
  handleScore();

  // Check if the player is off-screen
  if (player.y > canvas.height) {
    gameOver();
    return;
  }

  // Call gameLoop again
  animationId = requestAnimationFrame(gameLoop);
}

// Start the game loop
let animationId = requestAnimationFrame(gameLoop);

// Platform properties
let platforms = [
  { x: 0, y: 550, width: 800, height: 50 },
  { x: 300, y: 400, width: 200, height: 25 },
];

// Draw platforms on the canvas
function drawPlatforms() {
  ctx.fillStyle = "green";
  platforms.forEach((platform) => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function checkCollision(player, platform) {
  let bottomCollision = player.y + player.height >= platform.y &&
                        player.y + player.height <= platform.y + platform.height &&
                        player.x + player.width > platform.x &&
                        player.x < platform.x + platform.width;

  let topCollision = player.y <= platform.y + platform.height &&
                     player.y >= platform.y &&
                     player.x + player.width > platform.x &&
                     player.x < platform.x + platform.width;

  return { bottomCollision, topCollision };
}

function handleCollision() {
  platforms.forEach((platform) => {
    let collision = checkCollision(player, platform);

    if (collision.bottomCollision && player.yVelocity > 0) {
      player.jumping = false;
      player.y = platform.y - player.height;
      player.yVelocity = 0;
    }

    if (collision.topCollision && player.yVelocity < 0) {
      player.y = platform.y + platform.height;
      player.yVelocity = 0;
    }
  });
}


// Enemy properties
let enemies = [
  { x: 700, y: 500, width: 50, height: 50, speed: 3, direction: "left" },
];

// Draw enemies on the canvas
function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

// Collision detection with enemies
function checkEnemyCollision(player, enemy) {
  let bottom = player.y + player.height >= enemy.y;
  let top = player.y <= enemy.y + enemy.height;
  let right = player.x + player.width >= enemy.x;
  let left = player.x <= enemy.x + enemy.width;

  return bottom && top && right && left;
}

// Handle player-enemy collision
function handleEnemyCollision() {
  enemies.forEach((enemy) => {
    if (checkEnemyCollision(player, enemy)) {
      // Game over
      console.log("Game over");
      gameOver();
    }
  });
}

// Score properties
let score = 0;
let scoreThreshold = 700;

// Handle scoring
function handleScore() {
  if (player.x > scoreThreshold) {
    score += 10;
    scoreThreshold += 700;
  }

  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 20, 40);  // Adjusted position
}

// Game over function
function gameOver() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

  // Call resizeCanvas to adjust the canvas size before restarting
  resizeCanvas();

  // Optionally reset other game states (score, player position, etc.)
  setTimeout(() => {
    // Reset player position and other necessary states here
    player.x = 50;
    player.y = 50;
    player.speed = 5;
    player.jumping = false;
    score = 0;
    scoreThreshold = 700;
    // Restart the game loop
    animationId = requestAnimationFrame(gameLoop);
  }, 2000); // Wait for 2 seconds before restarting
}

// Audio setup
let audio = new Audio("background_music.mp3");
audio.loop = true;
audio.play();

let jumpSound = new Audio("jump_sound.mp3");
let collisionSound = new Audio("collision_sound.mp3");

// Keyboard input handling
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyM") {
    audio.paused ? audio.play() : audio.pause();
  }

  if (event.code === "ArrowRight") {
    rightPressed = true;
  }

  if (event.code === "ArrowLeft") {
    leftPressed = true;
  }

  if (event.code === "Space") {
    jumpPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    rightPressed = false;
  }

  if (event.code === "ArrowLeft") {
    leftPressed = false;
  }

  if (event.code === "Space") {
    jumpPressed = false;
  }
});

// Start screen text
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.font = "50px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Press Space to Start", canvas.width / 2, canvas.height / 2);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animationId = requestAnimationFrame(gameLoop);
  }
});
