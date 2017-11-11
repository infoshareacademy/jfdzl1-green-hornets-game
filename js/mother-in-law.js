/**
 * Created by Odie on 2017-11-11.
 */
(function() {
    var canWidth = 650;
    var canHeight = 300;

    var x = 0;
    var y = 0;

    var scrX;
    var scrY;

    var sheetWidth = 210;
    var sheetHeight = 100;

    var cols = 3;
    var rows = 1;
    var speed = 2;
    var trackStand = 0;

    var width = sheetWidth / cols;
    var height = sheetHeight / rows;
    var mother = new Image();
    mother.src = "./images/brandma_attack.png";

    var currentFrame = 0;
    var canvasM = document.getElementById('canvasM');
    canvasM.width = canWidth;
    canvasM.height = canHeight;

    var ctx = canvasM.getContext('2d');


    function updateFrame() {
        ctx.clearRect(x, y, width, height);
        currentFrame = ++currentFrame % cols;

        scrX = currentFrame * width;
        scrY = trackStand * height;
    }


    function drawImage() {
        updateFrame();
        ctx.drawImage(mother, scrX, scrY, width, height, x, y, width, height);
    }

    setInterval(function () {
        drawImage();
    }, 200);

})();