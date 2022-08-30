// Factory function to make the players
const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameboard = (() => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  let squares = document.querySelector(".squares");

  // Add squares to the gameboard
  board.forEach((item, index) => {
    let square = document.createElement("div");
    square.className = "square";
    squares.appendChild(square);
  });

  Array.from(squares.children).forEach((square, index) => {
    square.addEventListener("click", (event) => {
      if (event.target.innerHTML !== "") {
        return; // do nothing
      } else {
        // add marker
        event.target.innerHTML = game.activePlayer.marker;
      }
      board[index] = event.target.innerHTML;
      game.switchPlayer();
    });
  });

  function resetBoard() {

    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }

    Array.from(squares.children).forEach((square, index) => {
      square.innerHTML = "";
    });

    game.winnerDeclared = false;

  }

  return {
    board,
    resetBoard,
  };
})(); // end gameboard module



const game = (() => {
  const player1 = createPlayer("Player One", "X");
  const player2 = createPlayer("Player Two", "O");

  let score = document.getElementsByClassName("score");
  let player1Score = score[0];
  let player2Score = score[1];
  let roundNum = document.getElementById("counter");

  let activePlayer = player1;
  player1Score.innerHTML = 0;
  player2Score.innerHTML = 0;
  roundNum.innerHTML = 1;
  let winnerDeclared = false;

  const playerDisplay = document.getElementsByClassName('player')

  function switchPlayer() {
    if (game.activePlayer === player1) {
      game.activePlayer = player2;
      playerDisplay[0].classList.remove('activeplayer');
      playerDisplay[1].classList.add('activeplayer');
    } else if (game.activePlayer === player2) {
      game.activePlayer = player1;
      playerDisplay[1].classList.remove('activeplayer');
      playerDisplay[0].classList.add('activeplayer');
    }
    checkWinner();
  }

  const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWinner() {
    winningOptions.forEach((item, index) => {
      // player 1 wins
      if (
        gameboard.board[item[0]] === "X" &&
        gameboard.board[item[1]] === "X" &&
        gameboard.board[item[2]] === "X"
      ) {
        game.winnerDeclared = true;
        alert("Player One won this round!");
        setTimeout(() => {
          gameboard.resetBoard();
        }, 1000);
        player1Score.innerHTML++;
        roundNum.innerHTML++;
      }

      // player 2 wins
      else if (
        gameboard.board[item[0]] === "O" &&
        gameboard.board[item[1]] === "O" &&
        gameboard.board[item[2]] === "O"
      ) {
        game.winnerDeclared = true;
        alert("Player Two won this round!");
        setTimeout(() => {
          gameboard.resetBoard();
        }, 1000);
        player2Score.innerHTML++;
        roundNum.innerHTML++;
      }

      // // it's a tie
      else if (
        !gameboard.board.includes('') && game.winnerDeclared === false
      ) {
        alert("It's a tie!");
        gameboard.resetBoard();
      } 
    });
  }

  return {
    switchPlayer,
    activePlayer,
    checkWinner
  };
})(); // end game module

let restart = document.getElementById("restart");
restart.addEventListener("click", () => {
  window.location.reload(); // restart the game
});
