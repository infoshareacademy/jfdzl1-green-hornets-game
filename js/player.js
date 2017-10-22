/**
 * Created by krzysiek on 20.10.2017.
 */
var canWidth = 650
var canHeight = 300;

var x = 0;
var y = 0;
var trackLeft = 2;
var trackRight = 1;
var trackStand = 3;
var left = false;
var right = false;
var stand = true;

var scrX;
var scrY;

var sheetWidth = 720;
var sheetHeight = 282;

var cols = 9;
var rows = 3;
var speed = 12;

var width = sheetWidth / cols;
var height = sheetHeight / rows;
var character = new Image();
character.src = "./images/character3.png"

var currentFrame = 0;
var canvas = document.getElementById('canvas');
canvas.width = canWidth;
canvas.height = canHeight;

var ctx  = canvas.getContext('2d');

function moveRight(){
    left = false;
    right = true;
    stand = false;
}
function moveLeft(){
    left = true;
    right = false;
    stand = false;
}

function updateFrame(){
    ctx.clearRect(x,y,width,height)
    currentFrame = ++currentFrame % cols;

    scrX = currentFrame * width;

    if(stand)
        scrY = trackStand * height;
    else {
        if (left)
            scrY = trackLeft * height;

        else
            scrY = trackRight * height;
    }

    console.log(stand, left, scrY)

}
function drawImage(){
    updateFrame();
    ctx.drawImage(character,scrX,scrY,width,height,x,y,width,height);
}

setInterval(function(){
    drawImage();
}, 60);