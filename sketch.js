var PLAY = 1;
var END = 0;
var gameState = PLAY;
var boy, boy_walking ;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5 ;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  boy_walking =   loadAnimation("boy standing 1.png","boy standing 2.jpg","boy standing 3.jpg","boy standing 4.png","boy standing 5.jpg","boy standing 6.jpg",
  "boy standing 7.jpg","boy standing 8.jpg","boy standing 9.jpg","boy standing 10.jpg","boy standing 11.jpg","boy standing 12.jpg","boy standing 13.jpg",
  "boy standing 14.jpg","boy standing 15.jpg",);
  boy_falling = loadAnimation("boy falling 1.jpg","boy falling 2.jpg","boy falling 3.jpg");
  
  
  groundImage = loadImage("ground.jpg");
  

  
  obstacle1 = loadImage("bricks.png");
  obstacle2 = loadImage("bushes.png");
  obstacle3 = loadImage("sticks.pnj");
  obstacle4 = loadImage("stones 1.pnj");
  obstacle5 = loadImage("stones 2.pnj");
  
  
  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.jpg");
}

function setup() {
  createCanvas(600, 200);
  
 boy = createSprite(50,180,20,50);
  
  boy.addAnimation("walking", boy_walking);
  
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=1.5
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(200);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && boy.y >= 159) {
      boy.velocityY = -12;
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boy.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    //change the trex animation
    boy.changeAnimation("collided",boy_falling);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


    


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  
  boy.changeAnimation("running",boy_walking);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}