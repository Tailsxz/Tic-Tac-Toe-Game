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

const tiles = document.querySelectorAll('.tile');
const rowOne = document.querySelectorAll('#row1 .tile');
const rowTwo = document.querySelectorAll('#row2 .tile');
const rowThree = document.querySelectorAll('#row3 .tile');
const columnOne = document.querySelectorAll('.column1');
const columnTwo = document.querySelectorAll('.column2');
const columnThree = document.querySelectorAll('.column3');
const diagonalOne = document.querySelectorAll('.diagonal1');
const diagonalTwo = document.querySelectorAll('.diagonal2');

const rows = [rowOne, rowTwo, rowThree];
const columns = [columnOne, columnTwo, columnThree];
const diagonals = [diagonalOne, diagonalTwo];

console.log(tiles.forEach(e => console.log('Hi!')));
class Board {
  constructor(rows,columns,diagonals) {
    tiles.forEach((tile, i) => {
      this[`tile${i + 1}`] = tile;
    });
    this.rows = rows;
    this.columns = columns;
    this.diagonals = diagonals;
  }
}

const ticTacToe = new Board(rows, columns, diagonals);
console.log(ticTacToe);
