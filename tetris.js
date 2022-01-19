import BLOCKS from "./blocks.js"


//DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-button");
const tetrisDisplay = document.querySelector(".tetris");
const stageDisplay = document.querySelector(".stage");
var high_scores = document.querySelector("ol.high-scores");

//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//variables
let score = 0;
let duration = 1000;
let downInterval;
let tempMovingItem;
let play = false;
let pointAdded = 0;
let oldScore = 0;
let lineCount = 0;
let stage = 1;
let scoreMultiplier = 1;
let drop = true;
let prevMoveType;

const movingItem = {
    type: "",
    direction: 0,
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
    if(!play){
    restartButton.innerText = "Play";
    restartButton.style.display = "flex";
    gameText.innerText ="Instructions: \n →, ←: move block right or left \n ↓: soft drop \n space-bar: hard(instant) drop";
    gameText.style.fontSize = "medium";
    gameText.style.display = "flex";
    }
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
    if(pointAdded >= ((40*scoreMultiplier)-4)) { //Minimum score will be added as oldScoreMultiplier * 3 + newScoreMuliplier if stage changes after deletion of first 3 lines out of 4, oldScoreMultiplier has value of -1 thus -1(3)
        //print Tetris
        score += (80 *  scoreMultiplier);
        scoreDisplay.innerText = "Score: " + score;
        showTetrisText("Tetris");
    }
    else if(pointAdded >= ((30 * scoreMultiplier)-3)) { //Minimum Score will be added as oldScoreMultiplier * 2+ newScoreMuliplier if stage changes after deletion of first 2 lines out of 3
        score += (30 * scoreMultiplier);
        scoreDisplay.innerText = "Score: " + score;
        showTetrisText("Triple");
    }
    else if(pointAdded >= ((20 * scoreMultiplier) -2)){ //Minimum Score will be added as oldScoreMultiplier + newScoreMuliplier if stage changes after deletion of first line out of 2
        score += (10 * scoreMultiplier);
        scoreDisplay.innerText = "Score: " + score;
        showTetrisText("Double");
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
            score+= (10*scoreMultiplier);
            lineCount += 1;
            if (lineCount == 10) {
                duration = duration * 0.90;
                lineCount = 0;
                stage ++;
                scoreMultiplier = (scoreMultiplier + ((stage - 1) / 10));
                stageDisplay.innerText = "Stage: " + stage;
            }
            scoreDisplay.innerText = "Score: " + score;   
            
        }
    })

    generateNewBlock()
}
function pauseResume() {
    if (play){
    play = false;
    gameText.innerText = "Paused";
    gameText.style.fontSize = "50px";
    gameText.style.display = "flex";
    }
    else {
        gameText.style.display = "none";
        play = true;
        drop = true;
    }
}

function dropInterval (){
    if(play && drop){ 
         
        clearInterval(downInterval);
        downInterval = setInterval(()=>{
            moveBlock('top',1)
        },duration)
    
    }
}
function generateNewBlock(){
    dropInterval();
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 4;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    
    if (play) {renderBlocks()
    }
}
    // else{

    // }
// }
function checkEmpty(target) {
    if(!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
function moveBlock(movetype, amount) {
    if (play){
    tempMovingItem[movetype] += amount;
    renderBlocks(movetype);
    }
}
function changeDirection(){
    if(play){
        const direction = tempMovingItem.direction;
        direction === 3 ? tempMovingItem.direction = 0: tempMovingItem.direction += 1;
        renderBlocks();
    }
}
function hardDrop() {
    clearInterval(downInterval);
    if(play){
        downInterval = setInterval(()=> {
            moveBlock('top',1)
        },10)
    }
}

function showGameoverText() {
    gameText.innerText = "Game-over!!";
    gameText.style.fontSize = "50px";
    gameText.style.display = "flex";
    restartButton.innerText ="Re-Start"
    restartButton.style.display = "flex";
}
function showTetrisText(msg) {
    if (msg == "Double"){
        tetrisDisplay.style.color = "yellow";
        tetrisDisplay.innerText = "Double";
    }
    else if (msg == "Triple"){
        tetrisDisplay.style.color = "orange";
        tetrisDisplay.innerText = "Triple"; 
    }
    else {
        tetrisDisplay.style.color = "red";
        tetrisDisplay.innerText = "Tetris!!!";
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
            drop = false;
            clearInterval(downInterval);
            moveBlock("top", 1);
            if (play){ //
            setTimeout (function (){
               drop = true;
               dropInterval();
            }, 100)
            }
            break;
        case 32:
            hardDrop();
            break;
        case 80:
            pauseResume();
            break;
        default:
            break;
    }
})

function reset() {
    gameText.style.display = "none";
    restartButton.style.display = "none";
    score = 0;
    stage = 1;
    scoreMultiplier = 1;
    oldScore = 0;
    lineCount = 0;
    duration = 1000;
    play = true;
    drop = true;
    scoreDisplay.innerText = "Score:" + score;
    stageDisplay.innerText = "Stage:" + stage;
}
restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    reset()
    init()
})