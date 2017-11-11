var positionGuy;

function collision(positionToCollision) {
    if ((positionToCollision < positionGuy + 80) && (positionToCollision > positionGuy - 41)) {
        scoreAdd();
    } else {
        lifesRemove();
    }
}

function scoreAdd() {
    var scoreTag = document.getElementById('score');
    var score = parseInt(scoreTag.innerText);
    score += 1;
    scoreTag.innerText = score;
}

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
}

function initBeer(speed) {
    setTimeout(function() {
        speed = speed || 20;
        var beerTag = document.createElement('div');
        beerTag.className = 'beer';
        document.body.appendChild(beerTag);

        var beerWidth = beerTag.offsetWidth;
        var choosenWindowNumber = Math.floor(Math.random() * 5) + 1; // from 1 to 5
        var choosenWindow = document.getElementById('window_' + choosenWindowNumber);
        var widthOfWinndow = choosenWindow.offsetWidth;
        var offsetLeftOfWinndow = choosenWindow.offsetLeft;
        var min = offsetLeftOfWinndow - (widthOfWinndow / 2) + (beerWidth / 2);
        var max = offsetLeftOfWinndow + (widthOfWinndow / 2) - (beerWidth / 2);
        var throwOutPoint = Math.floor(min + (Math.random() * (max - min)));
        var positionToCollision = throwOutPoint;

        animateBeer(beerTag, speed, positionToCollision);
        beerTag.style.left = throwOutPoint + 'px';
    }, 1000);

        setTimeout(drawMotherInLaw,500);
}

function animateBeer(beerTag, speed, positionToCollision) {
    var position = beerTag.offsetTop;
    var inter = setInterval(function() {
        if (position >= window.innerHeight) {
            clearInterval(inter);
            collision(positionToCollision);
        } else {
            beerTag.style.top = (position += 5) + 'px';
        }
    }, speed);
}

setInterval(initBeer, 4000);

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
    var M_canvasM = document.getElementById('canvasM');
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
