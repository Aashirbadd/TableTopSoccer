// Course: SENG513
// Date: Oct 23, 2023
// Assignment 2
// Name: Aashirbad Dhital
// UCID: 3009 2107

// Contains all the logic relating to the movable balls

const BALL_ORIGIN = new Vector(25,25);
const BALL_DIAMETER = 50;
const BALL_RADIUS = BALL_DIAMETER/2;

function Ball(position, color){
    this.originalPosition = position;
    this.position = position;
    this.velocity = new Vector();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
}

// Reset ball to original position
Ball.prototype.reset = function(){
    this.position.x = this.originalPosition.x;
    this.position.y = this.originalPosition.y;
    this.velocity = new Vector();
    this.moving = false;
}

// Update ball position in game map
Ball.prototype.update = function(delta){
    if(!this.moving) return;

    this.position.addTo(this.velocity.mult(delta)); // Move ball
    this.velocity = this.velocity.mult(0.98);       // Account for friction

    if(this.velocity.length() < 5){
        this.velocity = new Vector();               // Reset speed
        this.moving = false;
    }
}

Ball.prototype.draw = function(){
    if(this.sprite === sprites.ball)
        canvas.drawImage(this.sprite, this.position, BALL_ORIGIN, null, 50, 50);
    else
        canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}

Ball.prototype.shoot = function(power, rotation){
    // Give velocity respective power in each direction (x, y)
    this.velocity = new Vector(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;
}

Ball.prototype.collideWithBall = function(ball){
    /*
        * Citation for collision logic theory: https://www.vobarian.com/collisions/2dcollisions2.pdf
    */

    // Find the normal vector (vector between the two balls)
    const n = this.position.subtract(ball.position);

    // Find the distance between the centers of both balls
    const dist = n.length();

    // Distance between the balls centers are greater than the diameter
    // They don't touch, return.
    if(dist > BALL_DIAMETER) return;

    // Find minimum translation distance --> Min distance an object can move to not intersect with collided object
    const mtd = n.mult((BALL_DIAMETER - dist) / dist);

    // Push-pull the balls apart
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.subtract(mtd.mult(1/2));


    // Find the unit normal vector --> Vector adjacent to the surfaces of the ball
    const un = n.mult(1/n.length());


    // Find the unit tangent vector --> Vector tangent to the surfaces of the ball
    const ut = new Vector(-un.y, un.x);

    // Use dot product to convert velocities into normal & tangentental components.
    // Project velocities onto the unit normal and unit tangent vectors
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    // Find new normal velocities
    let v1nTag = v2n;
    let v2nTag = v1n;


    // Convert the scalar normal & tangential velocities into vectors
    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);


    // Final --> Update velocities
    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;
}

Ball.prototype.collideWithTable = function(table){
    if(!this.moving){
        return;
    }
    let collided = false;

    if(this.position.y <= table.topY + BALL_RADIUS){
        this.position.y = table.topY + BALL_RADIUS;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collided = true;
    }
    if(this.position.x >= table.rightX - BALL_RADIUS){
        this.position.x = table.rightX - BALL_RADIUS;
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collided = true;
    }
    if(this.position.y >= table.bottomY - BALL_RADIUS){
        this.position.y = table.bottomY - BALL_RADIUS;
        this.velocity = new Vector(this.velocity.x, -this.velocity.y);
        collided = true;
    }
    if(this.position.x <= table.leftX + BALL_RADIUS){
        this.position.x = table.leftX + BALL_RADIUS;
        this.velocity = new Vector(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(collided){
        this.velocity = this.velocity.mult(0.98);   // Decelleration after collision
    }
}

Ball.prototype.collideWith = function(object){
    
    if(object instanceof Ball){
        this.collideWithBall(object);
    } else {
        this.collideWithTable(object);
    }
}