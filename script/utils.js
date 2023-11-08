// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// Has Commonly used utilities in the game

// Function to help with button states

const LEFT = 1;

function ButtonState(){
    this.down = false;
    this.pressed = false;
}

// Function to handle mouse input
function MouseHandler(){
    this.left = new ButtonState();
    this.position = new Vector();

    document.onmousemove = handleMouseMove;
    document.onmousedown = handleLeftButtonDown;
    document.onmouseup = handleLeftButtonUp;
}

MouseHandler.prototype.reset = function(){
    this.left.pressed = false;
}

function handleMouseMove(event){
    let x = event.pageX;
    let y = event.pageY;
    
    Mouse.position = new Vector(x, y);
}

function handleLeftButtonDown(event){
    // Return if left button is not clicked
    if(!event.which === LEFT) return;

    // Ensure you have latest mouse position
    handleMouseMove(event);

    if(!Mouse.left.down) Mouse.left.pressed = true;
    Mouse.left.down = true;
}

function handleLeftButtonUp(event){
    // Return if left button is not clicked
    if(!event.which === LEFT) return;

    // Ensures we get the latest position of the mouse
    handleMouseMove(event);
    Mouse.left.down = false;
 }

// Handle key inputs
function KeyHandler(){
    this.value = '';
    this.pressed = false;
    this.down = false;

    document.onkeydown = handleKeyDown;
}

KeyHandler.prototype.reset = function(){
    this.pressed = false;
    this.down = false;
}

function handleKeyDown(event){
    let newValue = event.key;

    if(newValue === Key.value){
        if(!Key.down) {
            Key.pressed = true;
        }
        Key.down = true;
    } else {
        Key.pressed = true;
        Key.down = true;
    }
    
    Key.value = newValue;
}

// Setup handlers
let Mouse = new MouseHandler();
let Key = new KeyHandler();


// Vector will be function constructor to work with x & y coordinate operations
function Vector (x = 0, y = 0){
        this.x = x;
        this.y = y;
}

Vector.prototype.copy = function(){
    return new Vector(this.x, this.y);
}

Vector.prototype.add = function(vector){
    return new Vector(this.x + vector.x, this.y - vector.y);
}

Vector.prototype.addTo = function(vector){
    this.x += vector.x;
    this.y += vector.y;
}

Vector.prototype.subtract = function(vector){
    return new Vector(this.x - vector.x, this.y - vector.y);
}

Vector.prototype.mult = function(scalar){
    return new Vector(this.x * scalar, this.y * scalar);
}

Vector.prototype.dot = function(vector){
    return this.x * vector.x + this.y * vector.y;
}

Vector.prototype.length = function(){
    // Length of a vector = Sqrt(x^2 + y^2)
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}



// Canvas allows you to draw the images to the canvas of your program.
function Canvas(){
    this._canvas = document.getElementById('screen');
    this._canvasContext = this._canvas.getContext('2d');
}

// Clear the images that are in the game
Canvas.prototype.clear = function(){
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas.prototype.drawImage = function (image, position, origin, rotation = 0, height, width){
    if(!position){
        position = new Vector();
    }
    if(!origin){
        origin = new Vector();
    }
    
    this._canvasContext.save();
    // Translate moves your image around, will be helpful to center in the end
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    // Since canvasContext is saved, the positioning is relative to the saved position
    if(!height || !width) this._canvasContext.drawImage(image, -origin.x, -origin.y);
    else this._canvasContext.drawImage(image, -origin.x, -origin.y, height, width);

    this._canvasContext.restore();
}

Canvas.prototype.drawBackground = function (image, height, width){
    this._canvasContext.drawImage(image, 0, 0, height, width);
}
    

// Initialise canvas element
let canvas = new Canvas();
canvas._canvasContext.font = '30px sans-serif';
canvas._canvasContext.fillStyle = "white";