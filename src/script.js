// add event listener
  // create a method that toggles between x and o when a block is clicked
// when a square is clicked add an x
// find a way to toggle from 'x' to 'o'
const tokenX = 'X';
const tokenO = 'O';
let currentPlayer = tokenX;

// toggle between 'X' and 'O' tokens
function toggleToken() {
  // if currentPlayer equals tokenX then swith to tokenO and vice versa
  currentPlayer = (currentPlayer === tokenX) ? tokenO : tokenX;
}

// if current block has no inner text, set it with the current player token
function addToken(block) {
  if (!block.innerText) {
    block.innerText = currentPlayer;
    toggleToken();
  }
}



// BLOCKS - ROW 1
const block0 = document.querySelector('#block-0')
const block1 = document.querySelector('#block-1');
const block2 = document.querySelector('#block-2');
// BLOCKS - ROW 2
const block3 = document.querySelector('#block-3');
const block4 = document.querySelector('#block-4');
const block5 = document.querySelector('#block-5');
// BLOCKS - ROW 3
const block6 = document.querySelector('#block-6');
const block7 = document.querySelector('#block-7');
const block8 = document.querySelector('#block-8');
