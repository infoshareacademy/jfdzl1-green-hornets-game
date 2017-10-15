$(function() {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    var myRectangle = {
        x: 0,
        y: 0,
        width: 20,
        height: 40,
        borderWidth: 1
    };

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function animate(myRectangle, canvas, context, startTime) {
        // update
        var time = (new Date()).getTime() - startTime;

        var linearSpeed = 100;
        // pixels / second
        var newY = linearSpeed * time / 1000;

        if(newY < canvas.height - myRectangle.height - myRectangle.borderWidth / 2) {
            myRectangle.y = newY;
        }

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawRectangle(myRectangle, context);

        // request new frame
        requestAnimFrame(function() {
            animate(myRectangle, canvas, context, startTime);
        });

    }

    drawRectangle(myRectangle, ctx);

    // wait one second before starting animation
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, ctx, startTime);
    }, 1000);
});