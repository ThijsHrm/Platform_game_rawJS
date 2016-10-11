/*
################################################################################
Here all external resources get loaded into the game
################################################################################
*/

function loadLevel() {
  for (i = 0; i < Level1.length; i++) {
    for (e = 0; e < Level1[i].length; e++) {
      if (Level1[i][e] > 0 && Level1[i][e] < 9) {
        var block = new tile(e*32,i*32,"grass",Level1[i][e]);
        tileArray.push(block);
      } else if (Level1[i][e] === "s") {
        var block = new destructableAsset(e*32,i*32,1);
        assetArray.push(block);
      } else if (Level1[i][e] === "t") {
        var block = new enemy(e*32,(i*32) - 18,"turtle");
        enemyArray.push(block);
      }
    }
  }
  loadGfx();
}


//Load graphics
function loadGfx() {
  //main char
  initGfx.imgJazz.src = imgData_Jazz;
  initGfx.imgJazz.onload = function() {
    player._sprite = new sprite(initGfx.imgJazz, 32, 34);
    loaded++;
    if (loaded == toLoad) gameLoop();
  };

  //Tiles
  initGfx.imgLvl.src = imgData_Diamondus;
  initGfx.imgLvl.onload = function() {
    for (var i = 0; i < tileArray.length; i++) {
      tileArray[i]._sprite = new sprite(initGfx.imgLvl, 32, 32);
    }
    loaded++;
    if (loaded == toLoad) constructLevel();
  };

  //Level assets
  initGfx.imgAssets.src = imgData_Assets;
  initGfx.imgAssets.onload = function() {
    //var spriteAssets = new sprite(initGfx.imgAssets,32,32);
    for (var i = 0; i < assetArray.length; i++) {
      assetArray[i]._sprite = new sprite(initGfx.imgAssets,32,32);
    }
    loaded++;
    if (loaded == toLoad) constructLevel();
  }

  //bullet
  initGfx.imgBullet.src = imgData_Bullet;
  initGfx.imgBullet.onload = function() {
    player._bulletSprite = new sprite(initGfx.imgBullet,5,3);
    loaded++;
    if (loaded == toLoad) constructLevel();
  }

  //turtle
  initGfx.imgTurtle.src = imgData_Turtle;
  initGfx.imgTurtle.onload = function() {
    for (var i = 0; i < enemyArray.length; i++) {
      switch (enemyArray[i]._type) {
        case "turtle":
          enemyArray[i]._sprite = new sprite(initGfx.imgTurtle,66,53);
          break;
      }
    }
    loaded++;
    if (loaded == toLoad) constructLevel();
  }
}

//Construct all tiles
function constructLevel() {
  for (var i = 0; i < tileArray.length; i++) {
    switch  (tileArray[i]._spec) {
      case 1:
        tileArray[i]._sprite._subX = 0;
        tileArray[i]._sprite._subY = 0;
        break;
      case 2:
        tileArray[i]._sprite._subX = ((i % 2) + 1) * 32;
        tileArray[i]._sprite._subY = 0;
        break;
      case 4:
        tileArray[i]._sprite._subX = 96;
        tileArray[i]._sprite._subY = 0;
        break;
      case 5:
        tileArray[i]._sprite._subX = (i % 2) * 32;
        tileArray[i]._sprite._subY = 32;
        break;
      case 7:
        tileArray[i]._sprite._subX = 64;
        tileArray[i]._sprite._subY = 32;
        break;
      case 8:
        tileArray[i]._sprite._subX = 96;
        tileArray[i]._sprite._subY = 32;
        break;
    }
  }
  for (var i = 0; i < assetArray.length; i++) {
    switch  (assetArray[i]._spec) {
      case 1:
        assetArray[i]._sprite._subX = 0;
        assetArray[i]._sprite._subY = 0;
        break;
    }
  }
  gameLoop();
}
