//Game States
var PLAY=1;
var END=0;
var gameState=1;

var score=0;

var knife;
var knifeImage;

var gameOverSound;

var fruit,fruitImg1,fruitImg2,fruitImg3,fruitImg4,fruitGroup;
var monster,monsterAnim,monsterG;
var gameOverImg,gameOver;


function preload(){
  
  knifeImage = loadImage("knife.png");
  fruitImg1 = loadImage("fruit1.png");
  fruitImg2 = loadImage("fruit2.png");
  fruitImg3 = loadImage("fruit3.png");
  fruitImg4 = loadImage("fruit4.png");
  knifeSwoosh = loadSound("knifeSwoosh.mp3");
  monsterAnim = loadAnimation("alien1.png","alien1.png","alien2.png");
  gameOverImg = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.scale=0.7
   knife.addImage(knifeImage);
  
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=2;
  
  
  //set collider for sword
  knife.setCollider("rectangle",10,-20,40,70);

  score=0;
  //create fruit and monster Group variable here
  
  fruitGroup = new Group();
  monsterG = new Group();
}

function draw() {
  background("lightblue");
  
  //knife.debug=false;
  
  if(gameState===PLAY){
    knife.visible=true;
    gameOver.visible=false;
    
    fruit();
    monster();
    //calling fruit and monster function

    // Move knife with mouse
    knife.x=knife.x+(((World.mouseX+20)-knife.x)/5);
    knife.y=knife.y+(((World.mouseY-25)-knife.y)/5);
    
    if(knife.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      knifeSwoosh.play();
      score=score+2;
    }
  
    if(knife.isTouching(monsterG)){
      monsterG.destroyEach();
      gameOverSound.play();
      gameState=END;
    }
    
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
      
  }else if(gameState===END){
    knife.x=300;
    knife.y=300;
    gameOver.visible=true;
    knife.visible=false;
    monsterG.destroyEach();
    fruitGroup.destroyEach();
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}



function fruit(){
  if(frameCount%100===0){
    var pos = Math.round(random(1,2));
    var fruit = createSprite(570,Math.round(random(570,30)));
    switch(pos){
      case 1: fruit.x=570;
        fruit.velocityX=-(7+Math.round(score/2));
        break;
      case 2: fruit.x=30;
        fruit.velocityX=7+Math.round(score/2);
        break;
      default:
        break;
    }
    var rand = Math.round(random(1,4));
    fruitGroup.add(fruit);
    switch(rand){
      case 1: fruit.addImage(fruitImg1);
        break;
      case 2: fruit.addImage(fruitImg2);
        break;
      case 3: fruit.addImage(fruitImg3);
        break;
      case 4: fruit.addImage(fruitImg4);
        break;
      default:
        break;
    }

    fruit.scale=0.2;
    fruit.lifetime=85;
    
    
    
  }
}




function monster(){
  
  if(frameCount%80===0){
    var pos = Math.round(random(1,2));
    var monster = createSprite(570,Math.round(random(570,30)));

    switch(pos){
      case 1: monster.x=570;
        monster.velocityX=-(7+Math.round(score/2));
        break;
      case 2: monster.x=30;
        monster.velocityX=7+Math.round(score/2);
        break;
      default:
        break;
    }
    monster.addAnimation("monsterFace",monsterAnim);
    monster.scale=0.8;
    monster.lifetime=85;
    //monster.debug=true;
    monsterG.add(monster);
    
    
    
  }
}