const tokenX = "X";
const tokenO = "O";
let currentToken = tokenX;
let playerChoice = [];

// toggle between 'X' and 'O' tokens
function toggleToken() {
  currentToken = currentToken === tokenX ? tokenO : tokenX;
}

function addToken(block) {
  //if clicked block has no inner text then set it and toggle token
  if (!block.innerText) {
    block.innerText = currentToken;
    toggleToken();
  }
}

function handleBlockClick(event) {
  const clickedBlock = event.target;
  addToken(clickedBlock);

  playerChoice.push({ id: clickedBlock.id, value: clickedBlock.innerText });
  console.log(playerChoice)

  determineWinner();
}

const allBlocks = document.querySelectorAll(".block");
allBlocks.forEach((block) => {
  block.addEventListener("click", handleBlockClick);
});

//DETERMINE winner
function determineWinner() {
  for (let i = 0; i < playerChoice.length; i++) {
    console.log(playerChoice[i].value);
  }
}