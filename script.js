const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const groundHeight = 20;
const ropeWidth = 10;
const playerWidth = 50;
const playerHeight = 100;
const loseWidth = 5;
const losePlayer2X = canvas.width / 2 - (-100) / 2;
const losePlayer1X =  canvas.width / 2 - 100 / 2 - playerWidth;
const player1Y = canvas.height - groundHeight - playerHeight;
const player2Y = canvas.height - groundHeight - playerHeight;

let player1X = 200;
let player2X = canvas.width - playerWidth - 200;
let countdown = 5;
let showwingWinner = false;

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rope
    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width / 2 - ropeWidth / 2, 0, ropeWidth, canvas.height);
    
    ctx.fillStyle = "brown";
    ctx.fillRect(losePlayer1X + playerWidth, 0, loseWidth, canvas.height);
    
    ctx.fillStyle = "brown";
    ctx.fillRect(losePlayer2X, 0, loseWidth, canvas.height);
    
    // Draw ground
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
    
    // Draw left player
    ctx.fillStyle = "blue";
    ctx.fillRect(player1X, player1Y, playerWidth, playerHeight);

    // Draw right player
    ctx.fillStyle = "red";
    ctx.fillRect(player2X, player2Y, playerWidth, playerHeight);

    if(showwingWinner) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(`Player ${winner} win!`, canvas.width / 2 - 100, canvas.height / 2 - 20);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Wait ${countdown} second`, canvas.width / 2 - 50, canvas.height / 2 + 20);
    }
}

function update() {
    // Check for player movement
    if (keys['a'] && player2X > losePlayer2X) {
        player2X -= 2;
        player1X -= 2;
    }
    if (keys['Enter'] && player1X < losePlayer1X) {
        player1X += 2;
        player2X += 2;
    }
    if(player2X <= losePlayer2X) {
        showWinner("1");
    }
    if(player1X >= losePlayer1X) {
        showWinner("2");
    }
}

function showWinner(player) {
    showwingWinner = true;
    winner = player;
    // const countdownInterval = setInterval(function() {
    //     if(countdown < 0) {
    //         clearInterval(countdownInterval);
    //     } else {
    //         countdown--;
    //     } 
    // }, 1000);
    setTimeout(() => {
        showwingWinner = false;
        resetPositions();
    }, 5000);
}

function resetPositions() {
    player1X = 200;
    player2X = canvas.width - playerWidth - 200;
}

// Keyboard input handling
const keys = {};
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();