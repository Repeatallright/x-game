let boardBlock = document.getElementsByClassName("grid-container");
let but = document.getElementsByClassName("but");
let winner = document.getElementsByClassName("winner");
let board = ["", "", "", "", "", "", "", "", ""];
let act = "X";
let isWin;

let playerCord = [];
let botCord = [];
const winCoordinates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function render() {
  boardBlock[0].innerHTML = "";

  board.forEach((item, i) => {
    let reqt = document.createElement("div");
    reqt.classList.add("grid-item");
    reqt.id = i;

    if (item === "X") {
      let el = document.createElement("i");
      el.classList.add("fa-solid", "fa-xmark");
      reqt.appendChild(el);
    } else if (item === "O") {
      let el = document.createElement("i");
      el.classList.add("fa-regular", "fa-circle");
      reqt.appendChild(el);
    }

    boardBlock[0].appendChild(reqt);
  });
}

function changeboard(info = 0) {
  if (board[info] == "" && !isWin) {
    info = parseInt(info);
    playerCord.push(info);
    step(info);
    setTimeout(() => {
      let cord = minimax(board, act);
      step(cord.index);
    }, 300);
  }
}
console.log(board.includes(""));
function changeAct() {
  act == "X" ? (act = "O") : (act = "X");
}

function step(e) {
  if (board[e] == "" && !isWin) {
    board[e] = act;
    changeAct();
    render();
    check();
  }
}

function restart() {
  board = ["", "", "", "", "", "", "", "", ""];
  playerCord = [];
  botCord = [];
  boardBlock[0].innerHTML = "";
  winner[0].innerHTML = "Победитель: ";
  act = "X";
  isWin = false;
  way = [];
  render();
}

function winning(winMark) {
  if (winMark === "X") {
    let el = document.createElement("i");
    el.classList.add("fa-solid", "fa-xmark");
    winner[0].appendChild(el);
  } else if (winMark === "O") {
    let el = document.createElement("i");
    el.classList.add("fa-regular", "fa-circle");
    winner[0].appendChild(el);
  }
}
function check() {
  winCoordinates.forEach((item) => {
    if (
      board[item[0]] == "X" &&
      board[item[1]] == "X" &&
      board[item[2]] == "X"
    ) {
      isWin = true;
      winning("X");
    }
    if (
      board[item[0]] == "O" &&
      board[item[1]] == "O" &&
      board[item[2]] == "O"
    ) {
      isWin = true;
      winning("O");
    }
  });
}

function blockSize() {
  if (window.screen.width > window.screen.height) {
    boardBlock[0].style.width = window.screen.height * 0.4 + "px";
    boardBlock[0].style.height = window.screen.height * 0.4 + "px";
  } else {
    boardBlock[0].style.width = window.screen.width * 0.8 + "px";
    boardBlock[0].style.height = window.screen.width * 0.8 + "px";
  }
}

function checkWin(board, player) {
  for (const condition of winCoordinates) {
    const [a, b, c] = condition;
    if (board[a] === player && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Handle game over
function gameOver(message) {
  alert(message);
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOn = false;
  setTimeout(() => {
    updateBoard();
    gameOn = true;
  }, 1500);
}

function getEmptyCells(board) {
  let emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}
function minimax(board, player) {
  let emptyCells = getEmptyCells(board);

  if (checkWin(board, "X")) {
    return { score: -10 };
  } else if (checkWin(board, "O")) {
    return { score: 10 };
  } else if (emptyCells.length === 0) {
    return { score: 0 };
  }

  let moves = [];

  for (const cell of emptyCells) {
    let newBoard = [...board];
    newBoard[cell] = player;
    let score;
    if (player === "O") {
      score = minimax(newBoard, "X").score;
    } else {
      score = minimax(newBoard, "O").score;
    }
    moves.push({ index: cell, score: score });
  }

  let bestMove;

  if (player === "O") {
    let highestScore = -Infinity;
    for (const move of moves) {
      if (move.score > highestScore) {
        highestScore = move.score;
        bestMove = move;
      }
    }
  } else {
    let lowestScore = Infinity;
    for (const move of moves) {
      if (move.score < lowestScore) {
        lowestScore = move.score;
        bestMove = move;
      }
    }
  }

  return bestMove;
}

///
blockSize();
render();
boardBlock[0].addEventListener("click", (e) => changeboard(e.target.id));
but[0].addEventListener("click", restart);
