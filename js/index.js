const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fruits = [];
let score = 0;
let highScore = 0;
let mousePath = [];
let isGameOver = false;
let gameLevel = 2000;
let fruitSpawnInterval;

if (localStorage.getItem("highScore") !== null) {
    highScore = parseInt(localStorage.getItem("highScore"), 10);
    document.getElementById("highScore").textContent = highScore;
} else {
    document.getElementById("highScore").textContent = score;
}

class Fruit {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = { x: Math.random() * 4 - 2, y: -Math.random() * 8 - 12 };
        this.gravity = 0.3;
        this.sliced = false;
        this.pieces = [];
        this.showLetters = false;

        const minY = canvas.height * 0.4;
        if (this.y + this.velocity.y < minY) {
            this.velocity.y = -(this.y - minY) / 10;
        }
    }

    update() {
        if (!this.sliced) {
            this.y += this.velocity.y;
            this.x += this.velocity.x;
            this.velocity.y += this.gravity;

            if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                this.velocity.x = -this.velocity.x;
            }

            if (this.y > canvas.height + this.radius) {
                triggerGameOver();
            }
        } else if (this.showLetters) {
            this.pieces.forEach(piece => {
                ctx.font = "40px Arial";
                ctx.fillStyle = this.color;
                ctx.fillText(piece.letter, piece.x, piece.y);
            });
        } else {
            this.pieces.forEach(piece => {
                piece.x += piece.velocity.x;
                piece.y += piece.velocity.y;
                piece.velocity.y += this.gravity;
                ctx.font = "40px Arial";
                ctx.fillStyle = this.color;
                ctx.fillText(piece.letter, piece.x, piece.y);
            });
        }
        if (!this.sliced) this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    slice() {
        this.sliced = true;
        const letters = ['J', 'O', 'E', 'C', 'O', 'D', 'E'];
        const angle = Math.PI / 3;
        this.pieces = letters.map((letter, index) => ({
            letter: letter,
            x: this.x + (index - 2.5) * 30,
            y: this.y,
            velocity: {
                x: 5 * Math.cos(index * angle) + Math.random() * 2,
                y: 5 * Math.sin(index * angle) - Math.random() * 2
            }
        }));
        this.showLetters = true;
        setTimeout(() => {
            this.showLetters = false;
        }, 400);
    }
}

function triggerGameOver() {
    isGameOver = true;
    highScore = score;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        document.getElementById("highScore").textContent = score;
    }

    swal({
        title: "Game Over",
        text: "Try again next time"
    }).then(() => {
        window.location.reload();
    });
}

function spawnFruit() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const radius = 30;
    const colors = ['orange', 'red', 'yellow', 'green'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    fruits.push(new Fruit(x, y, radius, color));
}

function detectCollision(x, y, fruit) {
    const dist = Math.hypot(x - fruit.x, y - fruit.y);
    return dist < fruit.radius;
}

function handleInteraction(x, y) {
    mousePath.push({ x, y });
    fruits.forEach((fruit, index) => {
        if (!fruit.sliced && detectCollision(x, y, fruit)) {
            fruit.slice();
            score += 10;
            document.getElementById("mainScore").innerHTML = score;

            gameLevel = Math.max(100, gameLevel - 50);
            clearInterval(fruitSpawnInterval);
            fruitSpawnInterval = setInterval(spawnFruit, gameLevel);
        }
    });
}

canvas.addEventListener('mousemove', (event) => {
    handleInteraction(event.clientX, event.clientY);
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
});

function drawMouseSlash() {
    if (mousePath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(mousePath[0].x, mousePath[0].y);

        for (let i = 1; i < mousePath.length; i++) {
            ctx.lineTo(mousePath[i].x, mousePath[i].y);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    if (mousePath.length > 20) {
        mousePath.shift();
    }
}

function animate() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruits.forEach((fruit, index) => {
        if (!fruit.sliced && fruit.y < canvas.height + fruit.radius) {
            fruit.update();
        } else if (fruit.sliced && fruit.pieces.length > 0) {
            fruit.update();
        } else {
            fruits.splice(index, 1);
        }
    });

    drawMouseSlash();
    requestAnimationFrame(animate);
}

// Start game and fruit spawning
fruitSpawnInterval = setInterval(spawnFruit, gameLevel);
animate();
