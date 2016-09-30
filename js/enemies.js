//This script performs all enemy-related action
function moveEnemies() {
  for (i = 0; i < enemyArray.length; i++) {
    enemyArray[i]._move(enemyArray[i]._dir);
  }
}
