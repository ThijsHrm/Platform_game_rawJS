//collisions between bullets and other objects
function bulletCollision(instanceArray) {
  var destroyInstance = [];
  var returnOther = [];

  for (i = 0; i < player._bulletArray.length; i++) {
    for (e = 0; e < instanceArray.length; e++) {
      if ((player._bulletArray[i]._x + player._bulletSprite._width >= instanceArray[e]._x) &&
          (player._bulletArray[i]._x <= instanceArray[e]._x + instanceArray[e]._sprite._width) &&
          (player._bulletArray[i]._y + player._bulletSprite._height >= instanceArray[e]._y) &&
          (player._bulletArray[i]._y <= instanceArray[e]._y + instanceArray[e]._sprite._height)) {
            if (instanceArray[e]._intact == null || instanceArray[e]._intact === true) {
              destroyInstance.push(i);
            }
            returnOther.push(e);
          }
    }
  }

  for (i in destroyInstance) {
    delete player._bulletArray[destroyInstance[i]];
    player._bulletArray = (player._bulletArray.slice(0,i)).concat(player._bulletArray.slice(i+1));
  }

  return returnOther;
}

//Collision between enemies and other objects
function enemyCollision(instance2Array) {
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
  return output.filter(function(item,index,inputArray) {
    return inputArray.indexOf(item) == index;
  })
}
