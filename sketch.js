var database;
var dog;
var happyDog;
var fCount;
var foodS
var dog1;
var lastFed;


function preload(){
  dog1 = loadImage("sprites/Dog.png");
  dogHappy = loadImage("sprites/happydog.png");
  }

function setup(){
  
  database = firebase.database();
 // console.log(database);
  createCanvas(500,500);
  dog = createSprite(250,300,150,150);
  dog.addImage(dog1);
  dog.scale = 0.3;
  foodObj = new Food(20,20,50,50);
  //foodObj.scale = 0.00003;
  //foodStock =  database.ref('foodStock').once("value");
  // foodStock= database.ref('Food');

  // foodStock.on("value", readStock);
  foodObj.getFoodStock();
  
  feed = createButton("Feed the Dog")
  feed.position(250,50);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(400,50);
  addFood.mousePressed(giveFood);

 }

function draw(){
      background(46,139,87);
      // if(keyWentDown(UP_ARROW)){
      //   writeStock(foodS);
      //   dog.addImage(dogHappy);
      // }
      foodObj.display();
drawSprites();

fill("black");
textSize(24);
text("Food remaning :"+fCount,160,120);

if(lastFed>=12){
  text("Last Feed: "+lastFed%12+"PM",50,20);
}else if(lastFed==0){
  text("Last Fed: 12 AM",50,20 );
}else{
  text("Last Fed: "+lastFed+"AM",50,20);
}


}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food : x
  })
}


function feedDog (){
  dog.addImage(dogHappy);
  foodObj.getFoodStock();
  foodObj.updatefoodStock(fCount-1);
  console.log("deefDog " + fCount);
  database.ref('/').update({
    feedTime: hour()
  })
  getFeedTime();


}

function giveFood(){
  fCount++;
  console.log("addFood " + fCount);
foodObj.updatefoodStock(fCount);
console.log("addFood " + fCount);
dog.addImage(dog1);
}

function getFeedTime(){
  var lastFedref = database.ref("feedTime");

  lastFedref.on("value",function(data){ lastFed = data.val();})
}