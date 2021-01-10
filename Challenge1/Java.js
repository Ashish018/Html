//Challenge 1: Your Age in Days

function ageCalc() {
  var birthYear = prompt("What year you were born.....Good friend");
  var age = (2020 - birthYear) * 365;
  var h1 = document.createElement("h1");
  var text = document.createTextNode("You are " + age + " days old");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(text);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

//Challenge 2: Cat Generator

function addCat() {
  var div = document.getElementById("catImg");
  var img = document.createElement("img");
  img.src = "photo-1552933529-e359b2477252.jpg";
  div.appendChild(img);
}

//Challenge 3: Rock Paper Scissors
const content = document.getElementById("RPS").innerHTML;
function rpsGame(value) {
  var user = value.id;
  removeImg();
  var userDiv = document.createElement("div");
  var userImg = document.createElement("img");
  userImg.src = getSrc(user);
  userDiv.appendChild(userImg);
  document.getElementById("RPS").appendChild(userDiv);
  var comp = computerSelect();
  var compSrc = getSrc(comp);
  var compDiv = document.createElement("div");
  var compImg = document.createElement("img");
  compImg.src = compSrc;
  compDiv.appendChild(compImg);
  var result = getResult(user, comp);
  var resultDiv = document.createElement("div");
  resultDiv.innerHTML = `<h1 style="color:${result[1]}">${result[0]}</h1>`;
  document.getElementById("RPS").appendChild(resultDiv);
  document.getElementById("RPS").appendChild(compDiv);
}

function getResult(user, comp) {
  var result = {
    rock: { rock: 0, paper: -1, scissors: 1 },
    paper: { rock: 1, paper: 0, scissors: -1 },
    scissors: { rock: -1, paper: 1, scissors: 0 },
  };

  if (result[user][comp] == 1) return ["You Won and Computer lost", "green"];
  if (result[user][comp] == 0) return ["It's a Draw", "yellow"];
  return ["You lost and Computer Won", "red"];
}

function getSrc(value) {
  srcObj = {
    rock: "rock.png",
    paper: "paper.jpg",
    scissors: "scissors.png",
  };
  return srcObj[value];
}

function removeImg() {
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();
}

function computerSelect() {
  var optArray = ["rock", "paper", "scissors"];
  return optArray[Math.floor(Math.random() * 3)];
}

function rpsReset() {
  document.getElementById("RPS").innerHTML = content;
}

// Challenge 4: Change the color of all buttons
var x = document.getElementsByTagName("button");
let colorCopy = [];
for (var i = 0; i < x.length; i++) colorCopy.push(x[i].style.background);

function buttonColorChange(value) {
  if (value.value == "red") {
    for (let i = 0; i < x.length; i++) x[i].style.background = "red";
  } else if (value.value == "green") {
    for (let i = 0; i < x.length; i++) x[i].style.background = "green";
  } else if (value.value == "random") {
    for (let i = 0; i < x.length; i++) {
      let colors = ["red", "green", "yellow", "black", "blue"];
      x[i].style.background = colors[Math.floor(Math.random() * 5)];
    }
  } else {
    for (let i = 0; i < x.length; i++) x[i].style.background = colorCopy[i];
  }
}

//Challenge 5: Blackjack game

var records = {
  You: {
    div: ".UserCards",
    scoreSpan: "#userScore",
    cardArr: ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  },
  Dealer: {
    div: ".CompCards",
    scoreSpan: "#dealerScore",
    cardArr: ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  },
};
document.querySelector("#hitBut").addEventListener("click", hitButton);
document.querySelector("#dealBut").addEventListener("click", dealButton);
document.querySelector("#standBut").addEventListener("click", standButton);

const YOU = records["You"];
const DEALER = records["Dealer"];

var hitaud = new Audio("sounds/swish.m4a");
var bustaud = new Audio("sounds/aww.mp3");
var endaud = new Audio("sounds/cash.mp3");

var copyCardsArr = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

function hitButton() {
  showButton(YOU);
}

function standButton() {
  if (document.querySelector("#dealerScore").innerHTML <= 15)
    showButton(DEALER);
  if (
    document.querySelector("#dealerScore").innerHTML > 15 ||
    document
      .querySelector("#dealerScore")
      .innerHTML.localeCompare("Busted!!") == 0
  ) {
    computWinner(
      document.querySelector("#userScore").innerHTML,
      document.querySelector("#dealerScore").innerHTML
    );
  }
}

function showButton(n) {
  x = selectCard(n);

  if (x != null) {
    var userImg = document.createElement("img");
    userImg.src = x;
    document.querySelector(n["div"]).appendChild(userImg);
    hitaud.play();
    console.log(x);
  }
}

function selectCard(n1) {
  if (!checkScore(n1)) {
    console.log("sdsd");
    return null;
  }
  var n = Math.floor(Math.random() * n1["cardArr"].length);
  var cardAdd = `images/${n1["cardArr"][n]}.png`;
  var score = 0;
  if (n1["cardArr"][n] == "A") score = 1;
  else if (
    n1["cardArr"][n] == "J" ||
    n1["cardArr"][n] == "K" ||
    n1["cardArr"][n] == "Q"
  )
    score = 10;
  else score = n1["cardArr"][n];
  n1["cardArr"].splice(n, 1);
  addScore(n1, score);
  return cardAdd;
}

function addScore(n1, n) {
  document.querySelector(n1["scoreSpan"]).innerHTML =
    parseInt(document.querySelector(n1["scoreSpan"]).innerHTML) + n;
  if (!checkScore(n1)) {
    bustaud.play();
    document.querySelector(n1["scoreSpan"]).innerHTML = "Busted!!";
    document.querySelector(n1["scoreSpan"]).style.color = "red";
  }
}

function checkScore(n) {
  return parseInt(document.querySelector(n["scoreSpan"]).innerHTML) <= 21;
}

function dealButton() {
  var x = document.querySelector(YOU["div"]).querySelectorAll("img");
  for (var i = 0; i < x.length; i++) x[i].remove();
  x = document.querySelector(DEALER["div"]).querySelectorAll("img");
  for (var i = 0; i < x.length; i++) x[i].remove();
  document.querySelector("#userScore").innerHTML = 0;
  document.querySelector("#userScore").style.color = "black";
  document.querySelector("#dealerScore").innerHTML = 0;
  document.querySelector("#dealerScore").style.color = "black";
  cardsArr = [];
  for (var i = 0; i < 13; i++) {
    YOU["cardArr"].push(copyCardsArr[i]);
    DEALER["cardArr"].push(copyCardsArr[i]);
  }
}

function computWinner(n1, n2) {
  if (n1.localeCompare("Busted!!") == 0 && n2.localeCompare("Busted!!") == 0)
    document.querySelector("#draw").innerHTML =
      parseInt(document.querySelector("#draw").innerHTML) + 1;
  else if (n1.localeCompare("Busted!!") == 0)
    document.querySelector("#loss").innerHTML =
      parseInt(document.querySelector("#loss").innerHTML) + 1;
  else if (n2.localeCompare("Busted!!") == 0)
    document.querySelector("#win").innerHTML =
      parseInt(document.querySelector("#win").innerHTML) + 1;
  else {
    if (n1 < n2)
      document.querySelector("#loss").innerHTML =
        parseInt(document.querySelector("#loss").innerHTML) + 1;
    else if (n1 > n2)
      document.querySelector("#win").innerHTML =
        parseInt(document.querySelector("#win").innerHTML) + 1;
    else
      document.querySelector("#draw").innerHTML =
        parseInt(document.querySelector("#draw").innerHTML) + 1;
  }
  endaud.play();
}
