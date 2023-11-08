// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// Main JS Entry Point, Initialize game & set up listners here:
const WIN_SCORE = 3;

function Main(){
}

Main.prototype.init = function(){
    // Initialize game & UI
    this.UI = new UI();
    this.TableTopSoccer = new TableTopSoccer(this.UI); //Game world!
}

Main.prototype.start = function(){
    // Starts the game
    mainGame.init();
    mainGame.mainLoop();
}

Main.prototype.checkWin = function(){
    if(this.UI.leftScore < WIN_SCORE && this.UI.rightScore < WIN_SCORE) return;

    let winner = "Right";
    if(this.UI.leftScore > this.UI.rightScore) winner = "Left";

    SetPopupMessage("Game Over", winner + " Team Won!");

    setTimeout(function(){
        alert("Game Over! Press okay to restart the game!");
    }, 1000);

    this.ResetGameState();
}

Main.prototype.ResetGameState = function(){
    this.UI = new UI();
    this.TableTopSoccer = new TableTopSoccer(this.UI);
}

Main.prototype.ResetGameBoard = function(nextTurn){
    this.TableTopSoccer = new TableTopSoccer(this.UI, nextTurn);
}

// Main game loop
// If game is in progress, Update game state, Render updated game state, Update UI elements
Main.prototype.mainLoop = function(){
    canvas.clear();

    mainGame.TableTopSoccer.update();
    mainGame.TableTopSoccer.draw();

    Mouse.reset();
    Key.reset();

    this.checkWin();

    if(this.TableTopSoccer.goal){
        this.ResetGameBoard(this.TableTopSoccer.nextTurn);
    }

    requestAnimationFrame(mainGame.mainLoop.bind(this));
}

let mainGame = new Main();
