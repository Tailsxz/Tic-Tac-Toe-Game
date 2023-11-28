//Lets start off by pseudocoding what we need to implement.
//We need a click event listener for each of our tiles, to be able to add an x or an o, depending on which turn it is.
//To implement the logic for deciding whether an x or o should be placed, we can use modulus and a variable to hold our turn
//incrementing that variable with each click.
//We can use a for loop to do so.
//Within each click we also need to check if a user has won after the tile has been set, looking at our board we need to check each row, column, and two diagonals.
//Row 1 being tiles 1, 2, 3
//row 2 4, 5, 6
//row 3 7, 8, 9
//column1 being 1, 4 , 7
//column2 2, 5, 8
//column3 3, 6, 9;
//diagonal1 being 1, 5, 9
//with the last diagonal being 7, 5, 3;
//we can add classes to our tiles to be able to grab these rows with a querySelector
//lets first grab all of our tiles, rows, columns, and diagonals

const tiles = [...document.querySelectorAll('.tile')];
const rowOne = document.querySelectorAll('#row1 .tile');
const rowTwo = document.querySelectorAll('#row2 .tile');
const rowThree = document.querySelectorAll('#row3 .tile');
const columnOne = document.querySelectorAll('.column1');
const columnTwo = document.querySelectorAll('.column2');
const columnThree = document.querySelectorAll('.column3');
const diagonalOne = document.querySelectorAll('.diagonal1');
const diagonalTwo = document.querySelectorAll('.diagonal2');

const rows = [[...rowOne], [...rowTwo], [...rowThree]];
const columns = [[...columnOne], [...columnTwo], [...columnThree]];
const diagonals = [[...diagonalOne], [...diagonalTwo]];

// console.log(tiles.forEach(e => console.log('Hi!')));
class Board {
  #turn = 0;
  #gameOver = false;
  #gameTied = false;
  constructor(rows,columns,diagonals) {
    tiles.forEach((tile, i) => {
      this[`tile${i + 1}`] = tile;
    });
    this.rows = rows;
    this.columns = columns;
    this.diagonals = diagonals;
  }
  //within our board we need a method that handles checking each row/column/diagonal everytime a tile is clicked.
  //lets start with the logic to be able to apply each x or o depending on the turn;
  
  placeTile(target) {
    //This conditional prevents the user from clicking another tile if the game is over
    //target.textContent prevents user from pressing on the same tile
    if(this.#gameOver || this.#gameTied || target.textContent) return console.log(`Can't set tile, ${this.#gameOver ? 'game is over' : 'game is tied'}`);
    //Here within this conditional, we are using modulus to decide whether an x or an o is placed.
    if (this.#turn % 2 === 0) {
      console.log(target);
      target.textContent = 'X';
      this.#turn++;
      return;
    }
    this.#turn++;
    return target.textContent = 'O';
  }
  
  checkWin() {
    //Checking each row for the win condition, XXX or OOO
    this.rows.forEach((row) => {
      if ((row.every((tile) => tile.innerText == 'X')) || row.every((tile) => tile.innerText == 'O')) {
        console.log('Game is over!');
        this.#gameOver = true;
      };
    });

    //Checking each column for the win condition, XXX or OOO
    this.columns.forEach((column) => {
      if ((column.every((tile) => tile.innerText == 'X')) || column.every((tile) => tile.innerText == 'O')) {
        console.log('Game is over!');
        this.#gameOver = true;
      };
    });

    //Checking each diagonal for the win condition, XXX or OOO
    this.diagonals.forEach((diagonal) => {
      if ((diagonal.every((tile) => tile.innerText == 'X')) || diagonal.every((tile) => tile.innerText == 'O')) {
        console.log('Game is over!');
        this.#gameOver = true;
      };
    });
  }

  checkTie() {
    //This conditional will check if everytile contains an x or o and the game hasn't been won, resulting in a tie.
    if (tiles.every((tile) => tile.innerText)) {
      console.log('Game is tied!');
      this.#gameTied = true;
    }
  }

  resetBoard() {
    this.#turn = 0;
    this.#gameOver = false;
    this.#gameTied = false;
    tiles.forEach((tile) => tile.innerText = '');
  }
}

const ticTacToeBoard = new Board(rows, columns, diagonals);
console.log(ticTacToeBoard);

//This function will place the tile on the dom, and check after every placement, if there exists a winning condition, in that any of the rows,columns, or diagonals have three x's or three o's
function applyClickListener() {
  for (let tile in ticTacToeBoard) {
    if (tile.includes('tile')) {
      tile = ticTacToeBoard[tile];
      tile.addEventListener('click', (e) => {
        ticTacToeBoard.placeTile(tile)
        ticTacToeBoard.checkWin();
        ticTacToeBoard.checkTie();
        // ticTacToeBoard.rows.forEach((row) => row.forEach((tile) => console.log(tile.innerText))); here we can see we can grab the innerText for each tile, and check for each row if every tile's inner txt is x or o
      });
    }
  }
}


function resetButtonListener() {
  const resetButton = document.querySelector('.button_reset');
  resetButton.addEventListener('click', () => ticTacToeBoard.resetBoard());
}

applyClickListener();
resetButtonListener();

