import BLOCKS from "./blocks.js"


//DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");
const tetrisDisplay = document.querySelector(".tetris");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
let play = true;
let pointAdded = 0;
let oldScore = 0;
const movingItem = {
    type: "",
    direction: 3,
    top: 0,
    left: 0,
};

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

init()

function init() {
    
    tempMovingItem = movingItem;
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    generateNewBlock()
}

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < GAME_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    playground.prepend(li)
}

function renderBlocks(moveType = ""){
    const { type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x]: null;
        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem }
            if(moveType === 'retry'){
                clearInterval(downInterval)
                play = false;
                showGameoverText()
            }
            setTimeout(() => {
                renderBlocks('retry');
                if(moveType === "top") {
                    seizeBlock();
                }
            }, 0)
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
    pointAdded = score - oldScore;
    if(pointAdded == 20){
        score +=10;
        scoreDisplay.innerText = score;
        showTetrisText("Double");
    }
    else if(pointAdded == 30) {
        score +=30;
        scoreDisplay.innerText = score;

        showTetrisText("Triple");
    }
    else if(pointAdded == 40) {
        //print Tetris
        score += 70;
        scoreDisplay.innerText = score;
        showTetrisText("Tetris");
    }
    oldScore = score;
}

function checkMatch(){

    const childNodes = playground.childNodes;
    childNodes.forEach(child=> {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine();
            score+= 10;
            
            scoreDisplay.innerText = score;
            
        }
    })

    generateNewBlock()
}

function generateNewBlock(){
    
    if(play) {
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock('top',1)
    },duration)

    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 4;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks()
    }
    else{

    }
}
function checkEmpty(target) {
    if(!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
function moveBlock(movetype, amount) {
    tempMovingItem[movetype] += amount;
    renderBlocks(movetype);
}
function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0: tempMovingItem.direction += 1;
    renderBlocks();
}
function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(()=> {
        moveBlock('top',1)
    },15)
}

function showGameoverText() {
    gameText.style.display = "flex"
}
function showTetrisText(msg) {
    if (msg == "Double"){
        tetrisDisplay.style.color = "yellow";
        tetrisDisplay.innerText = "Double x2";
    }
    else if (msg == "Triple"){
        tetrisDisplay.style.color = "orange";
        tetrisDisplay.innerText = "Triple x4"; 
    }
    else {
        tetrisDisplay.style.color = "red";
        tetrisDisplay.innerText = "Tetris x8!!";
    }
        tetrisDisplay.style.display = "flex";
        setTimeout(function(){
        tetrisDisplay.style.display = "none"}, 500);

}
//event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 38:
            changeDirection();
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
})

restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    gameText.style.display = "none";
    score = 0;
    play = true;
    scoreDisplay.innerText = score;
    init()
})