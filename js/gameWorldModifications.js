function destroyThese(to_destroy) {
  // bullets
  for (var i in to_destroy.bullets_indexes) {
    delete player._bulletArray[to_destroy.bullets_indexes[i]];
    player._bulletArray = (player._bulletArray.slice(0,to_destroy.bullets_indexes[i])).concat(player._bulletArray.slice(to_destroy.bullets_indexes[i]+1));
  }
  // assets
  if (to_destroy.assets_Ids.length > 0) {
    assetArray.forEach(function(asset) {
      if (to_destroy.assets_Ids.indexOf(asset._id) > -1) {
        asset._sprite._subX += 32;
        asset._intact = false;
      }
    })
  }
}

// move enemies
function moveEnemies() {
  // If an enemy collides with a tile, turn it around
  for (i in enemyData.col) {
    enemyArray[enemyData.col[i]]._dir == 0 ? enemyArray[enemyData.col[i]]._dir = 1 : enemyArray[enemyData.col[i]]._dir = 0;
  }
  //Move each enemy on every step
  for (i = 0; i < enemyArray.length; i++) {
    enemyArray[i]._move(enemyArray[i]._dir);
  }
}

// move bullets
function moveBullets() {
  for (var i in player._bulletArray) {
    player._bulletArray[i]._x += 6 * -(1 - (2 * player._bulletArray[i]._dir));
  }
}

//sliding player
function slidePlayer() {
  if (player._sliding == true) {
    player._x -= (1 - (2 * player._dir)) * player._xSpeed;
  }
}

function blockPlayerHMovement() {
  player._x = 0 + player._lastX;
}

function blockPlayerVMovement() {
  player._y = 0 + player._lastY;
  player._curJump = 0 + player._maxJump;
  player._toLand = true;
}

function playerOnGround(ground_tile) {
  player._nothingBelow = false;
  player._y = ground_tile._y - player._sprite._height + 2;
  if (player._toLand == true) player._land();
}

//player gravity
function performPlayerGravity() {
  if (player._nothingBelow == true && player._jumping == false) {
    player._jumpAllowed = false;
    player._falling = true;
    player._toLand = true;
    player._y += player._ySpeed;
  }
}

//This function is necessary for collision detection
function saveLastPos() {
  player._lastX = (player._x + 0);
  player._lastY = (player._y + 0);
}
