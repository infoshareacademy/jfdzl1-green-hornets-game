
var element = document.createElement('div');
element.className = 'guy';

function renderGuy () {
    var body = document.getElementsByTagName('body')[0]
    body.appendChild(element);
}

function moveGuy () {
    
}

renderGuy();
moveGuy();