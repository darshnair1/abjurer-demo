var gameState = "startUp";
var backImg, abjurerTitleImg, beginButtonImg, howToPlayImg, beginButton;
var castleImg, mouseSwordImg, castle;
var viking_run, viking_attack, viking_hit;
var skeleton_run, skeleton_hit, skeleton_attack; 
var imp_run, imp_hit, imp_attack;
var gameMusic;
var rubberduck1, rubberduck2, rubberduckAni, rubberducky;
var life=2;
var score=0;
var mp = 5;
var enemiesGroup;

function preload() {
  backImg = loadImage("kingdom.png");
  abjurerTitleImg = loadImage("Images/abjurerTitleImg.png");
  beginButtonImg = loadImage("Images/beginButtonImg.png");
  howToPlayImg = loadImage("Images/howToPlayImg.png");
  castleImg = loadImage("Castle.png");
  skeleton_run = loadAnimation("run_1.png", "run_2.png", "run_3.png", "run_4.png", "run_5.png", "run_6.png");
  skeleton_attack = loadAnimation("attack1_1.png", "attack1_2.png", "attack1_3.png", "attack1_4.png", "attack1_5.png", "attack1_6.png");
  skeleton_hit = loadAnimation("hit_1.png", "hit_2.png", "hit_3.png");
  gameMusic = loadSound("gameMusic.mp3");
  widenSlash=loadImage("Images/Skill Icons/widen_slash.png");
  shackleEnemy=loadImage("Images/Skill Icons/shackle_enemy.png");
  healFrost=loadImage("Images/Skill Icons/heal_frost.png");
}

function setup() {
  createCanvas(1600,800);
  beginButton = createSprite(800, 600, 153, 69);
  abjurerTitleImg.scale = 12;
  enemiesGroup = new Group();
}

function draw() {

  background(backImg);  

  if(gameState === "startUp"){
    imageMode(CENTER);
    image(howToPlayImg, 800, 150);
    image(abjurerTitleImg, 800, 400, 422, 129);
    
    beginButton.addImage(beginButtonImg);
    
    if(mousePressedOver(beginButton)){
      gameState = "gamePlaying";
      console.log("is working!!!!!!!!");
      console.log(gameState);
    }
  }

  if(gameState === "gamePlaying") {
    //gameMusic.play();
    console.log(frameCount);
    castle = createSprite(1300, 400, 200, 200);
    castle.scale = 0.75
    castle.addImage(castleImg);
    howToPlayImg.visible = false;
    abjurerTitleImg.visible = false;
    beginButton.visible = false;
    createEnemies();
    attack();
    textSize(30);
    fill("white");
    text("LIFE: " + life, 10, 50);
    text("SCORE: " + score, 1330, 50);
    text("MAGIC: " + mp, 800, 50)
    
    if(frameCount % 400 === 0 && mp < 10) {
      mp += 1;
      console.log("magic refill")
    }

  }
  
  drawSprites();

}

function createEnemies(){
   if(frameCount % 15===0){
     enemies=createSprite(100,Math.round(random(150,750)),50,50);
     enemies.addAnimation("enemies",skeleton_run);
     enemies.scale=5;
     enemies.velocityX = frameCount / 50;
     enemiesGroup.add(enemies);
     for(var i = 0; i < enemiesGroup.length; i++) {
      if(enemiesGroup[i].x === 1300) {
        enemiesGroup[i].destroy();
        life -= 1;
        enemiesGroup.x -= 200;
      }
     }
   }
}

function attack() {

  widen_slash=createSprite(200,30,30,30);
  widen_slash.addImage("widenSlash", widenSlash);
  if(mousePressedOver(widen_slash) && mp >= 1) {
    enemiesGroup.destroyEach();
    mp -= 1;
  }

  shackle_enemy=createSprite(400,30,30,30);
  shackle_enemy.addImage("shackleEnemy", shackleEnemy);
  if(mousePressedOver(shackle_enemy) && mp >= 1) {
    enemiesGroup.setVelocityXEach(0);
    mp -= 1;
  }

  heal_frost=createSprite(600,30,30,30);
  heal_frost.addImage("healFrost", healFrost);
  if(mousePressedOver(heal_frost) && mp >= 1) {
    life += 2;
    mp -= 1;
  }

  
    for(var i = 0; i < enemiesGroup.length; i++) {
      if(mousePressedOver(enemiesGroup[i])) {
        enemiesGroup[i].destroy();
      }
    }
}