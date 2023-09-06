var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;


var started = false;


function startOver(){
    started = false;
    level =0;
    gamePattern = [];
}

$(document).keydown(function(){
    if(!started){
        $('h1').text("Level "+ level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){
    level = level +1;
    $('h1').text("Level "+level);
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var btn = $('.'+randomChosenColour);
    btn.fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
   
}

function playSound(name){
    console.log(name);
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColour){
    var btn = $("#"+currentColour);
    btn.addClass("pressed");
    setTimeout(function(){ btn.removeClass("pressed")}, 100);
}




$('.btn').click(function(){
    
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        
        
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    else{
        console.log("Wrong");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 2000);
        $('h1').text("Game Over, Press any key to restart");
        startOver();

    }

    
}
