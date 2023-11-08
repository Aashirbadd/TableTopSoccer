// // Course: SENG513
// // Date: Oct 23, 2023
// // Assignment 2
// // Name: Aashirbad Dhital
// // UCID: 3009 2107

// Contains frequently used in game constants between different classes

// How much you update/iteration
const DELTA = 1/100;

// Game border size
const BACKGROUND_HEIGHT = 1150;
const BACKGROUND_WIDTH = 720;
const LEFT_BORDER = 50;
const BOTTOM_BORDER = 700;
const TOP_BORDER = 20;
const RIGHT_BORDER = 1100;

// Goal post top y & bottom y coordinates.
const GOAL_POST_TOP = 310;
const GOAL_POST_BOTTOM = 412;

// Where player number hovers
const HOVER_OFFSET = 10;

// Different ball types types
const COLOR = {
    RED: 1,
    BLUE: 2,
    BALL: 3,
}


// Ball position vectors

// Center of canvas
const CENTER_POSITION = new Vector(575, 360);

// Left team player positions
const LEFT_GOALIE_POSITION = new Vector(160, 360);
const LEFT_TOP_STRIKER_POSITION = new Vector(475, 415);
const LEFT_BOTTOM_STRIKER_POSITION = new Vector(475, 300);

// Right team player positions
const RIGHT_GOALIE_POSITION = new Vector(990, 360);
const RIGHT_TOP_STRIKER_POSITION = new Vector(670, 415);
const RIGHT_BOTTOM_STRIKER_POSITION = new Vector(670, 300);

// Indexes of each player type
const BLUE_BALL_START_INDEX = 1;
const BLUE_BALL_STOP_INDEX = 3;
const RED_BALL_START_INDEX = 4;
const RED_BALL_STOP_INDEX = 6;