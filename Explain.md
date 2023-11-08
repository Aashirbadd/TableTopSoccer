#### Algorithm 1: `Ball.prototype.collideWithBall()`

* Used ChatGPT to learn about simple collision algorithms, and also additional online resources. I will explain the algorithm below.

1. First step is to find the normal vector between this ball, and the inputted ball. This is the vector (position with x, y coordinates) that is in the direction between the coordinates of the center of each ball.
   - `n = new Vector(this.x - ball.x, this.y - ball-y)`

2. Find the length of the normal vector `n`. This represents the distance between the center of both balls.

3. If the distance is greater than the ball diameter, it means the balls don't touch (since each ball's edge is its center point + its radius). If the distance between the center of both balls is greater than `2 * radius = diameter`, then they don't touch, thus they don't collide, and we can return from the function.

4. If the distance suggests they collide, we move forward with the function.

5. Account for possible collision overlap and find the minimum translation distance (`mtd`) to move the balls apart so they no longer intersect with each other.
   - `const mtd = n.mult((BALL_DIAMETER - dist) / dist)`

6. Push and pull the balls apart by adding half of `mtd` to this ball and subtracting half of `mtd` from the inputted ball.

7. Find the unit normal vector, which is the vector normal to the surfaces of the ball where they collide.
   - `const un = n.mult(1 / n.length())`

8. Find the unit tangent vector, which is the vector tangent to the surfaces of the ball where they collide.
   - `const ut = new Vector(-un.y, un.x)`

9. Use dot product to convert velocities into normal and tangential components. This projects velocities to vectors in both directions.

10. Find new normal velocities (velocities in the normal direction).

11. Convert the normal and tangential scalar velocities into vectors (coordinates).

12. Update the velocity of each ball to be the sum of their tangential velocity (parallel to the surface at the point of collision) and normal velocity (right angle to the surface at the point of collision).

13. Set the moving properties of both balls to true!

### Algorithm 2: `Ball.prototype.collideWithTable()`

This is an algorithm to check if a ball has collided with the table boundaries or not.

1. If the ball isn't moving at all, its position has not updated, so return, as there is no collision.

2. Set the collision variable to false (since it's moving) and are unsure if it's collided with anything yet.

3. If the y position of the ball is less than or equal to the y coordinate at the top of the table + the ball's radius, it means the ball has collided with the top of the table.
   3.1. Move the ball's y position to the top of the table minus its radius and change its vertical velocity to be the opposite direction.
   3.2. Set `collided` to true, as a collision has occurred.

4. If the x position of the ball is greater than or equal to the x coordinate at the right of the table + the ball's radius, it means the ball has collided with the right of the table.
   4.1. Move the ball's x position to the right of the table minus its radius and change its horizontal velocity to be the opposite direction.
   4.2. Set `collided` to true, as we know a collision has occurred.

5. If the y position of the ball is greater than or equal to the y coordinate at the bottom of the table + the ball's radius, it means the ball has collided with the bottom of the table.
   5.1. Move the ball's y position to the bottom of the table minus its radius and change its vertical velocity to be the opposite direction.
   5.2. Set `collided` to true, as a collision has occurred.

6. If the x position of the ball is less than or equal to the x coordinate at the left of the table + the ball's radius, it means the ball has collided with the left of the table.
   6.1. Move the ball's x position to the left of the table minus its radius and change its horizontal velocity to be the opposite direction.
   6.2. Set `collided` to true, as a collision has occurred.

7. Lastly, multiply the velocity by 0.98 to represent a velocity loss after the collision.

### Algorithm 3: `TableTopSoccer.prototype.handleGoal()`

In this algorithm, we handle what happens when a goal is scored.

1. Check if the y coordinate of `this.soccerBall` is between `this.goalPost.top` and `this.goalPost.bottom`. If this is not the case, return from the function.

2. If we are at this point of the function, we know the ball is in the y coordinate to be a potential goal.

3. Check if the right team has scored:
   - If `this.soccerBall.position.x >= this.table.rightX - BALL_RADIUS`, it means the x position of the ball is at the right wall of the board.
   3.1. In this case, set up a popup to notify that the right team has scored.
   3.2. Set the `nextTurn` variable to refer to `COLOR.RED`, meaning that the red team (the conceding team) will have the next turn. This is important for resetting the board.
   3.3. Set `this.goal` to true, which is required to reset board positions back to the initial state.
   3.4. Lastly, increment the right team's score in the UI.

4. Check if the left team has scored:
   - If `this.soccerBall.position.x <= this.table.leftX + BALL_RADIUS`, it means the x position of the ball is at the left wall of the board.
   4.1. In this case, set up a popup to notify that the left team has scored.
   4.2. Set the `nextTurn` variable to refer to `COLOR.BLUE`, meaning that the blue team (the conceding team) will have the next turn. This is important for resetting the board.
   4.3. Set `this.goal` to true, which is required to reset board positions back to the initial state.
   4.4. Lastly, increment the left team's score in the UI. Unlike the game board, the UI score does not get reset and maintains its state after the goal.
