// js code for 2048 game
// declaring global variables
var board;
var score = 0;
var rows = 4;
var columns = 4;

// it is used when game loads every time it calls the setGame function
window.onload = function () {
  setGame();
};

// defining of setGame function for setting the board logic
function setGame() {
  // defining the empty board
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // creating the div element which shows number
      let tile = document.createElement("div");
      // setting the id to tile which represents the coordinates like 3-4
      tile.id = r.toString() + "-" + c.toString();
      // sliding of numbers generates new numbers
      let num = board[r][c];
      // function for updating the styles and num
      updateTile(tile, num);
      // here we appending new num and its class to board
      document.getElementById("board-div").append(tile);
    }
  }
  // calling setTwo function for setting the beginning of the game
  setTwo();
  setTwo();
}

// defining the function which checks the board is full or not
function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        // it returns true if any tile is empty
        return true;
      }
    }
  }
  return false;
}

// defining the setTwo function which add the tile of 2 in beginning and after every move
function setTwo() {
  // firstly check if board is empty or not
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    // getting a random coordinates in a board
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    // checking that coordinate is empty or not
    if (board[r][c] == 0) {
      // if empty add tile and its class
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      // for breaking out of a loop
      found = "true";
    }
  }
}

// defining the updateTile function to update styles and num
function updateTile(tile, num) {
  // firstly clearing the innertext and class associates with tiles
  tile.innerText = "";
  tile.classList.value = "";
  // here adding the class associates with new tile
  tile.classList.add("tile");
  if (num > 0) {
    // adding the new number to tile
    tile.innerText = num;
    // adding new number's class according to number to a tile
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

// defining the sliding logic
// here we add eventlistener for arrow keys
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    // calling function for leftarrow key event
    slideLeft();
    // calling function to add 2 after every move
    setTwo();
    // calling a function to check game is over or not
    checkGameOver();
  } else if (e.code == "ArrowRight") {
    // calling function for rightarrow key event
    slideRight();
    // calling function to add 2 after every move
    setTwo();
    // calling a function to check game is over or not
    checkGameOver();
  } else if (e.code == "ArrowUp") {
    // calling function for uparrow key event
    slideUp();
    // calling function to add 2 after every move
    setTwo();
    // calling a function to check game is over or not
    checkGameOver();
  } else if (e.code == "ArrowDown") {
    // calling function for downarrow key event
    slideDown();
    // calling function to add 2 after every move
    setTwo();
    // calling a function to check game is over or not
    checkGameOver();
  }
  // updating the score after each move
  document.getElementById("score").innerText = score;
});

// defining a filterZeroes function for filtering zeroes
function filterZeroes(row) {
  // creates new array without zeroes
  return row.filter((num) => num != 0);
}

// defining a slide function with row as a parameter
function slide(row) {
  // [2,2,2,0] -> [2,2,2] -> [4,0,2] -> [4,2] -> [4,2,0,0]
  // firstly filter all zeroes
  // so here we call new function
  row = filterZeroes(row);
  //sliding logic if adjacent numbers are same then add in powers of 2
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      // if adjacent num is same add in ith position and put 0 in (i+1)th position
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  // again filtering zeroes
  row = filterZeroes(row);
  // now adding zeroes at the end of the rows
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

// defining the function for leftarrow key event
function slideLeft() {
  // here iterating each rows
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    // calling a slide function because new row is formed
    row = slide(row);
    board[r] = row;
    // now we updating our html
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// defining the function for rightarrow key event
function slideRight() {
  // logic is same as slideLeft function except here we reverse the row
  // [2,2,2,0] -> [0,2,2,2] -> [2,2,2] -> [4,0,2] -> [4,2] -> [4,2,0,0] -> [0,0,2,4]
  for (let r = 0; r < rows; r++) {
    // getting a row
    let row = board[r];
    // reverse the row
    row.reverse();
    // calling slide function
    row = slide(row);
    // reverse the row again
    row.reverse();
    board[r] = row;
    // here updating our html
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// defining the function for uparrow key event
function slideUp() {
  // logic is same as slideLeft function but here we take columns instead of row array
  // [(2,0,0,0),(2,0,0,0),(2,0,0,0),(0,0,0,0)] -> [2,2,2,0] -> [2,2,2] -> [4,0,2] -> [4,2] -> [4,2,0,0] ->
  // [(4,0,0,0),(2,0,0,0),(0,0,0,0),(0,0,0,0)]
  for (let c = 0; c < columns; c++) {
    // getting the array of columns
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    // calling slide function
    row = slide(row);
    // updating html
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// defining the function for downarrow key event
function slideDown() {
  // logic is similar to up event but here reverse it
  // [(2,0,0,0),(2,0,0,0),(2,0,0,0),(0,0,0,0)] -> [2,2,2,0] -> [0,2,2,2] -> [2,2,2] -> [4,0,2] -> [4,2]
  //   -> [4,2,0,0] -> [0,0,2,4] -> [(0,0,0,0),(0,0,0,0),(2,0,0,0),(4,0,0,0)]
  for (let c = 0; c < columns; c++) {
    // getting columns array
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    // reverse the array
    row.reverse();
    // calling the slide function
    row = slide(row);
    // again reverse the array
    row.reverse();
    // now upadting the html
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// defining the function to check the any valid moves is happens or not
function isGameOver() {
  // firstly check the board is empty or not
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) {
        return false;
      }
    }
  }
  // now check if any adjacent elements are same in any rows and columns
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (r > 0 && board[r][c] === board[r - 1][c]) {
        return false;
      }
      if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
        return false;
      }
      if (c > 0 && board[r][c] === board[r][c - 1]) {
        return false;
      }
      if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
        return false;
      }
    }
  }
  return true;
}

// defining the function to check the game is over or not and generates a prompt for gameOver
function checkGameOver() {
  if (isGameOver()) {
    alert(
      "Game over! You reached " +
        score +
        " points. Try again! \n Press OK to restart the Game"
    );
    setInterval(restartGame, 500);
  }
}

// selecting the button by its id
const reset = document.querySelector("#restart-btn");
// adding event listener of click and calling the function to restart
reset.addEventListener("click", () => {
  window.location.reload();
});
