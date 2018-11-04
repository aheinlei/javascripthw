/* Define some variables to use in drawing and to make sizes easier to test*/
var color = "green";
var size = 5;
var increment = 1;
var minSize = 1;
document.addEventListener("keydown", checkKey);

function checkKey(evt) {
    let drawing = document.getElementById("drawing");
    let ctx = drawing.getContext("2d");
    console.log("Key press: ");
    //console.log(evt);
    switch(evt.key) {
        case " ":
            clearDrawing();
            break;
        case "ArrowUp":
            size = size + increment;
            console.log(size);
            //Without the beginPath, everything up to this point in the current mousemove event gets changed */
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
    let drawing = document.getElementById("drawing");
    let ctx = drawing.getContext("2d");
    ctx.clearRect(0, 0, drawing.width, drawing.height);

}

function startDrawing(event) {
    console.log("Start drawing, size " + size);
    console.log(event.clientX + ", " + event.clientY);
    let drawing = document.getElementById("drawing");
    let ctx = drawing.getContext("2d");
    /* Useful link: https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function */
    drawing.addEventListener("mousemove", draw);
    drawing.ctx = ctx;
    drawing.addEventListener("mouseup", stopDrawing);
    ctx.beginPath();
    draw(event);
}

function draw(event) {
    // console.log("Draw");
    let x = event.clientX;
    let y = event.clientY;
    console.log(x + ", " + y);
    let ctx = event.currentTarget.ctx;
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

