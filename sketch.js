var ball;
var position;

function preload(){
    bg =loadImage("Images/cityImage.png");
    balloonImage1=loadAnimation("Images/HotAirBallon01.png");
    balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png","Images/HotAirBallon01.png",
    "Images/HotAirBallon02.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png","Images/HotAirBallon03.png",
    "Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

function setup(){
    database = firebase.database();

    createCanvas(1500,700);
    ball = createSprite(320,370,10,10);
    ball.addAnimation("hotAirBalloon",balloonImage1)
    ball.scale = 0.5;

    var ball_pos = database.ref('ball/position');
    ball_pos.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
        ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
        ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
        ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
        ball.addAnimation("hotAirBalloon",balloonImage2);
    }
    drawSprites();
    fill(0);
    stroke("white");
    textSize(25);
    text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
    
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function readPosition(data)
{
   position = data.val();
   console.log(position.x);
   ball.x = position.x;
   ball.y = position.y; 
}

function showError()
{
    console.log("Data cannot be read");
}