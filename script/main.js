// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// Main JS Entry Point, Initialize game & set up listners here:

// Import main classses relating to game logic & physics
import TableTopSoccer from './table-top-soccer';
import UI from './ui';

// Initialize game & UI
const game = new TableTopSoccer().init;
const ui = new UI().init;

// Create an event listner for starting the game 
const startButton = document.getElementById("play-button");
startButton.addEventListener("click", () => {
    // Use game & ui classes to start the game here

    // Setup the game state using game class

    // Update those state using the ui
})

// Create an event listner for starting the game 
const pauseButton = document.getElementById("pause-button");
startButton.addEventListener("click", () => {
    // Use game & ui classes to pause the game here

    // Pause the game state using game class

    // Show those changes usign the UI class
})

// Find all players, and add them to the right TEAM 
// & add event listeners to them so they can be interacted with

const players = document.getElementsByName("player");

players.forEach(p => {
    // team.players.add(new Player(p.x, p.y, p.color));
});


// Main game loop

function gameLoop(){
    // If game is in progress
        // Update game state
        // Render updated game state
        // Update UI elements
}
