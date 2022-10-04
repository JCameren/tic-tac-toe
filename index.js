/*<------------CONSTANTS----------->*/
const COLORS = {
  null: "white",
  '1': "red",
  '-1': "green",
};


const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [0, 4, 8],
  [2, 4, 6],
];

/*<------------STATE VARIABLES----------->*/
let board; //represent arr of squares
let turn; // holds numeric value of turn to keep track, 1 or -1
let winner; // win var that will hold 3 choices: player won, tie, in progress

/*<------------CACHED ELEMENTS----------->*/
const game = document.getElementById("board"); //board stored
console.log(game)
const playAgainBtn = document.getElementById("play_again_btn"); //play again button stored
console.log(playAgainBtn)

/*<------------EVENT LISTENERS----------->*/
game.addEventListener("click", handleTurns);
playAgainBtn.addEventListener('click', initGame)

/*<------------FUNCTIONS----------->*/
initGame();
//initializes and resets game
function initGame() {
  board = [null, null, null,
           null, null, null,
           null, null, null]
  turn = 1;
  winner = null;
  render();
  playAgainBtn.style.visibility = 'hidden'
}

function render() {
  renderGame();
  // renderMsg()
}

function renderGame() {
  board.forEach((sq, idx) => {
    const squareEl = document.getElementById(`sq-${idx}`);
    console.log(squareEl)
    squareEl.style.background = COLORS[sq];
    squareEl.className = !sq ? 'available' : ''
  });
}

function handleTurns(e) {
  const idx = parseInt(e.target.id.replace("sq-", ""));
  console.log(idx)
  if (isNaN(idx) || board[idx] || winner) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  if (winner) {
    playAgainBtn.style.visibility = 'visible'
  }
  render();
}

function getWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    if (
      Math.abs(
        board[winConditions[i][0]] +
          board[winConditions[i][1]] +
          board[winConditions[i][2]]
      ) === 3
    )
      return board[winConditions[i][0]];
  }

  if(board.includes(null)) return null
  return 'T'
}
