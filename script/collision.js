// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// Contains functions for handling collision logic relating to players & the ball

function detectMovableObjectCollision(object1, object2){
    // Detect collision between two players or a ball and a ball

    // Does the edges of the x & y coordinates of two objects intersect?
}

function resolveMovableObjectCollision(object1, object2){
    // Logic to handle collision between two objects

    // Find start x,y of both objects

    // Use formula to calculate end x,y
 
    // Detect if there are additional chain collisions

    // Return end x,y
}

function detectWallColision(object){
    // Detect a collision between a player & wall

    // Does the edges of the x & y coordinate touch x, y coordinates of the wall?
}

function resolveWallCollision(object){
    // Handle collision between wall & object

    // Find start x,y

    // Calculate based on trijectory of where ball was hit & intensity, new x,y

    // Return new path
}

function detectGoalCollision(object){
    // Detect a collision between a player or ball with the goal

    // Does the edges of the x & y coordinate touch x, y coordinates of the goal?
}

function resolveGoalCollision(object){
    // Handle collision between goal & object

    // If ball collides, increase score, and reset game state

    // If player collides, run resolvesWallCollision (player bounces like the goal is a wall)

    // Return new path
}