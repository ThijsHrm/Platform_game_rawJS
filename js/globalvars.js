/*
################################################################################
This script initializes all graphics, declare global variables, objects etc...
################################################################################
*/
// shim layer with setTimeout fallback -> Credits to Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//Connect to the canvas
var canvas  = document.getElementById("Game");
var context = canvas.getContext("2d");
//render scaled screen without interpolation [see also: main.css]
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;
context.translate(-16,-34);

//initialize Graphics to be loaded
var initGfx = {
  //main char
  imgJazz: new Image(),
  imgLvl: new Image(),
  imgBullet: new Image(),
  imgAssets: new Image()
};

//  Declare global variables
//Load files
var toLoad = Object.keys(initGfx).length;
var loaded = 0;
//Input variable
var keys = [];
//gfxTick increases every frame, used as a multiplier for sliding through spritesheets
var gfxTick = 0;
//This array contains all level data, this gets imported in loadGfx.js
var tileArray = [];
var assetArray = [];

//A global sprite class/function to read each seperate frame from a spritesheet
function sprite(image,width,height) {
  this._img = image;
  this._width = width;
  this._height = height;
  this._subX = 0;
  this._subY = 0;
};

//The player object is initialized here
var player = {
  // properties affecting movement dynamics
  _xSpeed: 4,
  _ySpeed: 4,
  _maxJump: 20,
  //boundingbox gets defined when the sprite is loaded
  _boundingBox: 0,

  // Properties related to the player graphics
  // These arrays contain the location of the relevant images on a 32*34 px grid on the spritesheet
  _idleLeft: [[4,1]],
  _idleRight: [[0,0]],
  _runLeft: [[3,1],[2,1],[1,1],[0,1]],
  _runRight: [[1,0],[2,0],[3,0],[4,0]],
  _jumpLeft: [[3,2]],
  _jumpRight: [[0,2]],
  _fallLeft: [[2,2]],
  _fallRight: [[1,2]],
  _stepLeft: [[2,4]],
  _stepRight: [[0,3]],
  _landLeft: [[1,4]],
  _landRight: [[1,3]],
  _shootLeft: [[0,4]],
  _shootRight: [[2,3]],

  // properties keeping track of the immediate player movement and location
  _x: 160,
  _y: 130,
  _lastX: 0,
  _lastY: 0,
  _dir: 1,
  _toLand: true,
  _landed: false,
  _sliding: false,
  _stepping: false,
  _moving: false,
  _jumping: false,
  _falling: false,
  _jumpAllowed: true,
  _shooting: false,
  _shootAllowed: true,
  _bulletArray: [],
  _curJump: 0,
  _land: function() {
      player._toLand = false;
      player._jumpAllowed = true;
      player._falling = false;
      player._curJump = 0;
      player._landed = true;
      setTimeout(function() {
        player._landed = false;
      }, 100);
    }

  //Timer properties are only defined once needed
  //_slideTime
  //_stepTime
  //_landTime
};

//bullet class/function
function bullet(_x,_y,_dir) {
  this._x = _x;
  this._y = _y;
  this._dir = _dir;
  this._dir == 1 ? this._x += 32 : this._x -= 4;
  this._y += 23;
}

function destructableAsset(_x,_y,_spec) {
  this._x = _x;
  this._y = _y;
  this._spec = _spec;
  this._width = 32;
  this._height = 32;
  this._intact = true;
}

//The tile function/class can be found here
function tile(_x,_y,_type,_spec) {
  this._x = _x;
  this._y = _y;
  this._type = _type;
  this._spec = _spec;
  this._width = 32;
  this._height = 32;
}


loadLevel();
