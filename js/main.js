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
var lifes;
var startGame;
var score = 0;
var GO_score;
var level = 1;
var speed = 4000;
var pTc;

if (startPage) {
    var startDisplay = document.getElementById('start_page');
    var guy = document.getElementById('guy');
    var play = document.getElementById('play');
    var instruction = document.getElementById('instruction');
    var goBack = document.getElementById('goBack');
    lifes = 5;
    instruction.onclick = function () {
        document.getElementById('instructionDisplay').style.display = 'block';
    }
    goBack.onclick = function () {
        document.getElementById('instructionDisplay').style.display = 'none';
    }

    play.onclick = function () {
        if (window.innerWidth >= 680) {
            startDisplay.style.display = 'none';
            guy.style.display = 'block';
            startPage = false;
            startGame();
        } else {
            alert('Sorry, the window of your browser is to small');
        }
    }
} else alert('Sorry, an unexpected error');

function startGame() {
    startGame = setInterval(initBeer, speed);
};

function gameOverPage() {
    GO_score = score;
    var GO_scoreTag = document.getElementById('GO_score');
    GO_scoreTag.innerText = score;
    var stopDisplay = document.getElementById('stop_page');
    stopDisplay.style.display = 'block';
    var playAgain = document.getElementById('play_again');
    var www = document.getElementById('www');
    // var app = getElementById('app');
    playAgain.onclick = function () {
        window.location.reload();
    }
    www.onclick = function () {
        window.open('http://green-hornets.jfdzl1.is-academy.pl/');
    }
    // app.onclick = function() {
    //
    // }

}

function collision(positionToCollision) {
    var guyWidth = document.getElementById('guy').offsetWidth;
    pTc = document.getElementsByClassName('beer')[0].offsetLeft;
    if ((positionToCollision < positionGuy + guyWidth) && (positionToCollision > positionGuy - beerWidth)) {
        scoreAdd();
        document.getElementsByClassName('beer')[0].outerHTML = '';
    } else {
        lifesRemove();
        document.getElementsByClassName('beer')[0].outerHTML = '';
        crashBeerDisplay();
    }
};

function crashBeerDisplay() {
    indexCrashBeer++;
    var crashBeer = document.createElement('div');
    crashBeer.className = 'crashBeer';
    crashBeer.id = 'crashBeer_' + indexCrashBeer;
    crashBeer.style.left = pTc - 32.5 + 'px';
    crashBeer.style.top = window.innerHeight - guyHeight + beerHeight + 'px';
    document.body.appendChild(crashBeer);
    document.getElementById('crashBeer_' + indexCrashBeer).style.opacity = 1;
    smoothlyHide();
};

function smoothlyHide() {
    var crashBeer = document.getElementById('crashBeer_' + indexCrashBeer);
    var opacity = crashBeer.style.opacity * 100;
    var intervalShow = setInterval(function () {
        if (opacity === 0) {
            clearInterval(intervalShow);
            crashBeer.outerHTML = '';
        } else {
            opacity -= 1;
            crashBeer.style.opacity = opacity / 100;
        }
        ;
    }, 15);
};

function scoreAdd() {
    var scoreTag = document.getElementById('score');
    score += 1;
    scoreTag.innerText = score;
    if (score % 10 === 0) {
        level += 1;
        var levelTag = document.getElementById('level');
        levelTag.innerText = level;
        speed = 4000 - level * 200;
        clearInterval(startGame);
        startGame = setInterval(initBeer, speed);
    }
};

function lifesRemove() {
    if (lifes === 0) {
        clearInterval(startGame);
        window.setTimeout(function () {
            gameOverPage();
        }, 200)
    } else {
        var lifesTag = document.getElementById('lifes_' + lifes);
        lifesTag.classList.remove('life');
        lifes -= 1;
        if (lifes === 0) lifesRemove();
    }
};

function initBeer() {
    guyHeight = document.getElementById('guy').offsetHeight;

    var choosenWindowNumber = Math.floor(Math.random() * 5) + 1; // from 1 to 5
    var choosenWindow_B = document.getElementById('positionOfWindow_' + choosenWindowNumber);

    choosenWindow_A = document.getElementById('window_' + choosenWindowNumber);
    choosenWindow_A.innerHTML = '<div id="motherinlaw"><canvas id="canvasM"></canvas></div>';
    drawMotherInLaw();

    setTimeout(function () {
        indexBeer++;
        beerTag = document.createElement('div');
        beerTag.className = 'beer';
        beerTag.id = "beer_" + indexBeer;
        document.body.appendChild(beerTag);
        beerWidth = beerTag.offsetWidth;
        beerHeight = document.getElementsByClassName('beer')[0].offsetHeight;
        var offsetLeftOfWinndow = choosenWindow_B.offsetLeft + beerWidth;
        throwOutPoint = offsetLeftOfWinndow;
        var positionToCollision = throwOutPoint - beerWidth;
        animateBeer(beerTag, positionToCollision);
        beerTag.style.left = throwOutPoint + 'px';
        setTimeout(function () {
            choosenWindow_A.innerHTML = '';
        }, 200);
    }, 600);


};

function animateBeer(beerTag, positionToCollision) {
    var position = beerTag.offsetTop;
    var inter = setInterval(function () {
        if (position >= window.innerHeight - guyHeight || lifes === 0) {
            clearInterval(inter);
            collision(positionToCollision);
        } else {
            beerTag.style.top = ( position += window.innerHeight / 182 ) + 'px';
        }
    }, 20);
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
    setInterval(function () {
        clearInterval(M_drw)
    }, 600);
};
