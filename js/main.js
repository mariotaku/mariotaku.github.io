/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var star_frame_0 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var star_frame_1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var star_frame_2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var star_frame_3 = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];
var star_frame_4 = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0]
];
var star_frame_5 = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
];
var star_frames = [star_frame_0, star_frame_1, star_frame_2, star_frame_3,
    star_frame_4, star_frame_5];

var sakamoto_frame_count = 12;
var rainbow_frame_count = 12;

var stars = new Array();
var sakamoto = new Sakamoto();
var rainbow = new Rainbow();

var starDotWidth = 6, starDotHeight = 6;
var starRows, starCols;
var dotScale = 4;

function Sakamoto() {
    var obj = this;
    this.loaded = false;
    this.frameWidth = 0;
    this.frameHeight = 0;
    var image = new Image();
    var today = new Date();
    if (today.getMonth() == 11) {
        image.src = "assets/sakamoto_santa.png";
    } else {
        image.src = "assets/sakamoto.png";
    }
    image.onload = function () {
        obj.loaded = true;
        obj.frameWidth = image.width;
        obj.frameHeight = image.height / sakamoto_frame_count;
    };
    var frame = 0;

    this.draw = draw;

    function draw(context) {
        if (!obj.loaded)
            return;
        var h = context.canvas.height, w = context.canvas.width;
        var frameHeight = image.height / sakamoto_frame_count;
        var scale = dotScale * 1.5;
        var scaledWidth = image.width * scale, scaledHeight = frameHeight * scale;
        var left = w / 2 - scaledWidth / 2;
        var top = h / 2 - scaledHeight / 2;
        var frame = nextFrame();
        setImageSomoothingEnabled(false);
        context.drawImage(image, 0, frameHeight * frame, image.width,
                frameHeight, left, top, scaledWidth, scaledHeight);
    }


    function nextFrame() {
        if (frame >= sakamoto_frame_count) {
            frame = 0;
        }
        return frame++;
    }
}

function Rainbow() {
    var image = new Image();
    var loaded = false;
    this.frameWidth = 0;
    this.frameHeight = 0;
    image.src = "assets/rainbow.png";
    image.onload = function () {
        loaded = true;
        frameWidth = image.width;
        frameHeight = image.height / rainbow_frame_count;
    };
    var frame = 0;

    this.draw = draw;

    function draw(context) {
        if (!sakamoto.loaded || !loaded)
            return;
        var h = context.canvas.height, w = context.canvas.width;
        var scale = dotScale * 0.75;
        var scaledWidth = image.width * scale, scaledHeight = frameHeight * scale;
        var right = w / 2 - scaledWidth / 2;
        var top = h / 2 - scaledHeight / 2 + sakamoto.frameHeight;
        var frame = nextFrame();
        setImageSomoothingEnabled(false);
        for (var i = right; i >= 0; i -= scaledWidth) {
            var left = i - scaledWidth;
            context.drawImage(image, 0, frameHeight * frame, image.width,
                    frameHeight, left, top, scaledWidth, scaledHeight);
        }
    }


    function nextFrame() {
        if (frame >= sakamoto_frame_count) {
            frame = 0;
        }
        return frame++;
    }
}

function Star(row, col, frame, reversed) {
    this.row = row;
    this.col = col;
    this.frame = frame;
    this.reversed = reversed;
    this.draw = draw;


    function draw(context) {
        if (starCols === 0 || starRows === 0)
            return;
        var col = nextColumn(), row = nextRow();
        var h = context.canvas.height, w = context.canvas.width;
        var y = (row + 0.5) * (h / starRows), x = (col + 0.5) * (w / starCols);
        drawStar(x, y, context);
    }

    function nextColumn() {
        if (col < 0) {
            col = starCols - 1;
        }
        return col--;
    }

    function nextRow() {
        return row;
    }

    function drawStar(x, y, context) {
        context.fillStyle = "white";

        var frameData = star_frames[nextFrame()];
        var rows = frameData.length;
        for (var i = 0; i < rows; i++) {
            var cols = frameData[i].length;
            for (var j = 0; j < cols; j++) {
                if (frameData[i][j] === 1) {
                    var left = x + dotScale * j - dotScale * cols / 2;
                    var top = y + dotScale * i - dotScale * rows / 2;
                    context.fillRect(left, top, dotScale, dotScale);
                }
            }
        }
    }

    function nextFrame() {
        if (frame >= star_frames.length) {
            frame = 0;
        } else if (frame < 0) {
            frame = star_frames.length - 1;
        }
        return reversed ? frame-- : frame++;
    }
}

var canvas, context;


window.addEventListener("resize", resize);
window.setInterval(invalidate, 70);
window.onload = init;

function init() {
    canvas = document.getElementById('main_canvas');
    context = canvas.getContext('2d');
    
    if (context) {
        reset();
        draw();
    }
}

function draw() {
    if (!canvas || !context) return;
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    for (var i = 0; i < stars.length; i++) {
        stars[i].draw(context);
    }

    rainbow.draw(context);

    sakamoto.draw(context);
}

function resize() {
    reset();
}

function reset() {
    stars = [];
    var width = window.innerWidth, height = window.innerHeight;
    starRows = height / (dotScale * starDotHeight) / 2;
    starCols = width / (dotScale * starDotWidth) / 2;
    if (width <= 0 || height <= 0)
        return;
    for (var i = 0; i < starRows; i++) {
        var frame = Math.floor(Math.random() * star_frames.length);
        var col = Math.floor(Math.random() * starCols);
        stars.push(new Star(i, col, frame, Math.random() >= 0.5));
    }
}

function invalidate() {
    draw();
}

function setImageSomoothingEnabled(enabled) {
    context.imageSmoothingEnabled = enabled;
    context.mozImageSmoothingEnabled = enabled;
    context.webkitImageSmoothingEnabled = enabled;
    context.msImageSmoothingEnabled = enabled;
}