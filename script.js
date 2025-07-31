
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const finalScore = document.getElementById("finalScore");

let birdImg = new Image();
birdImg.src = "assets/bird.png";

let gravity = 0.6;
let lift = -10;
let bird = { x: 50, y: 150, width: 40, height: 30, velocity: 0 };

let pipes = [];
let pipeWidth = 50;
let pipeGap = 140;
let pipeSpeed = 2;
let score = 0;
let gameActive = false;

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function createPipe() {
    let topHeight = Math.floor(Math.random() * 200) + 50;
    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: topHeight + pipeGap
    });
}

function drawPipes() {
    ctx.fillStyle = "#000";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    });
}

function updatePipes() {
    pipes.forEach(pipe => pipe.x -= pipeSpeed);
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        createPipe();
    }
    if (pipes.length && pipes[0].x + pipeWidth < 0) {
        pipes.shift();
        score++;
    }
}

function checkCollision() {
    if (bird.y + bird.height > canvas.height || bird.y < 0) return true;
    return pipes.some(pipe => {
        return bird.x < pipe.x + pipeWidth &&
               bird.x + bird.width > pipe.x &&
               (bird.y < pipe.top || bird.y + bird.height > pipe.bottom);
    });
}

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.velocity += gravity;
    bird.y += bird.velocity;

    drawBird();
    drawPipes();
    updatePipes();
    drawScore();

    if (checkCollision()) {
        gameOver();
    } else {
        requestAnimationFrame(updateGame);
    }
}

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
}

function startGame() {
    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    resetGame();
    gameActive = true;
    updateGame();
}

function gameOver() {
    gameActive = false;
    finalScore.textContent = score;
    gameOverScreen.classList.remove("hidden");
}

document.addEventListener("keydown", e => {
    if (e.code === "Space" && gameActive) {
        bird.velocity = lift;
    }
});

canvas.addEventListener("click", () => {
    if (gameActive) {
        bird.velocity = lift;
    }
});

startButton.onclick = startGame;
restartButton.onclick = startGame;
VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x00ff00,         // зеленый цвет линий
    backgroundColor: 0x000000 // черный фон
  });
  