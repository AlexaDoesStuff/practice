/* Tic Tac Toe game implementation
* With dynamic board (versus statically coded)
*
*
*/

// window.addEventListener('DOMContentLoaded', function() {
//   alert('You need two players to play. Click on the grey tiles to mark. Player 1 (X) will start!');
// });

const gameboard = document.getElementById('gameboard');
const winner = document.getElementById('winner');
// const Player = 

const gameBoard = (() => {
  var tileArray = ['','','','','','','','',''];
  var currentPlayer = 'X'; 
  var moves = 0;
  var win = false;

  const getCurrentPlayer = () => {return currentPlayer};

  function markTile(index) {
    var temp = currentPlayer;
    tileArray[index] = currentPlayer;

    if(currentPlayer === 'X') {
      currentPlayer = 'O';
      console.log('set o');
    } else if (currentPlayer === 'O') {
      currentPlayer = 'X';
      console.log('set x');
    };

    moves++;
    deduceTie();
    deduceWin(tileArray);
    return temp;
  }

  // In theory, could also implement promises.
  function deduceWin(tilePositions) {
    var wins = [[0,3,6], [1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];
    for(var i = 0; i < wins.length; i++) {
      var strings;
      strings = tilePositions[wins[i][0]] + tilePositions[wins[i][1]] + tilePositions[wins[i][2]];
      if(strings === 'XXX') {
        setTimeout(() => {alert("Player X Wins!")}, 100);
        var x = document.createElement('span');
        x.innerHTML = 'X';
        winner.appendChild(x);
        setTimeout(() => {location.reload()}, 2000);
      } else if (strings === 'OOO') {
        setTimeout(() => {alert("Player O Wins!")}, 100);
        var x = document.createElement('span');
        x.innerHTML = 'O';
        winner.appendChild(x);
        setTimeout(() => {location.reload()}, 2000);
      } 
    }
  }

  function deduceTie() {
    if(moves === 9 && !win) {
      setTimeout(() => {alert("No more moves!")}, 100);
    }
  }

  function createBoard() {
    const maxTiles = tileArray.length;  
    for(var i = 0; i < maxTiles; i++) {
      var newTile = document.createElement('div');
      newTile.classList.add('tile');
      var tileButton = document.createElement('button');
      tileButton.classList.add('tile-button');
      tileButton.value = i;
      newTile.appendChild(tileButton);
      gameboard.appendChild(newTile);
    }
  }

  return {deduceWin, deduceTie, createBoard, markTile, getCurrentPlayer}
})();

gameBoard.createBoard();

var tiles = document.querySelectorAll('.tile-button');
tiles.forEach((tile) => {
  tile.addEventListener('click', function() {
    tile.innerHTML = gameBoard.markTile(tile.value);
  })
})

var startGame = document.getElementById('start');

gameBoard.deduceWin();