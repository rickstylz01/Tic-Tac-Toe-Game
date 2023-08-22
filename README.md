# Tic-Tac-Toe-Game

## Overview
This project is a browser-based Tic-Tac-Toe game that allows two players to compete against each other. Players take turns clicking on empty squares to place their tokens ('X' or 'O') on the board. The game will determine a winner if there is a line of three matching tokens horizontally, vertically, or diagonally. If no player wins and all squares are filled, the game ends in a draw.

## Getting Started
To run this game, simply open the provided HTML file in a web browser. You'll see a 3x3 grid representing the Tic-Tac-Toe board. Each player will be prompted to enter their names, and the game will display these names during gameplay.


## Game Mechanics
### Game Logic
- The game is controlled by JavaScript code that runs in the background.
- Players alternate turns by clicking on empty squares to place their tokens.
- The game checks for a winner after each move and ends the game if there is a winner or a draw.

### Token Toggle
- The current player's token ('X' or 'O') is indicated at the top of the game board.
- The toggleToken function switches the current token between 'X' and 'O' after each move.

### Winning and Draw Conditions
- The game checks for a winning combination after each move.
- If a player has three matching tokens in a row, they win the game.
- If no player wins and all squares are filled, the game ends in a draw.

### Countdown Timer
- A 6-second countdown timer is displayed for each player's turn.
- If a player does not make a move within the time limit, the opposing player is awarded a point.
- The countdown timer is implemented using the `startTimer` function.

### Score Tracking
- Player scores are tracked and displayed on the scoreboard.
- The `awardWinningPlayer` function updates the score when a player wins.
- The `playerPenalty` function deducts a point if a player runs out of time.

### Modals
- Modals are used to display messages when a player wins, loses, or the game ends in a draw.
- The `displayWinModal`, `displayLoseModal`, and `displayDrawModal` functions control the modals.

### Reset and Continue
- The "Reset" button resets the game, scores, and player names.
- The "Continue" button allows players to start a new game without resetting the scores or names.


## Planning
![IMG_1399](https://github.com/rickstylz01/Tic-Tac-Toe-Game/assets/27748809/6f29166d-fc8c-424d-b65a-63e2f2ace4cd)


### Wireframe
The wireframing consisted of laying out the components of the game
- Game grid
- Player names
- Token options

### MVP and Goal Tiers
**M**inimum **V**iable **P**roduct

 ### Bronze Tier
---------------------------
In the bronze tier, my goals were to create the core functionalities of a tic-tac-toe game 
- Gameboard
- Click a square and show 'X' or 'O'
- A winning condition
- Game Resetting

### Silver Tier
---------------------------
In the silver tier, my goals were to implement more customizable features.
- Username input
- Keep score
- Timer
- Token selection

### Gold Tier
---------------------------
My goal for the gold tier was to create an online multiplayer feature
- 2-player online

### Hurdles
---------------------------
I ended up scrapping my **token selection** feature. 
Some of my issues with this were:
- Disabling tokens after selected and still being able to place them on the board
- Keeping track of the correct player's tokens
- Resetting tokens after a game-ending scenario

I do have a separate branch with these modifications so that I can go back and resolve them.

In hindsight I realize that there are better ways to structure this project, for example, using class objects and methods. All in all, this was a great test of my capabilities utilizing JavaScript, HTML, and CSS. Who would have thought tic-tac-toe would test me as much as it did.

