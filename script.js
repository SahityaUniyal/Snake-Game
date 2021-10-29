// Game constants and variables
let direction = { x: 0, y: 0 };
let directionName = "";
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let snakeArray = [{ x: 13, y: 15 }];
let speed = 9;
let lastPaintTime = 0;
let [board] = document.getElementsByClassName("board");
let food = { x: 7, y: 5 };
let score = 0;
let highScore = 0;
let opposite=false;
// **********************Game functions**********************
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

// snake display function
function snakeDisplay() {
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });
  return;
}
// Display the food
function foodDisplay() {
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
// food generator
function foodGenerate() {
  foodElement = document.createElement("div");
  food.y = Math.floor(Math.random() * 18) + 1;
  food.x = Math.floor(Math.random() * 18) + 1;
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
  return;
}
// checking for game over
function isCollided(snarr) {
  // If You bump into walls
  if (
    snarr[0].x > 18 ||
    snarr[0].x <= 0 ||
    snarr[0].y > 18 ||
    snarr[0].y <= 0
  ) {
    gameOverSound.play();
    musicSound.pause();
    direction = { x: 0, y: 0 };
    alert("Game Over!! press any key to continue");
    snakeArray = [{ x: 13, y: 15 }];
    direction={x:0,y:0};
    musicSound.play();
    score = 0;
    return true;
  }
  // If You bump into yourself
  for (let i = 1; i < snakeArray.length; i++) {
    if (snarr[i].x === snarr[0].x && snarr[i].y === snarr[0].y) {
      gameOverSound.play();
      musicSound.pause();
      direction = { x: 0, y: 0 };
      alert("Game Over!! press any key to continue");
      snakeArray = [{ x: 13, y: 15 }];
      direction={x:0,y:0};
      musicSound.play();
      score = 0;
      return true;
    }
  }
  return false;
}
// Moving the snake
function moveSnake() {
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;
}

//Updating the snake on Eating food
function foodEaten() {
  if (snakeArray[0].x == food.x && snakeArray[0].y == food.y) {
    score+=1;
    foodSound.play();
    let obj = {
      x: snakeArray[0].x + direction.x,
      y: snakeArray[0].y + direction.y,
    };
    snakeArray.push(obj);
    foodGenerate();
  }

}
// sets the high score in local storage
function setHighScore() {
  highScore = localStorage.getItem("highScore");
  highScore=JSON.parse(highScore);
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }

}
// updates the score on the website
function displayScores() {
  scoreBox.innerHTML = "Score: " + score;
  highScoreBox.innerHTML = "High Score: " + highScore;
}
// game is controlled here(all the function called in here)
function gameEngine() {
  // Updating the snake array and food
  isCollided(snakeArray);
  // Display the snake
  snakeDisplay();
  // Display the food
  foodDisplay();
  // Eating food
  foodEaten();
  // Updating the score
  setHighScore();
  // displaying the score
  displayScores();
  // moving the snake
  moveSnake();
}

//********************** main logic starts here**********************
window.requestAnimationFrame(main);
function control(key){
  moveSound.play();
  musicSound.play();
  if(direction.x==0&&direction.y==0){
    direction.x=0;
    direction.y=-1;
  }
  if (directionName == "ArrowUp" && key == "ArrowDown") {
    opposite=true;
  } else if (directionName == "ArrowDown" && key == "ArrowUp") {
    opposite=true;
  } else if (directionName == "ArrowLeft" && key == "ArrowRight") {
    opposite=true;
  } else if (directionName == "ArrowRight" && key == "ArrowLeft") {
    opposite=true;
  } else {
    directionName = key;
    switch (key) {
      case "ArrowUp":
        direction.x = 0;
        direction.y = -1;
        break;
      case "ArrowDown":
        direction.x = 0;
        direction.y = 1;
        break;
      case "ArrowLeft":
        direction.x = -1;
        direction.y = 0;
        break;
      case "ArrowRight":
        direction.x = 1;
        direction.y = 0;
        break;
    }
  }
}
window.addEventListener("keydown", (e) => {
  control(e.key);
});