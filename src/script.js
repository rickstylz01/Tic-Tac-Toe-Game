let gameOver = false;
let player1Score = 0;
let player2Score = 0;
let player1Token = 'tire-iron-cross';
let player2Token = 'circle';
let currentToken = player1Token;
let selectedToken = false;

// setting player names
let player1UsrName = prompt("Player 1, what is your name?");
let player2UsrName = prompt("Player 2, what is your name?");

const player1Div = document.querySelector("#player1");
const player2Div = document.querySelector("#player2");

// If no username was entered for player 1 or 2, set default username
player1Div.innerText = !player1UsrName ? "Player 1" : player1UsrName;
player2Div.innerText = !player2UsrName ? "Player 2" : player2UsrName;

// getting the player score board elements
const player1ScoreBoard = document.querySelector('#score-board-1');
const player2ScoreBoard = document.querySelector('#score-board-2');

// token boxes for each player
const player1TokenBox = document.querySelector('#t-box-1');
const player2TokenBox = document.querySelector('#t-box-2');

// token's in token boxes for each player
const p1Tokens = document.querySelectorAll('#t-box-1 img');
const p2Tokens = document.querySelectorAll('#t-box-2 img');


// adding event handler for each token to select it for player 1
p1Tokens.forEach(tokenEl => {
  tokenEl.addEventListener('click', () => {
    // setting the player1 token to the value of the data-token attribute
    player1Token = tokenEl.getAttribute('data-token');

    // remove style class from other tokens
    p1Tokens.forEach(p1Token => {
      p1Token.classList.remove('p1-selected');
    })
    // add style class to highlight selected token
    tokenEl.classList.add('p1-selected');
  })
})

// adding event handler for each token to select it for player 2
p2Tokens.forEach(tokenEl => {
  tokenEl.addEventListener('click', () => {
    // setting the player2 token to the value of the data-token attribute
    player2Token = tokenEl.getAttribute('data-token');

    // remove style class from other tokens
    p2Tokens.forEach(p2Token => {
      p2Token.classList.remove('p2-selected');
    })
    // add style class to highlight selected token
    tokenEl.classList.add('p2-selected');
  })
})

// toggle between player 1 and 2 tokens
function toggleToken() {
  currentToken = currentToken === player1Token ? player2Token : player1Token;
}

// if clicked block has no inner img element then create and set it and toggle token
// 
function addToken(block) {
  if (!block.querySelector('img')) {
    const tokenImage = document.createElement('img');
    tokenImage.setAttribute('data', currentToken);
    
    // setting the current token to player 1's token for first move
    if (!selectedToken) {
      currentToken = player1Token
      selectedToken = true;
    }

    // if the current token is set to player 1 then look in the player 1 token directory
    if (currentToken === player1Token) {
      tokenImage.src = `./assets/player-1-tokens/${currentToken}.svg`
    } else {
      // or else look in player 2's directory
      tokenImage.src = `./assets/player-2-tokens/${currentToken}.svg`
    }

    block.appendChild(tokenImage);
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
      resetBtn.classList.toggle("hidden");
    }
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
    // saving each element in the current combination array to it's own variable
    const blockId0 = combination[0]; // 2
    const blockId1 = combination[1]; // 4
    const blockId2 = combination[2]; // 6

    // getting the image inside each block being checked
    const img0 = gameBoard[blockId0].querySelector('img');
    const img1 = gameBoard[blockId1].querySelector('img');
    const img2 = gameBoard[blockId2].querySelector('img');

    // saving the boolean to a variable if all of the img src attributes are present and match
    const theresAWinner = img0 && img1 && img2 &&
     img0.src === img1.src && img0.src === img2.src;

    // if a winning combo was found, increment that players score and display winners name
    if (theresAWinner) {
      let winningPlayer;

      if (img0.getAttribute('data') === player1Token) {
        winningPlayer = player1Div.innerText;
        player1Score++;
        player1ScoreBoard.innerHTML = `Score: ${player1Score}`;
      } else {
        winningPlayer = player2Div.innerText;
        player2Score++;
        player2ScoreBoard.innerHTML = `Score: ${player2Score}`;
      }

      // game results modal
//const gameResultModal = document.querySelector('#gameResultModal');

      // set the winner's name in the modal
      const modalWinnerName = document.getElementById('modalWinnerName');
      modalWinnerName.innerText = `${winningPlayer} Wins!`;

      // show the modal
      const winnerModal = new bootstrap.Modal(document.querySelector('#gameResultModal'));
      winnerModal.show();      

      return winningPlayer;
    }
  }
  findDraw();
}

function findDraw() {
  let allMoves = 0;
  gameBoard.forEach((block) => {
    if (block.querySelector('img')) {
      allMoves++;
    }
  });
  //if allMoves equals 9 (without finding a winner) then game is a tie
  if (allMoves === 9) {
    const drawAnnouncementDiv = document.querySelector('#announcement');
    drawAnnouncementDiv.innerText = 'Tie Game';

    const drawModal = new bootstrap.Modal(document.querySelector('#drawModal'));
    drawModal.show();
    
    gameOver = true;
    resetBtn.classList.toggle("hidden");
  }
}

//gets all the blocks from the gameboard and adds event listener
const gameBoard = document.querySelectorAll(".block");
gameBoard.forEach((block) => {
  block.addEventListener("click", handleBlockClick);
});

// reset function
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  gameOver = false;
  // currentToken = tokenX;
  selectedToken = false;
  gameBoard.forEach((block) => (block.innerText = ""));
  resetBtn.classList.toggle("hidden");

  // prompt for player usernames again
  player1UsrName = prompt("Player 1, what is your name?");
  player2UsrName = prompt("Player 2, what is your name?");
  
  // update player names 
  player1Div.innerText = !player1UsrName ? "Player 1" : player1UsrName;
  player2Div.innerText = !player2UsrName ? "Player 2" : player2UsrName;
});

