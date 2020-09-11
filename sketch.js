var trex_running, groundImage;
var trex, ground;
var invisibleground;
var cloudImage;
var cloudGroup;
var obstacleGroup;
var gameover;
var restart;

var gamestate = "play";

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
  gameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
}

function setup() {
  //trex sprite created
  createCanvas(600, 200);
  trex = createSprite(40, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.4;

  gameover = createSprite(300, 100, 20, 20);
  gameover.addImage("gameover", gameoverImage);
  gameover.visible = false;


  restart = createSprite(300, 150, 20, 20);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5
  restart.visible = false;


  //GROUND SPRITE
  ground = createSprite(300, 180, 20, 20);
  ground.addImage("ground", groundImage);

  //invisible ground 
  invisibleground = createSprite(300, 190, 600, 5)
  invisibleground.visible = false;


  cloudGroup = new Group();
  obstacleGroup = new Group();
}
var count = 0;




function draw() {
  background(180);

  text("Score: "+ count, 500, 10);
 count=frameCount
  if (gamestate == "play") {

    //jump when the space key is pressed
    if (keyDown("space") & trex.y > 169) { 
      trex.velocityY = -10;

    }

    trex.velocityY = trex.velocityY + 0.8;

    ground.velocityX = -3;
    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    spawnClouds();
    spawnobstacles();

    if (trex.isTouching(obstacleGroup)) {
      gamestate = "end"
    }

  }
  if (gamestate == "end") {

    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    gameover.visible = true;
    restart.visible = true;
    count=0;
  }

  trex.collide(invisibleground);
  console.log(trex.y);
  
  if(mousePressedOver(restart)) {
    gamestate="play";
    gameover.visible=false;
    restart.visible=false;
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600, 100, 40, 10);
    cloud.y = random(80, 150);
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}

function spawnobstacles() {
  if (World.frameCount % 150 === 0) {
    var obstacle = createSprite(600, 165, 40, 10);
    obstacle.velocityX = -3;
    obstacle.Lifetime = 200;
    obstacle.scale = 0.5
    var yo = Math.round(random(1, 6));
    if (yo == 1) {
      obstacle.addImage("obstacle", obstacleImage1)
    }
    if (yo == 2) {
      obstacle.addImage("obstacle", obstacleImage2)
    }
    if (yo == 3) {
      obstacle.addImage("obstacle", obstacleImage3)
    }
    if (yo == 4) {
      obstacle.addImage("obstacle", obstacleImage4)
    }
    if (yo == 5) {
      obstacle.addImage("obstacle", obstacleImage5)

    }
    if (yo == 6) {
      obstacle.addImage("obstacle", obstacleImage6)
    }
    obstacleGroup.add(obstacle);
  }
}