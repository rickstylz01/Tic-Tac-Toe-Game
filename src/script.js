const tokenX = 'X';
const tokenO = 'O';
let currentToken = tokenX;
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];
playerChoices = []; 

// toggle between 'X' and 'O' tokens
function toggleToken() {
  currentToken = (currentToken === tokenX) ? tokenO : tokenX;
}

function addToken(block) {
  //if clicked box has no inner text then set it and toggle token
  if (!block.innerText) {
    block.innerText = currentToken;
    toggleToken();
  }
}

function handleBlockClick(event) {
  const clickedBlock = event.target;
  const clickedBlockId = parseInt(clickedBlock.id);

  addToken(clickedBlock);
  const blockText = clickedBlock.textContent;
  playerChoices.push(blockText);

  console.log(playerChoices);
  console.log('block id: ' + clickedBlockId)
}
//iterate over winning condition elements
// use numbers in the winning condition elements to check the value
// of the indexes in the player choice array


const allBlocks = document.querySelectorAll('.block');
allBlocks.forEach(block => {
  block.addEventListener('click',handleBlockClick)
});