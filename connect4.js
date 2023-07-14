/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const columns = 7;
const rows = 6;


let currPlayer = 1; // active player: 1 or 2
/**
 * [[0 0 0 0 0 0 0],
 *  [0 0 0 0 0 0 0]
 * ]
 */
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let r = 0; r < rows; r++){
    let row = [];
    for(let c = 0; c < columns; c++){
     row.push(0);
    }
    board.push(row);
  }
  
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // TODO: add comment for this code
 const htmlBoard= document.getElementById('board');
//  let tile = document.createElement("div");
//  tile.classList.add("tile");
//  document.getElementById("board").append(tile);
 


 const top = document.createElement("tr");
 top.setAttribute("id", "column-top");
 top.addEventListener("click", handleClick);


  for (let x = 0; x < columns; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code => this is acatually building the baord. 
  for (let y = 0; y < rows; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < columns; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = rows -1; y>= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece= document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  console.log(`${y} - ${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  // refreshGame();
  // setTimeout(endGame, 3000);
}



/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
console.log("is this it?");
console.log(x);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  console.log("hi")
  console.log(y);
  if (y === null) {
    return;

  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 board [y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`${currPlayer} won!
    Refresh the page to play again.`);
    
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame ("You've Tied!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < rows &&
        x >= 0 &&
        x < columns &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      //arrays of all possible winning combination options
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// function refreshGame() {
makeBoard();
makeHtmlBoard();
// // document.getElementById("board").reset();

// }

// refreshGame();




