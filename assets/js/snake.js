const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let gameOver = false;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
        return;
    }

    moveSnake();
    checkCollision();
    clearCanvas();
    drawFood();
    drawSnake();

    setTimeout(gameLoop, 100);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 38: // up arrow
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 39: // right arrow
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case 40: // down arrow
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver = true;
    }
    
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

gameLoop();
