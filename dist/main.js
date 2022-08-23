// Factory function to make the players
const createPlayer = (name, marker) => {
    return {name, marker}
  }
  
  // Module to control gameboard
  const gameboard = (() => {
  
    // board array
    let board = [];
    for (i = 0; i < 9; i++) {
      board.push('');
    }
    
    let squares = document.querySelector('.squares');
  
    // Add squares to the gameboard
    board.forEach((item, index) => {
      let square = document.createElement('div');
      square.className = 'square';
      squares.appendChild(square);
    })
  
    // On click event toggle between players and change the mark applied to target square
    Array.from(squares.children).forEach((square, index) => {
      square.addEventListener('click', (event) => {
        if (event.target.innerHTML !== '') {
          return // do nothing
        } else { // add marker
          event.target.innerHTML = game.activePlayer.marker
        }
        board[index] = event.target.innerHTML
        console.log(board)
        game.switchPlayer();
      })
    });
  
    function resetBoard() {
      // reset board array on win
      board = [];
      for (i = 0; i < 9; i++) {
        board.push('');
      }
      // reset all gameboard markers
      Array.from(squares.children).forEach((square, index) => {
        square.innerHTML = '';
      })
    }
    
    // return any functions made in module
    return {
      board,
      resetBoard,
    }
  })(); // end gameboard module
  
  // Module to control game flow
  const game = (() => {
    const player1 = createPlayer('Player One', 'X');
    const player2 = createPlayer('Player Two', 'O');
  
    let score = document.getElementsByClassName('score')
    let player1Score = score[0]
    let player2Score = score[1]
    let roundNum = document.getElementById('counter')
    
    // Game start
    let activePlayer = player1;
    player1Score.innerHTML = 0;
    player2Score.innerHTML = 0;
    roundNum.innerHTML = 1;
  
    function switchPlayer() {
      if (game.activePlayer === player1) {
        game.activePlayer = player2
      } else if (game.activePlayer === player2) {
        game.activePlayer = player1
      } 
      game.checkWinner();
    }
  
    const winningOptions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    
    function checkWinner() {
      // iterate through winningOptions 7 win scenarios
      // If X matches an array, player 1 wins
      winningOptions.forEach((item, index) => { 
        if (gameboard.board[item[0]] === 'X' && gameboard.board[item[1]] === 'X' && gameboard.board[item[2]] === 'X') {
          alert('Player One won this round!');
          gameboard.resetBoard();
          player1Score.innerHTML++ ;
          roundNum.innerHTML++;
        } 
      // If O matches an array, player 2 wins
        else if (gameboard.board[item[0]] === 'O' && gameboard.board[item[1]] === 'O' && gameboard.board[item[2]] === 'O') {
          alert('Player Two won this round!')
          
          player2Score.innerHTML++;
          roundNum.innerHTML++;
        }
      })
    }
    
    // return any functions made in module
    return {
          switchPlayer,
          activePlayer,
          checkWinner,
    }
  })(); // end game module
  
  let restart = document.getElementById('restart')
  restart.addEventListener('click', () => {
    window.location.reload(); // restart the game
  })