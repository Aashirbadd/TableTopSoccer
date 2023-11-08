// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107


// Contains functions to load assets in the game
let sprites = {};
let assetsStillLoading = 0;

// Loop to keep loading assets (if not fully loaded)
function assetLoadingLoop(callback){
    if(this.assetsStillLoading){
        // If assets are still loading, re-enter loop
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

function loadAssets(callback){
    // Load Asset function, which loads all the assets in the game
    function loadSprite(fileName){
        this.assetsStillLoading ++;

        let spriteImage = new Image();
        spriteImage.src = fileName;

        spriteImage.onload = function(){
            this.assetsStillLoading --;
        }

        return spriteImage;
    }


    // Get Pitch
    sprites.background = loadSprite("assets/soccer-field.svg");
    // Get Ball
    sprites.ball = loadSprite("assets/soccer-ball.svg");
    // Get Players
    sprites.player = loadSprite("assets/playerArrow.svg");
    sprites.bluePlayer = loadSprite("assets/blue-player.svg");
    sprites.redPlayer = loadSprite("assets/red-player.svg");

    assetLoadingLoop(callback);    // Keep looping untill all assets are loaded
}
    

function getBallSpriteByColor(color){

    switch(color){
        case COLOR.RED:
            return sprites.redPlayer;
        case COLOR.BLUE:
            return sprites.bluePlayer;
        case COLOR.BALL:
            return sprites.ball;
    }
}
