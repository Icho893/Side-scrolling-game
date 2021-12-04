// select game screens
let gameStart = document.querySelector('.game-start');
let gameOver = document.querySelector('.game-over');
let gameArea = document.querySelector('.game-area');
let gameScore = document.querySelector('.game-score');

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
    heigh: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4
};

//key handlers
function onKeyDown(e) {
    keys[e.code] = true;
    console.log(keys);
}

function onKeyUp(e) {
    keys[e.code] = false;
    console.log(keys)
}
//game loop function
function gameAction() {
    const wizard = document.querySelector('.wizard')
    //register user input
    if (keys.ArrowUp && player.y > 0) {
        player.y -= game.speed  * game.movingMultiplier;
    }
    if (keys.ArrowDown && player.y + player.heigh < gameArea.offsetHeight) {
        player.y += game.speed * game.movingMultiplier;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if (keys.ArrowRight && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultiplier;
    }
    //apply movement
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    window.requestAnimationFrame(gameAction);
}