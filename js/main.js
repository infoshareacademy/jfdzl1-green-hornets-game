var positionGuy;
var throwOutPoint;
var beerWidth;
var beerHeight;
var guyHeight;
var beerTag;
var choosenWindow_A;
var indexBeer = -1;
var indexCrashBeer = 0;
var startPage = true;

if (startPage) {
    var startDisplay = document.getElementById('start_page');
    var guy = document.getElementById('guy');
    var play = document.getElementById('play');
    // var instruction = getElementById('instruction');
    play.onclick = function() {
        startDisplay.style.display = 'none';
        guy.style.display = 'block';
        startPage = false;
        startGame();
    }
}

function startGame() {
    setInterval(initBeer, 4000);
};

function collision(positionToCollision) {
    var guyWidth = document.getElementById('guy').offsetWidth;
    if ((positionToCollision < positionGuy + guyWidth) && (positionToCollision > positionGuy - beerWidth)) {
        scoreAdd();
        document.getElementsByClassName('beer')[indexBeer].outerHTML = '';
        indexBeer--;
    } else {
        lifesRemove();
        document.getElementsByClassName('beer')[indexBeer].outerHTML = '';
        crashBeerDisplay();
        indexBeer--;
    }
};

function crashBeerDisplay() {
    indexCrashBeer++;
    var crashBeer = document.createElement('div');
    crashBeer.className = 'crashBeer';
    crashBeer.id = 'crashBeer_' + indexCrashBeer;
    crashBeer.style.left = throwOutPoint - 32.5 + 'px';
    crashBeer.style.top = window.innerHeight - guyHeight + beerHeight + 'px';
    console.log(window.innerHeight + ' - ' + guyHeight + ' + ' + beerHeight + ' + ' + 'px');
    document.body.appendChild(crashBeer);
    document.getElementById('crashBeer_' + indexCrashBeer).style.opacity = 1;
    smoothlyHide();
};

function smoothlyHide() {
    var crashBeer = document.getElementById('crashBeer_' + indexCrashBeer);
    var opacity = crashBeer.style.opacity * 100;
    var intervalShow = setInterval(function() {
        if (opacity === 0) {
            clearInterval(intervalShow);
            crashBeer.outerHTML = '';
        } else {
            opacity -= 1;
            crashBeer.style.opacity = opacity / 100;
        };
    }, 15);
};

function scoreAdd() {
    var scoreTag = document.getElementById('score');
    var score = parseInt(scoreTag.innerText);
    score += 1;
    scoreTag.innerText = score;
};

function lifesRemove() {
    var lifesTag = document.getElementById('lifes');
    var lifes = parseInt(lifesTag.innerText);
    lifes -= 1;
    lifesTag.innerText = lifes;
    window.setTimeout(function() {
        if (lifes === 0) {
            alert("GAME OVER");
        }
    }, 200)
};

function initBeer(speed) {
    speed = speed || 20;

    var choosenWindowNumber = Math.floor(Math.random() * 5) + 1; // from 1 to 5
    var choosenWindow_B = document.getElementById('positionOfWindow_' + choosenWindowNumber);

    choosenWindow_A = document.getElementById('window_' + choosenWindowNumber);
    choosenWindow_A.innerHTML = '<div id="motherinlaw"><canvas id="canvasM"></canvas></div>';

    setTimeout(function() {
        indexBeer++;
        beerTag = document.createElement('div');
        beerTag.className = 'beer';
        document.body.appendChild(beerTag);
        beerWidth = beerTag.offsetWidth;
        beerHeight = document.getElementsByClassName('beer')[0].offsetHeight;
        var offsetLeftOfWinndow = choosenWindow_B.offsetLeft + beerWidth;
        throwOutPoint = offsetLeftOfWinndow;
        var positionToCollision = throwOutPoint - beerWidth;

        animateBeer(beerTag, speed, positionToCollision);
        beerTag.style.left = throwOutPoint + 'px';
    }, 1000);

    setTimeout(drawMotherInLaw, 500);
};

function animateBeer(beerTag, speed, positionToCollision) {
    var position = beerTag.offsetTop;
    var inter = setInterval(function() {
        if (position >= window.innerHeight - guyHeight) {
            clearInterval(inter);
            collision(positionToCollision);
            choosenWindow_A.innerHTML = '';
        } else {
            beerTag.style.top = (position += 5) + 'px';
        }
    }, speed);
};


function drawMotherInLaw() {
    var M_canWidth = 650;
    var M_canHeight = 300;

    var M_x = 0;
    var M_y = 0;

    var M_scrX;
    var M_scrY;

    var M_sheetWidth = 210;
    var M_sheetHeight = 100;

    var M_cols = 3;
    var M_rows = 1;
    var M_speed = 2;
    var M_trackStand = 0;

    var M_width = M_sheetWidth / M_cols;
    var M_height = M_sheetHeight / M_rows;
    var M_mother = new Image();
    M_mother.src = "./images/brandma_attack.png";

    var M_currentFrame = 0;
    var canvasM = document.getElementById('canvasM');
    canvasM.width = M_canWidth;
    canvasM.height = M_canHeight;

    var M_ctx = canvasM.getContext('2d');



    function updateFrame() {
        M_ctx.clearRect(M_x, M_y, M_width, M_height);
        M_currentFrame = ++M_currentFrame % M_cols;

        M_scrX = M_currentFrame * M_width;
        M_scrY = M_trackStand * M_height;
    }


    function drawImage() {
        updateFrame();
        M_ctx.drawImage(M_mother, M_scrX, M_scrY, M_width, M_height, M_x, M_y, M_width, M_height);
    }

    var M_drw = setInterval(drawImage, 200);
    setInterval(function() {
        clearInterval(M_drw)
    }, 600);
};
