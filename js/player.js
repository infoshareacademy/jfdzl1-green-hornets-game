/**
 * Created by krzysiek on 20.10.2017.
 */
var canWidth = 650
var canHeight = 300;

var x = 0;
var y = 0;
var trackLeft = 1;
var trackRight = 0;
var left = false;

var scrX;
var scrY;

var sheetWidth = 720;
var sheetHeight = 188;

var cols = 9;
var rows = 2;

var width = sheetWidth / cols;
var height = sheetHeight / rows;
var character = new Image();
character.src = "./images/character2.png"

var currentFrame = 0;
var canvas = document.getElementById('canvas');
canvas.width = canWidth;
canvas.height = canHeight;

var ctx  = canvas.getContext('2d');

function moveRight(){
    left = false;

}
function moveLeft(){
    left = true;
}

function updateFrame(){
    ctx.clearRect(x,y,width,height)
    currentFrame = ++currentFrame % cols;

    scrX = currentFrame * width;

    if(left)
        scrY = trackLeft * height;
    else
        x+=12;
    scrY = trackRight * height;

//			srcY = 0;

}
function drawImage(){
    updateFrame();
    ctx.drawImage(character,scrX,scrY,width,height,x,y,width,height);
}

setInterval(function(){
    drawImage();
}, 60);