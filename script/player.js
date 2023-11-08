// // Course: SENG513
// // Date: Oct 23, 2023
// // Assignment 2
// // Name: Aashirbad Dhital
// // UCID: 3009 2107

// Contains functions to handle functionality allowing player to move thier selected ball

const PLAYER_ORIGIN = new Vector(-20, 75);
const MAX_POWER = 4000;
const PLAYER_SIZE = new Vector(150, 150);

function Player(position, onShoot){
    this.position = position;
    this.rotation = 0;
    this.origin = PLAYER_ORIGIN.copy();
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
}

// Updates player state
Player.prototype.update = function(){
    if(!this.shot){

        if(Mouse.left.down){
            this.increasePower();
        } else if (this.power > 0){
            this.shoot();
        }
    
        this.updateRotation();
    }
}

// Draws the player onto the canvas
Player.prototype.draw = function(){
    if(!this.shot){
        canvas.drawImage(sprites.player, this.position, this.origin, this.rotation, PLAYER_SIZE.x, PLAYER_SIZE.y);
    }
}

Player.prototype.updateRotation = function(){
    // Ensures player arrow is angled towards mouse

    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;

    // Angle torwards mouse = ArcTangent(opposite/adjacent)
    this.rotation = Math.atan2(opposite, adjacent);
}

// Increase power of the shot you're about to take
Player.prototype.increasePower = function(){
    if(this.power > MAX_POWER) return;
    
    this.power += 100;
    this.origin.x += 5;
}

// Calls the shoot function on it's respective ball
Player.prototype.shoot = function(){
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.shot = true;
}

// Reposition player onto another ball
Player.prototype.reposition = function(position, onShoot){
    this.onShoot = onShoot;
    this.position = position.copy();
    this.origin = PLAYER_ORIGIN.copy();
    this.shot = false;
}