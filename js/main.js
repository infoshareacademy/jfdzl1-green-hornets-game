var element = document.createElement('div');
var beerTag = document.createElement('div');
var body = document.getElementsByTagName('body')[0];
var guy = 0;
var beer = 0;
var speed = 20;

function renderGuy() {
    element.id = 'guy';
    body.appendChild(element);
    guy = document.getElementById('guy');
}

function renderBeers() {
    body.appendChild(beerTag);
    beerTag.id = 'beer';
    beer = document.getElementById('beer');

    var widthOfBrowser = window.innerWidth;
    var beerWidth = beer.offsetWidth;
    var chooseOfWindow = Math.floor(0 + (Math.random() * (window.innerWidth - (beerWidth / 2))));

    if (chooseOfWindow >= 0 & chooseOfWindow <= (widthOfBrowser * 0.2)) {
        var widthOfWinndow = window_1.offsetWidth;
        var min = window_1.offsetLeft - (widthOfWinndow / 2) + (beerWidth / 2);
        var max = window_1.offsetLeft + (widthOfWinndow / 2) - (beerWidth / 2);
        var win = document.getElementById('window_1')
        var throwOut = Math.floor(min + (Math.random() * (max - min)));
        beer.style.left = throwOut + 'px';
        console.log('1');
    } else if (chooseOfWindow >= (widthOfBrowser * 0.2) + 1 & chooseOfWindow <= widthOfBrowser * 0.4) {
        var widthOfWinndow = window_2.offsetWidth;
        var min = window_2.offsetLeft - (widthOfWinndow / 2) + (beerWidth / 2);
        var max = window_2.offsetLeft + (widthOfWinndow / 2) - (beerWidth / 2);
        var win = document.getElementById('window_1')
        var throwOut = Math.floor(min + (Math.random() * (max - min)));
        beer.style.left = throwOut + 'px';
        console.log('2');
    } else if (chooseOfWindow >= (widthOfBrowser * 0.4) + 1 & chooseOfWindow <= widthOfBrowser * 0.6) {
        var widthOfWinndow = window_3.offsetWidth;
        var min = window_3.offsetLeft - (widthOfWinndow / 2) + (beerWidth / 2);
        var max = window_3.offsetLeft + (widthOfWinndow / 2) - (beerWidth / 2);
        var win = document.getElementById('window_1')
        var throwOut = Math.floor(min + (Math.random() * (max - min)));
        beer.style.left = throwOut + 'px';
        console.log('3');
    } else if (chooseOfWindow >= (widthOfBrowser * 0.6) + 1 & chooseOfWindow <= widthOfBrowser * 0.8) {
        var widthOfWinndow = window_4.offsetWidth;
        var min = window_4.offsetLeft - (widthOfWinndow / 2) + (beerWidth / 2);
        var max = window_4.offsetLeft + (widthOfWinndow / 2) - (beerWidth / 2);
        var win = document.getElementById('window_1')
        var throwOut = Math.floor(min + (Math.random() * (max - min)));
        beer.style.left = throwOut + 'px';
        console.log('4');
    } else if (chooseOfWindow >= (widthOfBrowser * 0.8) + 1 & chooseOfWindow <= widthOfBrowser) {
        var widthOfWinndow = window_5.offsetWidth;
        var min = window_5.offsetLeft - (widthOfWinndow / 2) + (beerWidth / 2);
        var max = window_5.offsetLeft + (widthOfWinndow / 2) - (beerWidth / 2);
        var win = document.getElementById('window_1')
        var throwOut = Math.floor(min + (Math.random() * (max - min)));
        beer.style.left = throwOut + 'px';
        console.log('5');
    }
}

function moveGuy() {
    body.addEventListener("keypress", function(event) {
        var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
        switch (key) {
            case 97: //w lewo
                var left = document.getElementById('guy').offsetLeft;
                if (left <= 0) {
                    break;
                }
                guy.style.left = left - 10 + 'px';
                break;
            case 100: //w prawo
                var resolutionWidth = window.innerWidth;
                var left = document.getElementById('guy').offsetLeft;
                if (left >= resolutionWidth - 60) {
                    break;
                }
                guy.style.left = left + 10 + 'px';
                break;

            default:
                // empty
        }
    });
}

function fallingBeers() {
    var position = document.getElementById('beer').offsetTop;
    var resolutionHeight = window.innerHeight;
    var inter = setInterval(frame, speed);

    function frame() {
        if (position >= resolutionHeight) {
            clearInterval(inter);
        } else {
            position += 3;
            beer.style.top = position + 'px';
        }
    }
}

renderBeers();
fallingBeers();
renderGuy();
moveGuy();
