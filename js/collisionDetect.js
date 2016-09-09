//collisions between other objects
function bulletCollision(instanceArray) {
  var destroyInstance = [];
  var returnOther = [];

  for (i = 0; i < player._bulletArray.length; i++) {
    for (e = 0; e < instanceArray.length; e++) {
      if ((player._bulletArray[i]._x + player._bulletSprite._width >= instanceArray[e]._x) &&
          (player._bulletArray[i]._x <= instanceArray[e]._x + instanceArray[e]._sprite._width) &&
          (player._bulletArray[i]._y + player._bulletSprite._height >= tileArray[e]._y) &&
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
