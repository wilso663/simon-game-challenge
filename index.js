const buttonColours = ['red','blue','green','yellow'];
var gamePattern = [];  
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var gameFail = false;

function onGameRestart(){  
  gamePattern = [];
  level = 0;
  gameStarted = false;
}

function playSound(id){
  let audioClip = new Audio("./sounds/" + id + '.mp3');
  audioClip.play();
}
function nextSequence(){
  userClickedPattern = [];
  level++;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Level " + level);

}

function animatePress(currentColour){
  $("#" + currentColour).addClass('pressed');
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  let answer = userClickedPattern[currentLevel];
  if(answer === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $("#level-title").text("Game Over, Press Here to Restart");
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    onGameRestart();
    gameFail = true;
  }
}

$('[type="button"').click(function(){
  let userChosenColour = $(this).attr('id');
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
});

$(document).keydown(function(event) {
  if(!gameFail){
    if(!gameStarted){
      nextSequence();
      gameStarted = true;
    }
  } else {
    gameFail = false;
  }
});

$(document).click(function(event) {
  if(!gameFail){
    if(!gameStarted){
      nextSequence();
      gameStarted = true;
    }
  } else {
    gameFail = false;
  }
});