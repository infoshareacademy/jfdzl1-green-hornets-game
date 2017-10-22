function initGuy() {
    var guyTag = document.createElement('div');
    guyTag.id = 'guy';
    document.body.appendChild(guyTag);

    document.body.addEventListener('keydown', function (event) {
        var left = guyTag.offsetLeft;
        switch (event.key) {
            case 'ArrowLeft':
                if (left > 0)
                    guyTag.style.left = left - 10 + 'px';
                break;
            case 'ArrowRight':
                if (left < window.innerWidth - 60)
                    guyTag.style.left = left + 10 + 'px';
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

    animateBeer(beerTag, speed);
}

function animateBeer(beerTag, speed) {
    var position = beerTag.offsetTop;
    var inter = setInterval(function () {
        if (position >= window.innerHeight) {
            clearInterval(inter);
        } else {
            beerTag.style.top = (position += 3) + 'px';
        }
    }, speed);
}

setInterval(initBeer, 500);

initGuy();