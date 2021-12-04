// select game screens
const gameStart = document.querySelector('.game-start');
const gameOver = document.querySelector('.game-over');
const gameArea = document.querySelector('.game-area');
const gameScore = document.querySelector('.game-score');
let gamePoints = gameScore.querySelector('.points')

// game start listener
gameStart.addEventListener('click', onGameStart);

//game start function
function onGameStart() {
    gameStart.classList.add('hide');

    //render wizard
    let wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.x + 'px';
    wizard.style.left = player.y + 'px';
    gameArea.appendChild(wizard);
    player.width = wizard.offsetWidth;
    player.heigh = wizard.offsetHeight;
    //game infinite loop
    window.requestAnimationFrame(gameAction);
}

//global key listener
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};
let player = {
    x: 150,
    y: 100,
    width: 0,
    heigh: 0,
    lastTimeFiredFireball: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4,
    fireballMultiplier: 5,
    fireInterval: 1000,
    cloudSpawnInterval: 3000
};
let scene = {
    score: 0,
    lastCloudSpawn: 0
};

//key handlers
function onKeyDown(e) {
    keys[e.code] = true;
    console.log(keys);
};

function onKeyUp(e) {
    keys[e.code] = false;
    console.log(keys)
};

function addFireBall(player) {
    let fireball = document.createElement('div');

    fireball.classList.add('fire-ball');
    fireball.style.top = (player.y + player.heigh / 3 - 5) + 'px';
    fireball.x = player.x + player.width;
    fireball.style.left = fireball.x + 'px';
    gameArea.appendChild(fireball);
};

//game loop function
function gameAction(timestamp) {
    const wizard = document.querySelector('.wizard');

    console.log(timestamp)

    //Apply gravitation
    let isInAir = (player.y + player.heigh) <= gameArea.offsetHeight;
    if (isInAir) {
        player.y += game.speed;
    }
    //increment points
    scene.score++;

    //Add clouds
    if(timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()){
        let cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameArea.offsetWidth - 200;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';
        gameArea.appendChild(cloud);
        scene.lastCloudSpawn = timestamp;
    }
   

    //Modify cloud position
    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';
        
        if(cloud.x + cloud.offsetWidth <= 0){
            cloud.parentElement.removeChild(cloud)
        }
    });


    //register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowDown && isInAir) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }
    if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
        wizard.classList.add('wizard-fire');
        addFireBall(player)
        player.lastTimeFiredFireball = timestamp
    } else {
        wizard.classList.remove('wizard-fire')
    }
    //Modify fireball position
    let fireBalls = document.querySelectorAll('.fire-ball');
    fireBalls.forEach(fireBall => {
        fireBall.x += game.speed * game.fireballMultiplier;
        fireBall.style.left = fireBall.x + 'px';
        if (fireBall.x + fireBall.offsetWidth > gameArea.offsetWidth) {
            fireBall.parentElement.removeChild(fireBall);
        }
    });
    //apply movement
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    //apply score
    gameScore.textContent = scene.score;

    window.requestAnimationFrame(gameAction);
};