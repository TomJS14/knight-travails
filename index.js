/** @format */

class Cell {
  constructor(x, y, distance, path) {
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.path = path;
  }
}

//InBounds function to check co-ords are within bounds of board
function isInBounds(x, y, board) {
  if (x >= 1 && x <= board && y >= 1 && y <= board) {
    return true;
  } else return false;
}

function knightMoves(knightStart, targetPosition, board) {
  let xMoves = [-2, -1, 1, 2, -2, -1, 1, 2];
  let yMoves = [-1, -2, -2, -1, 1, 2, 2, 1];

  //Queue for storing states of knight in board
  let queue = [];

  //push starting position of night, with 0 distance ([0] & [1] index of array co-ordinates passed in)
  queue.push(new Cell(knightStart[0], knightStart[1], 0, [knightStart]));

  //Variables for current position and the x, y co-ords
  let currentPosition;
  let x, y;

  //Array for storing the next cell to visit (N + 1 cell)
  let visit = new Array(board + 1);

  //make all cells unvisited
  for (let i = 1; i <= board; i++) {
    visit[i] = new Array(board + 1);
    for (let j = 1; j <= board; j++) visit[i][j] = false;
  }

  //Sstting the starting position as visited
  visit[knightStart[0]][knightStart[1]] = true;

  //loop until there is one element in the queue
  while (queue.length != 0) {
    currentPosition = queue.shift(); //take the first cell from queue

    //if current position equal to target position, return it's distance
    if (
      currentPosition.x == targetPosition[0] &&
      currentPosition.y == targetPosition[1]
    ) {
      console.log(`You made it in ${currentPosition.distance} steps!`);
      console.log("Your Path was:");
      for (const [x, y] of currentPosition.path) {
        console.log(`X:[${x}], Y:[${y}]`);
      }

      return currentPosition.distance;
    }
    //otherwise loop for all reachable positions
    for (let i = 0; i < 8; i++) {
      x = currentPosition.x + xMoves[i];
      y = currentPosition.y + yMoves[i];

      //if reachable state is not yet visited and it is in bounds, push it into the queue
      if (isInBounds(x, y, board) && !visit[x][y]) {
        visit[x][y] = true;
        const newPath = [...currentPosition.path, [x, y]];
        queue.push(new Cell(x, y, currentPosition.distance + 1, newPath));
      }
    }
  }
  //if position is unreachable return special value (like infinite)
  return Number.MAX_VALUE;
}

/* Driver script */

let board = 18;
let knightStart = [1, 2];
let targetPosition = [16, 10];

knightMoves(knightStart, targetPosition, board); //returns number of moves and the path to the console
