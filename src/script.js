let gameOver = false;
const tokenX = "X";
const tokenO = "O";
let player1Score = 0;
let player2Score = 0;
let currentToken = tokenX;
let timerHidden = true;
let setTime = 6;

// score boards
const player1ScoreBoard = document.querySelector("#score-board-1");
const player2ScoreBoard = document.querySelector("#score-board-2");

// setting player names
let player1UsrName = prompt("Player 1, what is your name?");
let player2UsrName = prompt("Player 2, what is your name?");

const player1Div = document.querySelector(".player1");
const player2Div = document.querySelector(".player2");

// If no username was entered for player 1 or 2, set default username
player1Div.innerText = !player1UsrName ? "Player 1" : player1UsrName;
player2Div.innerText = !player2UsrName ? "Player 2" : player2UsrName;

// toggle between 'X' and 'O' tokens
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
      gameOver = true;
      clearInterval(timer);
      document.querySelector('#countdown').classList.add('hidden');
    } else {
      // start timer when block is clicked
      clearInterval(timer);
      setTime = 6;
      timer = startTimer();
    }

    if (timerHidden) {
      timerHidden = false;
      document.querySelector("#countdown").classList.remove("hidden");
    }
  }
}

// stackoverflow topic on creating a countdown timer(https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)
let timer;
function startTimer() {
  return setInterval(function () {
    if (setTime <= 0) {
      clearInterval(timer);
      gameOver = true;
      footerOptions.classList.remove("hidden");
      document.querySelector("#countdown").innerText = "Times Up";
      playerPenalty(currentToken);
      displayLoseModal(currentToken);
      timerHidden = true;
    } else {
      document.querySelector("#countdown").innerText = `${
        currentToken === tokenX ? player1Div.innerText : player2Div.innerText
      }'s turn - 00:0${setTime}`;
    }
    setTime -= 1;
  }, 1000);
}

// get footer element
const footerOptions = document.querySelector("footer");
function toggleGameOptions() {
  footerOptions.classList.toggle("hidden");
}

let winningPlayer;
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
      awardWinningPlayer(gameBoard[blockId0].innerText);
      displayWinModal(winningPlayer);
      toggleGameOptions();
      return winningPlayer;
    }
  }
  clearInterval(timer);
  findDraw();
}

function findDraw() {
  let allMoves = 0;
  gameBoard.forEach((block) => {
    if (block.innerText !== "") {
      allMoves++;
    }
  });
  //if allMoves equals 9 (and a winner was not found)
  if (allMoves === 9) {
    gameOver = true;
    //clearInterval(timer);
    displayDrawModal();
    toggleGameOptions();
  }
}

// award winner depending on what the token value is
function awardWinningPlayer(token) {
  if (token === tokenX) {
    winningPlayer = player1Div.innerText;
    player1Score++;
    player1ScoreBoard.innerHTML = `Score: ${player1Score}`;
  } else {
    winningPlayer = player2Div.innerText;
    player2Score++;
    player2ScoreBoard.innerHTML = `Score: ${player2Score}`;
  }
}

// penalize player by decreasing score count
function playerPenalty(token) {
  if (token === tokenX) {
    //penaltyPlayer = player1Div.innerText;
    player1Score--;
    player1ScoreBoard.innerHTML = `Score: ${player1Score}`;
  } else {
    //penaltyPlayer = player2Div.innerText;
    player2Score--;
    player2ScoreBoard.innerHTML = `Score: ${player2Score}`;
  }
}

function displayWinModal(winningPlayer) {
  // set the winner's name in the modal
  const modalWinnerName = document.getElementById("modalWinnerName");
  modalWinnerName.innerText = `${winningPlayer} Wins!`;

  // show the modal
  const winnerModal = new bootstrap.Modal(
    document.getElementById("winnerModal")
  );
  winnerModal.show();
}

function displayLoseModal(losingPlayer) {
  // set the loser's name in the modal
  const modalLoserName = document.getElementById("modalLoserName");
  modalLoserName.innerText = `${
    losingPlayer === tokenX ? player1Div.innerText : player2Div.innerText
  } Lost!`;

  // show the modal
  const losingModal = new bootstrap.Modal(
    document.getElementById("loserModal")
  );
  losingModal.show();
}

function displayDrawModal() {
  // show the modal
  const drawModal = new bootstrap.Modal(document.getElementById("drawModal"));
  drawModal.show();
}

//gets all the blocks from the gameboard and adds event listener
const gameBoard = document.querySelectorAll(".block");
gameBoard.forEach((block) => {
  block.addEventListener("click", handleBlockClick);
  block.style.cursor = "pointer";
});

// reset function
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  timerHidden = true;
  gameOver = false;
  setTime = 6;
  player1Score = 0;
  player2Score = 0;
  player1ScoreBoard.innerHTML = "Score: 0";
  player2ScoreBoard.innerHTML = "Score: 0";
  currentToken = tokenX;
  gameBoard.forEach((block) => (block.innerText = ""));
  document.querySelector("#countdown").innerText = "";

  // prompt for player usernames again
  player1UsrName = prompt("Player 1, what is your name?");
  player2UsrName = prompt("Player 2, what is your name?");

  // update player names
  player1Div.innerText = !player1UsrName ? "Player 1" : player1UsrName;
  player2Div.innerText = !player2UsrName ? "Player 2" : player2UsrName;
  toggleGameOptions();
});

const continueBtn = document.querySelector("#continue-btn");
continueBtn.addEventListener("click", () => {
  gameOver = false;
  timerHidden = true;
  setTime = 6;
  currentToken = tokenX;
  gameBoard.forEach((block) => (block.innerText = ""));
  toggleGameOptions();
});
