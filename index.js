/* Define some variables to use in drawing and to make sizes easier to test*/
let color = "green";
let size = 5;
let increment = 1;
let minSize = 1;
let drawing;
let ctx;
let colorIdx = 0;
let colorList = ["green", "blue", "purple", "red", "orange", "yellow"];

window.onload = function() {
    drawing = document.getElementById("drawing");
    ctx = drawing.getContext("2d");
    document.addEventListener("keydown", checkKey);
    drawing.addEventListener("mousedown", startDrawing);
    drawing.addEventListener("mouseup", stopDrawing);
    drawing.addEventListener("touchstart", startTouchDrawing);
    drawing.addEventListener("touchend", stopTouchDrawing);
};

function checkKey(evt) {
    console.log("Key press: ");
    //console.log(evt);
    switch(evt.key) {
        case " ":
            clearDrawing();
            break;
        case "ArrowUp":
            size = size + increment;
            console.log(size);
            /* Without the beginPath, everything up to this point in the current mousemove event gets changed.
               Putting the beginPath here allows for changing size/color in the middle of a mousemove */
            ctx.beginPath();
            break;
        case "ArrowDown":
            size = (size - increment) > minSize ? size - increment : minSize;
            console.log(size);
            ctx.beginPath();
            break;
        case "r":
            color = "red";
            ctx.beginPath();
            break;
        case "g":
            color = "green";
            ctx.beginPath();
            break;
        case "b":
            color = "blue";
            ctx.beginPath();
            break;
        case "y":
            color = "yellow";
            ctx.beginPath();
            break;
    }
}

function clearDrawing() {
    console.log("Clear");
    ctx.clearRect(0, 0, drawing.width, drawing.height);

}

function startTouchDrawing(event) {
    console.log("Start touch drawing");
    //console.log(event);
    drawing.addEventListener("touchmove", touchDraw);
    ctx.beginPath();
    color = colorList[colorIdx % colorList.length];
    colorIdx += 1;
    touchDraw(event);
    // Let's change the color with every new touch.

}

function touchDraw(event) {
    console.log("Touch drawing");
    //console.log(event);
    /* Only tracking one touch for now */
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    console.log(x + ", " + y);
    ctx.moveTo(x-size, y);
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI, true);
    //ctx.stroke();
    ctx.fill();
}

function stopTouchDrawing(event) {
    drawing.removeEventListener("touchmove", touchDraw);
}

function startDrawing(event) {
    console.log("Start drawing, size " + size);
    console.log(event.clientX + ", " + event.clientY);
    /* Useful link: https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function */
    drawing.addEventListener("mousemove", draw);
    ctx.beginPath();
    draw(event);
}

function draw(event) {
    // console.log("Draw");
    let x = event.clientX;
    let y = event.clientY;
    console.log(x + ", " + y);
    ctx.moveTo(x-size, y);
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI, true);
    //ctx.stroke();
    ctx.fill();
}

function stopDrawing(event) {
    console.log("Stop drawing");
    this.removeEventListener("mousemove", draw);
}

