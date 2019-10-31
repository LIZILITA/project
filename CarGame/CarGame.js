// Game Constants
const NUMBLOCKS = 40;
const MAXSPEED = 40;
const MINSPEED = 8;
const FRAMERATE = 200;
const CARSPRITES = [
    'url("Black_viper.png")',
    'url("Mini_van.png")',
    'url("Police.png")'
];
const strengthMeterCode = ["strength-0", "strength-1", "strength-2", "strength-3", "strength-4", "strength-5"];
//初始化数据，5血量，绑定body元素，设置生成车辆为0；
var numLives = 5;
var Body = document.getElementById("body");
var numEnemy = 0;

//创建十个div元素，这里指enemy
function createEnemy() {
    while (numEnemy < 10) {
        Body.appendChild(document.createElement("div"));
        numEnemy++;
    }
}

createEnemy();
//选中所有div元素存到enemyList数组中
var enemyList = Body.querySelectorAll("div");

//给所有的div加上style
function addEnemyStyle() {
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].classList.add("some_class");
        enemyList[i].setAttribute("data-attr", "b1");
        enemyList[i].setAttribute("style", "margin-left:" + genRandomNum(0, window.innerWidth).toString() + "px;" + "background-position:center;position:absolute;margin-top:40px;width:40px;height:90px; background-image:" + CARSPRITES[genRandomNum(0, 3)] + ";background-size: cover;");
        enemyList[i].setAttribute("data-speed", genRandomNum(MINSPEED, MAXSPEED).toString());
    }
}

//初始化enemy车辆
addEnemyStyle();

//创建自己的车辆
var myCar = document.createElement("div");
myCar.setAttribute("style", "height:90px;width:40px;position:absolute;background-position:center;background-image:url(Car.png)");
Body.appendChild(myCar);

//获取血条的元素

setInterval(moveBlock,NUMBLOCKS);
//把所有的enemy往下移动
function moveBlock() {
    for (let i = 0; i < enemyList.length; i++) {
        let Speed = Number(enemyList[i].getAttribute("data-speed"));
        let Top = Number(enemyList[i].style.marginTop.match(/\d+/g)[0]);
        enemyList[i].style.marginTop = (Top + Speed).toString() + "px";
    }
}

//把出了屏幕的enemy重新调到屏幕上方
function moveBack() {
    for (let i = 0; i < enemyList.length; i++) {
        let enemyLocation = Number(enemyList[i].style.marginTop.match(/\d+/g)[0]);
        if (enemyLocation > window.innerHeight) {
            enemyList[i].style.marginTop = "0px";
            enemyList[i].style.marginLeft=genRandomNum(0,window.innerWidth).toString()+"px";
        }
    }
}
//检测主角车辆是否与其他车辆发生碰撞，并把发生碰撞的enemy调回到屏幕上方
function detectCollide() {
    for (let i = 0; i < enemyList.length; i++) {
        //得到车辆的坐标和鼠标的坐标
        let enemyLocationX = Number(enemyList[i].style.marginLeft.match(/\d+/g)[0]);
        let enemyLocationY = Number(enemyList[i].style.marginTop.match(/\d+/g)[0]);

        let myCarLocationX = Number(myCar.style.marginLeft.match(/\d+/g)[0]);
        let myCarLocationY = Number(myCar.style.marginTop.match(/\d+/g)[0]);
        //计算并判断距离是否小于车辆长度和宽度
        let checkX = Math.abs(enemyLocationX - myCarLocationX);
        let checkY = Math.abs(enemyLocationY - myCarLocationY);
        if (checkX < 40 && checkY < 90) {
            numLives--;
            //把车调回
            enemyList[i].style.marginTop = "0px";
            enemyList[i].style.marginLeft=genRandomNum(0,window.innerWidth).toString()+"px";
            //更改血条
           document.getElementById("Password_strength_meter").classList.replace(strengthMeterCode[numLives+1],strengthMeterCode[numLives]);
            document.getElementById("HP").innerText="HP:"+numLives.toString();
        }
    }
    //如果血条为0就弹出窗口并重新加载界面设置血量和雪条
    if (numLives < 0) {
        alert("Game Over!");
        window.location.reload();
        numLives = 5;
        //更改血条
        $("#Password_strength_meter").className.replace("strength-0","strength-5");
        document.getElementById("HP").innerText="HP:"+numLives.toString();
    }
}

//让主角车辆跟随鼠标移动
myCar.addEventListener("mousedown", function (e) {
    myCar.style.marginTop = (e.clientY - 45).toString() + "px";
    myCar.style.marginLeft = (e.clientX - 20).toString() + "px";
});
//给playGme加上定时器，每隔FRAMERATE毫秒调用一次
setInterval(playGame, FRAMERATE);

function playGame() {
    detectCollide();
    moveBack();
}

//返回一个介于两参数之间的随机数
function genRandomNum(min_value, max_value) {
    return Math.round(Math.random() * (max_value - min_value) + min_value);
}

