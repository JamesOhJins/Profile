connect4 = document.querySelector(".connect4 > ul");
pickline = document.querySelector(".pick_line");
playerName = document.querySelector("#player");

var CONNECT4_COLS = 7;
var CONNECT4_ROWS = 6;
var first = true;
var verticalThree = false;
var verticalThreeAi = false;
var xIndex = 0;
var yindex = [0, 0, 0, 0, 0, 0, 0]; //for each column, counts how many holes are already filled
var play = true;
count = 0;
var player1Turn = true;
var pvp = false;
function init() {
    prependPickLine();
    for (let j = 0; j < CONNECT4_ROWS; j++) {
        prependNewLine();
    }
    addpicker();
}
init();

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < CONNECT4_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
        xindex = ("x" + j);
        matrix.classList.add(xindex);
    }
    li.prepend(ul)
    connect4.prepend(li)
    var yindex = ("y" + count);
    li.classList.add(yindex);
    count++;
}

function prependPickLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < CONNECT4_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
        matrix.classList.add("x" + j);
        xindex = ("picker");
        matrix.classList.add(xindex);
        pickline.prepend(ul);
    }
}
function addpicker() {
    for (let j = 0; j < CONNECT4_COLS; j++) {
        let pickerIndex = document.querySelector('.x' + j + '.picker');

        pickerIndex.addEventListener("mouseover", function () {
            // if(!pvp){
            // if (player1Turn) {
            //     pickerIndex.style.backgroundColor = changeColor();
            // }
            // }
            // else{
                pickerIndex.style.background = changeColor();
            // }
            // console.log("hovering on picker" + '.x' + j + '.picker');
        });

        pickerIndex.addEventListener("mouseout", function () {
            pickerIndex.style.background = "rgba(187, 187, 187, 0.1)";
            // console.log("back to original styler" + '.x' + j + '.picker');
        });
        pickerIndex.addEventListener("click", function () {
            if (!pvp) {
                if (player1Turn) {
                    disk(j);
                    if(j == 3 && yindex[j]!= CONNECT4_ROWS) {
                        first= true;
                    }
                    if (verticalThreeAi) {
                        setTimeout(function () {
                            think(xIndex, true);
                        }, 300)
                    }
                    else if (first) {
                        setTimeout(function () {
                            think(3, true);
                        }, 300)
                        first = false;
                    }
                    else if (play && !verticalThree) {
                        setTimeout(function () {
                            think(j, false);
                        }, 300)
                        pickerIndex.style.background = "rgba(187, 187, 187, 0.1)";
                    }
                    else if(play){
                        setTimeout(function () {
                            think(j, true);
                        }, 300)
                    }
                }
            }
            else {
                disk(j);
                pickerIndex.style.background = changeColor();
            }
        });
    }
}
function getRandomInt(playerPick) {
    min = 0; 
    max = 2000;
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    if(playerPick != 0 && yindex[playerPick] -1 == yindex[playerPick -1]) 
    {
        console.log("righthand side of player's pick is empty");
        return (playerPick -1);
    }
    else if(playerPick != CONNECT4_COLS-1 && yindex[playerPick] -1 == yindex[playerPick +1]) {
        console.log("leftthand side of player's pick is empty");
        return (playerPick +1);
    }
    else {
    if (randomNum < 1000) {
        if(playerPick != 0 && yindex[playerPick] == yindex[playerPick -1] -1){ //if left side of disk is 1 height behind
            return (playerPick -1);
        }
        else{
        return(playerPick+1);
        }
    }
    else{
        if(playerPick != CONNECT4_COLS-1 && yindex[playerPick] == yindex[playerPick +1] +1) {
        return (playerPick +1);
        }
        else {
            return(playerPick -1);
        }
    }
    }

}
function think(x, vertical3) {
    let randomNumb = getRandomInt(x);
    if(verticalThreeAi){
        disk(x);
    }
    else if(vertical3 && yindex[x] != CONNECT4_ROWS){
        disk(x);
        console.log("stacked at x");
        verticalThree = false;
    }
    else if (yindex[randomNumb] != CONNECT4_ROWS && !vertical3) {
        disk(randomNumb);
    }
    else {
        think();
        console.log("trying again");
    }
    // console.log("computer chose: " + (randomNumb));
}

function changeColor() {
    var playerColor =   "linear-gradient(20deg, red,25%, rgba(255, 133, 133, 0.945))";  
;
    if (player1Turn) {
        playerColor = "linear-gradient(20deg, red,25%, rgba(255, 133, 133, 0.945))";
    }
    else {
        playerColor = "linear-gradient(20deg, rgb(208, 255, 0),25%, rgba(255, 255, 137, 0.884))";
    }
    return playerColor;
}
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 82:
            console.log("restarting");
            playerName.innerHTML = "Player1's turn";
            restart();
            break;
        default:
            console.log("out of index");
            break;
    }

})

function disk(x) {
    if (player1Turn && yindex[x] < CONNECT4_ROWS) {
        index = (".y" + yindex[x] + " > ul > .x" + x)
        target = document.querySelector(index);
        target.classList.add("player1");
        console.log("diskclass is added for p1 at (" + (CONNECT4_COLS - x - 1) + ", " + yindex[x] + ")");
        player1Turn = false;
        yindex[x] += 1;
        // playerName.innerHTML = "Player2's turn";
        if (!pvp) {
            playerName.innerHTML = "Computer's turn";
        }
        else {
            playerName.innerHTML = "Player2's turn";

        }
    }
    else if (!player1Turn && yindex[x] < CONNECT4_ROWS) {
        index = (".y" + yindex[x] + " > ul > .x" + x)
        target = document.querySelector(index);
        // const preview = document.querySelector(".preview > ul");
        target.classList.add("player2");
        console.log("diskclass is added for p2 at (" + (CONNECT4_COLS - x - 1) + ", " + yindex[x] + ")");
        player1Turn = true;
        yindex[x] += 1;
        playerName.innerHTML = "Player1's turn";
    }
    else {
        console.log("Line is already full");
        if(!(player1Turn || pvp)){
            console.log("tryng new line");
            let randomNumb = Math.floor(Math.random() * 6)
            disk(randomNumb);
            player1Turn = true;
        }
    }
    checkFour();
    // console.log("checking four");
}

function checkFour() {
    checkX();
    checkY();
    checkZAsc();
    checkZDsc();
    checkTie()
}

function checkX() {
    var p1Count = p2Count = 0;
    for (let i = 0; i < CONNECT4_ROWS; i++) {
        // console.log("y increase");
        for (let j = 0; j < CONNECT4_COLS; j++) {
            index = (".y" + i + " > ul > .x" + j)
            // console.log("checking (" + (CONNECT4_COLS-j-1) + ", " + i + ")");
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                // console.log("p1Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p1Count);
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p2Count);
                if (p2Count == 4) {
                    playerWin(2);
                    return;
                }
            }
            else {
                // console.log("reset");
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkY() {
    var p1Count = p2Count = 0;
    for (let i = 0; i < CONNECT4_COLS; i++) {
        // console.log("y increase");
        for (let j = 0; j < CONNECT4_ROWS; j++) {
            index = (".y" + j + " > ul > .x" + i)
            // console.log("checking (" + (CONNECT4_COLS-i-1) + ", " + j + ")");
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if(p1Count == 3 && yindex[j] != CONNECT4_ROWS &&!pvp) {
                    if(!document.querySelector(".y"+(j+1) + " >ul > .x" + i).classList.contains("player2")){
                    console.log("3 disks are vertically stacked");
                    verticalThree = true;
                    // think(i, true);
                    }
                }
                // console.log("p1Count increased: (" + (CONNECT4_COLS-i-1) + ", " + j + ") " + p1Count);
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                
                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-i-1) + ", " + j + ") " + p2Count);
                if(p2Count == 3 && yindex[j] != CONNECT4_ROWS && (pvp || player1Turn)) {
                    console.log("end game");
                    xIndex = i;
                    verticalThreeAi = true;
                }
                if (p2Count == 4) {
                    playerWin(2);
                    return;
                }
            }
            else {
                // console.log("reset");
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkZDsc() {
    var p1Count = p2Count = addOnY = 0;
    var start = 4;
    var yStart = 0;
    var numloops = 0;
    for (let i = yStart; i < CONNECT4_COLS; i++) {
        if (start > 0) {
            start -= 1;
            addOnY = 0;
        }
        if (start == 0 && numloops < 3) {
            addOnY = numloops;
            numloops += 1;
        }
        for (let j = start; j < CONNECT4_COLS && addOnY < CONNECT4_ROWS; j++) {
            let yVal = addOnY;
            let xVal = j
            if (yVal < CONNECT4_ROWS) {
                addOnY++;
            }
            else {
            }
            index = (".y" + yVal + " > ul > .x" + xVal)
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if(p1Count == 3) {
                    console.log("player check diagonal");
                }
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                if (p2Count == 3) {
                    console.log("cpu check diagonal");
                }
                if (p2Count == 4) {
                    playerWin(2);
                    return;
                }
            }
            else {
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkZAsc() {
    var p1Count = p2Count = addOnY = 0;
    var start = 2;
    var yStart = 0;
    var numloops = 0;
    for (let i = yStart; i < CONNECT4_COLS; i++) {
        if (numloops == 2) {
            return;
        }
        if (start < CONNECT4_COLS) {
            start += 1;
            addOnY = 0;
        }
        if (start == CONNECT4_COLS && numloops < 2) {
            numloops += 1;
            start = 6;
            addOnY = numloops;
        }

        for (let j = start; j >= 0 && addOnY < CONNECT4_ROWS; j--) {
            let yVal = addOnY;
            let xVal = j;
            if (yVal < CONNECT4_ROWS) {
                addOnY++;
            }

            // console.log("check y: " + yVal + ", x: " + xVal)
            index = (".y" + yVal + " > ul > .x" + xVal)
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p2Count);
                if (p2Count == 4) {
                    playerWin(2);
                    return;
                }
            }
            else {
                // console.log("reset");
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkTie() {
    const childNodes = connect4.childNodes;
    var tieCount = 0;
    var size = CONNECT4_COLS * CONNECT4_ROWS;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            ul.childNodes.forEach(li => {
                if (li.classList.contains("player1") || li.classList.contains("player2")) {
                    tieCount++;
                }
                if (tieCount == size) {
                    playerWin("tie");
                }
            })
        })
    })
}
function playerWin(x) {
    var pName = "";
    if (x == "tie") {
        // alert("Tie!!");
        playerName.innerHTML = "Tie!!" + "<br> Press 'r' to restart";
    }
    else {
        if (!pvp && x == 2) {
            pName = "computer";
        }
        else {
        pName = "Player " + x;
        }
        // alert(pName + " win!!");
        playerName.innerHTML = "Winner: " + pName + "<br> Press 'r' to restart";
    }
    play = false;
    pickline.style.display = 'none';
    return;
    // removeListener();
}


function restart() {
    const childNodes = connect4.childNodes;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            ul.childNodes.forEach(li => {
                if (li.classList.contains("player1")) {
                    li.classList.remove("player1");
                    console.log("player1 disks are removed");
                }
                else if (li.classList.contains("player2")) {
                    li.classList.remove("player2");
                    console.log("player2 disks are removed");
                }
            })
        })
    })
    pickline.style.display = "initial";
    playerName.innerHTML = "Player1's turn";
    console.log(playerName.innerHTML);
    yindex = [0, 0, 0, 0, 0, 0, 0];
    play = true;
    player1Turn = true;
    verticalThree = false;
    verticalThreeAi = false;
    first = true;
}