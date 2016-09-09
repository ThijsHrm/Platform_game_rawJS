//Input events and functions
addEventListener("keydown", function(event) {
  keys[event.keyCode] = true;
});

addEventListener("keyup", function(event) {
  keys[event.keyCode] = false;
});


function checkInput() {

  //go left/right
  if (keys[37]) {
    if ((player._stepping == false && player._moving == false) || (player._dir == 1)) {
      player._dir = 0;
      player._stepping = true;
      player._x -= player._xSpeed / 2
      player._stepTime = setTimeout(function() {
        player._stepping = false;
        player._moving = true;
      }, 300);
    } else if (player._stepping == true) {
      player._x -= player._xSpeed / 2;
    } else {
      player._x -= player._xSpeed;
    }
  } else if (keys[39]) {
    if ((player._stepping == false && player._moving == false) || (player._dir == 0)) {
      player._dir = 1;
      player._stepping = true;
      player._x += player._xSpeed / 2
      player._stepTime = setTimeout(function() {
        player._stepping = false;
        player._moving = true;
      }, 200);
    } else if (player._stepping == true) {
      player._x += player._xSpeed / 2;
    } else {
      player._x += player._xSpeed;
    }
  } else if (player._moving == true){
    player._moving = false;
    player._sliding = true;
    player._slideTime = setTimeout(function(){
      player._sliding = false;
    }, 150);
  } else {
    clearTimeout(player._stepTime);
    player._stepping = false;
    player._moving = false;
  }

  //jump
  if (keys[32]) {
    if (player._curJump < player._maxJump && player._jumpAllowed == true) {
      player._y -= player._ySpeed;
      player._jumping = true;
      player._curJump++;
    } else {
      player._jumping = false;
    }
  } else if (player._jumping == true && player._curJump < (player._maxJump / 2)) {
    player._y -= player._ySpeed;
    player._curJump++;
  } else {
    player._jumping = false;
  }

  //shoot
  if (keys[17]) {
    if (player._shooting == false && player._shootAllowed == true) {
      player._shooting = true;
      player._shootAllowed = false;
      player._bulletArray[player._bulletArray.length] = new bullet(player._x,player._y,player._dir);
      setTimeout(function() {
        player._shooting = false;
      }, 150);
    }
  } else {
    player._shootAllowed = true;
  }
}
