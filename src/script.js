let gameOver = false;
const tokenX = "X";
const tokenO = "O";
let currentToken = tokenX;
const player1 = prompt("Player 1, what is your name?");
const player2 = prompt("Player 2, what is your name?");
const player1Div = document.querySelector('.player1');
const player2Div = document.querySelector('.player2');

player1Div.innerText = !player1 ? 'Player 1' : player1;
player2Div.innerText = !player2 ? 'Player 2' : player2;


// toggle between 'X' and 'O' tokens and toggles players
function toggleToken() {
  currentToken = currentToken === tokenX ? tokenO : tokenX;
}

// if clicked block has no inner text then set it and toggle token
function addToken(block) {
  if (!block.innerText) {
    block.innerText = currentToken;
    toggleToken();
  }
}

function findDraw() {
  let allMoves = 0;
  gameBoard.forEach((block) => {
    if (block.innerText !== "") {
      allMoves++;
    }
  });
  //if allMoves equals 9 (and a winner is not found)
  if (allMoves === 9) {
    // TODO: add prompt to ask if they want to reset the game
    alert("DRAW");
    gameOver = true;
    resetBtn.classList.toggle('hidden')
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i]; //[2, 4, 6]
    // saving each element within the current iteration of the combination array to it's own variable
    const blockId0 = combination[0]; // 2
    const blockId1 = combination[1]; // 4
    const blockId2 = combination[2]; // 6

    const theresAWinner =
      gameBoard[blockId0].innerText &&
      gameBoard[blockId0].innerText === gameBoard[blockId1].innerText &&
      gameBoard[blockId0].innerText === gameBoard[blockId2].innerText;

    if (theresAWinner) {
      // return gameBoard[blockId0].innerText;
      return gameBoard[blockId0] === tokenX ? player1 : player2;
    }
  }
  findDraw();
}

// reset function
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", reset);
function reset() {
  currentToken = tokenX;
  gameBoard.forEach((block) => (block.innerText = ""));
  gameOver = false;
  player1Div.innerText = 'Player 1';
  player2Div.innerText = 'Player 2';
}

// add current token to the clicked block
function handleBlockClick(event) {
  // checking if the game is not over
  if (!gameOver) {
    const clickedBlock = event.target;

    addToken(clickedBlock);

    const winner = checkWinner();
    if (winner) {
      alert(`${winner} wins!`);
      gameOver = true;
      resetBtn.classList.toggle('hidden')
    }
  }
}

//gets all the blocks from the gameboard and adds event listener
const gameBoard = document.querySelectorAll(".block");
console.log(gameBoard.innerText);
gameBoard.forEach((block) => {
  block.addEventListener("click", handleBlockClick);
});
