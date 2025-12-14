// =====================================
// VARIABLES
// =====================================

// All possible button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Stores the game’s generated pattern
var gamePattern = [];

// Stores the user’s clicked pattern
var userClickedPattern = [];

// Keeps track of the current level
var level = 0;

// Prevents the game from restarting while playing
var started = false;


// =====================================
// START GAME (press any key)
// =====================================

$(document).keydown(function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});
$(document).click(function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});



// =====================================
// HANDLE BUTTON CLICKS
// =====================================

$(".btn").click(function () {

    // Get the id of the clicked button (color)
    var userChosenColor = $(this).attr("id");

    // Save user input
    userClickedPattern.push(userChosenColor);

    // Play sound + animation
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Check the user's latest input
    checkAnswer(userClickedPattern.length - 1);
});


// =====================================
// CHECK USER ANSWER
// =====================================

function checkAnswer(currentIndex) {

    // Compare latest user input with game pattern
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {

        // If user finished the full sequence correctly
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        // User made a mistake
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


// =====================================
// GENERATE NEXT SEQUENCE
// =====================================

function nextSequence() {

    // Reset user pattern for new level
    userClickedPattern = [];

    // Increase level
    level++;

    // Update heading
    $("#level-title").text("Level " + level);

    // Generate random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // Save to game pattern
    gamePattern.push(randomChosenColor);

    // Animate button
    $("#" + randomChosenColor)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    // Play sound
    playSound(randomChosenColor);
}


// =====================================
// PLAY SOUND
// =====================================

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// =====================================
// BUTTON PRESS ANIMATION
// =====================================

function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}


// =====================================
// RESET GAME
// =====================================

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
