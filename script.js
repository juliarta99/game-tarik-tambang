const about = document.getElementById("about");
const howToPlay = document.getElementById("howToPlay");
const game = document.getElementById("game");
const backsound = document.getElementById("backsound");

function showGame() {
    about.classList.add('d-none');
    howToPlay.classList.add('d-none');
    game.classList.remove('d-none');
    backsound.play()
}

function showHowToPlay() {
    about.classList.add('d-none');
    howToPlay.classList.remove('d-none');
    game.classList.add('d-none');
    backsound.pause();
    backsound.currentTime = 0;
}

function showAbout() {
    about.classList.remove('d-none');
    game.classList.add('d-none');
    howToPlay.classList.add('d-none');
    backsound.pause();
    backsound.currentTime = 0;
}

// canvas
const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");

const winnerSound = document.getElementById("winnerSound");

const groundHeight = 20;
const ropeWidth = 10;
const tambangHeight = 5;
const playerWidth = 50;
const playerHeight = 100;
const loseWidth = 2;
const losePlayer2X = canvas.width / 2 - (-100) / 2;
const losePlayer1X =  canvas.width / 2 - 100 / 2;
const playerY = canvas.height - groundHeight - playerHeight;
const clouds = []

const backImage = new Image();
backImage.src = 'assets/background.jpg'
const rumputImage = new Image();
rumputImage.src = 'assets/rumput.png'
const player1Image = new Image();
player1Image.src = 'assets/player1.png';
const player2Image = new Image();
player2Image.src = 'assets/player2.png';
const player1ImageLose = new Image();
player1ImageLose.src = 'assets/player1lose.png'
const player2ImageLose = new Image();
player2ImageLose.src = 'assets/player2lose.png'
const cloudImage = new Image();
cloudImage.src = 'assets/awan.png'
const benderaImage = new Image();
benderaImage.src = 'assets/bendera.png'


let player1X = 200;
let player2X = canvas.width - playerWidth - 200;
let tambangX = (canvas.width - canvas.width / 1.4) / 2;
let tambangLose1 = player1X + playerWidth + 10;
let tambangLose2 = player2X - 10;
let win1 = 0;
let win2 = 0;
let countdown = 5;
let showwingWinner = false;

function createCloud() {
    const cloud = {
        x: canvas.width,
        y: Math.random() * (canvas.height - groundHeight - playerHeight - 50),
        speed: Math.random() * .001 + 1
    };
    clouds.push(cloud);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    ctx.drawImage(backImage, 0, 0, canvas.width, canvas.height);
        
    for(const cloud of clouds) {
        ctx.drawImage(cloudImage, cloud.x, cloud.y, 80, 50);
    }
        
    ctx.fillStyle = "brown";
    ctx.fillRect(tambangX, playerY + playerHeight / 2, canvas.width / 1.4, tambangHeight);

    ctx.fillStyle = "yellow";
    ctx.fillRect(tambangLose1, playerY + playerHeight / 2, 5, 5);

    ctx.fillStyle = "yellow";
    ctx.fillRect(tambangLose2, playerY + playerHeight / 2, 5, 5);

    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width / 2 - ropeWidth / 2, 0, ropeWidth, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(losePlayer1X, 0, loseWidth, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(losePlayer2X, 0, loseWidth, canvas.height);
        
        
    for(let i = 0; i < 3; i++) {
        const x = player1X - playerWidth * i;
        if(tambangLose1 >= losePlayer1X - 50){
            ctx.drawImage(player1ImageLose, x, playerY, playerWidth, playerHeight);
        } else {
            ctx.drawImage(player1Image, x, playerY, playerWidth, playerHeight);
        }
    }

    for(let i = 0; i < 3; i++) {
        const x = player2X + playerWidth * i;
        if(tambangLose2 <= losePlayer2X + 50){
            ctx.drawImage(player2ImageLose, x, playerY, playerWidth, playerHeight);
        } else {
            ctx.drawImage(player2Image, x, playerY, playerWidth, playerHeight);
        }
    }

    ctx.drawImage(benderaImage, -40, canvas.height / 2 - 100, 150, canvas.height);
    ctx.drawImage(rumputImage, 0, canvas.height - groundHeight, canvas.width, groundHeight);

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(`Menang : ${win1}`, 30, 30);
    ctx.fillText(`Menang : ${win2}`, canvas.width - 150, 30);

    if(showwingWinner) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(`Pemain ${winner} menang!`, canvas.width / 2 - 165, canvas.height / 2 - 20);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Tunggu ${countdown} detik`, canvas.width / 2 - 65, canvas.height / 2 + 20);
    }

    if(window.innerWidth < 820) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText('Game saat ini hanya bisa dimainkan di desktop', canvas.width / 2 - 100, canvas.height / 2 - 20);
    }
}
    
function update() {
    if(keys['a'] &&  tambangLose2 >= losePlayer2X) {
        player2X -= 2;
        player1X -= 2;
        tambangX -= 2;
        tambangLose1 -= 2;
        tambangLose2 -= 2;
    }
    if(keys['Enter'] && tambangLose1 <= losePlayer1X) {
        player1X += 2;
        player2X += 2;
        tambangX += 2;
        tambangLose1 += 2;
        tambangLose2 += 2;
    }
    if(tambangLose2 <= losePlayer2X) {
        win1 += 1
        showWinner("1");
    }
    if(tambangLose1 >= losePlayer1X) {
        win2 += 1
        showWinner("2");
    }

    if(Math.random() < .005) {
        createCloud();
    }

    for(const cloud of clouds) {
        cloud.x -= cloud.speed;
    }

    for(let i = clouds.length - 1; i >= 0; i--) {
        if (clouds[i].x + cloudImage.width < 0) {
        }
    }
}
    
function showWinner(player) {
    showwingWinner = true;
    winner = player;
    countdown = 5;
    backsound.volume = .5;
    winnerSound.play();
    let countdownInterval = setInterval(() => {
        if(countdown <= 0) {
            clearInterval(countdownInterval);
            showwingWinner = false;
            resetPositions();
        } else {
            countdown--;
        } 
    }, 1000);
}

function restartGame() {
    resetPositions();
    win1 = 0;
    win2 = 0;
    backsound.pause();
    backsound.currentTime = 0;
    backsound.play();
}
    
function resetPositions() {
    backsound.volume = 1;
    winnerSound.pause();
    winnerSound.currentTime = 0;
    player1X = 200;
    player2X = canvas.width - playerWidth - 200;
    tambangX = (canvas.width - canvas.width / 1.4) / 2;
    tambangLose1 = player1X + playerWidth + 10;
    tambangLose2 = player2X - 10;
}

const keys = {};
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});
    
function gameLoop() {
    if(!showwingWinner){
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();