import BLOCKS from "./blocks.js"


//DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const comboText = document.querySelector(".combo");
const scoreDisplay = document.querySelector(".score");
const bestScoreDisplay = document.querySelector(".best-score");
const restartButton = document.querySelector(".game-button");

const pauseButton = document.querySelector("#pause_button");
const resumeButton = document.querySelector(".resume-button");
const muteButton = document.querySelector("#mute_button");


const tetrisDisplay = document.querySelector(".tetris");
tetrisDisplay.style.fontFamily = 'Karma';
const stageDisplay = document.querySelector(".stage");
const nextLevelDisplay = document.querySelector(".next-level");
const preview = document.querySelector(".preview > ul");
//Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

const PREVIEW_ROWS = 4;
const PREVIEW_COLS = 5;

//variables
let combo = 0.0;
let checkCombo = true;
let score = 0;
let bestScore = 0;
let duration = 1000;
let downInterval;
let hDrop = false;
let tempMovingItem;
let nextMovingItem;
let play = false;
let lineCount = 0;
let stage = 1;
let scoreMultiplier = 1;
let drop = true;
let linesRemoved = 0;
let gameover = new Audio("assets/audio/try_again.ogg");
let theme = new Audio("assets/audio/Solve_The_Puzzle.ogg");
let theme2 = new Audio("assets/audio/Interstellar_Odyssey.ogg");
let count = 0;
let lines = 0;
let newBlock = false;
let randomIndex = Math.floor(Math.random() * 7);
let checkCount = 0;
let displayRestart = false;

theme.loop = theme2.loop = true;
let playsound = true;
let line = new Audio("assets/audio/line.ogg");
let double = new Audio("assets/audio/double.ogg");
let triple = new Audio("assets/audio/triple.ogg");
let tetris = new Audio("assets/audio/tetris.ogg");
let down = new Audio("assets/audio/down.ogg");
let mute = true;
gameover.preload, theme.preload, line.preload, double.preload, triple.preload, tetris.preload, down.preload = "auto";
gameover.currentTime, line.currentTime, double.currentTime, triple.currentTime, tetris.currentTime, down.currentTime = 0.5;
theme.volume = theme2.volume = double.volume = 0.15;
line.volume = down.volume = 0.07;
triple.volume = 0.2;
tetris.volume = 0.25;
gameover.volume = 0.1;
theme.muted = theme2.muted = line.muted = down.muted = double.muted = triple.muted = tetris.muted = gameover.muted = mute = true;
const movingItem = {
    type: "",
    direction: 0,
    top: 0,
    left: 0,
};
const nextItem = {
    type: "",
    direction: 0,
    top: 0,
    left: 0,
};
function changeTheme() {
    if (stage > 9) {
        theme.pause();
        theme2.play();
    }
    else {

    }
}
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

init();

function handlePauseButtonClick() {
    pauseResume();
}

function handleMuteButtonClick() {
    muteUnmute();
}

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let longPressTimer;
const SWIPE_THRESHOLD = 50;
const LONG_PRESS_DURATION = 200;

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    longPressTimer = setTimeout(() => {
        handleSoftDrop();
    }, LONG_PRESS_DURATION);
}

function handleTouchMove(e) {
    // Prevent default scrolling behavior
    e.preventDefault();
    clearTimeout(longPressTimer);
}
function handleTouchEnd(e) {
    clearTimeout(longPressTimer);
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX > 0) {
                moveBlock("left", 1);
            } else {
                moveBlock("left", -1);
            }
        }
    } else {
        if (deltaY > SWIPE_THRESHOLD) {
            hardDrop();
        } else if (Math.abs(deltaY) < SWIPE_THRESHOLD) {
            changeDirection(); // Rotate on tap
        }
    }
}

function handleSoftDrop() {
    drop = false;
    clearInterval(downInterval);
    moveBlock("top", 1);
    if (play) {
        setTimeout(function () {
            drop = true;
            score += 1 * scoreMultiplier;
            updateScore();
            dropInterval();
        }, 100);
    }
}

function initMobileControls() {
    const gameArea = document.querySelector(".playground");
    gameArea.addEventListener("touchstart", handleTouchStart, { passive: false });
    gameArea.addEventListener("touchmove", handleTouchMove, { passive: false });
    gameArea.addEventListener("touchend", handleTouchEnd, { passive: false });
    
    // make pauseButton visible
    pauseButton.addEventListener("click", handlePauseButtonClick);
    muteButton.addEventListener("click", muteUnmute);
    
    restartButton.addEventListener("click", restart);
    resumeButton.addEventListener("click", () => {
        if (!play) {
            pauseResume();
        }
    });
}


function mobile() {
    initMobileControls();
}

function init() {
    if (!play) {
        mobile();
        restartButton.innerText = "Play";
        restartButton.style.display = "flex";
        restartButton.style.fontFamily = 'Karma';
        gameText.innerText = "Instructions: \n →, ←: move block right or left \n ↓: soft drop \n space-bar: hard(instant) drop \n m: play sound/mute \n r: re-start";
        gameText.style.fontSize = "medium";
        gameText.style.fontFamily = 'Karma';
        gameText.style.display = "flex";
    }
    loadBestScore();
    updateScoreDisplay();
    nextMovingItem = movingItem;
    tempMovingItem = movingItem;
    for (let i = 0; i < GAME_ROWS + 1; i++) {
        prependNewLine()
    }
    for (let j = 0; j < PREVIEW_ROWS; j++) {
        prependPreview()
    }
    generateNewBlock()
}

function prependPreview() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < PREVIEW_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    preview.prepend(li)
}

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < GAME_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    count++;

    if (count == lines + GAME_ROWS && !ul.classList.contains("top_line")) {
        ul.classList.add("top_line");
    }
    if (count == lines + GAME_ROWS +1 && !ul.classList.contains("invisible")) {
        ul.classList.add("invisible");
        ul.parentElement.style.display = "none";
        checkCount = count;
    }
    

    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            if(count >  GAME_ROWS +1 &&ul.classList.contains("top_line")) {
                ul.classList.remove("top_line");
            }
            if(count > GAME_ROWS +1 && ul.classList.contains("invisible")){
            ul.classList.remove("invisible");
            ul.classList.add("top_line");
            ul.parentElement.style.display = "initial";
            checkCount++;
            }
            
        })
    })
    playground.prepend(li)
}

function renderPreview() {
    const { type, direction, top, left } = nextMovingItem;
    if (newBlock) {
        preview.innerHTML = "";
        for (let j = 0; j < PREVIEW_ROWS; j++) {
            prependPreview()
        }
    }
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left; 
        const y = block[1] + top;
        //const isAvailable = checkEmpty(target);
            nextMovingItem = { ...nextItem };
            const newTarget = preview.childNodes[y] ? preview.childNodes[y].childNodes[0].childNodes[x]: null;
            newTarget.classList.add(type, "static");
    })
    newBlock = false;
    
}
function renderBlocks(moveType = "") {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top + 1;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem }

            setTimeout(() => {
                renderBlocks('retry');
                if (moveType === "top") {
                    seizeBlock();
                    checkGameover();
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
        hDrop = false;
    })
    checkCombo = false;
    checkMatch()
}
function checkGameover() {
    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            if (ul.classList.contains("top_line")) {
                child.children[0].childNodes.forEach(li => {
                    if (li.classList.contains("seized")) {
                        clearInterval(downInterval)
                        play = false;
                        if (playsound) {
                            gameover.play();
                            playsound = false;
                        }
                        if (score > bestScore) {
                            bestScore = score;
                            saveBestScore();
                        }
                        showGameoverText()
                    }
                })
            }
        })
    })
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
            checkCombo = true;
            child.remove();
            lines += 1;
            // document.getElementsByClassName("top_line").classList.remove("top_line");
            // document.getElementsByClassName("invisible").classList.add('top_line').classList.remove("invisible");
            prependNewLine();
            score += (10 * scoreMultiplier*(1+(0.5*combo)));
            console.log("score += *" + ((1+(0.5*combo))))
            lineCount += 1;
            linesRemoved += 1;
            nextLevelDisplay.innerText = "Next Level: " + (10 - lineCount);

            if (lineCount == 10) {
                duration = duration * 0.90;
                lineCount = 0;
                stage++;
                changeTheme();
                scoreMultiplier = (scoreMultiplier + ((stage - 1) / 10));
                nextLevelDisplay.innerText = "Next Level: " + (10 - lineCount);
                stageDisplay.innerText = "Stage: " + stage;
            }
            updateScore();
        }
    })
    if(checkCombo) {
        combo += 1;
        displayCombo();
    }
    else    {
        combo = 0;
    }
    checkTetris(linesRemoved);
    linesRemoved = 0;
    generateNewBlock()
}
//pause function
function pauseResume() {
    if (play) {
        play = false;
        gameText.style.fontSize = "medium";
        gameText.style.display = "flex";
        tetrisDisplay.style.color = "white";
        tetrisDisplay.innerText = "Paused";
        tetrisDisplay.style.display = "flex";
        gameText.innerText = "\n\n\n\n\n\n\n\n\n\nInstructions: \n →, ←: move block right or left \n ↓: soft drop \n space-bar: hard(instant) drop \n m: mute/unmute \n r: re-start";
        resumeButton.style.display = "flex";
        console.log("resume button is unhidden");
    }
    else {
        gameText.style.display = "none";
        tetrisDisplay.style.display = "none";
        resumeButton.style.display = "none";
        play = true;
        drop = true;
    }
}

//function that sets a new drop interval of the block
function dropInterval() {
    if (play && drop) {
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock('top', 1)
        }, duration)

    }
}

//generates new block and automatically makes it drop with current drop interval. copies randomIndex that is shown in preview to current block
function generateNewBlock() {
    dropInterval();
    newBlock = true;
    const blockArray = Object.entries(BLOCKS);
    let BlockType = randomIndex;
    randomIndex = Math.floor(Math.random() * blockArray.length);

    movingItem.type = blockArray[BlockType][0]
    movingItem.top = 0;
    movingItem.left = 4;
    movingItem.direction = 0;

    nextItem.type = blockArray[randomIndex][0]
    nextItem.top = 0;
    nextItem.left = 2;
    nextItem.direction = 0;
    
    nextMovingItem = { ...nextItem };
    tempMovingItem = { ...movingItem };
    renderPreview()
    if (play) {
        setTimeout(function () {
            renderBlocks()
        }, 400)
    }
}

//checks if block can move to target location
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}


//receives direction and amount as parameter, and moves the block
function moveBlock(movetype, amount) {
    if (play) {
        tempMovingItem[movetype] += amount;
        renderBlocks(movetype);
    }
}
//changes the direction of current block
function changeDirection() {
    if (hDrop) {
        // console.log("cannot change direction during hard drop");
    }
    if (play && !hDrop) {
        const direction = tempMovingItem.direction;
        direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
        renderBlocks();
    }
}

//fast auto-drop function when spacebar is pressed
function hardDrop() {
    clearInterval(downInterval);
    if (play) {
        hDrop = true;
        downInterval = setInterval(() => {
            score += 1 * scoreMultiplier;
            updateScore();
            moveBlock('top', 1)
        }, 14)
    }
    
}
function displayCombo() {
    if (combo > 1){
        comboText.style.fontSize = 30 + combo * 0.2;
        comboText.style.color = `rgb(${170+combo*10},${150+combo*3},${150+combo*1})`;
        comboText.innerText = combo.toFixed(0);
        comboText.style.display = "flex";
        setTimeout(function () {
            comboText.style.display = "none"
    }, 500);
    }
}

function showGameoverText() {
    gameText.innerText = "Game-over!!";
    gameText.style.fontSize = "50px";
    gameText.style.display = "flex";
    restartButton.innerText = "Re-Start"
    restartButton.style.display = "flex";

}

//shows and plays sound for each multi line clear
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
//mute function
function muteUnmute() {
    if (!mute) {
        theme.muted = theme2.muted = line.muted = down.muted = double.muted = triple.muted = tetris.muted = gameover.muted = mute = true;
        // console.log("muted");
    }
    else if (mute) {
        theme.muted = theme2.muted = line.muted = down.muted = double.muted = triple.muted = tetris.muted = gameover.muted = mute = false;
        // console.log("unmuted");
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
                    score += 1*scoreMultiplier;
                    updateScore();
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
        case 82:
            if(!displayRestart) {
            clearInterval(downInterval);
            play = false;
            restartButton.innerText = "Re-Start";
            restartButton.style.display = "flex";
            displayRestart = true;
            }
            else {
                play = drop = true;
                dropInterval();
                restartButton.style.display = "none";
                displayRestart = false;
            }
            break;
        default:
            break;
    }
})

function updateScoreDisplay() {
    scoreDisplay.innerText = `Score: ${score.toFixed(0)}`;
    const bestScoreDisplay = document.querySelector(".best-score");
    if (bestScoreDisplay) {
        bestScoreDisplay.innerText = `Best: ${bestScore.toFixed(0)}`;
    } else {
        const newBestScoreDisplay = document.createElement("div");
        newBestScoreDisplay.className = "best-score";
        newBestScoreDisplay.innerText = `Best: ${bestScore.toFixed(0)}`;
        scoreDisplay.parentNode.insertBefore(newBestScoreDisplay, scoreDisplay.nextSibling);
    }
}
function updateScore() {
    score += scoreMultiplier;
    if (score > bestScore) {
        bestScore = score;
        saveBestScore();
    }
    updateScoreDisplay();
}
function loadBestScore() {
    const storedBestScore = localStorage.getItem("tetrisBestScore");
    if (storedBestScore) {
        bestScore = parseInt(storedBestScore, 10);
    }
}
function saveBestScore() {
    localStorage.setItem("tetrisBestScore", bestScore.toString());
}
function restart() {
    playground.innerHTML = "";
    preview.innerHTML = "";
    reset();
    init();
}
//checks how many lines were removed on one block drop
function checkTetris(lines) {
    switch (lines) {
        case 4:
            //print Tetris
            score += (120 * scoreMultiplier)  *(1+(0.5*combo));
            updateScore();
            showTetrisText("Tetris");
            break;
        case 3:
            score += (50 * scoreMultiplier) *(1+(0.5*combo));
            updateScore();
            showTetrisText("Triple");
            break;

        case 2:
            score += 20 * scoreMultiplier *(1+(0.5*combo));
            updateScore();
            showTetrisText("Double");
            break;

        case 1:
            line.play();
            break;
        default:
            break;
    }
}
//function to put variables to initial status
function reset() {
    gameText.style.display = restartButton.style.display = "none";
    stage = scoreMultiplier = 1;
    duration = 1000;
    score = count = lines = lineCount = 0;
    play = drop = playsound = true;
    updateScoreDisplay();
    stageDisplay.innerText = "Stage: " + stage;
    nextLevelDisplay.innerText = "Next Level: " + (10 - lineCount);
    theme2.pause();
    theme.play();
    console.clear();
}
//restart button
restartButton.addEventListener("click", () => {
    restart();
    // theme.play();
})

resumeButton.addEventListener("click", () => {
    if(!play){
    pauseResume();
    }
})
