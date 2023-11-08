// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// This class includes functions needed for overall game board logic

function TableTopSoccer(ui, turn = COLOR.BLUE){
    // Contains all physical objects of the game, Initialize all game properties here
    this.ui = ui;
    this.turn = turn;
    this.nextTurn = COLOR.RED;
    this.goal = false;

    this.balls = this.initialiseBalls();

    this.soccerBall = this.balls[0];
    
    this.playerBall = this.balls[BLUE_BALL_START_INDEX];
    if(this.turn === COLOR.RED) this.playerBall = this.balls[RED_BALL_START_INDEX];

    this.player = new Player(
        this.playerBall.position, 
        this.playerBall.shoot.bind(this.playerBall)
        );

    this.table = {
        topY : TOP_BORDER,
        rightX : RIGHT_BORDER,
        bottomY : BOTTOM_BORDER,
        leftX : LEFT_BORDER,
    };

    this.goalPost = {
        top: GOAL_POST_TOP,
        bottom: GOAL_POST_BOTTOM,
    }
}

// Initialize the game balls onto thier start positions
TableTopSoccer.prototype.initialiseBalls = function (){
    return [
        new Ball(CENTER_POSITION.copy(), COLOR.BALL), //0

        new Ball(LEFT_GOALIE_POSITION.copy(), COLOR.BLUE), //1
        new Ball(LEFT_TOP_STRIKER_POSITION.copy(), COLOR.BLUE), //2
        new Ball(LEFT_BOTTOM_STRIKER_POSITION.copy(), COLOR.BLUE), //3

        new Ball(RIGHT_GOALIE_POSITION.copy(), COLOR.RED), //4
        new Ball(RIGHT_TOP_STRIKER_POSITION.copy(), COLOR.RED), //5
        new Ball(RIGHT_BOTTOM_STRIKER_POSITION.copy(), COLOR.RED), //6
    ];
}

// Draws a number on top of each ball so user can select which one thier player shoots with
TableTopSoccer.prototype.drawOptions = function (){
    if(this.player.shot) return;

    if(this.turn === COLOR.BLUE){
        for(let i = BLUE_BALL_START_INDEX; i <= BLUE_BALL_STOP_INDEX; i++){
            let x = this.balls[i].position.x - HOVER_OFFSET;
            let y = this.balls[i].position.y + HOVER_OFFSET;
            
            canvas._canvasContext.fillText(i, x, y);
        }
    } else if (this.turn === COLOR.RED){
        for(let i = RED_BALL_START_INDEX; i <= RED_BALL_STOP_INDEX; i++){
            let x = this.balls[i].position.x - HOVER_OFFSET;
            let y = this.balls[i].position.y + HOVER_OFFSET;
            
            canvas._canvasContext.fillText(i, x, y);
        }
    }
}

// Allows player to select which ball to shoot by key press
TableTopSoccer.prototype.selectPlayer = function (){
    let keyInt = parseInt(Key.value, 10);

    if(!keyInt) return;

    if(this.turn === COLOR.BLUE && keyInt >= BLUE_BALL_START_INDEX && keyInt <= BLUE_BALL_STOP_INDEX){
        this.changePlayer(this.balls[keyInt]);
    } else if(this.turn === COLOR.RED && keyInt >= RED_BALL_START_INDEX && keyInt <= RED_BALL_STOP_INDEX){
        this.changePlayer(this.balls[keyInt]);
    }
}

// Change the player that the user can shoot with
TableTopSoccer.prototype.changePlayer = function(ball){
    this.playerBall = ball;
    this.player.reposition(this.playerBall.position, this.playerBall.shoot.bind(this.playerBall));
}

// Switches the turn to allow the opposite team to move thier player
TableTopSoccer.prototype.switchTurn = function(){
    if(this.turn === COLOR.RED){ 
        this.turn = COLOR.BLUE;
        this.changePlayer(this.balls[BLUE_BALL_START_INDEX]);
    }
    else {
        this.turn = COLOR.RED;
        this.changePlayer(this.balls[RED_BALL_START_INDEX]);
    }
}

TableTopSoccer.prototype.ballIsWithinGoalPostRange = function (){
    return (this.soccerBall.position.y >= this.goalPost.top && this.soccerBall.position.y <= this.goalPost.bottom);
}

// Check if a goal has been scored & handle accordingly
TableTopSoccer.prototype.handleGoal = function(){
    if(!this.ballIsWithinGoalPostRange())
        return;
    
    // If right team has scored
    if(this.soccerBall.position.x >= this.table.rightX - BALL_RADIUS){
        this.ui.setPopup("GOAL", "Left team scored.");
        this.nextTurn = COLOR.RED;
        this.goal = true;
        this.ui.leftScore += 1;
    }

    // If left team has scored
    if(this.soccerBall.position.x <= this.table.leftX + BALL_RADIUS){
        this.ui.setPopup("GOAL", "Right team scored.");
        this.nextTurn = COLOR.BLUE;
        this.goal = true;
        this.ui.rightScore += 1;
    }
}

// Check & handle collisions
TableTopSoccer.prototype.handleCollisions = function(){
    for(let i = 0 ; i < this.balls.length; i++){
        this.balls[i].collideWith(this.table);
        for(let j = i+1; j < this.balls.length; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWith(secondBall);
        }
    }
}

TableTopSoccer.prototype.update = function(){
    this.handleCollisions();
    this.handleGoal();

    this.ui.update();
    this.player.update();

    for(let i = 0; i < this.balls.length; i++){
        this.balls[i].update(DELTA);
    }

    if(Key.down){
        this.selectPlayer();
    }

    if(!this.ballsMoving() && this.player.shot){
        // Balls are not moving the shot is completed, end of a turn
        // This would be let a player pick & choose ball that way
        this.switchTurn();
    }
}

// Draws all game elements to the canvas
TableTopSoccer.prototype.draw = function(){
    canvas.drawBackground(sprites.background, BACKGROUND_HEIGHT, BACKGROUND_WIDTH);

    for(let i = 0; i < this.balls.length; i++){
        this.balls[i].draw();
    }

    this.player.draw();
    this.drawOptions();
}

// Returns true if any balls are still moving (+ velocity)
TableTopSoccer.prototype.ballsMoving = function(){
    for(let i = 0; i < this.balls.length; i++){
        if(this.balls[i].moving){
            return true;
        }
    }

    return false;
}