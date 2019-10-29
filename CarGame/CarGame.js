// Game Constants
const NUMBLOCKS = 25;
const MAXSPEED = 80;
const MINSPEED = 30;
const FRAMERATE = 200;
const CARSPRITES = [
    'url("Black_viper.png")',
    'url("Mini_van.png")',
    'url("Police.png")'
];
// QUESTION 2.1 GENERATE ENEMIES
// YOUR CODE HERE
var numLives=3;
var Body=document.getElementById("body");
var enemy=document.createElement("div");
enemy.classList.add("some_class");
enemy.setAttribute("data-attr", "b1");
var weight=genRandomNum(0,window.innerWidth).toString();
enemy.setAttribute("style","margin-left:"+weight+"px;"+"background-position:center;position:absolute;margin-top:40px;width:40px;height:90px; background-image:"+CARSPRITES[genRandomNum(0,3)]+";background-size: cover;");
enemy.setAttribute("data-speed",genRandomNum(MINSPEED,MAXSPEED).toString());
Body.appendChild(enemy);
// QUESTION 2.2 STYLE ENEMIES
// YOUR CODE HERE
var myCar=document.createElement("div");
myCar.setAttribute("style","height:90px;width:40px;position:absolute;background-position:center;background-image:url(Car.png)");
Body.appendChild(myCar);
// QUESTION 2.3 CREATE PLAYER
// YOUR CODE HERE

// QUESTION 2.4 Move and Reset Enemies
// Move the enemeies down the screen

function moveBlock() {
    let Speed=Number(enemy.getAttribute("data-speed"));
    let Top=Number(enemy.style.marginTop.match(/\d+/g)[0]);
    enemy.style.marginTop=(Top+Speed).toString()+"px";
}

// Move the enemeies back to the top
// of the screen
function moveBack() {
    let enemyLocation=Number(enemy.style.marginTop.match(/\d+/g)[0]);
    if(enemyLocation>window.innerHeight){
        enemy.style.marginTop="-40px"
        numLives++;
    }
}

// Check if we collided with any of them
function detectCollide() {
    let enemyLocationX=Number(enemy.style.marginLeft.match(/\d+/g)[0]);
    let enemyLocationY=Number(enemy.style.marginTop.match(/\d+/g)[0]);
    let myCarLocationX=Number(myCar.style.marginLeft.match(/\d+/g)[0]);
    let myCarLocationY=Number(myCar.style.marginTop.match(/\d+/g)[0]);
    let checkX=Math.abs(enemyLocationX-myCarLocationX);
    let checkY=Math.abs(enemyLocationY-myCarLocationY);
    if(checkX<40&&checkY<90){
        numLives--;
        enemy.style.marginTop="-40px"
    }
    if(numLives===0){
        alert("Game Over!");
        window.location.reload();
        numLives=3;
    }
}
document.addEventListener("mousemove",function (e) {
    myCar.style.marginTop=(e.clientY-45).toString()+"px";
    myCar.style.marginLeft=(e.clientX-20).toString()+"px";
});
setInterval(playGame,FRAMERATE);
// The main game event loop
function playGame() {
    moveBlock();
    detectCollide();
    moveBack();
}

// QUESTION 2.5 RUNNING THE GAME
// YOUR CODE HERE

/* ----------------- */
/* HELPER FUNCTIONS  */
/* ----------------- */
// Generate A random integer between min_value
// and max_value (inclusive)
function genRandomNum(min_value, max_value) {
    return Math.round(Math.random() * (max_value - min_value) + min_value);
}

// Check if element a and element b are touching
// a and b *must* be of type Element
function didCollide(a, b) {
    let boundA = a.getBoundingClientRect();
    let ay = boundA.top;
    let ax = boundA.left;
    let ah = boundA.height;
    let aw = boundA.width;

    let boundB = b.getBoundingClientRect();
    let by = boundB.top;
    let bx = boundB.left;
    let bh = boundB.height;
    let bw = boundB.width;
    return !(ay + ah < by || ay > by + bh || ax + aw < bx || ax > bx + bw);
}
