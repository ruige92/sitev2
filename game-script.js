let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
const cards = document.querySelectorAll('.memory-card');
cards.forEach(card=>card.addEventListener('click',flipCard));
var score = 0;
let finish = false;
// to record success match number for checking if game won
var matched = 0;
//check first flip to start Timer
var firstFlip=true;
//get Best record DOM
var records=document.querySelector('#bestRecord');
//get user input DOMs
var button = document.querySelector('#nameButton');
var input = document.querySelector('#username');
//get time DOM
var display = document.querySelector('#time');
//grab timer values from timer method
var timerMinute, timerSeconds;
//used to add time, if currentscore less than matched, make it matched value and add time to the timer!
var currentScore =0;
//timer sound for the last 10secs count down
const beep = new Audio("./sound/beep.mp3");
//save current game user name
var currentName ="";
//get add time indicator DOMs
var plusTimes = document.querySelector('#plusTime');




function initGame(){
  resetBoard();
  score = 0;
  document.getElementById('memory-score').innerHTML =score;
  finish = false;
  matched = 0;
  firstFlip=true;
  currentScore =0;
  button.style.visibility= "visible";
  input.style.visibility= "visible";
  display.textContent = "倒计时 00:00";
  display.style.color="white";
  display.style.animation="none";
  display.style.fontWeight="400";
  records.textContent ="";
  // plusTimes = document.querySelector('#plusTime');
  plusTimes.style.visibility="hidden";
  //
  for(i=0; i<100; i++){
    window.clearInterval(i);
  }
  //
  cards.forEach(card=>card.classList.remove('flip'));
  cards.forEach(card=>card.addEventListener('click',flipCard));
  //
  (function shuffle(){
    cards.forEach(card =>{
      let randomPos = Math.floor(Math.random()*30);
      card.style.order=randomPos;
    });
  })();
  if(currentName !== ""){
    submitName();
    console.log(currentName);
  }
}
//
// function removeCover(){
//   covers.classList.add('hide');
// }

function flipCard(){
  //check if game ended (all card is flipped)
  if (finish) return;
  //if board is locked, then exit the method, to avoid flipping
  if (lockBoard) return;
  //check if two card is the same card, to avoid clicking on same card twice
  if (this===firstCard) return;
  //check if its the first flip to start the Timer
  if(firstFlip){
    timeNow();
    //hide name input DOMs
    submitName();
  }
  //add the flip effect as you click the card
  this.classList.add('flip');
  //check if the pair of card is flipped yet
  //if not, then flip and assign the firstCard
  if (!hasFlippedCard){
    //now one card is flipped
    hasFlippedCard = true;
    //now firstCard is assigned with the card that got flipped
    firstCard=this;
    //since one card is flipped, exit the function for now
    return;
  }
  //if there's already a card flipped (that's not the same card as firstCard)
  //now set the hasFlippedCard to false to reset it,
  //as the second card is going to get flipped now
  secondCard=this;
  //call checkForMatch to check if there is a match
  checkForMatch();
}

function successSound(){
  const succ = new Audio("./sound/success.mp3");
  succ.loop= false;
  succ.play();
}

function errorSound(){
  const error = new Audio("./sound/error.mp3");
  error.loop=false;
  error.play();
}

function winSound(){
  const win = new Audio("./sound/win.mp3");
  win.loop=false;
  win.play();
}

function lostSound(){
  const lose = new Audio("./sound/lost.mp3");
  lose.loop=false;
  lose.play();
}

// function beepSound(){
//   const beep = new Audio("./beep.mp3");
//   beep.loop=false;
//   beep.play();
//   setTimeout(()=>{
//     beep.pause();
//   },10000);
// }

//method to check if two card's data-framework dataset is the same
// if so, call disable both matched cards, so they can't be flipped again
// else, unflip both cards.
function checkForMatch(){
  //check if card1 and card2 dataset are the same, assign to isMatch boolean
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  //tenerary function, if match, call disableCards, else call unflipCards.
  isMatch? disableCards():unflipCards();
  increaseScore();
}

//method of counting the amount of 'steps' user take to match all the pairs
function increaseScore(){
  if (!finish){
    document.getElementById('memory-score').innerHTML =score+1;
    score++;
  }
}


//method to remove card's eventlistener, so they can't be clicked again.
function disableCards(){
  successSound();
  firstCard.removeEventListener('click',flipCard);
  secondCard.removeEventListener('click',flipCard);
  //call resetBoard
  resetBoard();
  matched +=1;
  checkifEnd();
}

function unflipCards(){
  lockBoard=true;
  setTimeout(()=>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    errorSound();
    //call resetBoard to reset lockBoard to false;
    //reset first and second cards to null;
    resetBoard();
  },500)

}


//onsubmit store username
function submitName(){
  //username
  button.style.visibility= "hidden";
  input.style.visibility= "hidden";
  currentName=document.querySelector('#username').value;
}

//method resetting hasFlippedCard to false (no card flipped)
//reset lockBoard to false (board can be clicked)
//firstCard to null;
//secondCard to null;
function resetBoard(){
  [hasFlippedCard, lockBoard] = [false,false];
  [firstCard,secondCard]=[null,null];
}

function addTimeDisplay(){
  plusTimes.style.visibility="visible";
  setTimeout(()=>{
    plusTimes.style.visibility="hidden";
  },1000)
}

//add countdown timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var x = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        timerMinute = minutes;
        timerSeconds =seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //Add time if new match, add 5 seconds!
        if(currentScore<matched){
          currentScore=matched;
          timer+=5;
          // plusTimes.style.visibility="visible";
          addTimeDisplay();
        }

        display.textContent = "倒计时 " + minutes + ":" + seconds;
        if (timer > 10) {
          display.style.color="white";
          display.style.animation="none";
          display.style.fontWeight="400";
        }
        if (timer < 11) {
          display.style.color="#e35d5b";
          display.style.fontWeight="700";
          display.style.animation="shake 0.2s";
          display.style.animationIterationCount="infinite";
          beep.play();
        }
        if (--timer < 0) {
          clearInterval(x);
          finish=true;
          lostSound();
          display.style.animationIterationCount="0";
          records.textContent = "最高纪录\r\n";
          records.textContent += "名字: " + document.querySelector('#username').value +"\r\n";
          records.textContent += "所剩时间: " + minutes + "分" + seconds + "秒\r\n";
          records.textContent += "次数: " + score + "\r\n";
          records.textContent += "配对: " +matched;
          button.style.visibility= "hidden";
          input.style.visibility= "hidden";
        }
    }, 1000);
}


function timeNow(){
  var time = 10*3;
  //get plusTime indicator DOMs
  // plusTimes = document.querySelector('#plusTime');
  display = document.querySelector('#time');
  startTimer(time, display);
  firstFlip=false;

}


//method for checking if all cards are matched, if so
//play sound!
function checkifEnd(){
  if(matched==15){
    finish=true;
    winSound();
    for(i=0; i<100; i++){
      window.clearInterval(i);
    }
    button.style.visibility= "hidden";
    input.style.visibility= "hidden";
    //
    records.textContent = "最高纪录\r\n";
    records.textContent += "名字: " + document.querySelector('#username').value +"\r\n";
    records.textContent += "所剩时间: " + timerMinute + "分" + timerSeconds + "秒\r\n";
    records.textContent += "次数: " + score + "\r\n";
    records.textContent += "配对: " +matched;
    //
    document.querySelector('#time').style.color="white";
    document.querySelector('#time').style.animation="none";
    document.querySelector('#time').style.fontWeight="400";
    //
    plusTimes.style.visibility="hidden";
  }
  //Clear all timers again to be sure!
  // setTimeout(()=>{
  //   for(i=0; i<100; i++){
  //     window.clearInterval(i);
  //   }
  // },1500)
}



// (function f1(){test...}();) to immediately execute the function;
// ES6
(function shuffle(){
  cards.forEach(card =>{
    let randomPos = Math.floor(Math.random()*30);
    card.style.order=randomPos;
  });
})();
