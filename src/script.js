const tokenX = "X";
const tokenO = "O";
let currentToken = tokenX;
let gameOver = false;

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

// add current token to the clicked block
function handleBlockClick(event) {
  // checking if the game is not over
  if (!gameOver) {
    const clickedBlock = event.target;
  
    addToken(clickedBlock);
  
    const winner = checkWinner();
    if (winner) {
      alert(`Player ${winner} wins!`);
      gameOver = true;
    }
  }
}

//gets all the blocks from the gameboard and adds event listener
const gameBoard = document.querySelectorAll(".block");
gameBoard.forEach((block) => {
  block.addEventListener("click", handleBlockClick);
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i]; //[4, 5, 6]
    // saving each element within the current iteration of the combination array to it's own variable
    const id0 = combination[0]; // 4
    const id1 = combination[1]; //5
    const id2 = combination[2]; //6

    const theresAWinner = gameBoard[id0].innerText &&
    gameBoard[id0].innerText === gameBoard[id1].innerText &&
    gameBoard[id0].innerText === gameBoard[id2].innerText

    if (theresAWinner) {
      return gameBoard[id0].innerText;
    } 
  }
  findDraw()
}

function findDraw() {
  let allMoves = 0;
  gameBoard.forEach(block => {
    if (block.innerText !== "") {
      allMoves++;
    } 
  })

  if (allMoves === 9) {
    alert('draw');
    gameOver = true;
  }
}