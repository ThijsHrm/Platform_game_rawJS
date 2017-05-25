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

//Perform all action
function performAction() {
  // move stuff
  slidePlayer();
  moveEnemies();
  moveBullets();
  // check for collisions
  performBulletCollisions();
  performEnemyCollisions();
  performPlayerCollisions();
  // make the player fall if it's not on top of something
  performPlayerGravity();
}
