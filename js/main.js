var element = document.createElement('div');
var body = document.getElementsByTagName('body')[0];
var guy = 0;

function renderGuy() {
    element.id = 'guy';
    body.appendChild(element);
    guy = document.getElementById('guy');

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

renderGuy();
moveGuy();
