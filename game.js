document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        console.log("jump");
        if(level.dead == false) 
            skip();
        else{
            level.speed = 7;
            corona.speed = 1;
            gonzalo.x = width + 100;
            corona.x = 500;
            level.score = 0;
            level.dead = false;
        }
    }
});

function loadImages() {
    imgPlayer = new Image();
    imgFloor = new Image();
    imgGonzalo = new Image();
    imgCorona = new Image();

    imgPlayer.src = 'img/player.png';
    imgFloor.src = 'img/floor.png';
    imgGonzalo.src = 'img/gonzalo.png';
    imgCorona.src = 'img/corona.png';
}

// LUEGO DE CAMBIAR EL TAMAÑO ACUERDATE CAMBIAR ACA TAMBIEN PARA QUE FUNCIONE SIN ERRORES Xd
// VARIABLES
var imgPlayer, imgFloor, imgGonzalo, imgCorona;
var width = 700
var heigth = 300
var canvas;
var ctx;
// VARIABLES THE PLAYER AND FLOOR
var floor1 = 565;
var xplayer = {y: floor1, vy:0, gravity:2, jump:42, vymax:9, jumping: false};
var level = {speed: 7, score: 0, dead: false};
var gonzalo = {x: width + 100, y: 480};
var corona = {x: 500, y: 50, speed: 5};
var floor = {x: 0, y: 675};

// INITIALIZATION
function initialize() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    loadImages();
}

// X,Y,immg.proportions,X,Y,sizeImg
function drawPlayer() {
    ctx.drawImage(imgPlayer, 0, 0, 1080, 1080, 100, xplayer.y, 150, 150);
}

function gravity() {
    if(xplayer.jumping == true) {
        if(xplayer.y - xplayer.vy - xplayer.gravity > floor1) {
            xplayer.jumping = false;
            xplayer.vy = 0;
            xplayer.y = floor1;
        }
        else{
            xplayer.vy -= xplayer.gravity;
            xplayer.y -= xplayer.vy;
        }
    }
}

function logicGonzalo() {
    if(gonzalo.x < -100) {
        gonzalo.x = width + 100;
        level.score++;
        level.speed++;
    }
    else{
        gonzalo.x -= level.speed;
    }
}

function drawGonzalo() {
    ctx.drawImage(imgGonzalo, 0, 0, 347, 512, gonzalo.x, gonzalo.y, 150, 200);
}

function drawCorona() {
    ctx.drawImage(imgCorona, 0, 0, 840, 859, corona.x, corona.y, 100, 200);
}

function logicCorona() {
    if(corona.x < -100) {
        corona.x = width + 100;
    }
    else{
        corona.x -= corona.speed;
    }
}

function drawFloor() {
    ctx.drawImage(imgFloor, floor.x, 0, 700, 30, 0, floor.y, 900, 50);

}

function logicFloor() {
    if(floor.x > 700) {
        floor.x = 0;
    }
    else{
        floor.x += level.speed;
    }
}

function skip() {
    xplayer.jumping = true;
    xplayer.vy = xplayer.jump;
}

function eraseCanvas() {
    canvas.width = width;
    canvas.heigth = heigth;
}

function collision() {
    if(gonzalo.x >= 160 && gonzalo.x <= 170) {
        if(xplayer.y >= 230) {
            level.dead = true;
            level.speed = 0;
            corona.speed = 0;
        }
    }
}

function score() {
    ctx.font = "50px impact";
    ctx.fillStyle = '#2E86C1'
    ctx.fillText(`${level.score}`, 600, 65);

    if(level.dead == true) {
        ctx.font = "100px impact"
        ctx.fillStyle = '#ff0000'
        ctx.fillText(`GAME OVER`, 135, 350);
    }
}

// MAIN LOOP
var FPS = 50;
setInterval(function() {
    main();
}, 1000/FPS);

// MAIN
function main() {
    eraseCanvas();
    gravity();
    collision();
    logicFloor();
    logicGonzalo();
    logicCorona();
    drawFloor();
    drawGonzalo();
    drawCorona();
    drawPlayer();
    score();
    // console.log("main");
}