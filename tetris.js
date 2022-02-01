import BLOCKS from "./blocks.js"


//DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-button");
const tetrisDisplay = document.querySelector(".tetris");
const stageDisplay = document.querySelector(".stage");
const nextLevelDisplay = document.querySelector(".next-level");
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
let lineCount = 0;
let stage = 1;
let scoreMultiplier = 1;
let drop = true;
let linesRemoved = 0;
let gameover = new Audio("audio/try_again.ogg");
let theme = new Audio("audio/Solve_The_Puzzle.ogg");
let theme2 = new Audio ("audio/Interstellar_Odyssey.ogg");

theme.loop = true;
let playsound = true;
let line = new Audio("audio/line.ogg");
let double = new Audio("audio/double.ogg");
let triple = new Audio("audio/triple.ogg");
let tetris = new Audio("audio/tetris.ogg");
let down = new Audio("audio/down.ogg");
let mute = false;
gameover.preload, theme.preload, line.preload, double.preload, triple.preload, tetris.preload, down.preload = "auto";
gameover.currentTime, line.currentTime, double.currentTime, triple.currentTime, tetris.currentTime, down.currentTime = 0.5;
theme.volume = 0.15;
line.volume = 0.07;
down.volume = 0.07;
double.volume = 0.15;
triple.volume = 0.2;
tetris.volume = 0.25;
gameover.volume = 0.1;
const movingItem = {
    type: "",
    direction: 0,
    top: 0,
    left: 0,
};
function changeTheme(){
if (stage > 9){
    console.log("change music");
    theme.pause();
    theme2.volume = 0.15;
    theme2.play();
}
else{

}
}
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

init()

function init() {
    if (!play) {
        restartButton.innerText = "Play";
        restartButton.style.display = "flex";
        gameText.innerText = "Instructions: \n →, ←: move block right or left \n ↓: soft drop \n space-bar: hard(instant) drop \n m: mute/unmute";
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

function renderBlocks(moveType = "") {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem }
            if (moveType === 'retry') {
                clearInterval(downInterval)
                play = false;
                if (playsound) {
                    gameover.play();
                    playsound = false;
                }
                showGameoverText()
            }
            setTimeout(() => {
                renderBlocks('retry');
                if (moveType === "top") {
                    seizeBlock();
                    down.play();
                }
            }, 0)
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
}

function checkMatch() {

    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if (!li.classList.contains("seized")) {


                matched = false;
            }
        })
        if (matched) {
            child.remove();
            prependNewLine();
            score += (10 * scoreMultiplier);
            lineCount += 1;
            linesRemoved += 1;
            nextLevelDisplay.innerText = "Next Level: " + (10 - lineCount);
            console.log("linesRemoved = " + linesRemoved);
            if (lineCount == 10) {
                duration = duration * 0.90;
                lineCount = 0;
                stage++;
                changeTheme();
                scoreMultiplier = (scoreMultiplier + ((stage - 1) / 10));
                nextLevelDisplay.innerText = "Next Level: " + (10 - lineCount);
                stageDisplay.innerText = "Stage: " + stage;
            }
            scoreDisplay.innerText = "Score: " + score;

        }
    })
    checkTetris(linesRemoved);
    linesRemoved = 0;
    generateNewBlock()
}
function pauseResume() {
    if (play) {
        play = false;
        gameText.style.fontSize = "medium";
        gameText.style.display = "flex";
        tetrisDisplay.style.color = "white";
        tetrisDisplay.innerText = "Paused";
        tetrisDisplay.style.display = "flex";
        gameText.innerText = "\n\n\n\n\n\n\n\n\n\nInstructions: \n →, ←: move block right or left \n ↓: soft drop \n space-bar: hard(instant) drop \n m: mute/unmute";
    }
    else {
        gameText.style.display = "none";
        tetrisDisplay.style.display = "none";
        play = true;
        drop = true;
    }
}

function dropInterval() {
    if (play && drop) {

        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock('top', 1)
        }, duration)

    }
}
function generateNewBlock() {
    dropInterval();
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 4;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };

    if (play) {
        renderBlocks()
    }
}

function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}
function moveBlock(movetype, amount) {
    if (play) {
        tempMovingItem[movetype] += amount;
        renderBlocks(movetype);
    }
}
function changeDirection() {
    if (play) {
        const direction = tempMovingItem.direction;
        direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
        renderBlocks();
    }
}
function hardDrop() {
    clearInterval(downInterval);
    if (play) {
        downInterval = setInterval(() => {
            moveBlock('top', 1)
        }, 10)
    }
}

function showGameoverText() {
    gameText.innerText = "Game-over!!";
    gameText.style.fontSize = "50px";
    gameText.style.display = "flex";
    restartButton.innerText = "Re-Start"
    restartButton.style.display = "flex";

}
function showTetrisText(msg) {
    if (msg == "Double") {
        tetrisDisplay.style.color = "yellow";
        tetrisDisplay.innerText = "Double";
        double.play();
    }
    else if (msg == "Triple") {
        tetrisDisplay.style.color = "orange";
        tetrisDisplay.innerText = "Triple";
        triple.play();
    }
    else {
        tetrisDisplay.style.color = "red";
        tetrisDisplay.innerText = "Tetris!!!";
        tetris.play();
    }
    tetrisDisplay.style.display = "flex";
    setTimeout(function () {
        tetrisDisplay.style.display = "none"
    }, 500);

}
function muteUnmute() {
    if (!mute) {
        theme.volume = 0;
        theme2.volume = 0;
        line.volume = 0;
        down.volume = 0;
        double.volume = 0;
        triple.volume = 0;
        tetris.volume = 0;
        gameover.volume = 0;
        mute = true;
        console.log("muted");
    }
    else if (mute) {
        theme.volume = 0.15;
        theme2.volume = 0.15;
        line.volume = 0.07;
        down.volume = 0.07;
        double.volume = 0.25;
        triple.volume = 0.3;
        tetris.volume = 0.35;
        gameover.volume = 0.1;
        mute = false;
        console.log("unmuted");
    }
}
//event handling
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
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
            if (play) { //
                setTimeout(function () {
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
        case 77:
            muteUnmute();
            break;
        default:
            break;
    }
})
function checkTetris(lines) {
    switch (lines) {
        case 4:
            //print Tetris
            score += (120 * scoreMultiplier);
            scoreDisplay.innerText = "Score: " + score;
            showTetrisText("Tetris");
            break;
        case 3:
            score += (50 * scoreMultiplier);
            scoreDisplay.innerText = "Score: " + score;
            showTetrisText("Triple");
            break;

        case 2:
            console.log("score")
            var added = 20 * scoreMultiplier;
            console.log("score added: " + added);
            score += added;
            scoreDisplay.innerText = "Score: " + score;

            showTetrisText("Double");
            break;

        case 1:
            line.play();
            break;
        default:
            break;
    }
}
function reset() {
    gameText.style.display = "none";
    restartButton.style.display = "none";
    score = 0;
    stage = 1;
    scoreMultiplier = 1;
    lineCount = 0;
    duration = 1000;
    play = true;
    drop = true;
    playsound = true;
    scoreDisplay.innerText = "Score:" + score;
    stageDisplay.innerText = "Stage:" + stage;
    nextLevelDisplay.innerText = "Next Level: " + (10 - lineCount);
    theme2.pause();
}
restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    theme.play();
    reset()
    init()
})

