let inputdir = { x: 0, y: 0 };
const EatSound = new Audio("food.mp3");
const Over = new Audio("gameover.mp3");
const movesnake = new Audio("move.mp3");
//const music=new Audio('music.mp3');
let speed = 4;
let prev = 0;
let score = 0;
let snakeArr = [{ x: 15, y: 10 }];
let food = { x: 10, y: 9 };
let isPaused = false;
function pauseGame() {
  isPaused = true;
}

// Function to resume the game
function resumeGame() {
  isPaused = false;
}
const board = document.getElementById("board");
//Snake functions
function main(currentTime) {
  // music.play();
  
  window.requestAnimationFrame(main);
  if (isPaused) {
    return;
  }
  if ((currentTime - prev) / 1000 < 1 / speed) {
    return;
  }
  prev = currentTime;
  SnakeEngine();
}

// game over conditons
function GameOver(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
}


function SnakeEngine() {
  if (isPaused) {
    return;
  }
  // updating snake size
  if (GameOver(snakeArr)) {
    Over.play();
    // music.pause();
    isPaused = true;
    inputdir = { x: 0, y: 0 };
    alert("Game Over,press any key to restart");
    snakeArr = [{ x: 13, y: 15 }];
    //music.play();
    score = 0;
  }


  //collision condition and random food generation
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    EatSound.play();
    //scoreBoard
    score+=1;
    if (score % 3 === 0) {
      speed += 1;
    }
    if(score>hiscoreval){
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
  }
    scoreBox.innerHTML="score:"+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputdir.x,
      y: snakeArr[0].y + inputdir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }


  //moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;

  //render food and snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("snake");
    } else {
      snakeElement.classList.add("snakebody");
    }
    //snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

//main code
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.addEventListener("keydown", (e) => {
  if (e.key === " ") { // Space key
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
  inputdir = { x: 0, y: 1 };
  movesnake.play();
  switch (e.key) {
    case "ArrowUp":
      inputdir.x = 0;
      inputdir.y = -1;
      break;

    case "ArrowDown":
      inputdir.x = 0;
      inputdir.y = 1;
      break;

    case "ArrowRight":
      inputdir.x = 1;
      inputdir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x = -1;
      inputdir.y = 0;
      break;
  }
});
