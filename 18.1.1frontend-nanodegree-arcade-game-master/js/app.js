var goal = 0;
var t = 0;
var f = 0;
var sp = document.getElementsByTagName("span")[0];
var oDiv = document.getElementsByTagName("div")[0];
var oP = document.getElementsByTagName("p")[0];
const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
var isPlaying = false; // 用于保存游戏状态

//关闭弹窗
var btn = function(){
	oDiv.style.visibility = "hidden";
	sp.innerHTML = "时间：" + 0 + "." + 0;
	for(var i=0; i<allEnemies.length; i++){
		allEnemies[i].x = CELL_WIDTH*5;
	}
	t=0;
	f=0;
	goal = 0;
	isPlaying = false;
}
//创建敌人的类
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -CELL_WIDTH;
    this.y = 225-Math.floor(Math.random()*3)*CELL_HEIGHT;
 	this.speed = 3+Math.random()*3;
};
//运动方法
Enemy.prototype.update = function(dt) {
    if(this.x>=CELL_WIDTH*5){
    	this.x = -CELL_WIDTH;
	 	this.y = 225-Math.floor(Math.random()*3)*CELL_HEIGHT;
	 	this.speed = 3+Math.random()*3;
    }
    this.x += this.speed;
};
//绘制敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//创建玩家的类
var Player = function(){
	this.sprite = 'images/char-boy.png';
	this.reset();
}
//重置玩家位置
Player.prototype.reset = function(){
	this.x = 202;
	this.y = 375;
}
//玩家的运动方法
Player.prototype.update = function() {
	if(this.x<0)this.x=0;
	if(this.x>404)this.x=404;
	if(this.y>375)this.y=375;
	if(this.y === -40){
		this.reset();
		//过河三次完成
		goal++;
		if(goal==3){
			oDiv.style.visibility = "visible";
			oP.innerHTML = "You win by " + t + "." + --f + " seconds";
			timer();
			clearInterval(tt);
		}
	}
	//遇敌情况
	for(var i=0; i<allEnemies.length; i++){
		if(Math.abs(this.x - allEnemies[i].x)<50 && Math.abs(this.y - allEnemies[i].y)<17){
			this.reset();
		}
	}
};
//绘制
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//玩家控制器
Player.prototype.handleInput = function(x){
	switch(x){
		case "left": this.x += -CELL_WIDTH
		break;
		case "right": this.x += CELL_WIDTH
		break;
		case "up": this.y += -CELL_HEIGHT
		break;
		case "down": this.y += CELL_HEIGHT
		break;
	}
};
//绘制玩家
var player = new Player();
//创建敌人
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
//归类
var allEnemies = [enemy1,enemy2,enemy3];
//玩家方向键控制器
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',     //键码
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    if (!isPlaying) {   
        timer();
        isPlaying = true;  // 游戏开始之后，按下按键不再调用 timer()
    }
});
//计时器
var tt;
function timer(){
    clearInterval(tt);
    tt = setInterval(function(){
    	sp.innerHTML = "时间：" + t + "." + f++;
        if(f==100){
            f -= 100;
            t ++;
        }
    },10);
};