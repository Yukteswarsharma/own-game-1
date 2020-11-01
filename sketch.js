var ninja;
var AppleGroup, MelonGroup, StrawGroup, PeachGroup;
var gameState;
var count,ground, gameOver,time;

var star;
var score = 0;
var pScore = 0;
var visibility = 255;
var chance = 0;

function preload(){
  backImage = loadImage("background.jpg");
  appleImg = loadImage("apple.png");
  appleSlice1 = loadImage("apple-1.png");
  appleSlice2 = loadImage("apple-2.png");
  strawImg = loadImage("straw.png");
  strawSlice1 = loadImage("straw-1.png");
  strawSlice2 = loadImage("straw-2.png");
  melonImg = loadImage("melon.png");
  melonSlice1 = loadImage("melon-1.png");
  melonSlice2 = loadImage("melon-2.png");
  peachImg = loadImage("peach.png");
  peachSlice1 = loadImage("peach-1.png");
  peachSlice2 = loadImage("peach-2.png");
  ninjaImg = loadImage("ninja.png");
  boomImg = loadImage("boom.png");
  gameOverImg = loadImage("game-over.png");
  boomSound = loadSound("boom.mp3");
  clockSound = loadSound("clock.mp3");
  powerImg = loadImage("power.png");
  star3 = loadImage("star3.png");
  star4 = loadImage("star4.png");
  xImg = loadImage("lose.png");
}


function setup() {
  createCanvas(800,400);
  gameState = "form";
  AppleGroup = createGroup();
  StrawGroup = createGroup();
  MelonGroup = createGroup();
  PeachGroup = createGroup();
  BoomGroup = createGroup();
  NinjaGroup = createGroup();

  ninja = createSprite(200,375,0.05,0.05);

  yesButton = createButton("Yes");
  yesButton.position(400,350);
  yesButton.hide();

  startButton = createButton("Start");
  startButton.position(380,300);
  startButton.hide();

  resetButton = createButton("Reset");
  resetButton.position(100,50);
  resetButton.hide();

  gameOver = createSprite(400,120,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  power = createSprite(400,70,20,20);
  power.addImage(powerImg);
  power.scale = 0.6;
  power.visible = false;

  image1 = createSprite(250,200,50,50);
  image1.addImage(ninjaImg);
  image1.scale = 0.1;

  image2 = createSprite(400,200,50,50);
  image2.addImage(star3);
  image2.scale = 0.3;

  image3 = createSprite(550,200,50,50);
  image3.addImage(star4);
  image3.scale = 0.14;

  x1 = createSprite(640,100,20,20);
  x1.addImage(xImg);
  x1.scale = 0.7;

  x2 = createSprite(680,100,20,20);
  x2.addImage(xImg);
  x2.scale = 0.7;

  x3 = createSprite(720,100,20,20);
  x3.addImage(xImg);
  x3.scale = 0.7;

}

function draw() {
  background(backImage); 
  stroke("white");
  fill("white");
  image1.visible = false;
  image2.visible = false;
  image3.visible = false;
  if(gameState=== "powerPlay" || gameState === "play" || gameState === "end"){
    x1.visible = true;
    x2.visible = true;
    x3.visible = true;
  }else{
    x1.visible = false;
    x2.visible = false;
    x3.visible = false;
  }

  ninja.x = mouseX;

if(gameState === "form"){
  yesButton.show();
  textSize(25);
  text("Rules: ",350,170);
  text("The goal of this game is to slice the fruit",160,200);
  text("To slice the fruit, press the space bar",160,230);
  text("Beware of the falling bombs!",160,260);
  text("Are you ready to become the next fruit ninja?",160,290);
  yesButton.mousePressed(()=>{
    gameState = "options";
    yesButton.hide();
  })
}

if(gameState === "options"){
  textSize(30);
  text("Choose Your Ninja Blade",250,100);
  image1.visible = true;
  image2.visible = true;
  image3.visible = true;

  if(mousePressedOver(image1) || mousePressedOver(image2) || mousePressedOver(image3)){
    startButton.show();
  }

  if(mousePressedOver(image1)){
    ninja.scale = 0.05;
    ninja.addImage(ninjaImg);
  }else if(mousePressedOver(image2)){
    ninja.scale = 0.15;
    ninja.addImage(star3);
  }else if(mousePressedOver(image3)){
    ninja.scale = 0.08;
    ninja.addImage(star4);
  }
  
  startButton.mousePressed(()=>{
    gameState = "play";
    startButton.hide();
  })
}

 if(gameState === "play"){
  power.visible = false; 
  gameOver.visible = false;
  textSize(20);
  text("Score: "+ score,630,60);
    spawnApples();
    spawnStraws();
    spawnMelons();
    spawnPeaches();
    spawnBooms();
    time = 10;
 }
}
