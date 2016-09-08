//draw function
function drawGfx() {
  //clear the canvas
  context.clearRect(-320,-224,3200,2240);

  //update the player image
  if (player._dir == 0) {
    if (player._jumping == true) {
      player._sprite._subX = (player._sprite._width * player._jumpLeft[0][0]);
      player._sprite._subY = (player._sprite._height * player._jumpLeft[0][1]);
    } else if (player._falling == true) {
      player._sprite._subX = (player._sprite._width * player._fallLeft[0][0]);
      player._sprite._subY = (player._sprite._height * player._fallLeft[0][1]);
    } else if (player._stepping == true) {
      player._sprite._subX = (player._sprite._width * player._stepLeft[0][0]);
      player._sprite._subY = (player._sprite._height * player._stepLeft[0][1]);
    } else if (player._sliding == true || player._landed == true) {
      player._sprite._subX = (player._sprite._width * player._landLeft[0][0]);
      player._sprite._subY = (player._sprite._height * player._landLeft[0][1]);
    } else if (player._moving == true) {
      var i = Math.floor((gfxTick % 8) / 2)
      player._sprite._subX = (player._sprite._width * player._runLeft[i][0]);
      player._sprite._subY = (player._sprite._height * player._runLeft[i][1]);
    } else if (player._shooting == true) {
      player._sprite._subX = (player._sprite._width * player._shootLeft[0][0]);
      player._sprite._subY = (player._sprite._height * player._shootLeft[0][1]);
    } else {
      player._sprite._subX = (player._sprite._width * player._idleLeft[0][0]);
      player._sprite._subY = (player._sprite._height * player._idleLeft[0][1]);
    }
  } else if (player._dir == 1) {
    if (player._jumping == true) {
      player._sprite._subX = (player._sprite._width * player._jumpRight[0][0]);
      player._sprite._subY = (player._sprite._height * player._jumpRight[0][1]);
    } else if (player._falling == true) {
      player._sprite._subX = (player._sprite._width * player._fallRight[0][0]);
      player._sprite._subY = (player._sprite._height * player._fallRight[0][1]);
    } else if (player._stepping == true) {
      player._sprite._subX = (player._sprite._width * player._stepRight[0][0]);
      player._sprite._subY = (player._sprite._height * player._stepRight[0][1]);
    } else if (player._sliding == true || player._landed == true) {
      player._sprite._subX = (player._sprite._width * player._landRight[0][0]);
      player._sprite._subY = (player._sprite._height * player._landRight[0][1]);
    } else if (player._moving == true) {
      var i = Math.floor((gfxTick % 8) / 2)
      player._sprite._subX = (player._sprite._width * player._runRight[i][0]);
      player._sprite._subY = (player._sprite._height * player._runRight[i][1]);
    } else if (player._shooting == true) {
      player._sprite._subX = (player._sprite._width * player._shootRight[0][0]);
      player._sprite._subY = (player._sprite._height * player._shootRight[0][1]);
    } else {
      player._sprite._subX = (player._sprite._width * player._idleRight[0][0]);
      player._sprite._subY = (player._sprite._height * player._idleRight[0][1]);
    }
  }

  //draw Tiles
  for (var i = 0; i < tileArray.length; i++) {
    context.drawImage(
      tileArray[i]._sprite._img,
      //subsprites
      tileArray[i]._sprite._subX,
      tileArray[i]._sprite._subY,
      tileArray[i]._sprite._width,
      tileArray[i]._sprite._height,
      //location
      tileArray[i]._x, tileArray[i]._y,
      //scale = 1
      tileArray[i]._sprite._width,
      tileArray[i]._sprite._height);
  }

  //draw Assets
  for (var i = 0; i < assetArray.length; i++) {
    context.drawImage(
      assetArray[i]._sprite._img,
      //subsprites
      assetArray[i]._sprite._subX,
      assetArray[i]._sprite._subY,
      assetArray[i]._sprite._width,
      assetArray[i]._sprite._height,
      //location
      assetArray[i]._x, assetArray[i]._y,
      //scale = 1
      assetArray[i]._sprite._width,
      assetArray[i]._sprite._height);
  }

  //draw bullets
  for (var i = 0; i < player._bulletArray.length; i++) {
    context.drawImage(
      player._bulletSprite._img,
      //subsprites
      0,0,5,3,
      //location
      player._bulletArray[i]._x, player._bulletArray[i]._y,
      //scale = 1
      5,3);
  }

  //draw the player
  context.drawImage(
    player._sprite._img,
    //subsprites
    player._sprite._subX,
    player._sprite._subY,
    player._sprite._width,
    player._sprite._height,
    //location
    player._x, player._y,
    //scale = 1
    player._sprite._width,
    player._sprite._height);

  context.translate(-(player._x-player._lastX),-(player._y-player._lastY));

}
