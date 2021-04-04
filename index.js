const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let isFirstPress = false;

$(document).keypress(function () {
  if (!isFirstPress) {    //first press is true
    $("#level-title").text("Level " + level);   //set the level
    nextSequence();   //for the first sequence - level 1
    
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];          //reset user answers
  level++;
  $("#level-title").text("Level " + level);     //change the title text
  let randomNumber = Math.floor(Math.random() * 4);     //generate random num between 0-3
  let randomChosenColour = buttonColours[randomNumber];     //set the number as color
  gamePattern.push(randomChosenColour);     //push color to gamepattern array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);     //animate button

  playSound(randomChosenColour);        //play sound accoding to color
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  isFirstPress = false;
}
