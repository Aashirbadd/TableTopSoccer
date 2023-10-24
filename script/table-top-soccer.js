// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// This class includes functions needed for overall game logic

class TableTopSoccer{
    
    constructor(){
        this.canvas = document.getElementById("game--container");
        // Initialize all game properties here
    }

    init(){
        // Initialize game elements and event listeners

        // Setup players, ball in starting spots

        // Reset & play game timer

        // Set turn to the left player
    }

    endGame(){
        // Logic to end the game

        // Display who won, or tied

        // Pause game timer, show a play button to restart the game
    }

    pauseGame(){
        // Logic to pause game

        // Pause game timer & player user input
    }

    resumeGame(){
        // Logic to un-pause a game

        // Start game timer, and re enable player input
    }

    update(){
        // Update game state

        // Ball/Player movement physics

        // Change turn
    }

    render(){
        // Render game elements
    }

    handlePlayerInput(){
        // Allow player to cock back and strike to thier desired area
    }
}