var defaultInput = ["green", "red", "yellow", "blue"]; //color list
var generatedValue = []; // random color list
var useInput = []; // useInput
var level = 0; // level

//  2.the user must select the box, check whether the random color is equal to the users option,
var i = 0; // user click so we can match the generated value index to verify
$(".box").click(function (e) {
  if (!generatedValue.length) {
    handleError();
  }
  //  5. If correct then add another ,show the new random color and check whether the user clicks in the correct order.
  else if (e.target.id === generatedValue[i] && generatedValue.length) {
    i++;
    useInput.push(e.target.id);
    keyPressed(e.target.id);
    // 6.Play the audio for the user clicked button
    // var audio = new Audio(`${produceAudio(e.target.id)}`);
    // audio.play();
    if (generatedValue.length === useInput.length) {
      i = 0;
      useInput = [];
      setTimeout(function () {
        randomInput();
      }, 500);
    }
  } else handleError();
});

// 1. the user must press a key then generate a  random color
$(document).keypress(function (e) {
  if (!generatedValue.length) {
    randomInput();
  }
});

function randomInput() {
  //  3. Show Levels on every random color generated.
  level++;
  $("h1").text(`Level ${level}`);
  generatedValue.push(
    defaultInput[Math.floor(Math.random() * defaultInput.length)]
  );
  keyPressed(generatedValue[generatedValue.length - 1]);

}

function keyPressed(id) {
  $(`#${id}`).addClass("pressed");
  setTimeout(function () {
    $(`#${id}`).removeClass("pressed");
  }, 800);
  var audio = new Audio(`${produceAudio(id)}`);
  audio.play();
}
//  4. If wrong show error and ask the user to press any key and change the heading;
function handleError() {
  $("h1").text("Game Over,Press Any Key to Restart");
  $("body").css("backgroundColor", "red");
  var audio = new Audio(`${produceAudio("wrong")}`);
  audio.play();
  i = 0;
  generatedValue = [];
  useInput = [];
  level = 0;
  setTimeout(function () {
    $("body").css("backgroundColor", "#011f3f");
  }, 200);
}

function produceAudio(userAudio) {
  switch (userAudio) {
    case "green":
      return "./sounds/green.mp3";
    case "blue":
      return "./sounds/blue.mp3";
    case "yellow":
      return "./sounds/yellow.mp3";
    case "red":
      return "./sounds/red.mp3";
    default:
      return "./sounds/wrong.mp3";
  }
}
