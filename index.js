let fieldBlock = document.getElementsByClassName("field");
let but = document.getElementsByClassName("but");
let winner = document.getElementsByClassName("winner");
let field = ["", "", "", "", "", "", "", "", ""];
let act = "x";
let isWin;
let winCoordinates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
let playerCord = [];
let botCord = [];

function render() {
  fieldBlock[0].innerHTML = "";

  field.forEach((item, i) => {
    let reqt = document.createElement("div");
    reqt.classList.add("item");
    reqt.id = i;

    if (item === "x") {
      let el = document.createElement("i");
      el.classList.add("fa-solid", "fa-xmark");
      reqt.appendChild(el);
    } else if (item === "o") {
      let el = document.createElement("i");
      el.classList.add("fa-regular", "fa-circle");
      reqt.appendChild(el);
    }

    fieldBlock[0].appendChild(reqt);
  });
}

function changeField(info = 0) {
  if (field[info] == "" && !isWin) {
    info = parseInt(info);
    playerCord.push(info);
    step(info);
    setTimeout(() => {
      bot();
    }, 300);
  }
}
console.log(field.includes(""));
function changeAct() {
  act == "x" ? (act = "o") : (act = "x");
}

function step(e) {
  if (field[e] == "" && !isWin) {
    field[e] = act;
    changeAct();
    render();
    check();
  }
}

function restart() {
  field = ["", "", "", "", "", "", "", "", ""];
  playerCord = [];
  botCord = [];
  fieldBlock[0].innerHTML = "";
  winner[0].innerHTML = "Победитель: ";
  act = "x";
  isWin = false;
  way = [];
  render();
}

function winning(winMark) {
  if (winMark === "x") {
    let el = document.createElement("i");
    el.classList.add("fa-solid", "fa-xmark");
    winner[0].appendChild(el);
  } else if (winMark === "o") {
    let el = document.createElement("i");
    el.classList.add("fa-regular", "fa-circle");
    winner[0].appendChild(el);
  }
}
function check() {
  winCoordinates.forEach((item) => {
    if (
      field[item[0]] == "x" &&
      field[item[1]] == "x" &&
      field[item[2]] == "x"
    ) {
      isWin = true;
      winning("x");
    }
    if (
      field[item[0]] == "o" &&
      field[item[1]] == "o" &&
      field[item[2]] == "o"
    ) {
      isWin = true;
      winning("o");
    }
  });
}

function blockSize() {
  if (window.screen.width > window.screen.height) {
    fieldBlock[0].style.width = window.screen.height * 0.4 + "px";
    fieldBlock[0].style.height = window.screen.height * 0.4 + "px";
  } else {
    fieldBlock[0].style.width = window.screen.width * 0.8 + "px";
    fieldBlock[0].style.height = window.screen.width * 0.8 + "px";
  }
}

function bot() {
  let go = true;
  if (!isWin && field.includes("")) {
    while (go) {
      let rand = Math.floor(Math.random() * 9);
      winCoordinates.forEach((cords) => {
        if (playerCord.includes(cords[0]) && playerCord.includes(cords[1]))
          rand = cords[2];

        if (playerCord.includes(cords[1]) && playerCord.includes(cords[2]))
          rand = cords[0];

        if (playerCord.includes(cords[0]) && playerCord.includes(cords[2]))
          rand = cords[1];
        if (!playerCord.includes(rand) || !botCord.includes(rand))
          rand = Math.floor(Math.random() * 9);
      });

      if (!playerCord.includes(rand) && !botCord.includes(rand)) {
        console.log(rand);
        botCord.push(rand);
        step(rand);
        go = false;
      }
    }
  }
}

///
blockSize();
render();
fieldBlock[0].addEventListener("click", (e) => changeField(e.target.id));
but[0].addEventListener("click", restart);
