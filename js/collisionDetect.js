//==================================================
//    Generic collision functions
//==================================================

function areTheyInCollision(collidable) {
  var in_collision = false;
  if ((collidable._x + collidable._sprite._width >= this._x) &&
      (collidable._x <= this._sprite._width + this._x) &&
      (collidable._y + collidable._sprite._height >= this._y) &&
      (collidable._y <= this._sprite._height + this._y)) {
        if (collidable._intact == null || collidable._intact == true) {
          in_collision = true;
        }
     }
  return in_collision;
}

function checkCollisions(instance, collidables) {
  var collidingInstances = collidables.filter(callbackfn=areTheyInCollision, thisArg=instance);
  return collidingInstances;
}

//==================================================
//    collisions between player and tiles
//==================================================
function performPlayerCollisions() {
  player._nothingBelow = true;
  //Keep player within boundaries of the game
  if (player._x > canvas.width - player._sprite._width) {
    player._x = canvas.width - player._sprite._width;
  } else if (player._x < 0) {
    player._x = 0;
  }
  for (i in tileArray) {
    if (((player._x + player._sprite._width - 2 > tileArray[i]._x) && (player._x + player._sprite._width - 2 <= tileArray[i]._x + player._xSpeed)) ||
        ((player._x + 2 >= tileArray[i]._x + tileArray[i]._width - player._xSpeed) && (player._x + 2< tileArray[i]._x + tileArray[i]._width))) {
          if ((player._y + player._sprite._height - 2 > tileArray[i]._y) && (player._y <= tileArray[i]._y + tileArray[i]._height + 1)) {
            blockPlayerHMovement()
          }
    }
    if ((player._y + player._sprite._height - 2 >= tileArray[i]._y) &&
        (player._y + player._sprite._height - 2 <= tileArray[i]._y + player._ySpeed) &&
        (player._x + player._sprite._width - 2 > tileArray[i]._x) &&
        (player._x + 2 < tileArray[i]._x + tileArray[i]._width)) {
          playerOnGround(tileArray[i])
    }
    if ((player._y >= tileArray[i]._y + tileArray[i]._height - player._ySpeed) && (player._y < tileArray[i]._y + tileArray[i]._height)) {
      if ((player._x + player._sprite._width - 2 > tileArray[i]._x) && (player._x + 2 < tileArray[i]._x + tileArray[i]._width)) {
        blockPlayerVMovement()
      }
    }
  }
}

//==================================================
//    Collision between bullets and instances
//==================================================

function performBulletCollisions() {
  destroy_these = evaluateBulletImpacts();
  destroyThese(destroy_these);
}

function evaluateBulletImpacts() {
  var to_destroy = new destroy_these_object;
  for (var i in player._bulletArray) {
    var collided_tiles = checkCollisions(player._bulletArray[i], tileArray);
    var collided_assets = checkCollisions(player._bulletArray[i], assetArray);
    if (collided_tiles.length > 0) to_destroy.bullets_indexes.push(i);
    if (collided_assets.length > 0) {
      to_destroy.bullets_indexes.push(i);
      to_destroy.assets_Ids = to_destroy.assets_Ids.concat(collided_assets.map(function(x) {
        return x._id;
      }));
    }
  }
  return to_destroy;
}

//==================================================
//    Collision between enemies and other instances
//==================================================
function performEnemyCollisions() {
  enemyData.col = evaluateEnemyCollision(tileArray);
}

function evaluateEnemyCollision(instance2Array) {
  output = [];
  for (i = 0; i < enemyArray.length; i++) {
    for (e = 0; e < instance2Array.length; e++) {
      if ((enemyArray[i]._x + enemyArray[i]._sprite._width >= instance2Array[e]._x) &&
          (enemyArray[i]._x <= instance2Array[e]._x + instance2Array[e]._sprite._width) &&
          (enemyArray[i]._y + enemyArray[i]._sprite._height - 4 > instance2Array[e]._y) &&
          (enemyArray[i]._y < instance2Array[e]._y + instance2Array[e]._sprite._height)) {
            output.push(i);
          }
    }
  }
  output = output.filter(function(item,index,inputArray) {
    return inputArray.indexOf(item) == index;
  })
  return output;
}
