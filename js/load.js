/*
################################################################################
Here all external resources get loaded into the game
################################################################################
*/

//========================================================
//      This function loads in the level by reading
//      an ascii-script and placing objects accordingly
//========================================================
function loadLevel() {
  for (i = 0; i < Level1.length; i++) {
    for (e = 0; e < Level1[i].length; e++) {
      if (Level1[i][e] > 0 && Level1[i][e] < 9) {
        var block = new tile(e*32,i*32,"grass",Level1[i][e]);
        tileArray.push(block);
      } else if (Level1[i][e] === "s") {
        var block = new destructibleAsset(e*32,i*32,1);
        assetArray.push(block);
      } else if (Level1[i][e] === "t") {
        var block = new enemy(e*32,(i*32) - 18,"turtle");
        enemyArray.push(block);
      }
    }
  }
  loadGfx();
}

//========================================================
//      This function loads in the sprites and defines
//      their properties, then stores them in the object
//      that is represented by given sprite instance
//========================================================
function loadSpriteInstance(gfx_key, gfx_data, storage_var, dimensions, on_property='_sprite', for_type='generic') {
  gfx_key.src = gfx_data;
  gfx_key.onload = function() {
    switch (Array.isArray(storage_var)) {
      case true:
        for (var i=0; i<storage_var.length; i++) {
          // NOTE TO SELF: Horribly inelegant down here... make this nicer!
          if (for_type=='generic') {
              storage_var[i][on_property] = new sprite(gfx_key, dimensions[0], dimensions[1]);
          } else {
            if (storage_var[i]._type==for_type) {
              storage_var[i][on_property] = new sprite(gfx_key, dimensions[0], dimensions[1]);
            }
          }
        }
        break;
      case false:
        storage_var[on_property] = new sprite(gfx_key, dimensions[0], dimensions[1])
        break;
    }
    // Sync the loading process before continuing
    loaded++;
    if (loaded==toLoad) constructLevel();
  }
}

//========================================================
//      Execute the loadInstance function (defined below)
//      for all objects that require a graphical
//      representation
//========================================================
function loadGfx() {
  //main char
  loadSpriteInstance(gfx_key=initGfx.imgJazz, gfx_data=imgData_Jazz, storage_var=player, dimensions=[32,34])
  //Tiles
  loadSpriteInstance(gfx_key=initGfx.imgLvl, gfx_data=imgData_Diamondus, storage_var=tileArray, dimensions=[32,32])
  //Level assets
  loadSpriteInstance(gfx_key=initGfx.imgAssets, gfx_data=imgData_Assets, storage_var=assetArray, dimensions=[32,32])
  //Bullet
  loadSpriteInstance(gfx_key=initGfx.imgBullet, gfx_data=imgData_Bullet, storage_var=player, dimensions=[5,3], on_property='_bulletSprite')
  //Turtle
  loadSpriteInstance(gfx_key=initGfx.imgTurtle, gfx_data=imgData_Turtle, storage_var=enemyArray, dimensions=[66,53], on_property='_sprite', for_type='turtle')
  // NOTE: the next function call for constructLevel() is inside the loadSpriteInstance() function.
}

//========================================================
//      Execute the loadInstance function (defined below)
//      for all objects that require a graphical
//      representation
//========================================================
function setSubXY(for_object, subx, suby, sprite_var='_sprite') {
  for_object[sprite_var]._subX = subx;
  for_object[sprite_var]._subY = suby;
}

function constructLevel() {
  for (var i = 0; i < tileArray.length; i++) {
    switch  (tileArray[i]._spec) {
      case 1:
        setSubXY(for_object=tileArray[i], subx=0, suby=0);
        break;
      case 2:
        setSubXY(for_object=tileArray[i], subx=((i % 2) + 1) * 32, suby=0);
        break;
      case 4:
        setSubXY(for_object=tileArray[i], subx=96, suby=0);
        break;
      case 5:
        setSubXY(for_object=tileArray[i], subx=(i % 2) * 32, suby=32);
        break;
      case 7:
        setSubXY(for_object=tileArray[i], subx=64, suby=32);
        break;
      case 8:
        setSubXY(for_object=tileArray[i], subx=96, suby=32);
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
