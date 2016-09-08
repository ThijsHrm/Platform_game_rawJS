/*
################################################################################
This file contains the main game loop
################################################################################
*/

//gameloop
function gameLoop() {
  //check if the game has loaded
  if (loaded == toLoad) {
    gfxTick++;
    saveLastPos();
    checkInput();
    performAction();
    drawGfx();
  }
  //
  if (gfxTick == 80) gfxTick = 0;
  //repeat the gameloop on completion
  window.requestAnimationFrame(gameLoop);
}

//This function is necessary for collision detection
function saveLastPos() {
  player._lastX = (player._x + 0);
  player._lastY = (player._y + 0);
}

//Perform all action
function performAction() {

  //sliding player
  if (player._sliding == true) {
    player._x -= (1 - (2 * player._dir)) * player._xSpeed;
  }

  //Keep player within boundaries of the game
  if (player._x > canvas.width - player._sprite._width) {
    player._x = canvas.width - player._sprite._width;
  } else if (player._x < 0) {
    player._x = 0;
  }

  //move bullets
  for (var i = 0; i < player._bulletArray.length; i++) {
    player._bulletArray[i]._x += 6 * -(1 - (2 * player._bulletArray[i]._dir));
  }

  //check for collisions
  var nothingBelow = true;

  for (i in tileArray) {
    if (((player._x + player._sprite._width - 2 > tileArray[i]._x) && (player._x + player._sprite._width -2 <= tileArray[i]._x + player._xSpeed)) ||
        ((player._x + 2 >= tileArray[i]._x + tileArray[i]._width - player._xSpeed) && (player._x + 2< tileArray[i]._x + tileArray[i]._width))) {
          if ((player._y + player._sprite._height - 2 > tileArray[i]._y) && (player._y < tileArray[i]._y + tileArray[i]._height)) {
            player._x = 0 + player._lastX;
          }
    }
    if ((player._y + player._sprite._height - 2 >= tileArray[i]._y) &&
        (player._y + player._sprite._height - 2 <= tileArray[i]._y + player._ySpeed) &&
        (player._x + player._sprite._width - 2 > tileArray[i]._x) &&
        (player._x +2 < tileArray[i]._x + tileArray[i]._width)) {
          player._y = tileArray[i]._y - player._sprite._height + 2;
          if (player._toLand == true) player._land();
          nothingBelow = false;
    }
    if ((player._y >= tileArray[i]._y + tileArray[i]._height - player._ySpeed) && (player._y < tileArray[i]._y + tileArray[i]._height)) {
      if ((player._x + player._sprite._width - 2 > tileArray[i]._x) && (player._x + 2 < tileArray[i]._x + tileArray[i]._width)) {
        player._y = 0 + player._lastY;
        player._curJump = 0 + player._maxJump;
        player._toLand = true;
      }
    }
  }

  //player gravity
  if (nothingBelow == true && player._jumping == false) {
    player._jumpAllowed = false;
    player._falling = true;
    player._toLand = true;
    player._y += player._ySpeed;
  }

}
