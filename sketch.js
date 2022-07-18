var gameState= "PLAY"

let ground;
let lander;
var lander_img;
var bg_img;
var spaceship1 , spaceship1img
var spaceship2 , spaceship2img
var spaceship3 , spaceship3img
var score = 0 
var spaceShipgGrp

var vy = 0;
var g = 0.05;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  spaceship1img = loadImage("spaceship1.png")
  spaceship2img = loadImage("spaceship2.png")
  spaceship3img = loadImage("spaceship3.png")
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
   spaceShipgGrp= new Group()
  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200)

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  if (gameState === "PLAY" ){
    push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

 

  score+= 1
  //fall down
  vy +=g;
  lander.position.y+=vy;
  createSpaceship()
  if ( spaceShipgGrp.isTouching(lander)|| lander.y> 650){
    gameState = "END"
   
  }
  }
  
  drawSprites();
 if (gameState === "END"){
  spaceShipgGrp.destroyEach()
  spaceShipgGrp.setVelocityXEach(0)
  lander.destroy()
  score=0
  fill("red")
  textSize(40)
  text("GAME OVER",width/2 , 550 )
 }
  
  fill(255)
  text("score "+score,800,100)
}

function keyPressed()
{
  if(keyCode==UP_ARROW)
  {
    upward_thrust();
    //lander.changeAnimation('thrusting');
   // thrust.nextFrame();
    
  }
}

function upward_thrust()
{
  vy = -1;
}

function createSpaceship(){
  if ( frameCount%200 == 0){ 
  spaceship= createSprite(900,Math.round(random(50,700)),15,15)
  spaceship.velocityX= -(2+ score/500)
  spaceship.scale= 0.4
  var rand= Math.round(random(1,3))
  switch(rand){
    case 1 : spaceship.addImage(spaceship1img)
    break;

    case 2 : spaceship.addImage(spaceship2img)
    break;

    case 3 : spaceship.addImage(spaceship3img)
    break;
  }
  spaceShipgGrp.add(spaceship)
}
}
 