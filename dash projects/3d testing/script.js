document.addEventListener('contextmenu', event => event.preventDefault());

const canvas = document.getElementById("wireframe");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("gameOver");
const titleScreen = document.getElementById("titleScreen");
const startButton = document.getElementById("startButton");
const difficultySelect = document.getElementById("difficulty");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const plants = [];
const plantImage = new Image();
const tomatoImage = new Image();
const cornImage = new Image();
const watermelonImage = new Image();
const toronionImage = new Image();
const junkFoodImage = new Image();
plantImage.src = "./vegtables/carrot.png";
tomatoImage.src = "./vegtables/tomato.png";
junkFoodImage.src = "./junkfood/orengetwigs.png";
cornImage.src = "./vegtables/corn.png";
watermelonImage.src = "./vegtables/watermelon.png";
toronionImage.src = "./vegtables/toronion.png";
const perspective = 300;
const baseTileSize = 50;
const maxDepth = 15;
let score = 0;
let gameOver = false;
let plantFallSpeed = 2; // Default speed for medium difficulty

const maxCarrots = 10;
let powerUpActive = false; // Track if the power-up is active
let powerUpTimeout = null; // To store the timeout reference
let junkFoodCooldown = false; // Flag to manage cooldown for junk food
let junkFoodCooldownTimeout = null; // To store cooldown timeout

let triangleX = canvas.width / 2; // Starting X position of the triangle
let bullets = [];

// Matrix Rain variables
const columns = Math.floor(canvas.width / 15); // Number of columns for the rain effect
const drops = []; // Array to store drop positions

// Create a rain drop for each column
for (let x = 0; x < columns; x++) {
  drops[x] = Math.random() * canvas.height; // Random starting point for each drop
}

function getGridHorizonZ() {
  return maxDepth * baseTileSize;
}
function createVegetable() {
  if (gameOver) return;
  if (plants.length >= maxCarrots) return;

  const x = Math.random() * canvas.width - canvas.width / 2;
  const z = getGridHorizonZ();
  
  const vegetableTypes = [
    { image: tomatoImage, score: 150 }, 
    { image: plantImage, score: 100 }, 
    { image: cornImage, score: 200 },
    { image: watermelonImage, score: 250 },
    { image: toronionImage, score: 300 }
  ];
  
  const randomVeggie = vegetableTypes[Math.floor(Math.random() * vegetableTypes.length)];

  plants.push({ x, z, image: randomVeggie.image, score: randomVeggie.score, isJunkFood: false });
}

function detectShoot(x, y) {
  plants.forEach((plant, index) => {
    const scale = perspective / (perspective + plant.z);
    const plantX = canvas.width / 2 + plant.x * scale;
    const plantY = canvas.height - (plant.z * scale);
    const plantSize = 50 * scale;

    if (
      x > plantX - plantSize / 2 &&
      x < plantX + plantSize / 2 &&
      y > plantY - plantSize / 2 &&
      y < plantY + plantSize / 2
    ) {
      if (plant.isJunkFood) {
        score -= 1000; // Shooting junk food causes a penalty
        plantFallSpeed *= 1.5; // Speed up vegetables as a penalty
      } else {
        score += plant.score; // Use the score value of the vegetable
      }
      plants.splice(index, 1);
    }
  });
}

function createJunkFood() {
    if (gameOver || junkFoodCooldown) return;

    const x = Math.random() * canvas.width - canvas.width / 2;
    const z = getGridHorizonZ();
    plants.push({ x, z, image: junkFoodImage, isJunkFood: true });

    junkFoodCooldown = true;
    // Set a 60-second cooldown before another junk food can spawn
    junkFoodCooldownTimeout = setTimeout(() => {
        junkFoodCooldown = false;
    }, 60000); // 60 seconds cooldown (doubled)
}

function drawGrid() {
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 1;

  // Draw horizontal grid lines
  for (let z = 0; z < maxDepth; z++) {
    const scale = perspective / (perspective + z * baseTileSize);
    const y = height - z * baseTileSize * scale;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw vertical grid lines
  for (let x = -centerX; x < centerX; x += baseTileSize) {
    ctx.beginPath();
    for (let z = 0; z < maxDepth; z++) {
      const scaleStart = perspective / (perspective + z * baseTileSize);
      const scaleEnd = perspective / (perspective + (z + 1) * baseTileSize);

      const startX = centerX + x * scaleStart;
      const startY = height - z * baseTileSize * scaleStart;

      const endX = centerX + x * scaleEnd;
      const endY = height - (z + 1) * baseTileSize * scaleEnd;

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    }
    ctx.stroke();
  }
}

function drawRain() {
  ctx.fillStyle = "rgba(0, 255, 0, 0.7)"; // Green color for rain
  ctx.font = "15px monospace";

  for (let i = 0; i < columns; i++) {
    const text = String.fromCharCode(33 + Math.random() * 94); // Random character
    const x = i * 15; // Column spacing
    const y = drops[i];

    ctx.fillText(text, x, y);

    // Reset rain drop position when it reaches the bottom
    if (y > canvas.height) {
      drops[i] = Math.random() * -100;
    }

    // Move the drop down
    drops[i] = y + 15;
  }
}

function drawPlants() {
  plants.forEach((plant, index) => {
    const scale = perspective / (perspective + plant.z);
    const x = canvas.width / 2 + plant.x * scale;
    const y = canvas.height - (plant.z * scale);
    const size = 50 * scale;

    if (plant.z < 0 || y > canvas.height) {
      if (y > canvas.height) {
        if (plant.isJunkFood) {
          score += 500; // Collecting junk food gives points
          plantFallSpeed /= 2; // Slow down vegetables (power-up)
          if (!powerUpActive) {
            powerUpActive = true;
            powerUpTimeout = setTimeout(() => {
              plantFallSpeed *= 2; // Reset the speed back to normal
              powerUpActive = false;
            }, 15000); // 15 seconds
          }
        } else {
          score -= 50;
        }
      }
      plants.splice(index, 1);
    } else {
      ctx.drawImage(plant.image, x - size / 2, y - size / 2, size, size);
      plant.z -= plantFallSpeed;
    }
  });
}

function detectShoot(x, y) {
  plants.forEach((plant, index) => {
    const scale = perspective / (perspective + plant.z);
    const plantX = canvas.width / 2 + plant.x * scale;
    const plantY = canvas.height - (plant.z * scale);
    const plantSize = 50 * scale;

    if (x > plantX - plantSize / 2 && x < plantX + plantSize / 2 &&
        y > plantY - plantSize / 2 && y < plantY + plantSize / 2) {
      if (plant.isJunkFood) {
        score -= 1000; // Shooting junk food causes a penalty
        plantFallSpeed *= 1.5; // Speed up vegetables as a penalty
      } else if (plant.image === plantImage) {
        score += 100; // Score for vegetables
      } else if (plant.image === tomatoImage) {
        score += 150; // Score for tomatoes
      }
      plants.splice(index, 1);
    }
  });
}

function shootBullet() {
  const bulletX = triangleX;
  const bulletY = canvas.height - 30;
  const bulletZ = getGridHorizonZ();
  bullets.push({ x: bulletX, y: bulletY, z: bulletZ });
}

function drawBullets() {
  bullets.forEach((bullet, index) => {
    const scale = perspective / (perspective + bullet.z);
    const bulletSize = 10 * scale; // Size of the bullet adjusts with depth
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bulletSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    bullet.y -= 5; // Bullet moves upwards
    bullet.z -= 1; // Bullet moves forward in depth

    detectShoot(bullet.x, bullet.y);

    // Remove bullet if it goes off screen or out of depth range
    if (bullet.y < 0 || bullet.z < 0) {
      bullets.splice(index, 1);
    }
  });
}

function drawTriangle() {
  ctx.beginPath();
  ctx.moveTo(triangleX - 15, canvas.height - 40); // Left side
  ctx.lineTo(triangleX + 15, canvas.height - 40); // Right side
  ctx.lineTo(triangleX, canvas.height - 60); // Top
  ctx.closePath();
  ctx.fillStyle = "purple";
  ctx.fill();
}

canvas.addEventListener("mousemove", (event) => {
  // Constrain the triangle within the canvas width
  triangleX = Math.max(15, Math.min(event.clientX, canvas.width - 15));
});

canvas.addEventListener("click", (event) => {
  if (gameOver) return;
  shootBullet();
});

function animate() {
  if (gameOver) return;

  drawRain(); // Draw the Matrix rain
  drawGrid();
  drawPlants();
  drawBullets();
  drawTriangle();

  // Continually spawn vegetables (tomatoes, carrots)
  if (Math.random() < 0.05) {
    createVegetable(); // Continue creating vegetables
  }

  // Spawn junk food periodically
  if (Math.random() < 0.01) {
    createJunkFood();
  }

  if (score < 0) {
    score = 0;
    gameOver = true;
    gameOverElement.style.display = "block";
  }

  scoreElement.textContent = `Score: ${score}`;

  requestAnimationFrame(animate);
}

function startGame() {
  titleScreen.style.display = "none"; // Hide title screen
  gameOverElement.style.display = "none"; // Hide game over message
  score = 0;
  gameOver = false;

  // Set plant fall speed based on difficulty
  const difficulty = difficultySelect.value;
  if (difficulty === "easy") {
    plantFallSpeed = 1; // Slow speed
  } else if (difficulty === "medium") {
    plantFallSpeed = 2; // Medium speed
  } else {
    plantFallSpeed = 3; // Fast speed
  }

  animate(); // Start game loop
}

startButton.addEventListener("click", startGame);

document.getElementById("reset").addEventListener("click", () => {
  gameOver = false;
  plants.length = 0;
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  gameOverElement.style.display = "none";
  animate();
});
