/*
 * Create a list that holds all of your cards
 */

"use strict";
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {                                            //currentIndex = 16                     currentIndex = 15
        randomIndex = Math.floor(Math.random() * currentIndex);             //randomIndex = 0~15                                 =0~14
        currentIndex -= 1;                                                   //currentIndex = 15                                   =14
        temporaryValue = array[currentIndex];                                //temporaryValue = array[15]                          =array[14]
        array[currentIndex] = array[randomIndex];                            //array[15] = array[x]    x=0~15        array[14] = array[x]
        array[randomIndex] = temporaryValue;                                 //array[x] = array[15]                  array[x] = array[14]
    }
    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var oLi = document.getElementsByClassName("card");
var oClass = document.getElementsByClassName("card open show");
var reStart = document.getElementsByClassName("restart")[0];
var spanNum = document.getElementsByClassName("moves")[0];
var reCancel = document.getElementsByClassName("card noTrue");
var oUlR = document.getElementsByClassName("deck")[0];
var starNum = document.getElementsByClassName("stars")[0];
var clickDiv = document.getElementById("playAgain");
var oMatch = document.getElementsByClassName("match");
var dAlert = document.getElementById("dAlert");
var dAgain = document.getElementById("dAgain");
var getTime = document.getElementById("time");
var getTimerS = document.getElementById("timerS");
spanNum.innerHTML = "0";
var finalStarNum = 0;
var sNum = 0;
var mapC;
var t = 0;
var f = 0;

/*乱序*/
play();
function play(){
    let iConE = [
        "fa-cube","fa-paper-plane-o","fa-bicycle","fa-bolt","fa-bomb","fa-leaf","fa-bomb",
        "fa-diamond","fa-bicycle","fa-leaf","fa-anchor","fa-cube","fa-bolt","fa-anchor",
        "fa-paper-plane-o","fa-diamond"];
    shuffle(iConE);
    for(var p=0; p<iConE.length; p++){
        oUlR.innerHTML += `<li class="card"><i class="fa ${iConE[p]}" ></i></li>`;
    }
}
/*翻转*/
for(var i=0;i<oLi.length;i++) {
    oLi[i].onclick = function () {
        if (this.className != "card match" && reCancel.length == 0) {
            this.className = "card open show";
            sNum+=1;
        }
        if (oClass.length == 2) {
            mapIcon();
        }
        getScore();
        gameComplete();
        timer();
        if(oMatch.length == oLi.length) {
            clearInterval(tt);
        }
    }
}
/*匹配*/
function mapIcon() {
    if (oClass[0].children[0].className == oClass[1].children[0].className) {
        mapC = "card match";
    } else {
        mapC = "card noTrue";
    }
    oClass[0].className = mapC;
    oClass[0].className = mapC;
    checkAnimation();
}
/*监听动作返回card*/
function checkAnimation() {
    setTimeout(function(){
        if(reCancel.length > 0){
            reCancel[0].className = "card";
            reCancel[0].className = "card";
        }
    },600);
}
/*重置*/
reSet(reStart);
reSet(dAgain);
function reSet(obj) {
    obj.onclick = function () {
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].className = "card";
        }
        sNum = 0;
        getScore();
        /*重置计时器*/
        timer();
        clearInterval(tt);
        t = 0;
        f = 0;
        getTimerS.innerHTML = "";
    };
}
/*评分*/
function getScore() {
    if(sNum%2 == 0){
        spanNum.innerHTML = sNum/2;
    }
    switch (sNum) {
        case 0:case 2:
            for(var j = 0; j<3; j++){
                starNum.children[j].style.display = "inline-block";
            }
            finalStarNum = 3;
            break;
        case 28:
            starNum.children[0].style.display = "none";
            finalStarNum =2;
            break;
        case 36:
            starNum.children[1].style.display = "none";
            finalStarNum = 1;
            break;
        case 50:
            starNum.children[2].style.display = "none";
            finalStarNum = 0;
            break;
        default:
            break;
    }
}
/*弹div*/
function gameComplete() {
    if(oMatch.length == oLi.length){
        setTimeout(function () {
            dAlert.style.visibility = "visible";
        },600);
        document.getElementById("score").innerHTML = `moves :  ${sNum/2} &nbsp;&nbsp;&nbsp; Star × ${finalStarNum}`;
        getTime.innerHTML = `Times : &nbsp;  ${t} : ${--f} `;
    }
}
/*结算画面 按下鼠标左键*/
function mouseDown() {
    clickDiv.style.backgroundColor = "#cccccc";
}
/*松开鼠标*/
function mouseUp() {
    clickDiv.style.backgroundColor = "#dddddd";
    dAlert.style.visibility = "hidden";
    t = 0;
    f = 0;
    getTimerS.innerHTML = "";
}
/*计时器*/
var tt;
function timer(){
    clearInterval(tt);
    tt = setInterval(function(){
        getTimerS.innerHTML = `${t} : ${f++} `;
        if(f==100){
            f -= 100;
            t ++;
        }
    },10);
}