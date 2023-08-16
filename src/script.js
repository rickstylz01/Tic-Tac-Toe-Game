// add event listener
  // create a method that toggles between x and o when a block is clicked
// when a square is clicked add an x
// find a way to toggle from 'x' to 'o'
const tokenX = 'X';
const tokenO = 'O';
let currentToken = tokenX;

// toggle between 'X' and 'O' tokens
function toggleToken() {
  // if currentPlayer equals tokenX then swith to tokenO and vice versa
  currentToken = (currentToken === tokenX) ? tokenO : tokenX;
}

// if current block has no inner text, set it with the current player token
// toggle current token
function addToken(block) {
  if (!block.innerText) {
    block.innerText = currentToken;
    toggleToken();
  }
}

// use the addToken function on current block
function handleBlockClick(event) {
  const clickedBlock = event.target;
  addToken(clickedBlock);
}


const allBlocks = document.querySelectorAll('.block');
console.log(allBlocks);
allBlocks.forEach(block => {
  block.innerText = "";
  block.addEventListener('click',handleBlockClick)
})