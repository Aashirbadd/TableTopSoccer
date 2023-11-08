// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// This class updates & shows interactions on the UI

function UI(){
    // UI Constructor, initialize all properties here
    this.leftScore = 0;
    this.rightScore = 0;
    this.currentTime = "3:00";
    this.onPauseButtonClick = () => {}

    this.leftScoreBoard = document.getElementById("L-Score");
    this.rightScoreBoard = document.getElementById("R-Score");
    this.timer = document.getElementById("timer");
    this.pauseButton = document.getElementById("play-button");
}

UI.prototype.update = function() {
    // Updates scoreboard & timer based on variable values set
    this.leftScoreBoard.textContent = this.leftScore + "/3";
    this.rightScoreBoard.textContent = this.rightScore + "/3";
    this.timer.textContent = this.currentTime;
    this.pauseButton.onclick = this.onPauseButtonClick;
}

function SetPopupMessage(title = "vs", text = ""){
    // Changes the popup message on screen
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-message").innerText = text;
}

UI.prototype.setPopup = function(title = "vs", text = ""){
    // Sets a popup message for 3s on the screen
    SetPopupMessage(title, text);
    setTimeout(function(){
        SetPopupMessage();
    }, 3000);
}
