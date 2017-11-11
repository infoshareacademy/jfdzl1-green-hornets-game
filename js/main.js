var positionGuy;

function collision(positionToCollision) {
    if ((positionToCollision < positionGuy + 50) && (positionToCollision > positionGuy - 26)) {
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
    window.setTimeout(function () {
        if (lifes === 0) {
            alert("GAME OVER");
        }
    }, 200)
}

function initGuy() {
    var guyTag = document.getElementById('guy');
    positionGuy = guyTag.offsetLeft;

    document.body.addEventListener('keydown', function (event) {
        var left = guyTag.offsetLeft;
        switch (event.key) {
            case 'ArrowLeft':
                if (left > 0)
                    guyTag.style.left = left - 10 + 'px';
                positionGuy = guyTag.offsetLeft;
                break;
            case 'ArrowRight':
                if (left < window.innerWidth - 60)
                    guyTag.style.left = left + 10 + 'px';
                positionGuy = guyTag.offsetLeft;
                break;
            default:
                return;
        }
        event.preventDefault();
    });
}

function initBeer(speed) {
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
    beerTag.style.left = throwOutPoint + 'px';
    var positionToCollision = throwOutPoint;
    animateBeer(beerTag, speed, positionToCollision);
}

function animateBeer(beerTag, speed, positionToCollision) {
    var position = beerTag.offsetTop;
    var inter = setInterval(function () {
        if (position >= window.innerHeight) {
            clearInterval(inter);
            collision(positionToCollision);
        } else {
            beerTag.style.top = (position += 5) + 'px';
        }
    }, speed);
}

setInterval(initBeer, 4000);

initGuy();
