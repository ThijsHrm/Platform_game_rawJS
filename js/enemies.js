//This script performs all enemy-related action
function moveEnemies() {
  // If an enemy collides with a tile, turn it around
  enemyData.col = enemyCollision(tileArray);
  for (i in enemyData.col) {
    enemyArray[enemyData.col[i]]._dir == 0 ?
      enemyArray[enemyData.col[i]]._dir = 1 :
      enemyArray[enemyData.col[i]]._dir = 0 ;
  }
  //Move each enemy on every step
  for (i = 0; i < enemyArray.length; i++) {
    enemyArray[i]._move(enemyArray[i]._dir);
  }
}
