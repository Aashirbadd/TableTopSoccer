// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// Player logic & attributes

import * as Constants from './Constants';

class Player{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Constants.PLAYER_RADIUS;
    }

    draw(){
        // Draw the player on the screen
    }

    move(x, y){
        // Update the players position on the board
    }

}

export default Player;