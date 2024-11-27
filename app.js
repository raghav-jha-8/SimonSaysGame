let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");

// Event listener to start the game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game has started");
        started = true;
        levelUp();
    }
});

// Function to make a button flash (visual feedback for game sequence)
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250); // Flash duration
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250); // Flash duration
}

// Function to level up
function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    //let randIdx= Math.floor(Math.random() * 3);
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns [randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq)
    gameFlash(randBtn);
}

function checkAns(idx){
    //let idx = level-1;
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML =`Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress(){
    //console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns ){
    btn.addEventListener("click", btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}